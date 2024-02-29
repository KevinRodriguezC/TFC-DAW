import type {
  MetaFunction,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getSession, commitSession } from "../sessions";

import Header from "../components/header";

export const meta: MetaFunction = () => {
  return [
    { title: "App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

function validateCredentials(username: any, password: any) {
  if (username == "user" && password == "password") {
    return "1";
  } else {
    return null;
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("userId")) {
    return redirect("/");
  }

  const data = { error: session.get("error") };

  return json(data, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const form = await request.formData();
  const username = form.get("email");
  const password = form.get("password");

  const userId = await validateCredentials(username, password);

  if (userId == null) {
    session.flash("error", "Invalid username/password");

    return redirect("/login", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  session.set("userId", userId);

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Login() {
  const { error } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col dark:text-white min-h-screen">
      <Header username={null} />
      <div className="flex flex-col dark:text-white flex-1 container-secondary-bg justify-center items-center">
        <form
          className="container-primary-bg container-secondary-border border-2 rounded-md p-4 flex flex-col gap-4"
          method="POST"
        >
          <h1 className="text-2xl">Log in</h1>
          <label htmlFor="email">Email</label>
          <input type="text" className="form-control" name="email" />
          <label htmlFor="email">Password</label>
          <input type="password" className="form-control" name="password" />
          <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
}
