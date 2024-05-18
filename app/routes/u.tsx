import type { MetaFunction } from "@remix-run/node";
import { Outlet, useRouteError } from "@remix-run/react";
import { cardInfo } from "~/cardGenerator";
import ErrorPage from "~/components/errorPage";
import { Header } from "~/components/header";
import { MainContainer } from "~/components/mainContainer";

export const meta: MetaFunction = () => {
  return cardInfo("TFC app", "TFC app");
};

export function ErrorBoundary() {
  let error = useRouteError();
  // Print the error
  console.log(error);

  // Render the error message
  return <ErrorPage error={error} />;
}

export default function Index() {
  return (
    <MainContainer>
      <Header />
      <div className="xl:mx-auto xl:w-[1020px] flex flex-col gap-4 m-4 flex-1">
        <Outlet />
      </div>
    </MainContainer>
  );
}
