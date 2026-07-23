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

import { Phone, Mail, Calendar } from "lucide-react";
import data from "../../data/company-info.json";
import TrustStrip from "./TrustStrip";
import { Card } from "./Card";

const contact = data.contact;
const services_cta = data.services_cta || {};

export function BookOnline() {
  const tel = `+${contact.phone.replace(/\D/g, "")}`;
  const displayPhone = contact.phone.replace("+1", "");

  return (
    <section id="schedule-service" className="border-t border-hairline">
      <div className="max-w-2xl mx-auto my-12 px-4">
        <Card wash className="relative overflow-hidden p-6 space-y-6">
          {/* Header */}
          <header className="text-center">
            <h2 className="text-h2 tracking-h2 font-semibold text-ink mb-2">
              Schedule Service
            </h2>
            <p className="text-ink-muted">
              Monday through Friday, 9 AM to 6 PM • Saturday, 10 AM to 4 PM
            </p>
          </header>

          <TrustStrip />

          {/* Primary Actions */}
          <div className="space-y-3">
            {/* Call/Text - Primary */}
            <a
              href={`tel:${tel.replace(/\D/g, "")}`}
              className="group flex items-center gap-3 rounded-lg bg-accent-fill p-4 text-accent-contrast font-medium shadow-sm transition hover:bg-accent-fill-hover touch-manipulation"
              style={{ touchAction: "manipulation" }}
            >
              <Phone className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              <div className="flex-1 text-left">
                <div className="text-sm opacity-90">Call or Text</div>
                <div className="text-lg font-bold">{displayPhone}</div>
              </div>
            </a>

            {/* Email - Secondary */}
            <Card
              as="a"
              href={`mailto:${contact.service_email}`}
              interactive
              className="group flex items-center gap-3 p-4"
            >
              <Mail
                className="w-5 h-5 text-accent flex-shrink-0"
                aria-hidden="true"
              />
              <div className="flex-1 text-left">
                <div className="text-sm text-ink-muted">Email Us</div>
                <div className="font-medium break-all text-accent">
                  {contact.service_email}
                </div>
              </div>
            </Card>
          </div>

          {/* Calendly - Tertiary */}
          <div className="pt-4 border-t border-hairline">
            <details className="group">
              <summary className="cursor-pointer text-sm text-ink-muted hover:text-accent list-none flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Choose a time online with Calendly.</span>
              </summary>

              <div className="mt-3 pl-6">
                <a
                  href={services_cta.booking_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-accent hover:underline"
                >
                  Open Calendly →
                </a>
              </div>
            </details>
          </div>
        </Card>
      </div>
    </section>
  );
}
