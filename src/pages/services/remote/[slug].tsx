import fs from "fs";
import path from "path";
import { GetStaticPaths, GetStaticProps } from "next";
import { ServiceSlug, ServiceSlugProgs } from "@/components";

export const getStaticPaths: GetStaticPaths = async () => {
  const dirPath = path.join(process.cwd(), "data/services/remote/services");
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
    "data/services/remote/services",
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

export default function VillagesServicePage({ service }: ServiceSlugProgs) {
  return <ServiceSlug service={service} isRemote />;
}
