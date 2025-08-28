import { PlansRow, SubscriptionPlan } from "types";
import { env } from "@/env.mjs";

export const pricingData: SubscriptionPlan[] = [
  {
    title: "Starter",
    description: "For growing businesses",
    usageLimits: [
      { label: "Conversations:", value: "500" },
      { label: "Chatbots:", value: "1" },
      { label: "Documents:", value: "2" },
    ],
    benefits: [
      "AI Chatbot",
      "Chatbot Training",
      "Basic Analytics",
      "Chatbot Notifications",
      "Lead Qualification",
      "Email Support",
      "Chat Support",
    ],
    limitations: [
      "No custom branding",
      "No integrations",
      "No agent handoff",
      "Limited to 1 site",
    ],
    prices: {
      monthly: 19,
      yearly: 182,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_STARTER_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_STARTER_YEARLY_PLAN_ID,
    },
  },
  {
    title: "Growth",
    description: "For established teams",
    usageLimits: [
      { label: "Conversations:", value: "1,000" },
      { label: "Chatbots:", value: "3" },
      { label: "Documents:", value: "5" },
    ],
    benefits: [
      "Everything in Starter",
      "Higher Usage Limits",
      "Human Handoff",
      "Advanced Analytics",
      "Hide Branding",
      "Customize Chat Widget",
      "Priority Support",
    ],
    limitations: [
      "No advanced analytics",
      "No automation triggers",
      "No SMS/email follow-ups",
    ],
    prices: {
      monthly: 39,
      yearly: 374,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID,
    },
  },
  {
    title: "Pro",
    description: "For industry specialists",
    usageLimits: [
      { label: "Conversations:", value: "5,000" },
      { label: "Chatbots:", value: "5" },
      { label: "Documents:", value: "10" },
    ],
    benefits: [
      "Everything in Growth",
      "Higher Usage Limits",
      "Live Support Availability",
    ],
    limitations: [
      "No white-labeling",
      "No SLAs",
      "No custom integrations",
    ],
    prices: {
      monthly: 79,
      yearly: 758,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_VERTICAL_PRO_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_VERTICAL_PRO_YEARLY_PLAN_ID,
    },
  },
  {
    title: "Enterprise",
    description: "For large organizations",
    usageLimits: [
      { label: "Conversations:", value: "75,000+" },
      { label: "Chatbots:", value: "Unlimited" },
      { label: "Documents:", value: "Unlimited" },
    ],
    benefits: [
      "Everything in Pro",
      "White-labeling",
      "SLAs",
      "API access",
      "Agent handoff",
      "Custom integrations",
      "Compliance logging",
      "Custom chat widget",
      "24/7 priority support",
      "Custom pricing",
    ],
    limitations: [],
    prices: {
      monthly: 249,
      yearly: 2390,
    },
    stripeIds: {
      monthly: env.NEXT_PUBLIC_STRIPE_ENTERPRISE_MONTHLY_PLAN_ID,
      yearly: env.NEXT_PUBLIC_STRIPE_ENTERPRISE_YEARLY_PLAN_ID,
    },
  },
];

export const plansColumns = [
  "starter",
  "growth",
  "pro",
] as const;

export const comparePlans: PlansRow[] = [
  {
    feature: "Monthly AI Conversations",
    starter: "500",
    growth: "1,000",
    pro: "5,000",
  },
  {
    feature: "Chatbots",
    starter: "1",
    growth: "3",
    pro: "5",
  },
  {
    feature: "Document Uploads",
    starter: "2",
    growth: "5",
    pro: "10",
  },
  {
    feature: "AI Chatbot",
    starter: true,
    growth: true,
    pro: true,
  },
  {
    feature: "Chatbot Training",
    starter: true,
    growth: true,
    pro: true,
  },
  {
    feature: "Basic Analytics",
    starter: true,
    growth: true,
    pro: true,
  },
  {
    feature: "Chatbot Notifications",
    starter: true,
    growth: true,
    pro: true,
  },
  {
    feature: "Lead Qualification",
    starter: true,
    growth: true,
    pro: true,
  },
  {
    feature: "Email Support",
    starter: true,
    growth: true,
    pro: true,
  },
  {
    feature: "Chat Support",
    starter: true,
    growth: true,
    pro: true,
  },
  {
    feature: "Human Handoff",
    starter: null,
    growth: true,
    pro: true,
  },
  {
    feature: "Advanced Analytics",
    starter: null,
    growth: true,
    pro: true,
  },
  {
    feature: "Hide Branding",
    starter: null,
    growth: true,
    pro: true,
  },
  {
    feature: "Customize Chat Widget",
    starter: null,
    growth: true,
    pro: true,
  },
  {
    feature: "Priority Support",
    starter: null,
    growth: true,
    pro: true,
  },
  {
    feature: "Live Support Availability",
    starter: null,
    growth: null,
    pro: true,
  },
  {
    feature: "Export Reports",
    starter: null,
    growth: null,
    pro: true,
  },
];
