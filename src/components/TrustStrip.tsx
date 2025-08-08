import { BadgeCheck } from "lucide-react";

/** Trust strip for business status without implying licensure */
export function TrustStrip() {
  return (
    <div
      className="mt-3 inline-flex items-center gap-3 rounded-lg border border-green-300/60 bg-green-50 dark:bg-green-900/20 px-3 py-2 text-sm text-green-800 dark:text-green-200"
      aria-label="Business status"
    >
      <BadgeCheck className="w-4 h-4" aria-hidden="true" />
      <span>Registered Florida LLC</span>
      <span aria-hidden="true">•</span>
      <span>Insured</span>
    </div>
  );
}

export default TrustStrip;
