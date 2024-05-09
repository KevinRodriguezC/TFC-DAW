import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, json, useLoaderData, useRouteError } from "@remix-run/react";
import ErrorPage from "~/components/errorPage";
import { Header } from "~/components/header";
import { MainContainer } from "~/components/mainContainer";
import { getUserSession } from "~/getUserSession";
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
    <MainContainer>
      <Header username={userInfo.username} name={userInfo.name}></Header>
      <div className="xl:mx-auto xl:w-[1020px] flex flex-col gap-4 m-4 flex-1">
        <Outlet />
      </div>
    </MainContainer>
  );
}
