"use client";

import Link from "next/link";
import posthog from "posthog-js";
import type { ReactNode } from "react";

type TrackedLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: string;
  properties?: Record<string, unknown>;
  href: string;
  children: ReactNode;
};

export default function TrackedLink({ event, properties, href, children, onClick, className, style, ...rest }: TrackedLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    posthog.capture(event, properties);
    onClick?.(e);
  };

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} style={style} onClick={handleClick}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className} style={style} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
