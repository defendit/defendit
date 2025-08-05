import belleview from "@/data/services/belleview/data.json";
import { ServicePage } from "@/components";

export default function BelleviewServicesPage() {
  return (
    <ServicePage
      meta={{
        title: "Tech Services in Belleview, FL | Defend I.T. Solutions",
        description:
          "Cybersecurity and I.T. support for residents and businesses in Belleview, Florida.",
        url: "https://www.wedefendit.com/services/belleview",
        image: "https://www.wedefendit.com/og-image.png",
        keywords:
          "IT support Belleview, cybersecurity Belleview, tech help Belleview, home networking Belleview, small business IT Belleview, computer repair Belleview, local tech services Belleview",
      }}
      h1="Services in Belleview"
      services={belleview.services}
      city="belleview"
    />
  );
}
