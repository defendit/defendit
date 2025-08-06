import { PageContainer, Meta } from "@/components";

export type ServiceContent = {
  id: string;
  title: string;
  headline: string;
  description: string;
  keywords: string[];
  url: string;
  image: string;
  sections: {
    heading: string;
    paragraph?: string;
    items?: string[];
  }[];
  cta: {
    label: string;
    link: string;
  };
};

export type ServiceSlugProgs = {
  service: ServiceContent;
};

export default function ServiceSlug({ service }: ServiceSlugProgs) {
  const [first, ...rest] = service.sections;

  return (
    <>
      <Meta
        title={service.title}
        description={service.description}
        url={`https://www.wedefendit.com${service.url}`}
        image={service.image}
        keywords={service.keywords.join(", ")}
      />
      <PageContainer>
        <div className="max-w-4xl mx-auto py-10 space-y-6 px-4 sm:px-6 lg:px-0 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold ">{service.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-lg">
            {service.headline}
          </p>

          {/* Highlight "Did You Know?" section if present */}
          {first?.heading.toLowerCase().includes("did you know") && (
            <div className="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 p-4 rounded shadow-sm">
              <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-200 ">
                {first.heading}
              </h2>
              {Array.isArray(first.paragraph)
                ? first.paragraph.map((text, idx) => (
                    <p
                      key={idx}
                      className="mt-2 text-yellow-700 dark:text-yellow-100 text-left text-sm sm:text-base"
                    >
                      {text}
                    </p>
                  ))
                : first.paragraph && (
                    <p className="mt-2 text-yellow-700 dark:text-yellow-100 text-left text-sm sm:text-base">
                      {first.paragraph}
                    </p>
                  )}
            </div>
          )}

          {/* Render remaining sections */}
          {(first?.heading.toLowerCase().includes("did you know")
            ? rest
            : service.sections
          ).map((section, idx) => (
            <div key={idx} className="mt-6 space-y-2">
              <h2 className="text-2xl font-semibold">{section.heading}</h2>
              {section.paragraph && (
                <p className=" text-gray-700 dark:text-gray-400 text-left  text-sm sm:text-base">
                  {section.paragraph}
                </p>
              )}
              {section.items && (
                <ul className="list-disc pl-5 sm:pl-6 text-gray-700 dark:text-gray-400 text-left text-sm sm:text-base space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className="mt-8 text-center">
            <a
              href={service.cta.link}
              className="inline-block bg-blue-600 dark:bg-sky-600 text-white px-6 py-3 rounded hover:bg-green-600 dark:hover:bg-emerald-600 transition shadow-sm shadow-black"
            >
              {service.cta.label}
            </a>
          </div>
        </div>
      </PageContainer>
    </>
  );
}

export { ServiceSlug };
