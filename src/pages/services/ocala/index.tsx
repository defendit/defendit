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
import { Service, ServicePage } from "@/components";
import { makeGetStaticConsumerProps } from "@/lib/service-page";

const ocala = "ocala";
const Ocala = "Ocala";

export const getStaticProps: GetStaticProps = makeGetStaticConsumerProps({
  cityLower: ocala,
  cityUpper: Ocala,
});

export default function OcalaServicesPage({
  service,
}: {
  service: { services: Service[] };
}) {
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
      services={service.services}
      city="ocala"
    />
  );
}
