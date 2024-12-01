
BACKEND(NodeJS ExpressJS MongoDB)
Assignment Submission Portal - Project Documentation
Objective
Develop a backend system for an assignment submission portal that supports Users and Admins. The system allows users to upload assignments and admins to accept or reject those assignments.

---

Technology Stack
Backend Framework: Node.js with Express.js
Database: MongoDB
Language: JavaScript 
Authentication: JSON Web Tokens (JWT)
---

Assignment Submission Portal - Project Documentation
Objective
Develop a backend system for an assignment submission portal that supports Users and Admins. The system allows users to upload assignments and admins to accept or reject those assignments.

Technology Stack
Backend Framework: Node.js with Express.js
Database: MongoDB
Language: JavaScript (TypeScript optional for enhanced typing and maintainability)
Authentication: JSON Web Tokens (JWT)
File Upload: Multer


Features
User Functionality:
User registration and login.
Ability to upload assignments.
Admin Functionality:
Admin registration and login.
View all assignments tagged to them.
Accept or reject assignments with reasons if needed.
 
 setup for this project
 
check node  and npm version
```bash
node -v
npm -v
```
if not shows any version then install it

Initialize the Project: Run the following command to create a package.json file, which manages project dependencies and metadata
```bash
npm init
```

You'll be prompted to provide details such as:
Package name
Version
Description
Entry point (default: index.js)
author

Now first install all the dependicies which are we goind to need

```bash
npm i express
npm i mongoose
npm i cookie-parser
npm i cors
npm i dotenv
npm i bcryptjs
npm i jsonwebtoken
npm i nodemon
```
---
DATABASE SCHEMA
![alt text](image.png)




