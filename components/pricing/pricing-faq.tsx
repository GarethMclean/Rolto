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
      "Our 14-day trial includes 250 AI conversations, 1 chatbot, basic chat widget, basic analytics, and standard support. No credit card is required to start your trial. After 14 days, you'll need to upgrade to a paid plan to continue using Rolto. Trial limitations include Rolto logo, no integrations, and limited document uploads.",
  },
  {
    id: "item-2",
    question: "How much does the Starter plan cost?",
    answer:
      "The Starter plan is priced at $19 per month or $182 per year (save 20%). It includes 500 AI conversations per month, 1 chatbot, 2 document uploads, AI chatbot training, basic analytics, lead qualification, and email & chat support.",
  },
  {
    id: "item-3",
    question: "What is the Growth plan?",
    answer:
      "The Growth plan costs $39 per month or $374 per year (save 20%). It includes everything in Starter plus 1,000 AI conversations per month, 2 chatbots, 5 document uploads, human handoff, advanced analytics, hide branding, customize chat widget, and priority support.",
  },
  {
    id: "item-4",
    question: "What does the Pro plan include?",
    answer:
      "The Pro plan costs $79 per month or $758 per year (save 20%). It includes everything in Growth plus 5,000 AI conversations per month, 3 chatbots, 10 document uploads, live support availability, and no limitations on features.",
  },
  {
    id: "item-5",
    question: "Do you offer annual subscription plans?",
    answer:
      "Yes, we offer annual subscription plans with significant savings. The Starter Annual plan is $182 per year (save $46), the Growth Annual plan is $374 per year (save $94), and the Pro Annual plan is $758 per year (save $190). All annual plans include a 20% discount compared to monthly pricing.",
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
      "Trial and Starter plan users get standard support via email and chat. Growth and Pro users get priority support with faster response times. All plans include comprehensive documentation and help resources.",
  },
  {
    id: "item-9",
    question: "What is included in the Enterprise plan?",
    answer:
      "The Enterprise plan starts at $249 per month with custom annual pricing. It includes 75,000+ AI conversations per month, unlimited chatbots, white-labeling, SLAs, API access, custom integrations, compliance logging, and 24/7 dedicated support.",
  },
  {
    id: "item-10",
    question: "How do chatbot limits work?",
    answer:
      "Each plan includes a specific number of chatbots you can create and deploy. Starter includes 1 chatbot, Growth includes 2 chatbots, and Pro includes 3 chatbots. Each chatbot can be customized and trained with your specific content and deployed on your websites.",
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
