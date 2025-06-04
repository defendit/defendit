import Link from "next/link";
import { Meta, PageContainer } from "@/components";
import companyInfo from "../../data/company-info.json";
import { ShieldCheck, Network, Laptop2, UserCheck } from "lucide-react";

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
      <Meta
        title="Defend I.T. Solutions | Cybersecurity & IT Support in Ocala, Belleview, & The Villages"
        description="Defend I.T. Solutions provides local, on-site tech support and cybersecurity services for retirees, homeowners, and small businesses in Ocala, Belleview, The Villages, and Central Florida."
        image="https://www.wedefendit.com/og-image.png"
        url="https://www.wedefendit.com/"
      />
      <PageContainer>
        <h1 className="text-4xl md:text-5xl font-bold text-center">{name}</h1>
        <p className="-mt-6 text-lg md:text-xl text-center">{tagline}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          <div className="flex flex-col items-center text-center max-w-[160px]">
            <ShieldCheck className="h-10 w-10 text-blue-400 dark:text-blue-300 mb-2" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Cybersecurity
            </p>
          </div>
          <div className="flex flex-col items-center text-center max-w-[160px]">
            <Network className="h-10 w-10 text-blue-400 dark:text-blue-300 mb-2" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Network Support
            </p>
          </div>
          <div className="flex flex-col items-center text-center max-w-[160px]">
            <Laptop2 className="h-10 w-10 text-blue-400 dark:text-blue-300 mb-2" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              On-Site Tech Support
            </p>
          </div>
          <div className="flex flex-col items-center text-center max-w-[160px]">
            <UserCheck className="h-10 w-10 text-blue-400 dark:text-blue-300 mb-2" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Personalized Service
            </p>
          </div>
        </div>

        <p className="text-base -mt-2 md:text-lg text-gray-800 dark:text-gray-300 text-center w-full max-w-2xl mx-auto">
          {description}
        </p>

        <section className="relative z-10 flex flex-col items-center justify-center w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            {services_cta.headline}
          </h2>

          <CallToActionButtons />
          <p className="text-center text-base md:text-lg max-w-3xl text-gray-700 dark:text-gray-300 mt-4">
            Based in Ocala and proudly serving The Villages, we bring
            enterprise-grade protection to everyday users. Our service is
            personal. Our pricing is transparent. Our goal is to keep your
            digital life secure without the runaround.
          </p>
        </section>
      </PageContainer>
    </>
  );
}
