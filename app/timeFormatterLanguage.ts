import i18next from "~/i18n";
import { es, enUS } from "date-fns/locale";

export const timeFormatterLanguage = () =>
  i18next.language == "es-ES" ? es : enUS;
