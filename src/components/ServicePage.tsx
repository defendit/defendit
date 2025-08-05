import {
  Meta,
  BookOnline,
  ServiceCard,
  PageContainer,
  RemoteServicesCTA,
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
  city: string;
  meta: MetaProps;
  services: Service[];
};

export default function ServicePage(props: ServicesPageProps) {
  const { meta, h1, services, city } = props;
  const isRemote = city === "remote";
  // ensure the city is capitalized for display
  const cityName =
    city === "the-villages"
      ? "The Villages"
      : city.charAt(0).toUpperCase() + city.slice(1);
  return (
    <>
      <Meta
        url={meta.url}
        image={meta.image}
        title={meta.title}
        keywords={meta.keywords}
        description={meta.description}
      />
      <PageContainer>
        <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
          <header className="text-center">
            <h1 className="text-4xl font-bold">{h1}</h1>
            {
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                {cityName === "" ? (
                  "Local, in-person cybersecurity and I.T. support for homeowners, retirees, and small businesses in Central Florida."
                ) : (
                  <>
                    Learn more about our local, in-person cybersecurity and I.T.
                    support
                    {!isRemote && ` for ${cityName}, FL`}
                  </>
                )}
              </p>
            }
          </header>

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
