# Blog App (TypeScript + Express + MongoDB)

A simple Blog application built with **TypeScript**, **Express**, and **Mongoose**. It allows users to register, log in, and perform full CRUD operations on blog posts after authentication.

---

## Features

- Sign up and log in with JWT authentication.
- Full CRUD operations on blog posts.
- Soft delete functionality.
- Clean and modular TypeScript code.

---

## Installation & Setup

1. **Clone the project**
```bash
git clone https://github.com/your-username/blog-app.git
cd blog-app
Method	Endpoint	Description
POST	/	Create a new blog post
GET	/	Get all blog posts
GET	/:blogId	Get a single blog post
PATCH	/:blogId	Update a blog post
DELETE	/:blogId	Delete a blog post
PUT	/:blogId	Soft delete a blog post

src/
├── DB/
│   └── dbConnection.ts
├── middleWare/
│   ├── auth.middleWare.ts
│   └── errHandler.middleWare.ts
├── modules/
│   ├── authModule/
│   │   ├── auth.controller.ts
│   │   └── auth.router.ts
│   └── blogModule/
│       ├── blog.controller.ts
│       └── blog.router.ts
├── app.controller.ts
index.ts
