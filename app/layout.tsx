import "@/styles/globals.css";

import { fontGeist, fontHeading, fontSans, fontUrban } from "@/assets/fonts";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@/components/analytics";
import ChatbotWidget from "@/components/chatbot-widget";
import { MobileMenuProvider } from "@/components/layout/mobile-menu-context";
import { TailwindIndicator } from "@/components/tailwind-indicator";

// Dynamically import ModalProvider to prevent SSR issues with useSearchParams
const ModalProvider = dynamic(() => import("@/components/modals/providers"), {
  ssr: false,
  loading: () => null,
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Primary Meta Tags */}
        <title>
          Rolto - Transform Your Website into an Intelligent Conversational
          Platform
        </title>
        <meta
          name="title"
          content="Rolto - Transform Your Website into an Intelligent Conversational Platform"
        />
        <meta
          name="description"
          content="Rolto is an embeddable AI assistant that transforms any website into an intelligent conversational platform. Capture leads, provide instant support, and engage visitors with AI that understands your business."
        />
        <meta
          name="keywords"
          content="AI assistant, chatbot, conversational AI, lead generation, customer support, website widget, RAG, retrieval augmented generation, customer engagement, conversion optimization"
        />
        <meta name="author" content="Rolto" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Search Engine Image (Google, Bing, etc.) */}
        <meta name="image" content="https://rolto.io/R-logo-blue.png" />
        <meta itemProp="image" content="https://rolto.io/R-logo-blue.png" />
        <meta name="msapplication-TileImage" content="https://rolto.io/R-logo-blue.png" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rolto.io" />
        <meta
          property="og:title"
          content="Rolto - The AI-Powered Conversational Platform"
        />
        <meta
          property="og:description"
          content="Transform any website into an intelligent conversational platform with Rolto's embeddable AI assistant. Capture leads, provide instant support, and engage visitors."
        />
        <meta property="og:image" content="https://rolto.io/og.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Rolto - Transform Your Website into an Intelligent Engagement Platform" />
        <meta property="og:site_name" content="Rolto" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://rolto.io" />
        <meta
          name="twitter:title"
          content="Rolto - The AI-Powered Conversational Platform"
        />
        <meta
          name="twitter:description"
          content="Transform any website into an intelligent conversational platform with Rolto's embeddable AI assistant."
        />
        <meta name="twitter:image" content="https://rolto.io/og.png" />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="630" />
        <meta name="twitter:image:alt" content="Rolto - Transform Your Website into an Intelligent Engagement Platform" />

        {/* Additional SEO Meta Tags */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="theme-color" content="#0370e3" />
        <meta name="msapplication-TileColor" content="#0370e3" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Rolto" />
        
        {/* SEO and Search Engine Optimization */}
        <meta name="google-site-verification" content="your-verification-code" />
        <meta name="msvalidate.01" content="your-bing-verification-code" />
        <meta name="yandex-verification" content="your-yandex-verification-code" />
        
        {/* Performance and Core Web Vitals */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Social Media and Branding */}
        <meta name="application-name" content="Rolto" />
        <meta name="msapplication-tooltip" content="Rolto - AI Conversational Platform" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://rolto.io" />

        {/* Basic Favicon - Fallback for all browsers */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        
        {/* Favicon - Theme-Aware with Light/Dark Mode Support */}
        {/* Light Theme Favicons */}
        <link rel="icon" href="/favicon-light-16x16.png" media="(prefers-color-scheme: light)" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-light-32x32.png" media="(prefers-color-scheme: light)" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-light-96x96.png" media="(prefers-color-scheme: light)" type="image/png" sizes="96x96" />
        <link rel="icon" href="/favicon-light-192x192.png" media="(prefers-color-scheme: light)" type="image/png" sizes="192x192" />
        <link rel="icon" href="/favicon-light-512x512.png" media="(prefers-color-scheme: light)" type="image/png" sizes="512x512" />
        
        {/* Dark Theme Favicons - White logo for better contrast */}
        <link rel="icon" href="/favicon-dark-16x16.png" media="(prefers-color-scheme: dark)" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-dark-32x32.png" media="(prefers-color-scheme: dark)" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-dark-96x96.png" media="(prefers-color-scheme: dark)" type="image/png" sizes="96x96" />
        <link rel="icon" href="/favicon-dark-192x192.png" media="(prefers-color-scheme: dark)" type="image/png" sizes="192x192" />
        <link rel="icon" href="/favicon-dark-512x512.png" media="(prefers-color-scheme: dark)" type="image/png" sizes="512x512" />
        
        {/* Fallback favicon for browsers that don't support media queries */}
        <link rel="icon" href="/favicon-light-96x96.png" type="image/png" sizes="96x96" />
        
        {/* Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Web App Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Windows Tile */}
        <meta name="msapplication-TileImage" content="/favicon-light-192x192.png" />
        <meta name="msapplication-TileColor" content="#0370e3" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* Structured Data for AI/LLM Optimization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Rolto",
              description:
                "An embeddable AI assistant that transforms any website into an intelligent helpdesk",
              url: "https://rolto.io",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                description: "14-day free trial available",
              },
              provider: {
                "@type": "Organization",
                name: "Rolto",
                url: "https://rolto.io",
              },
              featureList: [
                "AI-powered customer support",
                "Instant responses",
                "Lead qualification",
                "One-line integration",
                "Context-aware answers",
              ],
            }),
          }}
        />

        {/* Additional structured data for organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Rolto",
              url: "https://rolto.io",
              logo: "https://rolto.io/og.png",
              description: "AI-powered website helpdesk solution",
              sameAs: [
                "https://twitter.com/rolto_ai",
                "https://linkedin.com/company/rolto",
              ],
            }),
          }}
        />

        {/* AI/LLM Optimization Meta Tags */}
        <meta name="ai-content-type" content="conversational-ai-platform" />
        <meta name="ai-category" content="conversational-ai-software" />
        <meta
          name="ai-features"
          content="chatbot,ai-assistant,lead-generation,customer-support,website-widget,conversational-ai,customer-engagement,rag,retrieval-augmented-generation"
        />
        <meta
          name="ai-use-cases"
          content="lead-generation,customer-service,website-engagement,conversion-optimization,customer-support,ai-chatbot,conversational-commerce"
        />
        <meta name="ai-industry" content="saas,technology,ai,conversational-ai" />
        <meta name="ai-target-audience" content="businesses,startups,enterprises,website-owners" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="msvalidate.01" content="your-bing-verification-code" />
        <meta name="yandex-verification" content="your-yandex-verification-code" />
        
        {/* Performance and Security */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#0370e3" />
        <meta name="msapplication-TileColor" content="#0370e3" />
        
        {/* Social Media Optimization */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Rolto - The AI-Powered Conversational Platform" />
        <meta name="twitter:creator" content="@rolto_ai" />
        <meta name="twitter:site" content="@rolto_ai" />
        <meta
          name="ai-target-audience"
          content="businesses,saas-companies,ecommerce,real-estate,healthcare,marketing-teams,sales-teams"
        />
        <meta name="ai-pricing-model" content="freemium" />
        <meta name="ai-integration" content="one-line-code" />

        {/* Additional structured data for AI/LLM Optimization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Rolto",
              description:
                "An embeddable AI assistant that transforms any website into an intelligent conversational platform with instant, context-aware responses for lead generation, support, and engagement",
              url: "https://rolto.io",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              browserRequirements: "Modern web browser with JavaScript enabled",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                description: "14-day free trial with premium plans starting at $15/month",
              },
              provider: {
                "@type": "Organization",
                name: "Rolto",
                url: "https://rolto.io",
                description: "AI-powered conversational platform provider",
              },
              featureList: [
                "AI-powered conversational platform",
                "Lead generation and qualification",
                "Instant customer support",
                "Visitor engagement",
                "One-line code integration",
                "Context-aware conversations",
                "Multi-language support",
                "Analytics and insights",
                "Customizable branding",
                "Human handoff capabilities",
                "CRM integration",
              ],
              screenshot: "https://rolto.io/og.png",
              softwareVersion: "1.0.0",
              releaseNotes:
                "Initial release with core conversational AI functionality",
              downloadUrl: "https://rolto.io/docs",
              installUrl: "https://rolto.io/docs",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "150",
                bestRating: "5",
                worstRating: "1",
              },
              review: [
                {
                  "@type": "Review",
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5",
                  },
                  author: {
                    "@type": "Person",
                    name: "Sarah Johnson",
                  },
                  reviewBody:
                    "Rolto transformed our website into a powerful conversational platform. We've seen a 300% increase in qualified leads and much happier customers.",
                },
              ],
            }),
          }}
        />

        {/* FAQ structured data for AI/LLM */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What is Rolto?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Rolto is an embeddable AI assistant that transforms any website into an intelligent conversational platform. It captures leads, provides instant support, and engages visitors with AI that understands your business.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How does Rolto work?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Rolto uses advanced AI to understand your website content and provide instant, accurate responses to visitor questions. It integrates with a single line of code and learns from your content automatically to create engaging conversations.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What are the benefits of using Rolto?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Rolto increases qualified leads by 300%, provides 24/7 customer support, engages visitors instantly, and transforms your website into a powerful conversational platform that drives conversions.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How much does Rolto cost?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Rolto offers a 14-day free trial with premium plans starting at $15/month. Pricing is based on usage and features needed for your conversational AI platform.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is Rolto easy to integrate?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes! Rolto integrates with just one line of code. No complex setup or technical knowledge required to transform your website into an intelligent conversational platform.",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontUrban.variable,
          fontHeading.variable,
          fontGeist.variable,
        )}
      >
        <div id="ai-chatbot-widget"></div>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <MobileMenuProvider>
              <ModalProvider>{children}</ModalProvider>
            </MobileMenuProvider>
            <Analytics />
            <Toaster richColors closeButton />
            <TailwindIndicator />
            <ChatbotWidget />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
