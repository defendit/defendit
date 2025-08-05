import { GetStaticPaths, GetStaticProps } from "next";
import { PageContainer, Meta } from "@/components";
import remoteData from "@/data/services/remote/data.json";
import * as Icons from "lucide-react";

type Service = {
  id: string;
  title: string;
  headline: string;
  icons: string[];
  summary: string;
  cta: string;
};

type Props = {
  service: Service;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = remoteData.services.map((service) => ({
    params: { slug: service.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const service = remoteData.services.find((s) => s.id === slug);

  if (!service) {
    return { notFound: true };
  }

  return {
    props: {
      service,
    },
  };
};

export default function RemoteServicePage({ service }: Props) {
  return (
    <>
      <Meta
        title={`${service.title} | Remote Tech Support | Defend I.T.`}
        description={service.summary}
        url={`https://www.wedefendit.com/services/remote/${service.id}`}
        image="https://www.wedefendit.com/og-image.png"
        keywords={`${service.title}, remote cybersecurity, online tech help`}
      />
      <PageContainer>
        <div className="max-w-4xl mx-auto py-10 space-y-6">
          <h1 className="text-4xl font-bold">{service.title}</h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {service.headline}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {service.icons.map((iconName, idx) => {
              // eslint-disable-next-line
              const Icon = (Icons as any)[
                iconName
                  .split("-")
                  .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
                  .join("")
              ];
              return Icon ? (
                <Icon
                  key={idx}
                  className="w-6 h-6 text-blue-500 dark:text-sky-400"
                />
              ) : null;
            })}
          </div>

          <p className="text-gray-700 dark:text-gray-400 text-base mt-4">
            {service.summary}
          </p>
        </div>
      </PageContainer>
    </>
  );
}
