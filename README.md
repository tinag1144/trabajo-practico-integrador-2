# Sistema de Gestión de Blog Personal con MongoDB y Mongoose

## Descripción General
Este proyecto consiste en el desarrollo de un sistema de blog personal construido con Node.js, Express, MongoDB y Mongoose.  
Permite la autenticación de usuarios, la gestión de artículos, etiquetas y comentarios, y maneja relaciones 1:1, 1:N y N:M, además de validaciones completas con express-validator.

## Objetivo
Desarrollar una API RESTful funcional y segura que implemente:
- Autenticación y autorización con JWT y cookies seguras.
- Gestión de usuarios, artículos, etiquetas y comentarios.
- Validaciones completas en express-validator y Mongoose.
- Relaciones embebidas y referenciadas.
- Eliminación lógica y en cascada.

## Tecnologías Utilizadas
Backend: Node.js + Express  
Base de datos: MongoDB  
ODM: Mongoose  
Autenticación: JWT + Cookies httpOnly  
Seguridad: Bcrypt  
Validaciones: express-validator  
Configuración: dotenv  
Control de versiones: Git + GitHub  

## Instalación y Configuración

1. Clonar el repositorio  
   git clone https://github.com/tuUsuario/trabajo-practico-integrador-2.git  
   cd trabajo-practico-integrador-2

2. Instalar dependencias  
   npm install

3. Configurar variables de entorno  
   Crear un archivo `.env` basado en `.env.example`:
   PORT=4000  
   MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/blog  
   JWT_SECRET=tuSecretoJWT

4. Iniciar el servidor  
   npm run dev  
   Servidor disponible en http://localhost:4000

## Estructura del Proyecto
src/  
 ├── config/           (Configuración MongoDB)  
 ├── controllers/      (Controladores CRUD)  
 ├── helpers/          (JWT y bcrypt helpers)  
 ├── middlewares/      (Autenticación, permisos, validaciones)  
 ├── models/           (Modelos Mongoose)  
 ├── routes/           (Definición de endpoints)  
 └── validations/      (Validaciones express-validator)  

## Modelos y Relaciones

User  
- username, email, password (hasheado con bcrypt)  
- role: 'user' o 'admin'  
- profile embebido (relación 1:1)  
- relaciones:  
  - 1:N → User → Article  
  - 1:N → User → Comment  

Article  
- title, content, excerpt, status  
- author → referencia a User (1:N)  
- tags → array de ObjectIds (N:M)  
- comments → referencias a Comment  

Tag  
- name, description  
- relación N:M con Article  

Comment  
- content, author (User), article (Article)  
- relación 1:N referenciada  

## Tipos de Relaciones

User ↔ Profile  
Tipo: 1:1 (embebida)  
Descripción: Datos personales dentro del usuario.

User → Article  
Tipo: 1:N (referenciada)  
Descripción: Un usuario puede crear varios artículos.

Article → Comment  
Tipo: 1:N (referenciada)  
Descripción: Un artículo puede tener varios comentarios.

Article ↔ Tag  
Tipo: N:M (referenciada)  
Descripción: Un artículo puede tener múltiples etiquetas y viceversa.

## Justificación: Embebido vs Referenciado

Profile en User  
Tipo: Embebido  
Justificación: Datos que siempre se consultan junto al usuario.

Article y Comment  
Tipo: Referenciado  
Justificación: Consultas independientes y mayor escalabilidad.

Article y Tag  
Tipo: Referenciado (N:M)  
Justificación: Reutilización de etiquetas y consistencia de datos.

## Autenticación y Autorización

- Login y registro con JWT y bcrypt.  
- Tokens enviados en cookies httpOnly.  
- Middlewares principales:  
  - authMiddleware: verifica el token del usuario autenticado.  
  - adminMiddleware: restringe el acceso a usuarios administradores.  
  - ownerMiddleware / authorMiddleware: valida la propiedad del recurso (artículo o comentario).

## Endpoints Principales

