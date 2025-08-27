import { CircleCheck } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { HeaderSection } from "@/components/shared/header-section";

export default function ComparePlans() {
  return (
    <MaxWidthWrapper>
      <section className="container max-w-6xl">
        <HeaderSection label="Plans" title="Compare Our Plans" />
        
        <div className="my-10 overflow-x-scroll max-lg:mx-[-0.8rem] md:overflow-x-visible">
          <table className="w-full table-fixed">
            <thead>
              <tr className="divide-x divide-border border">
                <th className="sticky left-0 z-20 w-40 bg-accent p-5 md:w-1/4 lg:top-14"></th>
                <th className="sticky z-10 w-40 bg-accent p-5 font-heading text-xl capitalize tracking-wide md:w-auto lg:top-14 lg:text-2xl">
                  Starter
                  <div className="mt-3">
                    <button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                      Start Free Now
                    </button>
                  </div>
                </th>
                <th className="sticky z-10 w-40 bg-accent p-5 font-heading text-xl capitalize tracking-wide md:w-auto lg:top-14 lg:text-2xl">
                  Growth
                  <div className="mt-3">
                    <button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                      Start Free Now
                    </button>
                  </div>
                </th>
                <th className="sticky z-10 w-40 bg-accent p-5 font-heading text-xl capitalize tracking-wide md:w-auto lg:top-14 lg:text-2xl">
                  Pro
                  <div className="mt-3">
                    <button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                      Start Free Now
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="divide-x divide-border">
                <td className="sticky left-0 z-20 w-40 bg-accent p-5 font-medium md:w-1/4">AI conversations/month</td>
                <td className="w-40 p-5 text-center md:w-auto">500</td>
                <td className="w-40 p-5 text-center md:w-auto">1000</td>
                <td className="w-40 p-5 text-center md:w-auto">5000</td>
              </tr>
              <tr className="divide-x divide-border">
                <td className="sticky left-0 z-20 w-40 bg-accent p-5 font-medium md:w-1/4">Document uploads</td>
                <td className="w-40 p-5 text-center md:w-auto">2</td>
                <td className="w-40 p-5 text-center md:w-auto">5</td>
                <td className="w-40 p-5 text-center md:w-auto">10</td>
              </tr>
              <tr className="divide-x divide-border">
                <td className="sticky left-0 z-20 w-40 bg-accent p-5 font-medium md:w-1/4">Chatbots</td>
                <td className="w-40 p-5 text-center md:w-auto">1</td>
                <td className="w-40 p-5 text-center md:w-auto">3</td>
                <td className="w-40 p-5 text-center md:w-auto">5</td>
              </tr>
              <tr className="divide-x divide-border">
                <td className="sticky left-0 z-20 w-40 bg-accent p-5 font-medium md:w-1/4">AI Chatbot</td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
              </tr>
              <tr className="divide-x divide-border">
                <td className="sticky left-0 z-20 w-40 bg-accent p-5 font-medium md:w-1/4">Chatbot Training</td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
              </tr>
              <tr className="divide-x divide-border">
                <td className="sticky left-0 z-20 w-40 bg-accent p-5 font-medium md:w-1/4">Basic Analytics</td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
              </tr>
              <tr className="divide-x divide-border">
                <td className="sticky left-0 z-20 w-40 bg-accent p-5 font-medium md:w-1/4">Chatbot Notifications</td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
              </tr>
              <tr className="divide-x divide-border">
                <td className="sticky left-0 z-20 w-40 bg-accent p-5 font-medium md:w-1/4">Lead Qualification</td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
              </tr>
              <tr className="divide-x divide-border">
                <td className="sticky left-0 z-20 w-40 bg-accent p-5 font-medium md:w-1/4">Email Support</td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
              </tr>
              <tr className="divide-x divide-border">
                <td className="sticky left-0 z-20 w-40 bg-accent p-5 font-medium md:w-1/4">Chat Support</td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
              </tr>
              <tr className="divide-x divide-border">
                <td className="sticky left-0 z-20 w-40 bg-accent p-5 font-medium md:w-1/4">Human Handoff</td>
                <td className="w-40 p-5 text-center md:w-auto">—</td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
              </tr>
              <tr className="divide-x divide-border">
                <td className="sticky left-0 z-20 w-40 bg-accent p-5 font-medium md:w-1/4">Hide Branding</td>
                <td className="w-40 p-5 text-center md:w-auto">—</td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
              </tr>
              <tr className="divide-x divide-border">
                <td className="sticky left-0 z-20 w-40 bg-accent p-5 font-medium md:w-1/4">Advanced Analytics</td>
                <td className="w-40 p-5 text-center md:w-auto">—</td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
              </tr>
              <tr className="divide-x divide-border">
                <td className="sticky left-0 z-20 w-40 bg-accent p-5 font-medium md:w-1/4">Customize Chat Widget</td>
                <td className="w-40 p-5 text-center md:w-auto">—</td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
              </tr>
              <tr className="divide-x divide-border">
                <td className="sticky left-0 z-20 w-40 bg-accent p-5 font-medium md:w-1/4">Priority Support</td>
                <td className="w-40 p-5 text-center md:w-auto">—</td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
              </tr>
              <tr className="divide-x divide-border">
                <td className="sticky left-0 z-20 w-40 bg-accent p-5 font-medium md:w-1/4">Live Support Availability</td>
                <td className="w-40 p-5 text-center md:w-auto">—</td>
                <td className="w-40 p-5 text-center md:w-auto">—</td>
                <td className="w-40 p-5 text-center md:w-auto">
                  <CircleCheck className="mx-auto h-5 w-5 text-green-500" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </MaxWidthWrapper>
  );
}
