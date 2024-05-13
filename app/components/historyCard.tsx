import { NavLink } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { formatDistanceToNow } from "date-fns";
// import { es } from "date-fns/locale";

export function HistoryCard({ event, route }: { event: any; route: string }) {
  const { t } = useTranslation();

  // Get the action message
  const message = (event: any) => {
    switch (event.actionType) {
      case 0:
        // Create
        return t("created_event", { name: event.name });
      case 1:
        // Edit
        return t("edited_event", { name: event.name });
      case 2:
        // Delete
        return t("deleted_event", { name: event.name });
      case 3:
        // Recover
        return t("restore_event", { name: event.name });
      default:
        return event.actionType;
    }
  };

  // Determine if the card redirects to the recovery page
  const redirect = event.type != 0;

  return (
    <NavLink
      key={event.id}
      to={redirect ? route + String(event.id) : ""}
      className={"historyCard" + (redirect ? " historyCardOutline" : "")}
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
    </NavLink>
  );
}
