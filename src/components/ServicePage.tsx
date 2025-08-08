import Link from "next/link";
import {
  Meta,
  BookOnline,
  ServiceCard,
  PageContainer,
  RemoteServicesCTA,
  TrustStrip,
} from "@/components";

export type Service = {
  id: string;
  title: string;
  headline: string;
  icons: string[];
  summary: string;
  cta: string;
};

type MetaProps = {
  url: string;
  image: string;
  title: string;
  keywords: string;
  description: string;
};

export type ServicesPageProps = {
  h1: string;
  city: string; // "", "ocala", "the-villages", "belleview", "remote"
  meta: MetaProps;
  services: Service[];
};

export default function ServicePage(props: ServicesPageProps) {
  const { meta, h1, services, city } = props;
  const isRemote = city === "remote";

  // Display name for the city
  const cityName =
    city === "the-villages"
      ? "The Villages"
      : city
      ? city.charAt(0).toUpperCase() + city.slice(1)
      : "";

  // Build breadcrumb JSON-LD
  const breadcrumbList = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.wedefendit.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: "https://www.wedefendit.com/services",
    },
  ];

  if (city && !isRemote) {
    breadcrumbList.push({
      "@type": "ListItem",
      position: 3,
      name: cityName,
      item: `https://www.wedefendit.com/services/${city}`,
    });
  } else if (isRemote) {
    breadcrumbList.push({
      "@type": "ListItem",
      position: 3,
      name: "Remote",
      item: "https://www.wedefendit.com/services/remote",
    });
  }

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbList,
  };

  return (
    <>
      <Meta
        url={meta.url}
        image={meta.image}
        title={meta.title}
        keywords={meta.keywords}
        description={meta.description}
      />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageContainer>
        <div className="max-w-6xl mx-auto px-4 py-10 space-y-10 bg-gray-50/10 dark:bg-slate-950/20 z-0">
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
              <li>
                <Link href="/services" className="hover:underline">
                  Services
                </Link>
              </li>
              {city && (
                <>
                  <li aria-hidden="true" className="px-1 sm:px-2">
                    ›
                  </li>
                  <li className="text-gray-400 dark:text-gray-500 truncate">
                    <span aria-current="page">
                      {isRemote ? "Remote" : cityName}
                    </span>
                  </li>
                </>
              )}
            </ol>
          </nav>

          {/* Header */}
          <header className="text-center">
            <h1 className="text-4xl font-bold">{h1}</h1>
            <TrustStrip />
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {isRemote ? (
                "Remote cybersecurity and I.T. support for homeowners, retirees, and small businesses in Central Florida."
              ) : (
                <>
                  Learn more about our local, in person cybersecurity and I.T.
                  support
                  {cityName.trim() !== "" ? ` for ${cityName}, FL.` : "."}
                </>
              )}
            </p>
          </header>

          {/* Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service: Service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>

          <RemoteServicesCTA isRemote={isRemote} />
          <BookOnline />
        </div>
      </PageContainer>
    </>
  );
}

export { ServicePage };
