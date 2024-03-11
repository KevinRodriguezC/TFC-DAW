import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Link,
  Outlet,
  json,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import ErrorPage from "~/components/errorPage";
import Header from "~/components/header";
import { getUserSession } from "~/getUserSession";
import { getUserInfo } from "~/model/user";
import { getSession } from "~/sessions";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  let { userId, userInfo } = await getUserSession(
    await getSession(request.headers.get("Cookie"))
  );
  // let userArray = await getUserInfo(+userId);
  // if (!userArray) {
  //   throw new Response("Error");
  // }
  // let userInfo = {
  //   name: userArray.name,
  //   lastname: userArray.lastname ? userArray.lastname : "",
  //   visibility: userArray.visibility == 0 ? false : true,
  // };
  return json({ userInfo });
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.log(error);
  return <ErrorPage error={error} />;
}

export default function Index() {
  let { userInfo } = useLoaderData<typeof loader>();

  return (
    <div className="flex-1 flex flex-col dark:text-white container-primary-bg min-h-screen">
      <Header username={userInfo.username} name={userInfo.name}></Header>
      <div className="xl:mx-auto xl:w-[1020px] flex flex-col gap-4 m-4 flex-1">
        <Outlet />
      </div>
    </div>
  );
}
