import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useRouteError } from "@remix-run/react";

import { getSession } from "../sessions";

import Header from "../components/header";
import { ButtonLink } from "~/components/buttonLink";
import ErrorPage from "~/components/errorPage";
import { getUserInfo } from "~/model/user";
import { MainContainer } from "~/components/mainContainer";
import { getUserSession } from "~/getUserSession";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
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

  return (
    <MainContainer>
      <Header username={userInfo.username} name={userInfo.name} />
      <div className="container-primary-bg flex-1 flex flex-col">
        <div className=" self-center max-w-5xl flex flex-col gap-6 mt-10 m">
          <h1 className="  text-7xl font-bold">Lorem ipsum</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
            libero aliquam beatae enim aperiam quas ipsum neque! Facere nobis
            veritatis accusantium, rem quod modi, numquam perspiciatis esse ut
            iusto optio? Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Asperiores beatae necessitatibus velit molestias mollitia.
            Ipsam voluptatem officiis in quam cumque, recusandae mollitia,
            repellendus corporis ad, rerum aspernatur eius praesentium eaque!
          </p>
          {/* <Link to="signup" className="btn-primary self-start">
            {" "}
            Create an account
          </Link> */}
          <ButtonLink to="signup">Create an account</ButtonLink>
        </div>
      </div>
    </MainContainer>
  );
}
