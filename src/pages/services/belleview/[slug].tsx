import fs from "fs";
import path from "path";
import { GetStaticPaths, GetStaticProps } from "next";
import { PageContainer, Meta } from "@/components";

type ServiceContent = {
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

type Props = {
  service: ServiceContent;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const dirPath = path.join(process.cwd(), "data/services/belleview/services");
  const files = fs.readdirSync(dirPath);
  const paths = files.map((file) => {
    const slug = file.replace(".json", "");
    return { params: { slug } };
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const filePath = path.join(
    process.cwd(),
    "data/services/belleview/services",
    `${slug}.json`
  );

  if (!fs.existsSync(filePath)) {
    return { notFound: true };
  }

  const fileContents = fs.readFileSync(filePath, "utf-8");
  const service = JSON.parse(fileContents);

  return {
    props: { service },
  };
};

export default function BelleviewServicePage({ service }: Props) {
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
        <div className="max-w-4xl mx-auto py-10 space-y-6">
          <h1 className="text-4xl font-bold">{service.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {service.headline}
          </p>

          {/* Highlight "Did You Know?" section if present */}
          {first?.heading.toLowerCase().includes("did you know") && (
            <div className="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 p-4 rounded shadow-sm">
              <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-200">
                {first.heading}
              </h2>
              {first.paragraph && (
                <p className="mt-2 text-yellow-700 dark:text-yellow-100">
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
                <p className="text-base text-gray-700 dark:text-gray-400">
                  {section.paragraph}
                </p>
              )}
              {section.items && (
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-400">
                  {section.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className="mt-8">
            <a
              href={service.cta.link}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
            >
              {service.cta.label}
            </a>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
