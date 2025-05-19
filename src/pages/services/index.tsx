import * as Icons from "lucide-react";
import { PageContainer } from "@/components";
import companyInfo from "../../../data/company-info.json";

// type Service = {
//   title: string;
//   description: string;
//   tags: string[];
//   featured: boolean;
// };

type SectionProps = {
  title: string;
  services: Service[];
};

type Service = {
  title: string;
  description: string;
  tags: string[];
  featured: boolean;
  icons?: string[];
};

function ServiceCard({ title, description, icons }: Service) {
  return (
    <div className="p-6 bg-white flex flex-col justify-start items-start dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-sm hover:shadow-md transition space-y-3">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <div className="flex flex-col h-full justify-between items-start">
        <div className="w-full -mt-1 mb-2 flex flex-row items-center gap-3 flex-wrap">
          {icons?.map((iconName, idx) => {
            const formattedName = iconName
              .split("-")
              .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
              .join("");
            // eslint-disable-next-line
            const LucideIcon = (Icons as any)[formattedName];
            console.log({ LucideIcon });
            return LucideIcon ? (
              <LucideIcon
                key={idx}
                className="w-5 h-5 md:w-6 md:h-6 text-blue-500 dark:text-sky-400"
              />
            ) : null;
          })}
        </div>
        <p className="mt-1 text-gray-700 dark:text-gray-400 text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}
function ServiceSection({ title, services }: SectionProps) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <ServiceCard key={i} {...s} />
        ))}
      </div>
    </section>
  );
}

export default function ServicesPage() {
  const { residential, business } = companyInfo.services;

  const featuredResidential = residential.filter((s) => s.featured);
  const remainingResidential = residential.filter((s) => !s.featured);

  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
        <header className="text-center">
          <h1 className="text-4xl font-bold mb-2">Our Services</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Local, in-person tech support and cybersecurity help for homeowners
            and businesses.
          </p>
        </header>

        <ServiceSection
          title="Popular Home Services"
          services={featuredResidential}
        />
        <ServiceSection
          title="All Home Services"
          services={remainingResidential}
        />

        <details className="mt-12">
          <summary className="cursor-pointer text-lg font-semibold text-blue-600 dark:text-sky-400 mb-4">
            Show Business Services
          </summary>
          <div className="mt-4">
            <ServiceSection title="Business Services" services={business} />
          </div>
        </details>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mt-8">
          Don&apos;t see exactly what you need? We offer a wide range of custom
          tech solutions tailored to your situation. Just reach out and
          we&apos;ll make it happen.
        </p>
      </div>
    </PageContainer>
  );
}
