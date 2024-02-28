import type { MetaFunction } from "@remix-run/node";
import { Outlet, Link } from "@remix-run/react";

import Header from "../components/header";

export const meta: MetaFunction = () => {
  return [
    { title: "App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex-1 flex flex-col dark:text-white min-h-screen">
      <Header username={null}/>
      <div className="flex flex-1 flex-col items-center justify-center container-primary-bg">
        <p>Select a workspace</p>
        <Link to="/w/1">1</Link>
      </div>
    </div>
  );
}
