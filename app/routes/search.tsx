import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import Header from "~/components/header";
import { MainContainer } from "~/components/mainContainer";
import { UserCardInfo } from "~/components/userCardInfo";
import { getUserSession } from "~/getUserSession";

import { searchUsers } from "~/model/search";
import { getSession } from "~/sessions";

export const meta: MetaFunction = () => {
  // let { q } = useLoaderData<typeof loader>();

  const { t } = useTranslation();

  return [
    { title: t("search_results") + " | TFC App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  let { userInfo } = await getUserSession(
    await getSession(request.headers.get("Cookie"))
  );
  const url = new URL(request.url);
  const q = url.searchParams.get("inputQuery");
  const usersSearch = await searchUsers(q);
  return json({ usersSearch, q, userInfo });
};

export default function Index() {
  let { usersSearch, q, userInfo } = useLoaderData<typeof loader>();

  const { t } = useTranslation();

  return (
    <MainContainer>
      <Header username={userInfo.username} name={userInfo.name} />
      <div className="xl:mx-auto xl:w-[1020px] flex flex-col gap-4 m-4 flex-1">
        <h2 className="text-xl">{t("results_for_the_term", { term: q })}</h2>
        {usersSearch.length ? (
          usersSearch.map((userSearch: any) => (
            <UserCardInfo
              key={userSearch.username}
              name={userSearch.name + " " + userSearch.lastname}
              username={userSearch.username}
            />
          ))
        ) : (
          <p>{t("no_results")}</p>
        )}
      </div>
    </MainContainer>
  );
}
