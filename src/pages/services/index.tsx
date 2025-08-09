/*
Copyright © 2025 Defend I.T. Solutions LLC. All Rights Reserved.

This software and its source code are the proprietary property of
Defend I.T. Solutions LLC and are protected by United States and
international copyright laws. Unauthorized reproduction, distribution,
modification, display, or use of this software, in whole or in part, without the
prior written permission of Defend I.T. Solutions LLC, is strictly prohibited.

This software is provided for use only by authorized employees, contractors, or
licensees of Defend I.T. Solutions LLC and may not be disclosed to any third
party without express written consent.
*/

import jsonData from "@/data/services/lander.json";
import { Service, ServicePage } from "@/components/Service";
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
      services={jsonData.services as Service[]}
      city=""
    />
  );
}
