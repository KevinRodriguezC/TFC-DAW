import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Outlet, Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

import { getSession, commitSession } from "../sessions";

import Header from "../components/header";

export const meta: MetaFunction = () => {
  return [
    { title: "App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs){
  const session = await getSession(request.headers.get("Cookie"));
  let userId = session.get("userId")
  return json({ userId })
}

export default function Index() {
  const { userId } = useLoaderData<typeof loader>()

  return (
    <div className="flex-1 flex flex-col dark:text-white min-h-screen">
      <Header username={userId}/>
      <div className="flex flex-1 flex-col items-center justify-center container-primary-bg">
        <p>Select a workspace</p>
        <Link to="/w/1">1</Link>
      </div>
    </div>
  );
}
