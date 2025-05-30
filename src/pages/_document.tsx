import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html
      lang="en"
      className=" bg-gray-100 dark:bg-gray-900 text-black dark:text-gray-300 w-screen min-h-screen overflow-x-hidden overflow-y-auto "
    >
      <Head>
        <link rel="shortcut icon" href="favicon.svg" type="image/svg" />
        {/* BASIC META */}
        <meta
          name="description"
          content="On-site cybersecurity and tech support for The Villages and Ocala. Defend your data with trusted local experts."
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Defend I.T. Solutions LLC" />
        <meta name="theme-color" content="#0f1117" />

        {/* OPEN GRAPH (for Facebook, LinkedIn, etc.) */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.wedefendit.com/" />
        <meta property="og:title" content="Defend I.T. Solutions™" />
        <meta
          property="og:description"
          content="Cybersecurity & IT services delivered on-site to homes and businesses in The Villages and Ocala, FL."
        />
        <meta
          property="og:image"
          content="https://www.wedefendit.com/og-image.png"
        />

        {/* TWITTER CARD */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Defend I.T. Solutions™" />
        <meta
          name="twitter:description"
          content="Local Cybersecurity and IT Services in The Villages & Ocala, FL"
        />
        <meta
          name="twitter:image"
          content="https://www.wedefendit.com/og-image.png"
        />
      </Head>
      <body className="antialiased w-full h-ful">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
