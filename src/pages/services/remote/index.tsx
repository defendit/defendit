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

import remote from "@/data/services/remote/data.json";
import { ServicePage } from "@/components";

export default function RemoteServicesPage() {
  return (
    <ServicePage
      meta={{
        title:
          "Remote Tech Support and Online Training | Defend I.T. Solutions",
        description:
          "Explore remote tech support for enrolled Central Florida clients, plus online tech training and cybersecurity tutoring available across the United States.",
        url: "https://www.wedefendit.com/services/remote",
        ogImageTitle: "Remote Tech Support and Online Training",
        imageAlt: "Remote Tech Support and Online Training, Defend I.T. Solutions",
        keywords:
          "remote tech support, online tech training, cybersecurity tutoring, online computer help, remote malware removal, Central Florida Remote Support Plan",
      }}
      h1="Remote Tech Support and Online Training"
      services={remote.services}
      remote={true}
    />
  );
}
