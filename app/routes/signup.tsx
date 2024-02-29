import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import Header from "../components/header";

import { createUser } from "~/model/user";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const user = createUser("example@mail.com", "username", "name", "lastname", "password")
  return json({});
}

export default function Index() {
  return (
    <div className="flex flex-col dark:text-white min-h-screen">
      <div className="flex flex-1 flex-col dark:text-white container-secondary-bg justify-center items-center">
        <form
          method="post"
          className="container-primary-bg container-secondary-border border-2 rounded-md p-4 flex flex-col gap-2 min-w-96"
        >
          <h1 className="text-3xl font-bold">Sign up</h1>
          <label htmlFor="email">Email</label>
          <input type="text" className="form-control" name="email" />
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" name="username" />
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" name="name" />
          <label htmlFor="lastname">Lastname</label>
          <input type="text" className="form-control" name="lastname" />
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" name="password" />
          <p>Already have an account, <Link to="/login" className="  text-blue-800 underline">login</Link>.</p>
          <input type="submit" value="Create an account" className="btn-primary" />
        </form>
      </div>
    </div>
  );
}
