import companyInfo from "@/data/services/lander.json";
import { Service, ServicePage } from "@/components";
import { useLocationRedirect } from "@/hooks/useLocationRedirect";

export default function ServicesPage() {
  useLocationRedirect(true); // auto-redirects if match found

  return (
    <ServicePage
      meta={{
        title: "Cybersecurity & Tech Support Services | Defend I.T. Solutions",
        description:
          "Explore in-person I.T. support, secure home networking, and business cybersecurity services for The Villages, Ocala, and Central Florida.",
        image: "https://www.wedefendit.com/og-image.png",
        url: "https://www.wedefendit.com/services",
        keywords:
          "IT support, cybersecurity, tech help, The Villages, Ocala, home networking, small business IT, computer repair, local tech services",
      }}
      h1="Our Services"
      services={companyInfo.services as Service[]}
      city=""
    />
  );
}
