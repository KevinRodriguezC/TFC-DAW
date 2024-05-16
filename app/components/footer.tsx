import { Form, Link } from "@remix-run/react";
import { UserDropdown } from "./userDropdown";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="container-secondary-bg border-b-2 container-secondary-border p-4 flex gap-2 justify-between bg-black text-white">
      <div className="flex max-w-7xl mx-auto w-full">
        <div>Hello world</div>
      </div>
    </footer>
  );
}
