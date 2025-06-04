// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html
      lang="en"
      className="bg-gray-100 dark:bg-gray-900 text-black dark:text-gray-300 w-screen min-h-screen overflow-x-hidden overflow-y-auto"
    >
      <Head>
        <link rel="shortcut icon" href="/favicon.svg" type="image/svg" />
        <meta name="theme-color" content="#0f1117" />
      </Head>
      <body className="antialiased w-full h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
