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

import { GetStaticProps } from "next";
import { Service, ServicePage } from "@/components/Service";
import { makeGetStaticConsumerProps } from "@/lib/service-page";

export const getStaticProps: GetStaticProps = makeGetStaticConsumerProps({
  cityLower: "belleview",
  cityUpper: "Belleview",
});

export default function BelleviewServicesPage({
  service,
}: {
  service: { services: Service[] };
}) {
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
      services={service.services}
      city="belleview"
    />
  );
}
