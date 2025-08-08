import fs from "fs";
import path from "path";
import type { GetStaticPaths, GetStaticProps } from "next";
import { ServiceSlug, ServiceSlugProps } from "@/components";

const TEMPLATES_DIR = path.join(
  process.cwd(),
  "data/services/service-templates"
);

function readServiceJson(
  filePath: string,
  cityLower: string,
  cityUpper: string
) {
  const fileContents = fs
    .readFileSync(filePath, "utf-8")
    .replace(/{{city_lower}}/g, cityLower)
    .replace(/{{city_upper}}/g, cityUpper);
  return JSON.parse(fileContents);
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(TEMPLATES_DIR);
  const paths = files
    .filter((f) => f.endsWith(".json"))
    .map((file) => ({ params: { slug: file.replace(".json", "") } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = String(params?.slug || "");
  const filePath = path.join(TEMPLATES_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return { notFound: true };

  const cityLower = "the-villages";
  const cityUpper = "The Villages";

  // current page
  const service = readServiceJson(filePath, cityLower, cityUpper);

  // related from the same templates folder
  const files = fs
    .readdirSync(TEMPLATES_DIR)
    .filter((f) => f.endsWith(".json"));
  const related = files
    .map((f) => f.replace(".json", ""))
    .filter((s) => s !== slug)
    .slice(0, 3)
    .map((s) => {
      const p = path.join(TEMPLATES_DIR, `${s}.json`);
      const svc = readServiceJson(p, cityLower, cityUpper);
      return { label: svc.title as string, slug: s };
    });

  return { props: { service, related } };
};

type PageProps = ServiceSlugProps & {
  related?: { label: string; slug: string }[];
};

export default function TheVillagesServicePage({
  service,
  related,
}: PageProps) {
  return (
    <ServiceSlug
      service={service}
      citySlug="the-villages"
      related={related}
      isRemote={false}
    />
  );
}
