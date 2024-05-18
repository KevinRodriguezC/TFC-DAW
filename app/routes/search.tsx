import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { cardInfo } from "~/cardGenerator";
import { Header } from "~/components/header";
import { MainContainer } from "~/components/mainContainer";
import { UserCardInfo } from "~/components/userCardInfo";
import { getUserSession } from "~/getUserSession";
import { manageLogin } from "~/manageLogin";
import { searchUsers } from "~/model/search";
import { getSession } from "~/sessions";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const { t } = useTranslation();

  // Check if there is loader data
  if (!data) {
    // If there isn't loader data send a generic response

    return cardInfo(t("search_results") + " | TFC App", t("search_results"));
  } else {
    // If there is loader data send the user information

    return cardInfo(
      t("results_for_the_term", { term: data.q }) + " | TFC App",
      t("search_results")
    );
  }
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Get the user information
  let { userInfo } = await getUserSession(
    await getSession(request.headers.get("Cookie"))
  );

  // Get the GET request parameters
  const url = new URL(request.url);
  const q = url.searchParams.get("inputQuery");

  // Search all the user with the q parameter
  const usersSearch = await searchUsers(q);

  return json({ userInfo, usersSearch, q });
};

export default function Index() {
  let { userInfo, usersSearch, q } = useLoaderData<typeof loader>();

  const { t } = useTranslation();

  manageLogin(userInfo);

  return (
    <MainContainer>
      <Header />
      <div className="xl:mx-auto xl:w-[1020px] flex flex-col gap-4 m-4 flex-1">
        <h2 className="text-xl">{t("results_for_the_term", { term: q })}</h2>
        {usersSearch.length ? (
          usersSearch.map((userSearch: any) => (
            <UserCardInfo key={userSearch.username} user={userSearch} />
          ))
        ) : (
          <p>{t("no_results")}</p>
        )}
      </div>
    </MainContainer>
  );
}
