import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // First, let's see what columns actually exist in the plan_configurations table
    const tableInfo = await prisma.$queryRaw`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'plan_configurations'
      ORDER BY ordinal_position
    `;
    
    console.log('Available columns in plan_configurations:', tableInfo);
    
    // Check plan_feature_values table schema
    const featureValuesTableInfo = await prisma.$queryRaw`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'plan_feature_values'
      ORDER BY ordinal_position
    `;
    
    console.log('Available columns in plan_feature_values:', featureValuesTableInfo);
    
    // Check plan_features table schema
    const featuresTableInfo = await prisma.$queryRaw`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'plan_features'
      ORDER BY ordinal_position
    `;
    
    console.log('Available columns in plan_features:', featuresTableInfo);
    
    // Fetch all active plans with their features and values
    const plans = await prisma.$queryRaw`
      SELECT 
        pc.id,
        pc.plan_name as "name",
        pc.display_name as "displayName",
        pc.description,
        pc.monthly_price as "monthlyPrice",
        pc.yearly_discount_percentage as "yearlyDiscountPercentage",
        pc.is_active as "isActive"
      FROM plan_configurations pc
      WHERE pc.is_active = true
      ORDER BY pc.created_at ASC
    `;

    // Fetch features using the actual database schema
    let features: any[] = [];
    let featureValues: any[] = [];
    
    try {
      // Fetch plan features
      features = await prisma.$queryRaw`
        SELECT 
          pf.name,
          pf.display_name as "displayName",
          pf.description,
          pf.category,
          pf.is_active as "isActive"
        FROM plan_features pf
        WHERE pf.is_active = true
        ORDER BY pf.sort_order ASC, pf.created_at ASC
      `;
      
      // Fetch plan feature values  
      featureValues = await prisma.$queryRaw`
        SELECT 
          pfv.plan_name as "planName",
          pfv.feature_name as "featureName",
          pfv.value,
          pfv.is_visible as "isVisible"
        FROM plan_feature_values pfv
        WHERE pfv.is_visible = true
        ORDER BY pfv.created_at ASC
      `;
      
      console.log('Successfully fetched features:', features.length);
      console.log('Successfully fetched feature values:', featureValues.length);
    } catch (error) {
      console.error('Error fetching features from database:', error);
      features = [];
      featureValues = [];
    }

    // Structure the data to match the expected format
    const structuredPlans = (plans as any[]).map((plan: any) => {
      // Calculate yearly price from monthly price and discount percentage
      const monthlyPrice = parseFloat(plan.monthlyPrice);
      const yearlyDiscountPercentage = parseFloat(plan.yearlyDiscountPercentage || '0');
      const yearlyPrice = monthlyPrice * 12 * (1 - yearlyDiscountPercentage / 100);
      
      // Get features for this plan using plan name (try both name and display_name)
      const planFeatureValues = (featureValues as any[]).filter((fv: any) => 
        fv.planName.toLowerCase() === plan.name.toLowerCase() ||
        fv.planName.toLowerCase() === plan.displayName.toLowerCase()
      );
      
      console.log(`Processing plan ${plan.name}, found ${planFeatureValues.length} feature values`);
      
      // Debug: Log first few feature values to understand the data structure
      if (planFeatureValues.length > 0) {
        console.log(`Sample feature values for ${plan.name}:`, planFeatureValues.slice(0, 3));
        console.log(`Sample features:`, features.slice(0, 3));
      }
      
      // Process features with more flexible logic
      const usageLimits: any[] = [];
      const benefits: any[] = [];
      const limitations: any[] = [];

      planFeatureValues.forEach((fv: any) => {
        const feature = (features as any[]).find((f: any) => f.name === fv.featureName);
        if (!feature) return;

        // Parse JSONB value safely
        let value: any;
        try {
          value = typeof fv.value === 'string' ? JSON.parse(fv.value) : fv.value;
        } catch (e) {
          value = fv.value;
        }

        const featureName = feature.displayName || feature.name;
        const category = feature.category?.toLowerCase() || '';

        // Categorize features correctly based on name patterns and values
        const lowerFeatureName = featureName.toLowerCase();
        
        // Usage Limits: ONLY numeric values for specific usage metrics (exclude storage and team members)
        if ((typeof value === 'number' || !isNaN(Number(value))) && value !== true && value !== false &&
            (lowerFeatureName.includes('monthly conversation') || 
             lowerFeatureName.includes('number of chatbot') || 
             lowerFeatureName.includes('document upload'))) {
          
          // Clean up the label name
          let cleanLabel = featureName;
          if (lowerFeatureName.includes('monthly conversation')) cleanLabel = 'AI Conversations/month';
          if (lowerFeatureName.includes('number of chatbot')) cleanLabel = 'Chatbots';
          if (lowerFeatureName.includes('document upload')) cleanLabel = 'Documents';
          if (lowerFeatureName.includes('storage')) cleanLabel = 'Storage (GB)';
          if (lowerFeatureName.includes('team member')) cleanLabel = 'Team Members';
          
                                // Format numbers with commas for better readability
                      const formattedValue = typeof value === 'number' ? 
                        value.toLocaleString() : 
                        (!isNaN(Number(value)) ? Number(value).toLocaleString() : value.toString());
                      
                      usageLimits.push({
                        label: cleanLabel + ':',
                        value: formattedValue
                      });
          
        } else if (value === true || value === 'true' || value === 1) {
          // Skip storage and team members features
          if (lowerFeatureName.includes('storage') || lowerFeatureName.includes('team member')) {
            return; // Skip this feature entirely
          }
          
          // This is an included feature - clean up the name
          let cleanFeatureName = featureName;
          if (lowerFeatureName.includes('ai chatbot')) cleanFeatureName = 'AI Chatbot';
          if (lowerFeatureName.includes('chatbot training')) cleanFeatureName = 'Chatbot Training';
          if (lowerFeatureName.includes('basic analytics')) cleanFeatureName = 'Basic Analytics';
          if (lowerFeatureName.includes('advanced analytics')) cleanFeatureName = 'Advanced Analytics';
          if (lowerFeatureName.includes('human handoff')) cleanFeatureName = 'Human Handoff';
          if (lowerFeatureName.includes('hide branding')) cleanFeatureName = 'Hide Branding';
          if (lowerFeatureName.includes('customize chat widget')) cleanFeatureName = 'Customize Chat Widget';
          if (lowerFeatureName.includes('priority support')) cleanFeatureName = 'Priority Support';
          if (lowerFeatureName.includes('live support')) cleanFeatureName = 'Live Support Availability';
          if (lowerFeatureName.includes('lead qualification')) cleanFeatureName = 'Lead Qualification';
          if (lowerFeatureName.includes('email support')) cleanFeatureName = 'Email Support';
          if (lowerFeatureName.includes('chat support')) cleanFeatureName = 'Chat Support';
          if (lowerFeatureName.includes('higher usage')) cleanFeatureName = 'Higher Usage Limits';
          
          benefits.push(cleanFeatureName);
          
        } else if (value === false || value === 'false' || value === 0) {
          // This is a limitation - clean up the name and capitalize properly
          let cleanFeatureName = featureName;
          if (lowerFeatureName.includes('custom branding')) cleanFeatureName = 'Custom Branding';
          if (lowerFeatureName.includes('integration')) cleanFeatureName = 'Integrations';
          if (lowerFeatureName.includes('human handoff')) cleanFeatureName = 'Human Handoff';
          if (lowerFeatureName.includes('hide branding')) cleanFeatureName = 'Hide Branding';
          if (lowerFeatureName.includes('export report')) cleanFeatureName = 'Export Reports';
          if (lowerFeatureName.includes('live support')) cleanFeatureName = 'Live Support Availability';
          if (lowerFeatureName.includes('customize chat widget')) cleanFeatureName = 'Customize Chat Widget';
          if (lowerFeatureName.includes('advanced analytics')) cleanFeatureName = 'Advanced Analytics';
          if (lowerFeatureName.includes('priority support')) cleanFeatureName = 'Priority Support';
          
          limitations.push(cleanFeatureName);
        }
      });

      // Sort usage limits in the requested order: AI Conversations/month, Documents, Chatbots
      const usageLimitOrder = ['AI Conversations/month:', 'Documents:', 'Chatbots:'];
      usageLimits.sort((a, b) => {
        const indexA = usageLimitOrder.indexOf(a.label);
        const indexB = usageLimitOrder.indexOf(b.label);
        
        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB;
        }
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return a.label.localeCompare(b.label);
      });

      // Add "Everything in Starter" for Growth and Pro plans
      if (plan.displayName === 'Growth' || plan.displayName === 'Pro') {
        const starterPlanName = plan.displayName === 'Growth' ? 'Starter' : 'Growth';
        benefits.unshift(`Everything in ${starterPlanName}`);
      }

      // Sort benefits in the requested order
      const featureOrder = [
        'Everything in Starter',
        'Everything in Growth',
        'Higher Usage Limits', // First after "Everything in Starter" for Growth plan
        'AI Chatbot',
        'Chatbot Training', 
        'Lead Qualification',
        'Chatbot Notifications',
        'Basic Analytics',
        'Chat Support',
        'Email Support',
        'Advanced Analytics',
        'Human Handoff',
        'Hide Branding',
        'Customize Chat Widget',
        'Priority Support', // Last for Growth plan
        'Live Support Availability'
      ];

      benefits.sort((a, b) => {
        const indexA = featureOrder.indexOf(a);
        const indexB = featureOrder.indexOf(b);
        
        // If both features are in the order array, sort by their position
        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB;
        }
        // If only one is in the array, prioritize it
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        // If neither is in the array, maintain alphabetical order
        return a.localeCompare(b);
      });

      console.log(`${plan.name} processed: ${usageLimits.length} usage limits, ${benefits.length} benefits, ${limitations.length} limitations`);
      
      // Use database data if available, otherwise fallback
      const finalUsageLimits = usageLimits.length > 0 ? usageLimits : [
        { label: "AI Conversations/month:", value: "500" },
        { label: "Documents:", value: "2" },
        { label: "Chatbots:", value: "1" },
      ];
      
      const finalBenefits = benefits.length > 0 ? benefits : [
        "AI Chatbot",
        "Chatbot Training", 
        "Basic Analytics",
      ];
      
      // Pro plan should have no limitations
      const finalLimitations = plan.displayName === 'Pro' ? [] : 
        (limitations.length > 0 ? limitations : [
          "Custom Branding",
          "Integrations",
        ]);
      
      return {
        id: plan.id,
        title: plan.displayName,
        description: plan.description || '',
        prices: {
          monthly: monthlyPrice,
          yearly: Math.round(yearlyPrice * 100) / 100 // Round to 2 decimal places
        },
        stripeIds: {
          price: null // We'll add this later if needed
        },
        usageLimits: finalUsageLimits,
        benefits: finalBenefits,
        limitations: finalLimitations
      };
    });

    return NextResponse.json(structuredPlans);
  } catch (error) {
    console.error('Error fetching plans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch plans' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
