# Documentación de API: CRUD de Usuarios

Esta documentación incluye el código Postman para probar la API, imágenes que demuestran el resultado obtenido al realizar el test, y un enlace para acceder a la documentación generada automáticamente.

---

## URL Base


### Documentación Swagger

Accede a la documentación en Swagger en el siguiente enlace:  
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

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
