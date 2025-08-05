import remote from "@/data/services/remote/data.json";
import { ServicePage } from "@/components";

export default function RemoteServicesPage() {
  return (
    <ServicePage
      meta={{
        title: "Remote Tech Support & Cybersecurity | Defend I.T. Solutions",
        description:
          "Nationwide remote cybersecurity and tech support services — fast, secure, and personal.",
        url: "https://www.wedefendit.com/services/remote",
        image: "https://www.wedefendit.com/og-image.png",
        keywords:
          "remote tech support, online computer help, remote virus removal, secure remote access, privacy hardening",
      }}
      h1="Remote Services"
      services={remote.services}
      city="remote"
    />
  );
}
