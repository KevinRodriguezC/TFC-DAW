import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSession } from "../sessions";
import { Header } from "../components/header";
import { ButtonLink } from "~/components/buttonLink";
import { MainContainer } from "~/components/mainContainer";
import { getUserSession } from "~/getUserSession";
import { useTranslation } from "react-i18next";
import { useUser } from "~/hooks/useUser";
import { manageLogin } from "~/manageLogin";

export const meta: MetaFunction = () => {
  return [
    { title: "TFC app" },
    { name: "description", content: "This is my TFC" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  let { userInfo } = await getUserSession(
    await getSession(request.headers.get("Cookie"))
  );
  return json({ userInfo });
}

export default function Index() {
  const { userInfo } = useLoaderData<typeof loader>();

  manageLogin(userInfo);

  const { t } = useTranslation();
  return (
    <MainContainer>
      <Header />
      <div className="container-primary-bg flex-1 flex flex-col">
        <div className=" self-center max-w-5xl flex flex-col gap-6 mt-10 m">
          {userInfo && userInfo.username ? (
            <>
              <h1 className="text-2xl font-bold">Welcome {userInfo.name}</h1>
              <ButtonLink to="app">Workspaces</ButtonLink>
              <ButtonLink to="settings">Settings</ButtonLink>
            </>
          ) : (
            <>
              <h1 className="text-7xl font-bold">Lorem ipsum</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi, libero aliquam beatae enim aperiam quas ipsum neque!
                Facere nobis veritatis accusantium, rem quod modi, numquam
                perspiciatis esse ut iusto optio? Lorem ipsum dolor sit, amet
                consectetur adipisicing elit. Asperiores beatae necessitatibus
                velit molestias mollitia. Ipsam voluptatem officiis in quam
                cumque, recusandae mollitia, repellendus corporis ad, rerum
                aspernatur eius praesentium eaque!
              </p>
              <ButtonLink to="signup">{t("create_an_account")}</ButtonLink>
            </>
          )}
        </div>
      </div>
    </MainContainer>
  );
}
