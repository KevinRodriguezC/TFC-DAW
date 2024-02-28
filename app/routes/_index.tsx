import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import Header from "../components/header";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }} className="dark:text-white min-h-screen flex flex-col">
      <Header username={null}/>
      <div className="container-primary-bg flex-1 flex flex-col">
        <h1 className="text-2xl">Hello world</h1>
      </div>
    </div>
  );
}
