import Link from "next/link";
import Head from "next/head";
import companyInfo from "../../data/company-info.json";
import { PageContainer } from "@/components";
const { name, tagline, description, services_cta } = companyInfo;
function CallToActionButtons() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-evenly gap-4 mt-6 w-auto p-3 font-semibold text-sm md:text-xl break-keep">
      {services_cta.buttons.map((button, index) => {
        const btnClasses =
          "border border-black bg-blue-400 text-white dark:border-none dark:bg-gray-100 dark:text-black px-6 py-4 rounded-md hover:bg-blue-500 hover:border-blue-700 hover:dark:bg-slate-700 hover:text-gray-100 glow-hover";
        const viewServicesClasses =
          "border border-black dark:border-gray-200 text-black dark:text-white px-6 py-4 rounded-md hover:bg-blue-500 hover:text-white hover:dark:bg-sky-500/60  hover:border-blue-700 hover:dark:border-sky-600 glow-hover";
        return (
          <Link
            key={index}
            href={button.link}
            className={
              button.text === "View Services" ? viewServicesClasses : btnClasses
            }
          >
            {button.text}
          </Link>
        );
      })}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Defend I.T. Solutions | Cybersecurity & IT Support in Ocala & The
          Villages
        </title>
        <meta
          name="description"
          content="Defend I.T. Solutions provides local, on-site tech support and cybersecurity services for retirees, homeowners, and small businesses in Ocala, The Villages, and Central Florida."
        />
        <meta
          name="keywords"
          content="Cybersecurity, IT support, Ocala tech help, The Villages Florida, senior tech, network security, smart home protection"
        />
        <meta
          property="og:title"
          content="Defend I.T. Solutions | Cybersecurity & IT Support"
        />
        <meta
          property="og:description"
          content="Local cybersecurity and tech support. On-site help for homes and businesses in Central Florida."
        />
        <meta property="og:url" content="https://www.wedefendit.com" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.wedefendit.com/og-image.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Defend I.T. Solutions" />
        <meta
          name="twitter:description"
          content="Trusted, local cybersecurity and tech support in Ocala and The Villages."
        />
        <meta
          name="twitter:image"
          content="https://www.wedefendit.com/og-image.png"
        />

        <link rel="canonical" href="https://www.wedefendit.com/" />
        <meta
          name="keywords"
          content="Defend I.T. Solutions, cybersecurity Ocala, IT support The Villages, local tech services, privacy-focused IT, on-site tech help, small business cybersecurity"
        />
      </Head>
      <PageContainer>
        <h1 className="text-4xl md:text-5xl font-bold text-center">{name}</h1>
        <p className="mt-2 text-lg md:text-xl text-center">{tagline}</p>
        <p className="mt-2 text-base md:text-lg text-gray-800 dark:text-gray-300 text-center">
          {description}
        </p>

        <section className="relative z-10 flex flex-col items-center justify-center w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            {services_cta.headline}
          </h2>
          <CallToActionButtons />
        </section>
      </PageContainer>
    </>
  );
}
