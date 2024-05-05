import { Link, NavLink } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { HistoryCard } from "./historyCard";

export function HistoryInfobar({ events }: { events: any }) {
  const { t } = useTranslation();

  const formatDate = (date: any) => {
    const actualDate = new Date(Date.now());
    if (actualDate.getDay() < date.getDay()) {
      return "Yesterday";
    } else if (actualDate.getDay() < date.getDay()) {
    } else {
      return `${date.getHours()}:${date.getMinutes()}`;
    }
  };

  return (
    <div className="container-secondary-bg border-l-2 container-secondary-border p-2 w-96 flex flex-col gap-2 overflow-auto">
      <div className="flex gap-2 align-middle">
        <div className="rounded-md p-2 flex bg-slate-200 dark:bg-slate-900 justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-clock-history"
            viewBox="0 0 16 16"
          >
            <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
            <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
            <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
          </svg>
        </div>
        <h3 className="text-md self-center font-bold">{t("edit_history")}</h3>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        {events && events.length ? (
          events.map((event: any) => (
            <HistoryCard key={event.id} event={event} route="" />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
