<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">Un framework progresivo de <a href="http://nodejs.org" target="_blank">Node.js</a> para construir aplicaciones de servidor eficientes y escalables.</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
</p>

## Descripción

Este es un repositorio de inicio para proyectos utilizando el framework [Nest](https://github.com/nestjs/nest).

## Configuración del Proyecto

```bash
$ npm install
```

### Variables de Entorno

Se proporciona un archivo `.env.template` que sirve como guía para definir las variables de entorno necesarias. Se deben configurar las siguientes variables en un archivo `.env`:

- **DATABASE_URL**: URL de la base de datos PostgreSQL.
- **JWT_SECRET**: Clave secreta para firmar y verificar tokens JWT.

## Compilación y Ejecución

```bash
# Modo desarrollo
$ npm run start

# Modo watch
$ npm run start:dev

# Modo producción
$ npm run start:prod
```

## Endpoints

A continuación, se describen los endpoints disponibles en la API:

### Autenticación

- **POST /register** – Registrar un nuevo usuario.
- **POST /login** – Iniciar sesión y devolver un token de autenticación.

### Órdenes

- **GET /orders** – Listar todos los pedidos del usuario autenticado.
- **POST /orders** – Crear un nuevo pedido.
- **PUT /orders/:id** – Actualizar un pedido existente (e.g., cambiar la cantidad de artículos).
- **DELETE /orders/:id** – Eliminar un pedido.
- **GET /orders/:id/status** – Consultar el estado de un pedido.

⚠️ Todos los endpoints de órdenes requieren un token de autenticación en la cabecera de la solicitud. 
⚠️ Los demás endpoints no requieren un cuerpo JSON en la solicitud.

## Uso de los Endpoints

### Registro de Usuario

Para registrar un usuario, se debe enviar la siguiente estructura JSON en Insomnia o Postman:

```json
{
  "name": "Bryan",
  "email": "bryan1@hotmail.com",
  "password": "123"
}
```

El endpoint devolverá un token que se debe utilizar en los endpoints de órdenes. Sin este token, las solicitudes devolverán un error `Unauthorized`.

### Inicio de Sesión

Para iniciar sesión, se debe enviar la siguiente estructura JSON:

```json
{
  "email": "bryan@hotmail.com",
  "password": "123"
}
```

El endpoint devolverá un token que debe ser utilizado para acceder a los endpoints protegidos.

### Uso del Token en Insomnia/Postman

El token debe incluirse en la opción de **Auth**, seleccionando **Bearer Token** e ingresando el token devuelto por el registro o inicio de sesión.

### Creación de Pedido

Para crear un pedido, se debe enviar la siguiente estructura JSON:

```json
{
  "description": "Edición ilimitada",
  "product": "Microondas",
  "quantity": 2,
  "status": "En preparación"
}
```

### Actualización de Pedido

Para actualizar un pedido, se debe enviar un JSON con los campos a modificar, por ejemplo:

```json
{
  "status": "En camino"
}
```

