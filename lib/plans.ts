import { prisma } from "@/lib/db";
import { SubscriptionPlan, PlansRow } from "@/types";

// Helper function to safely get value from JSON
function getValue(value: any): string | null {
  if (typeof value === 'string' || typeof value === 'number') {
    return value.toString();
  }
  if (value && typeof value === 'object' && 'value' in value) {
    return value.value?.toString() || null;
  }
  return null;
}

// Helper function to check if a feature is a usage limit
function isUsageLimit(featureName: string): boolean {
  const usageLimitFeatures = [
    'monthly_conversations',
    'chatbots',
    'document_uploads',
    'websites',
    'storage_gb',
    'team_members'
  ];
  return usageLimitFeatures.includes(featureName);
}

// Helper function to format usage limit values
function formatUsageLimit(featureName: string, value: any): string {
  const val = getValue(value);
  if (!val) return '';
  
  switch (featureName) {
    case 'monthly_conversations':
      return `${val} AI conversations/month`;
    case 'chatbots':
      return val === 'unlimited' ? 'Unlimited chatbots' : `${val} chatbot${val === '1' ? '' : 's'}`;
    case 'document_uploads':
      return val === 'unlimited' ? 'Unlimited document uploads' : `${val} document upload${val === '1' ? '' : 's'}`;
    case 'websites':
      return val === 'unlimited' ? 'Unlimited websites' : `${val} website${val === '1' ? '' : 's'}`;
    case 'storage_gb':
      return `${val} GB storage`;
    case 'team_members':
      return val === 'unlimited' ? 'Unlimited team members' : `${val} team member${val === '1' ? '' : 's'}`;
    default:
      return val;
  }
}

// Helper function to capitalize plan names
function capitalizePlanName(planName: string): string {
  return planName.charAt(0).toUpperCase() + planName.slice(1).toLowerCase();
}

export async function getPlansFromDatabase(): Promise<SubscriptionPlan[]> {
  try {
    // Get all active plan configurations
    const plans = await prisma.plan_configurations.findMany({
      where: { is_active: true },
      include: {
        plan_feature_values: {
          include: {
            plan_features: true
          }
        }
      }
    });

    // Get all active features ordered by sort_order
    const features = await prisma.plan_features.findMany({
      where: { is_active: true },
      orderBy: { sort_order: 'asc' }
    });

    // Filter out features we don't want to show
    const excludedFeatures = ['storage_gb', 'team_members'];
    const filteredFeatures = features.filter(f => !excludedFeatures.includes(f.name));

    // Define the plan order we want
    const planOrder = ['starter', 'growth', 'pro'];
    
    // Sort plans according to our desired order
    const sortedPlans = planOrder.map(planName => 
      plans.find(p => p.plan_name.toLowerCase() === planName)
    ).filter(Boolean);

    return sortedPlans.map(plan => {
      const benefits: string[] = [];
      const limitations: string[] = [];

      // Process each feature value for this plan
      plan.plan_feature_values.forEach(featureValue => {
        const feature = featureValue.plan_features;
        
        // Skip excluded features
        if (excludedFeatures.includes(feature.name)) {
          return;
        }

        if (featureValue.is_visible) {
          if (feature.input_type === 'toggle') {
            const value = featureValue.value as boolean;
            if (value) {
              benefits.push(feature.display_name);
            } else {
              limitations.push(feature.display_name);
            }
          } else if (isUsageLimit(feature.name)) {
            const formattedValue = formatUsageLimit(feature.name, featureValue.value);
            if (formattedValue) {
              benefits.push(formattedValue);
            }
          }
        }
      });

      // Sort benefits and limitations by the feature sort order
      benefits.sort((a, b) => {
        // First, prioritize numeric features in specific order
        const aIsConversations = a.includes('AI conversations/month');
        const bIsConversations = b.includes('AI conversations/month');
        const aIsDocuments = a.includes('document upload');
        const bIsDocuments = b.includes('document upload');
        const aIsChatbots = a.includes('chatbot') && !a.includes('AI conversations/month') && !a.includes('document upload');
        const bIsChatbots = b.includes('chatbot') && !b.includes('AI conversations/month') && !b.includes('document upload');
        
        // Priority order: conversations > documents > chatbots > other features
        if (aIsConversations && !bIsConversations) return -1;
        if (!aIsConversations && bIsConversations) return 1;
        if (aIsDocuments && !bIsDocuments) return -1;
        if (!aIsDocuments && bIsDocuments) return 1;
        if (aIsChatbots && !bIsChatbots) return -1;
        if (!aIsChatbots && bIsChatbots) return 1;
        
        // For other features, use the original sort order
        const aFeature = filteredFeatures.find(f => f.display_name === a);
        const bFeature = filteredFeatures.find(f => f.display_name === b);
        if (!aFeature || !bFeature) return 0;
        return aFeature.sort_order - bFeature.sort_order;
      });

      limitations.sort((a, b) => {
        const aFeature = filteredFeatures.find(f => f.display_name === a);
        const bFeature = filteredFeatures.find(f => f.display_name === b);
        if (!aFeature || !bFeature) return 0;
        return aFeature.sort_order - bFeature.sort_order;
      });

      // Calculate yearly price
      const monthlyPrice = Number(plan.monthly_price || 0);
      const yearlyDiscount = Number(plan.yearly_discount_percentage || 20);
      const yearlyPrice = Math.round(monthlyPrice * 12 * (1 - yearlyDiscount / 100) * 100) / 100;

      return {
        title: capitalizePlanName(plan.plan_name),
        description: plan.description || '',
        benefits,
        limitations,
        prices: {
          monthly: monthlyPrice,
          yearly: yearlyPrice
        },
        stripeIds: {
          monthly: null, // We'll need to add these to the database
          yearly: null
        }
      };
    });
  } catch (error) {
    console.error('Error fetching plans from database:', error);
    return [];
  }
}

