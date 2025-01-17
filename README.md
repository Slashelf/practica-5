<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Documentación de API: CRUD de Usuarios

## Tabla de contenido

1. [Introducción](#introducción)
2. [Instalación](#instalación)
3. [Comandos](#comandos)
4. [Base de datos](#base-de-datos)
6. [URL Base Swagger](#url-base-swagger)
5. [Test para el API con PostMan y resultado obtenidos](#test-para-el-api-con-postman-y-resultado-obtenidos)
   - [Crear Usuario](#1-crear-usuario)
   - [Crear Usuario con un email ya registrado en la base de datos](#2-crear-usuario-con-un-email-ya-registrado-en-la-base-de-datos)
   - [Obtener Usuarios](#3-obtener-todos-los-usuarios)
   - [Obtener Usuario por ID](#4-obtener-usuario-por-id)
   - [Cuando un Usuario no es encontrado por ID](#5-cuando-un-usuario-no-es-encontrado-por-id)
   - [Editar Usuario](#6-editar-usuario)
   - [Editar Usuario con un email ya existente en la base de datos](#7-editar-usuario-con-un-email-ya-existente-en-la-base-de-datos)
   - [Cuando un Usuario no es encontrado por ID al intentar editar sus datos](#8-cuando-un-usuario-no-es-encontrado-por-id-al-intentar-editar-sus-datos)
   - [Eliminar un Usuario](#9-eliminar-un-usuario)
   - [Cuando un Usuario no es encontrado por ID al intentar eliminarlo](#10-cuando-un-usuario-no-es-encontrado-por-id-al-intentar-eliminarlo)

---

## Introducción

Este proyecto implementa una API para la gestión de usuarios, con soporte para operaciones CRUD (crear, leer, actualizar y eliminar). También incluye tests automatizados y documentación generada con Swagger.

---

## Instalación

Utilice el siguiente comando para instalar las dependencias necesarias para que el proyecto funcione adecuadamente:

```bash
$ npm install
```
---

## Comandos

### Compile el proyecto con acualquiera de los siguiente comandos

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Comandos Para probar los test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
---

## Base de datos

```bash
# base de datos general
$ users

# para las pruebas de aceptacion
$ users_db_test

# para las pruebas de integracion
$ usuarios_test_db
```



---

## URL Base Swagger


### Documentación Swagger

Accede a la documentación en Swagger en el siguiente enlace:  
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---
## Test para el API con PostMan y resultado obtenidos

## 1. Crear Usuario

**Método:** `POST`  
**URL:** `localhost:3000/users`  

### Código Postman para el Body

```json
{
    "name": "marcooo",
    "email": "azul2dasoo@gmail.com",
    "password":"dsadasdasd"
}
```

### Código Postman para el Test
```javascript

pm.test("El código de estado es 201", function() {
    pm.response.to.have.status(201);
});

pm.test("El tiempo de respuesta es menor a 500 ms", function() {
    pm.expect(pm.response.responseTime).to.be.below(500); 
});

pm.test("La respuesta está en formato JSON", function() {
    pm.response.to.be.json; 
});

pm.test("La respuesta tiene los campos esperados", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("id"); 
    pm.expect(jsonData).to.have.property("name"); 
    pm.expect(jsonData).to.have.property("email"); 
});

```
<h3>Crear Usuario</h3>
<p>Este es un ejemplo de cómo se realiza la solicitud, como tabien de los resultado esperados.</p>
<img src="./img/crear un usuario.png" alt="Crear Usuario" width="1200">



## 2. Crear Usuario con un email ya registrado en la base de datos

**Método:** `POST`  
**URL:** `localhost:3000/users`  

### Código Postman para el Body

```json
{
    "name": "juan",
    "email": "azul2dasoo@gmail.com",
    "password":"123456789"
}
```

### Código Postman para el Test
```javascript

pm.test("El código de estado es 400", function() {
    pm.response.to.have.status(400);
});

pm.test("La respuesta tiene el mensaje de error esperado", function() {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("message", "Email already exists");
    pm.expect(jsonData).to.have.property("error", "Bad Request");
    pm.expect(jsonData).to.have.property("statusCode", 400); 
});


```
<h3>Crear Usuario</h3>
<p>Este es un ejemplo de cómo se realiza la solicitud, como tabien de los resultado esperados.</p>
<img src="./img/crear un usuario ¨email existe¨.png" alt="Crear Usuario" width="1200">



## 3. Obtener todos los Usuarios

**Método:** `GET`  
**URL:** `localhost:3000/users`  


### Código Postman para el Test
```javascript

pm.test("El codigo de estado es 200", function() {
    pm.response.to.have.status(200)
});
pm.test("El tiempo de respuesta es menor a 500 ms", function() {
    pm.expect(pm.response.responseTime).to.be.below(500);
});
pm.test("La respuesta esta en  formato Json", function() {
    pm.response.to.be.json;
})
pm.test("La respuesta tiene los campos esperados", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an('array');
    jsonData.forEach(item => {
        pm.expect(item).to.have.property("id");
        pm.expect(item).to.have.property("name");
        pm.expect(item).to.have.property("email");
    });
});



```
<h3>Obtener todos los Usuarios</h3>
<p>Este es un ejemplo de cómo se realiza la solicitud, como tabien de los resultado esperados.</p>
<img src="./img/obtener todos los usuarios.png" alt="Crear Usuario" width="1200">


## 4. Obtener Usuario por ID

**Método:** `GET`  
**URL:** `localhost:3000/users/[el id del usuario del que desea obtener los datos]`  

### Código Postman para el Body


### Código Postman para el Test
```javascript

pm.test("El codigo de estado es 200", function() {
    pm.response.to.have.status(200)
});
pm.test("El tiempo de respuesta es menor a 500 ms", function() {
    pm.expect(pm.response.responseTime).to.be.below(500);
});
pm.test("La respuesta esta en  formato Json", function() {
    pm.response.to.be.json;
})
pm.test("La respuesta tiene los campos esperados", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("id");
    pm.expect(jsonData).to.have.property("name");
    pm.expect(jsonData).to.have.property("email");
});


```
<h3>Obtener Usuario por ID</h3>
<p>Este es un ejemplo de cómo se realiza la solicitud, como tabien de los resultado esperados.</p>
<img src="./img/obtener usuario por id.png" alt="Crear Usuario" width="1200">


## 5. Cuando un Usuario no es encontrado por ID

**Método:** `GET`  
**URL:** `localhost:3000/users/999`  


### Código Postman para el Test
```javascript

pm.test("El código de estado es 404", function() {
    pm.response.to.have.status(404);
});

pm.test("La respuesta tiene el mensaje de error esperado", function() {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("message", "User not found");
    pm.expect(jsonData).to.have.property("error", "Not Found");
    pm.expect(jsonData).to.have.property("statusCode", 404);
});



```
<h3>Cuando un Usuario no es encontrado por ID</h3>
<p>Este es un ejemplo de cómo se realiza la solicitud, como tabien de los resultado esperados.</p>
<img src="./img/usuario no encontrado por id.png" alt="Crear Usuario" width="1200">


## 6. Editar Usuario

**Método:** `PUT`  
**URL:** `localhost:3000/users/[el id del usuario del que desea editar datos]`  

### Código Postman para el Body

```json
{
    "name": "andres",
    "email": "patiño@gmail.com",
    "password":"lucas moura"
}
```

### Código Postman para el Test
```javascript

pm.test("El código de estado es 200", function() {
    pm.response.to.have.status(200); 
});

pm.test("La respuesta está en formato JSON", function() {
    pm.response.to.be.json; 
});

pm.test("La respuesta tiene los campos esperados", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("id"); 
    pm.expect(jsonData).to.have.property("name"); 
    pm.expect(jsonData).to.have.property("email"); 
});



```
<h3>Editar Usuario</h3>
<p>Este es un ejemplo de cómo se realiza la solicitud, como tabien de los resultado esperados.</p>
<img src="./img/editar un usuario.png" alt="Crear Usuario" width="1200">


## 7. Editar Usuario con un email ya existente en la base de datos

**Método:** `PUT`  
**URL:** `localhost:3000/users/[el id del usuario del que desea editar datos]`  

### Código Postman para el Body

```json
{
    "name": "andres22",
    "email": "patiño@gmail.com",
    "password":"lucasmoura222"
}
```

### Código Postman para el Test
```javascript

pm.test("El código de estado es 400", function() {
    pm.response.to.have.status(400);
});

pm.test("La respuesta tiene el mensaje de error esperado", function() {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("message", "Email already exists");
    pm.expect(jsonData).to.have.property("error", "Bad Request");
    pm.expect(jsonData).to.have.property("statusCode", 400); 
});



```
<h3>Editar Usuario con un email ya existente en la base de datos</h3>
<p>Este es un ejemplo de cómo se realiza la solicitud, como tabien de los resultado esperados.</p>
<img src="./img/error al editar un usuario con un email que ya exite en la base de datos.png" alt="Crear Usuario" width="1200">


## 8. Cuando un Usuario no es encontrado por ID al intentar editar sus datos

**Método:** `PUT`  
**URL:** `localhost:3000/users/999`  


### Código Postman para el Test
```javascript

pm.test("El código de estado es 404", function() {
    pm.response.to.have.status(404);
});

pm.test("La respuesta tiene el mensaje de error esperado", function() {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("message", "User not found");
    pm.expect(jsonData).to.have.property("error", "Not Found");
    pm.expect(jsonData).to.have.property("statusCode", 404);
});


```
<h3>Cuando un Usuario no es encontrado por ID al intentar editar sus datos</h3>
<p>Este es un ejemplo de cómo se realiza la solicitud, como tabien de los resultado esperados.</p>
<img src="./img/no encontrado al editar un usuario.png" alt="Crear Usuario" width="1200">


## 9. Eliminar un Usuario

**Método:** `DELETE`  
**URL:** `localhost:3000/users/[el id del usuario del que desea editar datos]`  


### Código Postman para el Test
```javascript

pm.test("El código de estado es 200", function() {
    pm.response.to.have.status(200); 
});

pm.test("La respuesta está en formato JSON", function() {
    pm.response.to.be.json;
});

pm.test("La respuesta tiene el mensaje esperado de eliminación exitosa", function() {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("statusCode", 200);
    pm.expect(jsonData).to.have.property("message", "User deleted successfully");
});


```
<h3>Eliminar un Usuario</h3>
<p>Este es un ejemplo de cómo se realiza la solicitud, como tabien de los resultado esperados.</p>
<img src="./img/eliminar usuario.png" alt="Crear Usuario" width="1200">


## 10. Cuando un Usuario no es encontrado por ID al intentar eliminarlo

**Método:** `GET`  
**URL:** `localhost:3000/users/999`  


### Código Postman para el Test
```javascript

pm.test("El código de estado es 404", function() {
    pm.response.to.have.status(404);
});

pm.test("La respuesta tiene el mensaje de error esperado", function() {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("message", "User not found");
    pm.expect(jsonData).to.have.property("error", "Not Found");
    pm.expect(jsonData).to.have.property("statusCode", 404);
});




```
<h3>Cuando un Usuario no es encontrado por ID al intentar eliminarlo</h3>
<p>Este es un ejemplo de cómo se realiza la solicitud, como tabien de los resultado esperados.</p>
<img src="./img/usuario no encontrado por id.png" alt="Crear Usuario" width="1200">
