import { GetServerSideProps } from "next";

const Sitemap = () => null;

// Local cities share these slugs
const localCities = ["ocala", "belleview", "the-villages"];
const localSlugs = [
  "computer-repair",
  "custom-solutions",
  "data-recovery",
  "home-network-security",
  "network-setup",
  "onsite-tech-support",
  "password-management",
  "pc-upgrades",
  "scam-protection",
  "smart-home-setup",
  "software-troubleshooting",
  "virus-removal",
];

// Remote has its own slugs
const remoteCity = "remote";
const remoteSlugs = [
  "remote-privacy-hardening",
  "remote-security-assessment",
  "remote-support",
  "remote-tech-tutoring",
  "remote-training",
  "remote-virus-removal",
  "remote-support-plan",
];

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = "https://www.wedefendit.com";
  const now = new Date().toISOString();

  // Static pages with priorities
  const staticPages = [
    { path: "", priority: "1.00" },
    { path: "awareness", priority: "0.90" },
    { path: "services", priority: "0.85" },
    { path: "contact", priority: "0.80" },
    { path: "about", priority: "0.80" },
    { path: "terms", priority: "0.50" },
    { path: "privacy", priority: "0.50" },
    { path: "thank-you", priority: "0.40" },
  ];

  const toUrlTag = (loc: string, priority = "0.70") =>
    `
    <url>
      <loc>${loc}</loc>
      <lastmod>${now}</lastmod>
      <priority>${priority}</priority>
    </url>`.trim();

  let urls = "";

  // Static pages
  for (const { path, priority } of staticPages) {
    urls += toUrlTag(`${baseUrl}/${path}`, priority);
  }

  // Local city index pages + slugs
  for (const city of localCities) {
    urls += toUrlTag(`${baseUrl}/services/${city}`, "0.80");
    for (const slug of localSlugs) {
      urls += toUrlTag(`${baseUrl}/services/${city}/${slug}`, "0.70");
    }
  }

  // Remote index + slugs
  urls += toUrlTag(`${baseUrl}/services/${remoteCity}`, "0.80");
  for (const slug of remoteSlugs) {
    urls += toUrlTag(`${baseUrl}/services/${remoteCity}/${slug}`, "0.70");
  }

  // Construct the final XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
  res.write(xml);
  res.end();

  return { props: {} };
};

export default Sitemap;
