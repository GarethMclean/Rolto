import Image from "next/image";
import Link from "next/link";

import { getCurrentUser } from "@/lib/session";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { constructMetadata } from "@/lib/utils";
import { getPlansFromDatabase } from "@/lib/plans";
import ComparePlans from "@/components/pricing/compare-plans";
import { PricingCards } from "@/components/pricing/pricing-cards";
import { PricingFaq } from "@/components/pricing/pricing-faq";

export const metadata = constructMetadata({
  title: "Pricing – Rolto",
  description:
    "Simple, transparent pricing for Rolto's AI-powered conversational platform. Start with a 14-day free trial, then choose from Starter, Growth, Pro, or Enterprise plans.",
});

export default async function PricingPage() {
  const user = await getCurrentUser();

  let subscriptionPlan;
  if (user && user.id) {
    subscriptionPlan = await getUserSubscriptionPlan(user.id);
  }

  // Fetch plans from database
  const plans = await getPlansFromDatabase();
  
  console.log('Plans fetched:', plans ? plans.length : 'null');

  // Ensure we have plans data before rendering
  if (!plans || plans.length === 0) {
    console.log('No plans found, showing loading state');
    return (
      <div className="flex w-full flex-col gap-16 py-8 md:py-8">
        <div className="container max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <div className="text-gradient_indigo-purple mb-4 font-semibold">Pricing</div>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-[72px]">
              Start at full speed
            </h1>
            <p className="mt-6 text-balance text-lg text-muted-foreground">
              Simple, transparent pricing for your AI-powered conversational platform
            </p>
          </div>
        </div>
        <div className="container max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <div className="text-lg text-muted-foreground">Loading pricing information...</div>
          </div>
        </div>
      </div>
    );
  }

  console.log('Rendering pricing page with plans');
  return (
    <div className="flex w-full flex-col gap-16 py-8 md:py-8">
      <PricingCards userId={user?.id} subscriptionPlan={subscriptionPlan} plans={plans} />
      <hr className="container" />
      <ComparePlans />
      <PricingFaq />
    </div>
  );
}
