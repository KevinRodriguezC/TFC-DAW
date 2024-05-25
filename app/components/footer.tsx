import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="container-secondary-bg border-b-2 container-secondary-border p-4 flex gap-2 justify-between bg-black text-white">
      <div className="flex flex-col max-w-7xl mx-auto w-full gap-2">
        <h2>TFC app</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit,
          placeat saepe. Provident animi sapiente, rerum possimus placeat,
          nostrum et accusamus pariatur praesentium neque obcaecati reiciendis
          aspernatur, delectus est. Quasi, sit.
        </p>
      </div>
    </footer>
  );
}
