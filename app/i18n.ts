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
          yes: "Yes",
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
          notes_view: "Notes view",
          tasks_view: "Tasks view",
          calendar_view: "Calendar view",
          create: "Create",
          name: "Name",
          type: "Type",
          description: "Description",
          no_directories: "No directories",
          delete: "Delete",
          save: "Save",
          are_you_sure_you_want_to_delete_directory:
            "Are you sure you want to delete {{directoryName}}?",
          log_in: "Log in",
          dont_have_an_account: "Don't have an account",
          username: "Username",
          password: "Password",
          email: "Email",
          lastname: "Lastname",
          already_have_an_account: "Already have an account",
          results_for_the_term: 'Results for the term "{{term}}":',
          account_settings: "Account settings",
          visibility: "Visibility",
          public_profile: "Public profile",
          participants: "Participants",
          manage_invitations: "Manage invitations",
          settings: "Settings",
          search_results: "Search results",
          user_info: "User info",
          workspace: "Workspace",
          directory: "Directory",
          delete_directory: "Delete directory",
          you: "You",
        },
      },
      es: {
        translation: {
          yes: "Si",
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
          notes_view: "Vista de notas",
          tasks_view: "Vista de tareas",
          calendar_view: "Vista de calendario",
          create: "Crear",
          name: "Nombre",
          type: "Tipo",
          description: "Descripción",
          no_directories: "No hay directorios",
          delete: "Borrar",
          save: "Guardar",
          are_you_sure_you_want_to_delete_directory:
            "¿Estas seguro de que deseas eliminar {{directoryName}}?",
          log_in: "Iniciar sesión",
          dont_have_an_account: "¿No tienes una cuenta?",
          username: "Nombre de usuario",
          password: "Contraseña",
          email: "Correo electrónico",
          lastname: "Apellidos",
          already_have_an_account: "¿Ya tienes una cuenta?",
          results_for_the_term: 'Resultados con el término "{{term}}":',
          account_settings: "Configuración de la cuenta",
          visibility: "Visibilidad",
          public_profile: "Perfil público",
          participants: "Participantes",
          manage_invitations: "Gestionar invitaciones",
          settings: "Configuración",
          search_results: "Resultados de búsqueda",
          user_info: "Información del usuario",
          workspace: "Espacio de trabajo",
          directory: "Directorio",
          delete_directory: "Borrar directorio",
          you: "Tu",
        },
      },
    },
  });

export default i18next;
