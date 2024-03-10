import { Link } from "@remix-run/react";
import { useState } from "react";

export function ButtonLink({ children, to }: { children: any; to: string }) {
  return (
    <Link to={to} className="btn-primary">
      {children}
    </Link>
  );
}
