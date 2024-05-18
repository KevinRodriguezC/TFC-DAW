import type {
  MetaFunction,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { cardInfo } from "~/cardGenerator";
import { UserProfilePicture } from "~/components/userProfilePicture";
import { getUserSession } from "~/getUserSession";
import { getDirectoryInfo, updateDirectory } from "~/model/directory";
import { addEvent, getEventById } from "~/model/events";
import { getUserInfo } from "~/model/user";
import { getSession } from "~/sessions";

export const meta: MetaFunction = () => {
  const { t } = useTranslation();

  return cardInfo(t("directory") + " | TFC App", t("directory"));
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  // Get user id
  const { userId } = await getUserSession(
    await getSession(request.headers.get("Cookie"))
  );

  // Get request parameters
  const versionId = params.versionId;
  const workspaceId = params.workspaceId;
  if (!versionId || !+versionId || !workspaceId || !+workspaceId) {
    throw new Response("Directory not found", { status: 404 });
  }

  // Get the older version of the data
  let oldData = await getEventById(+versionId);

  // If the old data does not exist
  if (!oldData) {
    throw new Response("Directory not found", { status: 404 });
  }

  // Get data information
  const data = await getDirectoryInfo(oldData.row);
  const editorInfo = await getUserInfo(oldData.userId);
  if (!data || data.parentId != +workspaceId || !editorInfo) {
    throw new Response("Directory not found", { status: 404 });
  }

  return json({
    oldData,
    data,
    canEdit: userId != undefined,
    editorInfo: {
      name: editorInfo.name,
      username: editorInfo.username,
      profilePictureColor: editorInfo.profilePictureColor,
    },
  });
};

export async function action({ params, request }: ActionFunctionArgs) {
  try {
    const userId = (await getSession(request.headers.get("Cookie"))).get(
      "userId"
    );
    const versionId = params.versionId;
    const workspaceId = params.workspaceId;
    const formData = await request.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    if (
      !versionId ||
      !+versionId ||
      !workspaceId ||
      !+workspaceId ||
      !name ||
      !userId ||
      !+userId ||
      typeof name != "string" ||
      typeof description != "string"
    ) {
      throw new Response("Error", { status: 400 });
    }
    const versionInfo = await getEventById(+versionId);
    if (!versionInfo) {
      throw new Response("Error", { status: 400 });
    }
    updateDirectory(+versionInfo.row, name, description, false);
    addEvent(1, 3, +versionInfo.row, +userId, +workspaceId, name, description);

    return redirect("../" + versionInfo.row);
  } catch (e) {
    console.log(e);
    return new Response("Internal server error", { status: 500 });
  }
}

export default function VersionPage() {
  const { oldData, data, canEdit, editorInfo } = useLoaderData<typeof loader>();

  const { t } = useTranslation();

  return (
    <Form className="flex flex-col flex-1" method="POST" key={oldData.id}>
      <div className="p-2 flex gap-2 justify-between container-secondary-border border-b-2">
        <div className="flex gap-2 items-center">
          {t("edited_by")}
          <UserProfilePicture user={editorInfo} size={" size-14 text-xl"} />
          <div className="flex flex-col justify-center">
            <h2 className="text-lg font-bold">{editorInfo.name}</h2>
            <h3 className="text-md">@{editorInfo.username}</h3>
          </div>
        </div>
        {canEdit && (
          <input type="submit" value={t("restore")} className="btn-primary" />
        )}
      </div>
      <div className={"grid" + (!data.deleted ? " grid-cols-2" : "")}>
        <h3 className="flex items-center justify-center p-1 font-bold">
          {data.deleted ? t("before_being_deleted") : t("actual")}
        </h3>
        {!data.deleted ? (
          <h3 className="flex items-center justify-center p-1 font-bold">
            {t("previous")}
          </h3>
        ) : (
          ""
        )}
      </div>
      <div
        className={
          "grid grid-rows-[50px_2px_1fr] flex-1 grid-flow-col overflow-hidden" +
          (!data.deleted ? " grid-cols-2" : " ")
        }
      >
        {!data.deleted && (
          <>
            <input
              type="text"
              className="data-input resize-none"
              value={data && data.name}
              disabled
              maxLength={191}
            />
            <span className="container-secondary-bg"></span>
            <textarea
              className="data-input resize-none overflow-y-auto"
              disabled
            >
              {data && data.description}
            </textarea>
          </>
        )}
        <input
          type="text"
          name="name"
          defaultValue={oldData.name ? oldData.name : ""}
          className="data-input text-xl font-bold"
          disabled={!canEdit}
        />
        <span className="container-secondary-bg"></span>
        <textarea
          name="description"
          className="data-input flex-1 resize-none"
          defaultValue={oldData.value ? oldData.value : ""}
          disabled={!canEdit}
        ></textarea>
        {/* </div> */}
      </div>
    </Form>
  );
}
