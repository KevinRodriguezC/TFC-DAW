import { NavLink } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { formatDistanceToNow } from "date-fns";
// import { es } from "date-fns/locale";

export function HistoryCard({ event, route }: { event: any; route: string }) {
  const { t } = useTranslation();

  const message = (event: any) => {
    if (event.actionType == 0) {
      // Create
      return t("created_event", { name: event.name });
    } else if (event.actionType == 1) {
      // Edit
      return t("edited_event", { name: event.name });
    } else if (event.actionType == 2) {
      // Delete
      return t("deleted_event", { name: event.name });
    } else {
      return event.actionType;
    }
  };

  const formatTime = (date: any) => {
    const actualDate = new Date(Date.now());
    if (actualDate.getDay() < date.getDay()) {
      return "Yesterday";
    } else if (actualDate.getDay() < date.getDay()) {
    } else {
      return `${date.getHours()}:${date.getMinutes()}`;
    }
  };

  const formatDate = (date: any) => {
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
  };

  return (
    <NavLink
      key={event.id}
      to={event.type == 1 || event.type == 2 ? route + String(event.id) : ""}
      className={
        "historyCard" + (event.actionType != 0 ? " historyCardOutline" : "")
      }
    >
      {message(event)}
      <div className="flex gap-2 items-center text-sm font-bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-clock-fill"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
        </svg>
        {formatDistanceToNow(new Date(event.createdAt), {
          addSuffix: true,
          // locale: es,
        })}
      </div>
      {/* <div className="flex gap-2 items-center text-sm font-bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-calendar-fill"
          viewBox="0 0 16 16"
        >
          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5h16V4H0V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5" />
        </svg>
        {formatDate(new Date(event.createdAt))}
      </div> */}
    </NavLink>
  );
}
