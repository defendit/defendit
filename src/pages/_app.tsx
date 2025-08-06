import { Layout } from "@/components";
import { LocationProvider } from "@/providers/location";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LocationProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LocationProvider>
  );
}
