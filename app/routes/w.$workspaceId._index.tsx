import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, json } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { cardInfo } from "~/cardGenerator";
import { getWorkspaceInfo } from "~/getWorkspaceInfo";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { t } = useTranslation();

  if (!data) {
    return cardInfo(t("workspace") + " | TFC App", "Workspace", "/preview.png");
  }
  const { workspace } = data;

  return cardInfo(
    workspace.name + " | TFC App",
    workspace.description ? workspace.description : "Workspace",
    "/preview.png"
  );
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  return json(await getWorkspaceInfo(request, params));
};

export default function Index() {
  const { t } = useTranslation();

  return (
    <div className="container-primary-bg flex-1 flex-col flex items-center justify-center gap-4 text-gray-700 dark:text-gray-300 p-4 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        fill="currentColor"
        className="bi bi-pen"
        viewBox="0 0 16 16"
      >
        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
      </svg>
      <h2 className="text-xl">{t("you_dont_have_any_directory_selected")}</h2>
    </div>
  );
}
