/*
Copyright © 2026 Defend I.T. Solutions LLC. All Rights Reserved.

This software and its source code are the proprietary property of
Defend I.T. Solutions LLC and are protected by United States and
international copyright laws. Unauthorized reproduction, distribution,
modification, display, or use of this software, in whole or in part, without the
prior written permission of Defend I.T. Solutions LLC, is strictly prohibited.

This software is provided for use only by authorized employees, contractors, or
licensees of Defend I.T. Solutions LLC and may not be disclosed to any third
party without express written consent.
*/

import jsonData from "@/data/services/list.json";
import { Service, ServicePage } from "@/components/Service";

export default function ServicesPage() {
  const canonical = "https://www.wedefendit.com/services";
  const services = jsonData.services as Service[]; // expects { name, slug, description? }

  return (
    <ServicePage
      meta={{
        title:
          "Central Florida Tech Support and Cybersecurity Services | Defend I.T. Solutions",
        description:
          "Local computer repair, virus removal, Wi-Fi and network help, scam protection, and on-site tech support for homes and small businesses in Ocala, Belleview, and The Villages.",
        ogImageTitle: "Cybersecurity & Tech Support",
        imageAlt:
          "Cybersecurity & Tech Support, Defend I.T. Solutions, Central Florida",
        url: canonical,
        canonical,
        keywords:
          "computer repair Ocala, virus removal Ocala, scam protection The Villages, Wi-Fi help Belleview, on-site tech support Central Florida, password manager setup Ocala, local tech support",
      }}
      h1="Local Tech Support and Cybersecurity Services"
      services={services}
    />
  );
}
