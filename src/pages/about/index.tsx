import Head from "next/head";
import { PageContainer } from "@/components";
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
      "No call centers or bots. Just real humans, helping real people — in person.",
    icon: MapPin,
  },
  {
    title: "Clear, Honest Support",
    description:
      "No tech-speak walls. We explain things in plain English and only recommend what you actually need.",
    icon: MessageCircle,
  },
];

type ValueItemProps = {
  title: string;
  description: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

function ValueItem({ title, description, Icon }: ValueItemProps) {
  return (
    <article className="flex flex-col items-start justify-center gap-4">
      <header className="flex flex-wrap flex-row items-center justify-start gap-4 w-full ">
        <Icon className="w-7 h-7 md:w-10 md:h-10 text-blue-500 dark:text-sky-400" />
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mt-1 -ml-2">
          {title}
        </h3>
      </header>
      <p className="text-gray-700 dark:text-gray-400 -mt-3 pl-9 md:pl-12">
        {description}
      </p>
    </article>
  );
}

function RenderValues() {
  return (
    <div className="space-y-6 pl-2">
      {valueData.map((item, index) => (
        <ValueItem
          key={index}
          title={item.title}
          description={item.description}
          Icon={item.icon}
        />
      ))}
    </div>
  );
}

export default function About() {
  return (
    <>
      <Head>
        <title>
          About Defend I.T. Solutions | Cybersecurity & Tech Support in Ocala
        </title>
        <meta
          name="description"
          content="Learn more about Defend I.T. Solutions — a local, privacy-focused cybersecurity and IT support firm serving The Villages, Ocala, and surrounding areas."
        />
        <meta property="og:title" content="About Defend I.T. Solutions" />
        <meta
          property="og:description"
          content="Meet your local cybersecurity expert. Defend I.T. offers honest, on-site support for homes and businesses in Central Florida."
        />
        <meta property="og:url" content="https://www.wedefendit.com/about" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.wedefendit.com/og-image.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Defend I.T. Solutions" />
        <meta
          name="twitter:description"
          content="Cybersecurity with a human touch — based in Ocala, serving The Villages and beyond."
        />
        <meta
          name="twitter:image"
          content="https://www.wedefendit.com/og-image.png"
        />

        <link rel="canonical" href="https://www.wedefendit.com/about" />
        <meta
          name="keywords"
          content="About Defend I.T. Solutions, cybersecurity Ocala, IT support The Villages, local tech services, privacy-focused IT, on-site tech help, small business cybersecurity"
        />
      </Head>
      <PageContainer>
        <div className="max-w-3xl space-y-10 justify-center items-center mx-auto p-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            About Us
          </h1>

          <p className="text-lg text-justify p-1">
            <strong>Defend I.T. Solutions</strong> is a locally owned and
            operated cybersecurity and technology consulting firm based in
            Ocala, FL. We specialize in providing
            <span className="font-semibold"> on-site IT services </span>
            for both residential users and small businesses that value
            convenience, security, and personalized support.
          </p>

          <p className="text-lg -mt-6">
            We believe technology should empower — not overwhelm — and
            we&apos;re here to help you make sense of it all, safely and
            confidently.
          </p>

          <div className="flex flex-col items-start justify-center ">
            <h2 className="text-2xl md:txt-3xl font-semibold mb-4">
              What We Stand For
            </h2>
            <RenderValues />
          </div>

          <div>
            <h2 className="text-2xl md:txt-3xl font-semibold mb-2">
              Why We&apos;re Different
            </h2>
            <p className="text-lg">
              From securing smart homes to upgrading Wi-Fi and protecting
              business networks, we focus on practical, real-world solutions
              that make technology feel safe and simple. Whether you&apos;re a
              homeowner or a local business, we&apos;re here to help.
            </p>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
