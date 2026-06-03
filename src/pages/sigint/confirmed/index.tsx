import { Check, Globe, ArrowRight, Mail, Users, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Meta, PageContainer } from "@/components";

const DEMO_URL = "https://sigint-5154d935429b.herokuapp.com";

const tierConfig = {
  individual: {
    heading: "You\u2019re on the list.",
    body: "Your email has been confirmed for the Individual plan. We\u2019ll reach out when early access is ready.",
    sub: "In the meantime, check out the live demo or head back to the SIGINT page.",
    icon: Check,
    iconColor: "text-sky-400",
    ringColor: "border-sky-500/30",
    bgColor: "bg-sky-500/10",
    cta: { href: "/sigint", label: "Back to SIGINT", icon: ArrowRight },
  },
  team: {
    heading: "Your team is on the list.",
    body: "Your email has been confirmed for the Team plan. We\u2019ll notify you when shared workspaces and team features are ready for early access.",
    sub: "In the meantime, check out the live demo or head back to the SIGINT page.",
    icon: Users,
    iconColor: "text-violet-400",
    ringColor: "border-violet-500/30",
    bgColor: "bg-violet-500/10",
    cta: { href: "/sigint", label: "Back to SIGINT", icon: ArrowRight },
  },
  enterprise: {
    heading: "You\u2019re on the list.",
    body: "Your enterprise inquiry has been confirmed. A member of our team will be in touch to discuss your requirements.",
    sub: "Need to get in touch sooner? Reach out directly or check out the live demo.",
    icon: Shield,
    iconColor: "text-amber-400",
    ringColor: "border-amber-500/30",
    bgColor: "bg-amber-500/10",
    cta: { href: "/contact", label: "Contact Us", icon: Mail },
  },
} as const;

type Tier = keyof typeof tierConfig;

export default function ConfirmedPage() {
  const { query } = useRouter();
  const tier: Tier =
    query.tier === "team"
      ? "team"
      : query.tier === "enterprise"
        ? "enterprise"
        : "individual";
  const config = tierConfig[tier];
  const TierIcon = config.icon;
  const CtaIcon = config.cta.icon;

  return (
    <>
      <Meta
        title="You're Confirmed | SIGINT Dashboard\u2122"
        description="Your SIGINT Dashboard waiting list signup has been confirmed."
        url="https://www.wedefendit.com/sigint/confirmed"
        canonical="https://www.wedefendit.com/sigint/confirmed"
        noindex
      />

      <PageContainer>
        <div className="w-full max-w-2xl mx-auto px-4 py-16 sm:py-20 text-center">
          <div
            className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full ${config.bgColor} border ${config.ringColor} mb-6`}
          >
            <TierIcon className={`w-7 h-7 sm:w-8 sm:h-8 ${config.iconColor}`} />
          </div>

          <h1 className="text-h2 tracking-h2 font-semibold text-ink mb-4">
            {config.heading}
          </h1>

          <p className="text-lead text-ink-muted mb-3 leading-relaxed">
            {config.body}
          </p>

          <p className="text-xs sm:text-sm text-ink-dim mb-8 sm:mb-10">
            {config.sub}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ touchAction: "manipulation" }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-lg border border-success/40 hover:border-success bg-success/10 hover:bg-success/20 text-ink text-base sm:text-lg font-medium transition-all touch-manipulation"
            >
              <Globe className="w-5 h-5" />
              Try Live Demo
            </a>
            <Link
              href={config.cta.href}
              style={{ touchAction: "manipulation" }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-accent hover:text-accent-hover text-base sm:text-lg font-medium transition-colors touch-manipulation"
            >
              {config.cta.label}
              <CtaIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
