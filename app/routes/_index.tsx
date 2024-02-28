import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import Header from "../components/header";
// import { loader } from "./login";
import { json } from "@remix-run/node";
import { getSession, commitSession } from "../sessions";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
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
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }} className="dark:text-white min-h-screen flex flex-col">
      <Header username={userId}/>
      <div className="container-primary-bg flex-1 flex flex-col">
        <h1 className="text-2xl">Hello world</h1>
      </div>
    </div>
  );
}
