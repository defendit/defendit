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

import Link from "next/link";
type RemoteServicesCTAProps = { isRemote?: boolean };
export default function RemoteServicesCTA(props: RemoteServicesCTAProps) {
  return (
    <div className="mt-8 text-center">
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        {props?.isRemote
          ? "Looking for more personable support?"
          : "Looking for remote service options?"}
      </p>
      <Link
        href={props?.isRemote ? "/services" : "/services/remote"}
        className="inline-block px-6 py-3 text-white bg-blue-600 dark:bg-sky-600/30 hover:bg-blue-700 dark:hover:bg-sky-600/80 font-semibold rounded-md transition"
      >
        {props?.isRemote
          ? "Explore On-Site Services"
          : "Explore Remote Support"}
      </Link>
    </div>
  );
}

export { RemoteServicesCTA };
