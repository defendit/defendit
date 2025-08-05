import ocala from "@/data/services/ocala/data.json";
import { ServicePage } from "@/components";

export default function OcalaServicesPage() {
  return (
    <ServicePage
      meta={{
        title: "Tech Services in Ocala, FL | Defend I.T. Solutions",
        description:
          "Cybersecurity and I.T. support for residents and businesses in Ocala, Florida.",
        url: "https://www.wedefendit.com/services/ocala",
        image: "https://www.wedefendit.com/og-image.png",
        keywords:
          "IT support Ocala, cybersecurity Ocala, tech help Ocala, home networking Ocala, small business IT Ocala, computer repair Ocala, local tech services Ocala",
      }}
      h1="Services in Ocala"
      services={ocala.services}
      city="ocala"
    />
  );
}
