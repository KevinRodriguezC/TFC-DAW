import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18next
  .use(initReactI18next)
  .use(Backend)
  .init({
    debug: true,
    fallbackLng: "en",
    nonExplicitSupportedLngs: true,
    load: "current",

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
          new_invitation: "New invitation",
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
          directories: "Directories",
          delete_directory: "Delete directory",
          you: "You",
          language: "Language",
          new: "New",
          there_is_not_invitation_codes: "There is not invitation codes",
          new_invitation_code: "New invitation code",
          edit_history: "Edit history",
          you_dont_have_any_workspace_yet: "You don't have any workspace yet",
          join_a_workspace: "Join a workspace",
          join: "Join",
          you_dont_have_any_invitation_code_yet:
            "You don't have any invitation code yet",
          there_are_no_events: "There are no events",
          activity: "Activity",
          public_workspace: "Public workspace",
          no_go_back: "No, go back",
          created_event: "Created {{name}}",
          edited_event: "Edited {{name}}",
          deleted_event: "Deleted {{name}}",
          time_ago: "{{time}} ago",
          restore: "Restore",
          restore_event: "Restored {{name}}",
          color_blue: "Blue",
          color_red: "Red",
          color_purple: "Purple",
          color_green: "Green",
          color_pink: "Pink",
          color_orange: "Orange",
          color_yellow: "Yellow",
          profile_picture_color: "Profile picture color",
          edited_by: "Edited by",
          actual: "Actual",
          previous: "Previous",
          cant_edit_message: "You don't have edit privileges",
          before_being_deleted: "Before being deleted",
          are_you_sure_you_want_to_log_out: "Are you sure you want to log out?",
          welcome_message: "Welcome to TFC app",
          features: "Features",
          this_user_is_a_private_user:
            "This user is a private user and does not have a public account.",
          you_dont_have_any_directory_selected:
            "You don't have any directory selected",
          are_you_sure_you_want_to_leave_this_workspace:
            "Are you sure you want to leave this workspace?",
          are_you_sure_you_want_to_expel_this_user:
            "Are you sure you want to expel {{username}}?",
          expel_user: "Expel user",
          leave_workspace: "Leave workspace",
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
          new_invitation: "Nueva invitación",
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
          directories: "Directorios",
          delete_directory: "Borrar directorio",
          you: "Tu",
          language: "Idioma",
          new: "Nueva",
          there_is_not_invitation_codes: "No hay códigos de invitación",
          new_invitation_code: "Nuevo código de invitación",
          edit_history: "Historial de edición",
          you_dont_have_any_workspace_yet:
            "No tienes ningún espacio de trabajo",
          join_a_workspace: "Unirse a un espacio de trabajo",
          join: "Unirse",
          you_dont_have_any_invitation_code_yet:
            "Tu no tienes ningún código de invitación",
          there_are_no_events: "No hay eventos",
          activity: "Actividad",
          public_workspace: "Espacio de trabajo público",
          no_go_back: "No, retroceder",
          created_event: "Se creo {{name}}",
          edited_event: "Se edito {{name}}",
          deleted_event: "Se elimino {{name}}",
          time_ago: "Hace {{time}}",
          restore: "Recuperar",
          restore_event: "Se recupero {{name}}",
          color_blue: "Azul",
          color_red: "Rojo",
          color_purple: "Púrpura",
          color_green: "Verde",
          color_pink: "Rosa",
          color_orange: "Naranja",
          color_yellow: "Amarillo",
          profile_picture_color: "Color de la imagen de perfil",
          edited_by: "Editado por ",
          actual: "Actual",
          previous: "Previo",
          cant_edit_message: "No tienes permisos de edición",
          before_being_deleted: "Antes de ser eliminado",
          are_you_sure_you_want_to_log_out:
            "¿Estas seguro de que deseas cerrar sesión?",
          welcome_message: "Welcome to TFC app",
          features: "Características",
          this_user_is_a_private_user:
            "Este usuario es un usuario privado y no tiene una cuenta pública.",
          you_dont_have_any_directory_selected:
            "No tienes ningún directorio seleccionado",
          are_you_sure_you_want_to_leave_this_workspace:
            "¿Estas seguro de que deseas abandonar este espacio de trabajo?",
          are_you_sure_you_want_to_expel_this_user:
            "¿Estas seguro de que deseas expulsar a {{username}}?",
          expel_user: "Expulsar usuario",
          leave_workspace: "Abandonar el espacio de trabajo",
        },
      },
    },
  });

export default i18next;
