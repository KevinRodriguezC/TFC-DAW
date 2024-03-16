# TFC

## Introducción

Esto es el proyecto de final de grado, consiste en una aplicación de gestión de notas, tareas y calendario enfocada en la facilidad de uso.

## Tecnologías

La aplicación usa:

### Backend:

NodeJS con Remix y MySQL

### Fronted:

React con TailwindCSS

## Instalación y ejecución del proyecto

### Para ejecutar el proyecto:

- Descarga el proyecto.
- Instalar NodeJS
- Ejecutar `npm install` para instalar todas las dependencias.
- Ejecutar `npm run dev` para ejecutar el proyecto.

### Para instalar la base de datos

- Descarga e instala XAMPP
- Introduce el nombre de usuario y la contraseña de la base de datos en prisma/schema.prisma en la opción de datasource url.
- Migra la base de datos de prisma con: `npx prisma migrate dev --name init`
