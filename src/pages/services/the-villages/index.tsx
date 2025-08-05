import theVillages from "@/data/services/the-villages/data.json";
import { ServicePage } from "@/components";

export default function TheVillagesServicesPage() {
  return (
    <ServicePage
      meta={{
        title: "Tech Services in The Villages, FL | Defend I.T. Solutions",
        description:
          "Cybersecurity and I.T. support for residents and businesses in The Villages, Florida.",
        url: "https://www.wedefendit.com/services/the-villages",
        image: "https://www.wedefendit.com/og-image.png",
        keywords:
          "IT support The Villages, cybersecurity The Villages, tech help The Villages, home networking The Villages, small business IT The Villages, computer repair The Villages, local tech services The Villages",
      }}
      h1="Services in The Villages"
      services={theVillages.services}
      city="the-villages"
    />
  );
}
