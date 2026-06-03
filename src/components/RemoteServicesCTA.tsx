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

import Link from "next/link";
import { Card } from "./Card";

type RemoteServicesCTAProps = Readonly<{ isRemote?: boolean }>;

export default function RemoteServicesCTA(props: RemoteServicesCTAProps) {
  return (
    <>
      {props?.isRemote && (
        <section className="mt-8 flex h-auto w-full flex-col items-start justify-center rounded-md">
          <h3 className="text-ink mb-4 text-left text-base sm:text-2xl font-semibold">
            Need a Remote Service Plan?
          </h3>
          <Card
            as="span"
            wash
            className="flex w-full flex-col items-center justify-center p-4 sm:p-12"
          >
            <p className="my-2 sm:my-4 text-ink text-lg text-center font-semibold">
              We offer flexible remote support plans tailored to your needs.
            </p>
            <Link
              href="/services/remote/remote-support-plan"
              className="mt-2 whitespace-nowrap rounded-lg bg-accent px-6 py-4 text-sm font-semibold text-accent-contrast shadow-sm transition hover:bg-accent-hover sm:text-md touch-manipulation"
              style={{ touchAction: "manipulation" }}
            >
              Remote Support Plans →
            </Link>
          </Card>
        </section>
      )}
      <section
        className={`${
          props.isRemote ? "mt-16" : "mt-8"
        } w-full h-auto flex flex-col items-start justify-center rounded-md`}
      >
        <h3 className="text-ink mb-4 text-left text-2xl font-semibold">
          {props?.isRemote
            ? "Looking for More Personable Support?"
            : "Looking for Remote Service Options?"}
        </h3>

        <Card
          as="span"
          wash
          className="flex w-full flex-col items-center justify-center p-4 sm:p-6"
        >
          <p className="my-2 sm:my-4 text-ink text-lg text-center">
            {props?.isRemote
              ? "We offer a range of on-site services."
              : "Explore our remote support options for fast, secure, and personal assistance."}
          </p>
          <Link
            href={props?.isRemote ? "/services" : "/services/remote"}
            className="whitespace-nowrap rounded-lg border border-hairline bg-surface px-6 py-4 text-sm text-ink shadow-sm transition hover:border-accent hover:text-accent sm:text-md touch-manipulation"
            style={{ touchAction: "manipulation" }}
          >
            {props?.isRemote ? "On-Site Services →" : "Remote Support →"}
          </Link>
        </Card>
      </section>
    </>
  );
}

export { RemoteServicesCTA };
