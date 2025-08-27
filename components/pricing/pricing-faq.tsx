import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { HeaderSection } from "../shared/header-section";

const pricingFaqData = [
  {
    id: "item-1",
    question: "What is included in the 14-day trial?",
    answer:
      "Our 14-day trial includes 250 AI conversations, 1 website, basic chat widget, basic analytics, and standard support. No credit card is required to start your trial. After 14 days, you'll need to upgrade to a paid plan to continue using Rolto. Trial limitations include Rolto logo, no integrations, and 1 document upload.",
  },
  {
    id: "item-2",
    question: "How much does the Starter plan cost?",
    answer:
      "The Starter plan is priced at $19 per month or $182.40 per year (save 20%). It includes 500 AI conversations per month, 2 document uploads, 1 chatbot, AI Chatbot, Chatbot Training, Basic Analytics, Chatbot Notifications, Lead Qualification, Email Support, and Chat Support.",
  },
  {
    id: "item-3",
    question: "What is the price of the Growth plan?",
    answer:
      "The Growth plan is available for $39 per month or $374.40 per year (save 20%). It offers 1,000 AI conversations per month, 5 document uploads, 3 chatbots, Higher Usage Limits, Human Handoff, Advanced Analytics, Hide Branding, Customize Chat Widget, and Priority Support.",
  },
  {
    id: "item-4",
    question: "What does the Pro plan include?",
    answer:
      "The Pro plan costs $79 per month or $758.40 per year (save 20%). It includes 5,000 AI conversations per month, 10 document uploads, 5 chatbots, Higher Usage Limits, and Live Support Availability. This plan is ideal for established businesses that need enterprise-grade features.",
  },
  {
    id: "item-5",
    question: "Do you offer annual subscription plans?",
    answer:
      "Yes, we offer annual subscription plans with significant savings. The Starter Annual plan is $182.40 per year (save $45.60), the Growth Annual plan is $374.40 per year (save $93.60), and the Pro Annual plan is $758.40 per year (save $189.60). All annual plans include a 20% discount compared to monthly pricing.",
  },
  {
    id: "item-6",
    question: "What happens if I exceed my monthly AI conversation limit?",
    answer:
      "All plans allow overage purchases at $5 per additional 1,000 messages. You can purchase overages directly from your dashboard, or upgrade to the next tier for more included messages.",
  },
  {
    id: "item-7",
    question: "Can I change my plan at any time?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments. You can also cancel your subscription at any time.",
  },
  {
    id: "item-8",
    question: "What kind of support do you offer?",
    answer:
      "Trial users get standard support, Starter plan users get standard support, Growth and Pro users get priority support. All plans include email and chat support, with priority support offering faster response times.",
  },
  {
    id: "item-9",
    question: "What features are included in the trial?",
    answer:
      "The 14-day trial includes core AI chatbot functionality, basic analytics, lead qualification, and standard support. You can test all the essential features to see how Rolto can transform your website into an intelligent conversational platform.",
  },
  {
    id: "item-10",
    question: "How do I get started with Rolto?",
    answer:
      "Getting started is simple! Sign up for the 14-day free trial, add your website content, and integrate the chatbot with just one line of code. No technical expertise required - Rolto learns from your content automatically to provide accurate, context-aware responses to your visitors.",
  },
];

export function PricingFaq() {
  return (
    <section className="container max-w-4xl py-2">
      <HeaderSection
        label="FAQ"
        title="Frequently Asked Questions"
        subtitle="Explore our comprehensive FAQ to find quick answers to common
          inquiries. If you need further assistance, don't hesitate to
          contact us at contact@rolto.io for personalized help."
      />

      <Accordion type="single" collapsible className="my-12 w-full">
        {pricingFaqData.map((faqItem) => (
          <AccordionItem key={faqItem.id} value={faqItem.id}>
            <AccordionTrigger>{faqItem.question}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground sm:text-[15px]">
              {faqItem.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
