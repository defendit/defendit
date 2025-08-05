import Link from "next/link";
type RemoteServicesCTAProps = { isRemote?: boolean };
export default function RemoteServicesCTA(props: RemoteServicesCTAProps) {
  return (
    <div className="mt-8 text-center">
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        {props?.isRemote
          ? "Looking for more personable support?"
          : "Need help but not nearby?"}
      </p>
      <Link
        href={props?.isRemote ? "/services" : "/services/remote"}
        className="inline-block px-6 py-3 text-white bg-blue-600 dark:bg-sky-500 hover:bg-blue-700 dark:hover:bg-sky-600 font-semibold rounded-md transition"
      >
        {props?.isRemote ? "Explore On-Site Services" : "See Remote Options"}
      </Link>
    </div>
  );
}

export { RemoteServicesCTA };
