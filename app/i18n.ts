import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    debug: true,
    resources: {
      en: {
        translation: {
          login: "Login",
          search: "Search",
          workspaces: "Workspaces",
          create_an_account: "Create an account",
          home: "Home",
          manage_account: "Manage account",
          view_profile: "View profile",
          logout: "Logout",
          select_a_workspace: "Select a workspace",
          no_results: "No results",
          new_workspace: "New workspace",
          new_directory: "New directory",
        },
      },
      es: {
        translation: {
          login: "Iniciar sesión",
          search: "Buscar",
          workspaces: "Espacios de trabajo",
          create_an_account: "Crear una cuenta",
          home: "Inicio",
          manage_account: "Gestionar cuenta",
          view_profile: "Ver perfil",
          logout: "Cerrar sesión",
          select_a_workspace: "Seleciona un espacio de trabajo",
          no_results: "No hay resultados",
          new_workspace: "Nuevo espacio de trabajo",
          new_directory: "Nuevo directorio",
        },
      },
    },
  });

export default i18next;
