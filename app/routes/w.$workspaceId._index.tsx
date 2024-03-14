import type { MetaFunction } from "@remix-run/node";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
  const { t } = useTranslation();

  return [
    { title: t("workspace") + " | TFC App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="container-primary-bg flex-1 flex flex-col">
      <div className="p-2 border-b-2 container-primary-border">Hello world</div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <p>No data selected</p>
      </div>
    </div>
  );
}
