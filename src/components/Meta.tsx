// components/Meta.tsx
import Head from "next/head";

interface MetaProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string;
}

export const Meta = ({
  title = "Defend I.T. Solutions™",
  description = "Cybersecurity & I.T. Services in The Villages and Ocala",
  image = "https://www.wedefendit.com/og-image.png",
  url = "https://www.wedefendit.com/",
  keywords = "cybersecurity, IT support, Ocala, The Villages, Belleview, small business IT, home tech support, network security, computer repair, tech services, elderly scams, online safety",
}: MetaProps) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="robots" content="index, follow" />
    <meta name="author" content="Defend I.T. Solutions LLC" />

    {/* Open Graph */}
    <meta property="og:type" content="website" />
    <meta property="og:url" content={url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />

    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />

    {/* Keywords */}
    <meta name="keywords" content={keywords} />
  </Head>
);
