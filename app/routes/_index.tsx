import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSession } from "../sessions";
import { Header } from "../components/header";
import { ButtonLink } from "~/components/buttonLink";
import { MainContainer } from "~/components/mainContainer";
import { getUserSession } from "~/getUserSession";
import { useTranslation } from "react-i18next";
import { manageLogin } from "~/manageLogin";
import { cardInfo } from "~/cardGenerator";
import { Footer } from "~/components/footer";
import { HomepageHeader } from "~/components/homepageHeader";

export const meta: MetaFunction = () => {
  return cardInfo("TFC App", "This is my TFC App", "/preview.png");
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
      <HomepageHeader />
      <div className="dark:bg-slate-950 flex-1 flex flex-col">
        {userInfo && userInfo.username ? (
          <>
            <div className="self-center max-w-5xl flex flex-col gap-6 mt-10 m">
              <h1 className="text-2xl font-bold">Welcome {userInfo.name}</h1>
              <ButtonLink to="w">Workspaces</ButtonLink>
              <ButtonLink to="settings">Settings</ButtonLink>
            </div>
          </>
        ) : (
          <>
            <div className="self-center max-w-7xl flex flex-col gap-40 my-40 mx-10">
              <div className="flex gap-4">
                <div className="flex flex-col gap-4">
                  <h1 className="text-7xl font-bold">{t("welcome_message")}</h1>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Excepturi, libero aliquam beatae enim aperiam quas ipsum
                    neque! Facere nobis veritatis accusantium, rem quod modi,
                    numquam perspiciatis esse ut iusto optio? Lorem ipsum dolor
                    sit, amet consectetur adipisicing elit. Asperiores beatae
                    necessitatibus velit molestias mollitia. Ipsam voluptatem
                    officiis in quam cumque, recusandae mollitia, repellendus
                    corporis ad, rerum aspernatur eius praesentium eaque!
                  </p>
                  <ButtonLink to="signup">{t("create_an_account")}</ButtonLink>
                </div>
                <div className="bg-gray-300 h-[400px] w-[500px] flex-shrink-0 rounded-lg"></div>
              </div>
              <h1 className="text-7xl font-bold text-center">
                {t("features")}
              </h1>
              <div className="grid xl:grid-cols-2 gap-10">
                <div className="xl:text-end flex flex-col gap-4 justify-center">
                  <h2 className="text-4xl font-bold">Hello world</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Excepturi, libero aliquam beatae enim aperiam quas ipsum
                    neque! Facere nobis veritatis accusantium, rem quod modi,
                    numquam perspiciatis esse ut iusto optio? Lorem ipsum dolor
                    sit, amet consectetur adipisicing elit. Asperiores beatae
                    necessitatibus velit molestias mollitia. Ipsam voluptatem
                    officiis in quam cumque, recusandae mollitia, repellendus
                    corporis ad, rerum aspernatur eius praesentium eaque!
                  </p>
                </div>
                <div className="bg-gray-300 h-[400px] flex-shrink-0 rounded-lg"></div>
              </div>
              <div className="grid xl:grid-cols-2 gap-10">
                <div className="flex flex-col gap-4 justify-center">
                  <h2 className="text-4xl font-bold">Hello world</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Excepturi, libero aliquam beatae enim aperiam quas ipsum
                    neque! Facere nobis veritatis accusantium, rem quod modi,
                    numquam perspiciatis esse ut iusto optio? Lorem ipsum dolor
                    sit, amet consectetur adipisicing elit. Asperiores beatae
                    necessitatibus velit molestias mollitia. Ipsam voluptatem
                    officiis in quam cumque, recusandae mollitia, repellendus
                    corporis ad, rerum aspernatur eius praesentium eaque!
                  </p>
                </div>
                <div className="bg-gray-300 h-[400px] flex-shrink-0 rounded-lg xl:order-first"></div>
              </div>
              <div className="grid xl:grid-cols-2 gap-10">
                <div className="xl:text-end flex flex-col gap-4 justify-center">
                  <h2 className="text-4xl font-bold">Hello world</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Excepturi, libero aliquam beatae enim aperiam quas ipsum
                    neque! Facere nobis veritatis accusantium, rem quod modi,
                    numquam perspiciatis esse ut iusto optio? Lorem ipsum dolor
                    sit, amet consectetur adipisicing elit. Asperiores beatae
                    necessitatibus velit molestias mollitia. Ipsam voluptatem
                    officiis in quam cumque, recusandae mollitia, repellendus
                    corporis ad, rerum aspernatur eius praesentium eaque!
                  </p>
                </div>
                <div className="bg-gray-300 h-[400px] flex-shrink-0 rounded-lg"></div>
              </div>
            </div>
            <div className="bg-slate-100 dark:bg-slate-700 min-h-screen flex flex-col items-center justify-center">
              <ButtonLink to="signup">{t("create_an_account")}</ButtonLink>
            </div>
            <Footer />
          </>
        )}
      </div>
    </MainContainer>
  );
}
