import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, json, useLoaderData } from "@remix-run/react";
import Header from "~/components/header";
import { getUserInfo } from "~/model/user";
import { getSession } from "~/sessions";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

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

export default function Index() {
  let { userId, userInfo } = useLoaderData<typeof loader>();

  return (
    <div className="flex-1 flex flex-col dark:text-white container-primary-bg min-h-screen">
      <Header username={userId}></Header>
      <div className="xl:mx-auto xl:w-[1020px] flex flex-col gap-4 m-4 flex-1">
        <Outlet />
      </div>
    </div>
  );
}