export async function getComparePlansFromDatabase(): Promise<PlansRow[]> {
  try {
    const plans = await getPlansFromDatabase();
    
    // Get all features to create the compare table rows
    const features = await prisma.plan_features.findMany({
      where: { 
        is_active: true,
        // Only include features that are present in Starter, Growth, or Pro plans
        name: {
          notIn: ['storage_gb', 'team_members'] // Exclude these features
        }
      },
      orderBy: { sort_order: 'asc' }
    });

    if (!features || features.length === 0) {
      console.warn('No features found for compare table');
      return [];
    }

    // Define the plan hierarchy (lower index = lower tier)
    const planHierarchy = ['starter', 'growth', 'pro'];
    
    // Create a map of plan names to their data
    const planMap = new Map(plans.map(p => [p.title.toLowerCase(), p]));
    
    // Helper function to determine if a feature should be shown in compare table
    const shouldShowInCompareTable = (featureName: string) => {
      // Always show numeric features at the top
      if (['monthly_conversations', 'chatbots', 'document_uploads'].includes(featureName)) {
        return true;
      }
      
      // Show all other features that are present in any of the three main plans
      // This is less restrictive than before to include all relevant features
      return true;
    };

    // Filter features to only show those that should be in the compare table
    const compareTableFeatures = features.filter(f => shouldShowInCompareTable(f.name));
    
    // Sort features: numeric features first, then others by sort_order
    compareTableFeatures.sort((a, b) => {
      const aIsNumeric = ['monthly_conversations', 'chatbots', 'document_uploads'].includes(a.name);
      const bIsNumeric = ['monthly_conversations', 'chatbots', 'document_uploads'].includes(b.name);
      
      if (aIsNumeric && !bIsNumeric) return -1;
      if (!aIsNumeric && bIsNumeric) return 1;
      if (aIsNumeric && bIsNumeric) {
        // Order: monthly_conversations, chatbots, document_uploads
        const order = ['monthly_conversations', 'chatbots', 'document_uploads'];
        return order.indexOf(a.name) - order.indexOf(b.name);
      }
      
      return a.sort_order - b.sort_order;
    });
    
    return compareTableFeatures.map(feature => {
      const row: any = { feature: feature.display_name };
      
      // First, populate all plans with their direct feature values
      plans.forEach(plan => {
        const planKey = plan.title.toLowerCase().replace(/\s+/g, '-');
        
        // Check if this feature is in benefits or limitations for this specific plan
        const isBenefit = plan.benefits.some(b => b.includes(feature.display_name) || feature.display_name.includes(b));
        const isLimitation = plan.limitations.some(l => l.includes(feature.display_name) || feature.display_name.includes(l));
        
        if (isBenefit) {
          row[planKey] = true;
        } else if (isLimitation) {
          row[planKey] = false;
        } else {
          // Try to find usage limit values
          const usageValue = plan.benefits.find(b => {
            if (feature.name === 'monthly_conversations') {
              return b.includes('AI conversations/month');
            } else if (feature.name === 'chatbots') {
              return b.includes('chatbot');
            } else if (feature.name === 'document_uploads') {
              return b.includes('document upload');
            } else if (feature.name === 'websites') {
              return b.includes('website');
            }
            return false;
          });
          
          if (usageValue) {
            row[planKey] = usageValue;
          } else {
            row[planKey] = null;
          }
        }
      });
      
      // Now apply cascading logic for toggle features
      if (feature.input_type === 'toggle') {
        // For each plan, check if it should inherit features from lower-tier plans
        plans.forEach(plan => {
          const planKey = plan.title.toLowerCase().replace(/\s+/g, '-');
          const planIndex = planHierarchy.indexOf(plan.title.toLowerCase());
          
          // Look for this feature in lower-tier plans
          for (let i = 0; i < planIndex; i++) {
            const lowerPlan = plans.find(p => planHierarchy.indexOf(p.title.toLowerCase()) === i);
            if (lowerPlan) {
              const lowerPlanKey = lowerPlan.title.toLowerCase().replace(/\s+/g, '-');
              // If a lower-tier plan has this feature as true, cascade it up
              if (row[lowerPlanKey] === true) {
                row[planKey] = true;
                break;
              }
            }
          }
        });
      }
      
      return row as PlansRow;
    });
  } catch (error) {
    console.error('Error fetching compare plans from database:', error);
    return [];
  }
}
