"use client";
import { useEffect, useRef, useState } from "react";

export function CopyableCode({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const [width, setWidth] = useState<number | null>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3500);
    });
  };

  useEffect(() => {
    if (textRef.current && width === null) {
      setWidth(textRef.current.offsetWidth);
    }
  }, [text, width]);

  return (
    <span
      onClick={handleCopy}
      className="relative inline-block cursor-copy select-all"
      style={copied && width ? { width } : undefined}
    >
      {!copied && (
        <code ref={textRef} className="text-gray-600 dark:text-gray-400">
          {text}
        </code>
      )}

      {copied && (
        <span className="text-green-600 dark:text-emerald-400 block">
          Copied!
        </span>
      )}
    </span>
  );
}
