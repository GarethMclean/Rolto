"use client";

import { useContext, useState } from "react";
import Link from "next/link";
import { UserSubscriptionPlan } from "@/types";

import { SubscriptionPlan } from "@/types/index";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { BillingFormButton } from "@/components/forms/billing-form-button";
import { ModalContext } from "@/components/modals/providers";
import { HeaderSection } from "@/components/shared/header-section";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

interface PricingCardsProps {
  userId?: string;
  subscriptionPlan?: UserSubscriptionPlan;
  plans: SubscriptionPlan[];
}

export function PricingCards({ userId, subscriptionPlan, plans }: PricingCardsProps) {
  const isYearlyDefault =
    !subscriptionPlan?.stripeCustomerId || subscriptionPlan.interval === "year"
      ? true
      : false;
  const [isYearly, setIsYearly] = useState<boolean>(!!isYearlyDefault);
  const { setShowLeadCaptureModal } = useContext(ModalContext);

  const toggleBilling = () => {
    setIsYearly(!isYearly);
  };

  const PricingCard = ({ offer }: { offer: SubscriptionPlan }) => {
    return (
              <div
          className={cn(
            "relative flex flex-col overflow-hidden rounded-3xl border shadow-sm",
            offer.title === "Growth"
              ? "border-2 border-primary"
              : "",
          )}
          key={offer.title}
        >
        <div className="min-h-[150px] items-start space-y-4 bg-muted/50 p-6">
          <p className="flex font-urban text-sm font-bold uppercase tracking-wider text-muted-foreground">
            {offer.title}
          </p>

          <div className="flex flex-row">
            <div className="flex items-end">
              <div className="flex text-left text-3xl font-semibold leading-6">
                {isYearly && offer.prices.monthly > 0 ? (
                  <>
                    <span className="mr-2 text-muted-foreground/80 line-through">
                      ${offer.prices.monthly}
                    </span>
                    <span>${(offer.prices.yearly / 12).toFixed(2)}</span>
                  </>
                ) : (
                  `$${offer.prices.monthly}`
                )}
              </div>
              <div className="-mb-1 ml-2 text-left text-sm font-medium text-muted-foreground">
                <div>/month</div>
              </div>
            </div>
          </div>
          {offer.prices.monthly > 0 ? (
            <div className="text-left text-sm text-muted-foreground">
              {isYearly
                ? `$${offer.prices.yearly} will be charged when annual`
                : "when charged monthly"}
            </div>
          ) : null}
        </div>

        <div className="flex h-full flex-col justify-between gap-16 p-6">
          <ul className="space-y-3 text-left text-sm font-medium leading-normal">
            {/* Usage Limits - Professional structured format at the top */}
            <li className="mb-4">
              <div className="space-y-2">
                {offer.benefits
                  .filter(feature =>
                    feature.includes('AI conversations') ||
                    feature.includes('document uploads') ||
                    feature.includes('chatbot')
                  )
                  .map((feature) => {
                    const label = feature.includes('AI conversations') ? 'Conversations' :
                                feature.includes('document uploads') ? 'Documents' :
                                feature.includes('chatbot') ? 'Chatbots' : '';
                    const value = feature.match(/\d+/)?.[0] || '';
                    const unit = feature.includes('AI conversations') ? '/month' : '';
                    
                    return (
                      <div key={feature} className="flex items-center justify-between">
                        <span className="text-muted-foreground">{label}:</span>
                        <span className="text-lg font-bold">{value}{unit}</span>
                      </div>
                    );
                  })}
              </div>
            </li>

            {/* Divider line for ALL plans - between usage limits and features */}
            <li className="border-t pt-2">
              {/* Plan inclusion notice for Growth and Pro - AFTER USAGE LIMITS */}
              {(offer.title === "Growth" || offer.title === "Pro") && (
                <p className="font-bold text-primary">
                  {offer.title === "Growth"
                    ? "Includes everything from Starter plan"
                    : "Includes everything from Growth plan"}
                </p>
              )}
            </li>

            {/* Regular Features */}
            {offer.benefits
              .filter(feature =>
                !feature.includes('AI conversations') &&
                !feature.includes('document uploads') &&
                !feature.includes('chatbot')
              )
              .map((feature) => (
                <li className="flex items-start gap-x-3" key={feature}>
                  <Icons.check className="size-5 shrink-0 text-purple-500" />
                  <p>{feature}</p>
                </li>
              ))}

            {/* Limitations */}
            {offer.limitations.length > 0 &&
              offer.limitations.map((feature) => (
                <li
                  className="flex items-start text-muted-foreground"
                  key={feature}
                >
                  <Icons.close className="mr-3 size-5 shrink-0" />
                  <p>{feature}</p>
                </li>
              ))}
          </ul>

          {userId && subscriptionPlan ? (
            offer.title === "Starter" ? (
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    rounded: "full",
                  }),
                  "w-full",
                )}
              >
                Go to dashboard
              </Link>
            ) : (
              <BillingFormButton
                year={isYearly}
                offer={offer}
                subscriptionPlan={subscriptionPlan}
              />
            )
          ) : (
            <Button
              className="w-full"
              variant={offer.title === "Growth" ? "default" : "outline"}
              onClick={() => setShowLeadCaptureModal(true)}
            >
              Start Free Now
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <MaxWidthWrapper>
      <section className="flex flex-col items-center text-center">
        <HeaderSection label="Pricing" title="Start at full speed !" />

        <div className="mb-4 mt-10 flex items-center gap-5">
          <ToggleGroup
            type="single"
            size="sm"
            defaultValue={isYearly ? "yearly" : "monthly"}
            onValueChange={toggleBilling}
            aria-label="toggle-year"
            className="h-9 overflow-hidden rounded-full border bg-background p-1 *:h-7 *:text-muted-foreground"
          >
            <ToggleGroupItem
              value="yearly"
              className="rounded-full px-5 text-sm font-medium transition-colors data-[state=on]:!bg-primary data-[state=on]:!text-primary-foreground data-[state=off]:text-muted-foreground"
              aria-label="Toggle yearly billing"
            >
              Yearly (-20%)
            </ToggleGroupItem>
            <ToggleGroupItem
              value="monthly"
              className="rounded-full px-5 text-sm font-medium transition-colors data-[state=on]:!bg-primary data-[state=on]:!text-primary-foreground data-[state=off]:text-muted-foreground"
              aria-label="Toggle monthly billing"
            >
              Monthly
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="grid gap-5 bg-inherit py-5 lg:grid-cols-3">
          {plans.slice(0, 3).map((offer) => (
            <PricingCard offer={offer} key={offer.title} />
          ))}
        </div>

        <p className="mt-3 text-center text-base text-balance text-muted-foreground">
          Email{" "}
          <a
            className="font-medium text-primary hover:underline"
            href="mailto:contact@rolto.io"
          >
            contact@rolto.io
          </a>{" "}
          to contact our support team.
          <br />
          <strong>
            You can test the subscriptions and won&apos;t be charged.
          </strong>
        </p>
      </section>
    </MaxWidthWrapper>
  );
}
