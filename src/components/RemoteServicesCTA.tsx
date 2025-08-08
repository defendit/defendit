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
