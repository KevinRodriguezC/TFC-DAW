import type {
  MetaFunction,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getSession } from "../sessions";

import Header from "../components/header";
import { Switch } from "@headlessui/react";
import { Toogle } from "~/components/toggle";
import { getUserInfo, updateUser } from "~/model/user";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ params, request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  let userId = session.get("userId");
  const formData = await request.formData();
  let name = formData.get("name");
  let lastname = formData.get("lastname");

  let visibilityString = formData.get("visibility");
  let visibility;
  if (visibilityString == "on") {
    visibility = 1;
  } else {
    visibility = 0;
  }

  if (!lastname) {
    lastname = "";
  }

  if (
    !userId ||
    !+userId ||
    !name ||
    typeof name != "string" ||
    typeof lastname != "string"
  ) {
    throw new Response("Error", { status: 500 });
  }
  let userIdNumber = +userId;
  updateUser(userIdNumber, name, lastname, visibility);
  return redirect("/settings");
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  let userId = session.get("userId");
  if (!userId || !+userId) {
    throw new Response("Error");
  }
  let userArray = await getUserInfo(+userId);
  if (!userArray) {
    throw new Response("Error");
  }
  let userInfo = {
    name: userArray.name,
    lastname: userArray.lastname ? userArray.lastname : "",
    visibility: userArray.visibility == 0 ? false : true,
  };
  return json({ userId, userInfo });
}

export default function Settings() {
  const { userId, userInfo } = useLoaderData<typeof loader>();

  return (
    <div
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}
      className="dark:text-white min-h-screen flex flex-col"
    >
      <Header username={userId} />
      <div className="xl:mx-auto xl:w-[1020px] flex flex-col gap-4 m-4 flex-1">
        <form method="post" className="flex flex-col gap-2 p-2">
          <h2 className="text-2xl">Account settings</h2>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            defaultValue={userInfo.name}
            required
          />
          <label htmlFor="lastname">Lastname</label>
          <input
            type="text"
            name="lastname"
            className="form-control"
            defaultValue={userInfo.lastname}
          />
          <label>Visibility</label>
          <div className="flex p-2 bg-slate-100 rounded-md items-center pointer">
            <label className="flex-1" htmlFor="visibility">
              Public profile
            </label>
            <Toogle
              inputName="visibility"
              defaultValue={userInfo.visibility}
            ></Toogle>
          </div>
          <input className="btn-primary" type="submit" value="Save changes" />
        </form>
      </div>
    </div>
  );
}
