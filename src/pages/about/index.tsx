import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { PageContainer, Meta, TrustStrip } from "@/components";
import { ShieldCheck, MapPin, MessageCircle } from "lucide-react";

const valueData = [
  {
    title: "Security First",
    description:
      "Your data and privacy are our top priority. We implement modern protections tailored to your environment.",
    icon: ShieldCheck,
  },
  {
    title: "Local & Personal",
    description:
      "No call centers or bots. Just real humans helping real people, in person.",
    icon: MapPin,
  },
  {
    title: "Clear, Honest Support",
    description:
      "No tech-speak walls. We explain things in plain English and only recommend what you actually need.",
    icon: MessageCircle,
  },
] as const;

type ValueItemProps = {
  title: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

function ValueItem({ title, description, Icon }: ValueItemProps) {
  return (
    <article className="flex flex-col items-start justify-center gap-4">
      <header className="flex flex-wrap items-center gap-4 w-full">
        <Icon
          className="w-7 h-7 md:w-10 md:h-10 text-blue-500 dark:text-sky-400"
          aria-hidden="true"
        />
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
          {title}
        </h3>
      </header>
      <p className="text-gray-700 dark:text-gray-400 pl-9 md:pl-12">
        {description}
      </p>
    </article>
  );
}

function RenderValues() {
  return (
    <ul className="space-y-6 pl-2">
      {valueData.map((item) => (
        <li key={item.title}>
          <ValueItem
            title={item.title}
            description={item.description}
            Icon={item.icon}
          />
        </li>
      ))}
    </ul>
  );
}

export default function About() {
  return (
    <>
      <Meta
        title="About Defend I.T. Solutions | Cybersecurity & Tech Support in the Villages, FL"
        description="Learn more about Defend I.T. Solutions, a local, privacy-focused cybersecurity and IT support company serving The Villages, Ocala, and surrounding areas."
        image="https://www.wedefendit.com/og-image.png"
        url="https://www.wedefendit.com/about"
        keywords="About Defend I.T. Solutions, cybersecurity Ocala, IT support The Villages, local tech services, privacy-focused IT, on-site tech help, small business cybersecurity"
      />

      <PageContainer>
        <div className="max-w-3xl mx-auto p-4 space-y-10 rounded shadow-lg bg-gray-50/10 dark:bg-slate-950/20 z-0">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 overflow-x-auto whitespace-nowrap"
          >
            <ol className="flex items-center gap-1 sm:gap-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="px-1 sm:px-2">
                ›
              </li>
              <li className="text-gray-400 dark:text-gray-500 truncate">
                <span aria-current="page">About</span>
              </li>
            </ol>
          </nav>

          <header className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold">About Us</h1>
            <TrustStrip />
          </header>

          <section aria-labelledby="who-we-are">
            <h2 id="who-we-are" className="sr-only">
              Who we are
            </h2>
            <p className="text-lg">
              <strong>Defend I.T. Solutions</strong> is a locally owned
              cybersecurity and tech support company based in Ocala, Florida. We
              serve Ocala, Belleview, The Villages, and surrounding Central
              Florida communities. Our mission is to bring expert, in person
              I.T. support directly to your home or business. No call centers.
              No vague tech talk.
            </p>

            <p className="text-lg mt-6">
              We believe technology should work for you, not against you.
              Whether you need a safer network, protection from scams, or help
              cleaning up a slow device, we deliver clear solutions in plain
              English. No upsells. No scare tactics. Just honest, reliable help
              from people who care about privacy and security.
            </p>
          </section>

          <section aria-labelledby="core-values">
            <h2
              id="core-values"
              className="text-2xl md:text-3xl font-semibold mb-4"
            >
              Our Core Values
            </h2>
            <RenderValues />
          </section>

          <section aria-labelledby="why-different">
            <h2
              id="why-different"
              className="text-2xl md:text-3xl font-semibold mb-2"
            >
              Why We&apos;re Different
            </h2>
            <p className="text-lg mt-4">
              Whether it&apos;s securing your smart home, installing a safer
              network, or cleaning up malware, we offer solutions that actually
              fix problems. No corporate bloat. No vague tech talk. Just
              reliable help from someone local, experienced, and easy to talk
              to.
            </p>
          </section>
        </div>
      </PageContainer>
    </>
  );
}
