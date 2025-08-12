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
    <>
      {props?.isRemote && (
        <section className="mt-8 w-full h-auto flex flex-col items-start justify-center text-gray-200 rounded-md  ">
          <h3 className="text-gray-700 dark:text-gray-300 mb-4 text-left  text-base sm:text-2xl font-semibold">
            Need a Remote Service Plan?
          </h3>
          <span className="w-full p-2 sm:p-12 bg-blue-600/60  dark:bg-sky-800/40 rounded-md flex flex-col items-center justify-center shadow-sm">
            <p className="my-2 sm:my-4 text-gray-50 dark:text-gray-200 text-lg text-center font-bold">
              We offer flexible remote support plans tailored to your needs.
            </p>
            <Link
              href="/services/remote/remote-support-plan"
              className="text-blue-500 hover:text-blue-600 dark:text-sky-700 dark:hover:text-sky-800 font-bold hover:bg-gray-100 bg-gray-200 dark:hover:bg-gray-300 px-6 py-4 rounded-md glow-hover mt-2 whitespace-nowrap text-sm sm:text-md"
            >
              Remote Support Plans →
            </Link>
          </span>
        </section>
      )}
      <section
        className={`${
          props.isRemote ? "mt-16" : "mt-8"
        } w-full h-auto flex flex-col items-start justify-center  text-gray-200 rounded-md`}
      >
        <h3 className=" text-gray-700 dark:text-gray-300 mb-4 text-left text-2xl font-semibold">
          {props?.isRemote
            ? "Looking for More Personable Support?"
            : "Looking for Remote Service Options?"}
        </h3>

        <span className="w-full p-2 sm:p-6 border border-black dark:border-gray-200 rounded-md  flex flex-col items-center justify-center shadow-sm">
          <p className="my-2 sm:my-4 text-black dark:text-gray-200 text-lg text-center">
            {props?.isRemote
              ? "We offer a range of on-site services."
              : "Explore our remote support options for fast, secure, and personal assistance."}
          </p>
          <Link
            href={props?.isRemote ? "/services" : "/services/remote"}
            className="border border-black dark:border-gray-200 text-black dark:text-gray-200 px-6 py-4 rounded-md hover:bg-blue-500 hover:text-gray-100 hover:font-semibold hover:dark:bg-sky-500/60  hover:border-blue-700 hover:dark:border-sky-600 glow-hover whitespace-nowrap text-sm sm:text-md"
          >
            {props?.isRemote ? "On-Site Services →" : "Remote Support →"}
          </Link>
        </span>
      </section>
    </>
  );
}

export { RemoteServicesCTA };
