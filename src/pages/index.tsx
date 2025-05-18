import Link from "next/link";
import companyInfo from "../../data/company-info.json";
const {
  name,
  tagline,
  description,
  services_cta,
} = companyInfo;
function CallToActionButtons() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-evenly gap-4 mt-6 w-auto p-3 font-semibold text-sm md:text-xl break-keep">
      {services_cta.buttons.map((button, index) => {
      const btnClasses =  "border border-black bg-blue-400 text-white dark:border-none dark:bg-gray-100 dark:text-black px-6 py-4 rounded-md hover:bg-blue-500 hover:border-blue-700 hover:dark:bg-slate-700 hover:text-gray-100   glow-hover";
      const viewServicesClasses = "border border-black dark:border-gray-200 text-black dark:text-white px-6 py-4 rounded-md hover:bg-blue-500 hover:text-white hover:dark:bg-slate-600/60  hover:border-blue-700 hover:dark:border-slate-100  glow-hover";
        return (
          <Link
            key={index}
            href={button.link}
            className={button.text === "View Services" ? viewServicesClasses : btnClasses} 
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
    <main
      className={`font-sans relative min-h-full w-full flex flex-col items-center justify-start p-4 gap-12`}
    >
      <section className="relative z-10 flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center">{name}</h1>
        <p className="mt-2 text-lg md:text-xl text-center">{tagline}</p>
        <p className="mt-2 text-base md:text-lg text-gray-800 dark:text-gray-300 text-center">
          {description}
        </p>
      </section>

      <section className="relative z-10 flex flex-col items-center justify-center w-full">
        <h2 className="text-2xl md:text-3xl font-bold text-center">{services_cta.headline}</h2>
        <CallToActionButtons />
      </section>
    </main>
  );
}
