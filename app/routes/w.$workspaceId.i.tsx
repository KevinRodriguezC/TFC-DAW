import { type MetaFunction } from "@remix-run/node";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
  const { t } = useTranslation();

  return [
    { title: t("manage_invitations") + " | TFC App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Invitations() {
  const { t } = useTranslation();

  return (
    <div className="container-primary-bg flex-1 flex flex-col">
      {t("manage_invitations")}
    </div>
  );
}
