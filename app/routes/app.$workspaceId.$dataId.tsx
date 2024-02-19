import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="p-2 border-b-2 border-slate-100 ">Hello world</div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <p>Data info</p>
      </div>
    </div>
  );
}