Auth  
POST /api/auth/register → Registro de usuario  
POST /api/auth/login → Login con JWT  
GET /api/auth/profile → Perfil del usuario autenticado  
PUT /api/auth/profile → Actualizar perfil  
POST /api/auth/logout → Cerrar sesión  

Users (solo admin)  
GET /api/users → Listar todos los usuarios  
GET /api/users/:id → Obtener usuario con sus artículos y comentarios  
PUT /api/users/:id → Actualizar usuario  
DELETE /api/users/:id → Eliminar usuario físicamente  

Articles  
POST /api/articles → Crear artículo  
GET /api/articles → Listar artículos publicados  
GET /api/articles/:id → Obtener artículo completo  
GET /api/articles/my → Listar artículos del usuario actual  
PUT /api/articles/:id → Actualizar artículo (solo autor o admin)  
DELETE /api/articles/:id → Eliminar artículo (solo autor o admin)  

Tags  
POST /api/tags → Crear etiqueta (solo admin)  
GET /api/tags → Listar todas las etiquetas  
GET /api/tags/:id → Obtener etiqueta con los artículos asociados  
PUT /api/tags/:id → Actualizar etiqueta (solo admin)  
DELETE /api/tags/:id → Eliminar etiqueta (solo admin)  

Comments  
POST /api/comments → Crear comentario  
GET /api/comments/article/:articleId → Listar comentarios de un artículo  
GET /api/comments/my → Listar comentarios del usuario autenticado  
PUT /api/comments/:id → Actualizar comentario (solo autor o admin)  
DELETE /api/comments/:id → Eliminar comentario (solo autor o admin)  

Article Tags (relación N:M)  
POST /api/articles/:articleId/tags/:tagId → Agregar etiqueta a artículo  
DELETE /api/articles/:articleId/tags/:tagId → Quitar etiqueta de artículo  

## Validaciones Implementadas

User/Auth  
- username: 3–20 caracteres, alfanumérico, único.  
- email: formato válido, único.  
- password: mínimo 8 caracteres, incluye mayúscula, minúscula y número.  
- role: solo ‘user’ o ‘admin’.

Article  
- title: 3–200 caracteres, obligatorio.  
- content: mínimo 50 caracteres.  
- excerpt: máximo 500 caracteres.  
- status: 'published' o 'archived'.  
- author: ObjectId válido (y coincide con usuario logueado o admin).

Tag  
- name: 2–30 caracteres, sin espacios, único.  
- description: máximo 200 caracteres.

Comment  
- content: 5–500 caracteres.  
- author y article: deben ser ObjectId válidos.  
- Verifica que el artículo exista antes de crear un comentario.

## Eliminación Lógica y en Cascada
- Soft delete: campo deletedAt en User.  
- Cascada:  
  - Al eliminar un Article, se eliminan todos sus Comments.  
  - Al eliminar un Tag, se remueve de todos los Articles asociados.

## Ejemplo de Request / Response

Crear artículo  
POST /api/articles  
{
  "title": "Mi primer artículo",
  "content": "Contenido completo de prueba con más de 50 caracteres...",
  "excerpt": "Resumen breve",
  "status": "published"
}

Response  
{
  "ok": true,
  "msg": "Artículo creado correctamente",
  "data": {
    "_id": "6710c58a37b44f0d3c1f812a",
    "title": "Mi primer artículo",
    "status": "published"
  }
}

## Ventajas del Diseño
- Uso de referencias para escalabilidad (artículos, tags, comentarios).  
- Uso de documentos embebidos donde hay alta cohesión (perfil).  
- Validaciones combinadas entre Mongoose y express-validator.  
- Arquitectura modular: controladores, middlewares, helpers.  
- Código seguro y mantenible con roles y autenticación JWT.

## Control de Versiones
- main → rama estable.  
- develop → integración.  
- proyecto-integrador-mongodb → desarrollo principal.  
- Mínimo 10 commits descriptivos durante el desarrollo.  
- Merge limpio de ramas sin conflictos.

## Autores
Proyecto desarrollado por estudiantes del curso Tecnicatura en Programación (PoloTIC Misiones)  
Profesor: [Nombre del docente]  
Año: 2025
