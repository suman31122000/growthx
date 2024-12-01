
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

User Schema
```js
import mongoose from "mongoose";
//creating user schema
const userSchema = new mongoose.Schema({
  name: { 
    type: String,
     required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true },
  password: { 
    type: String, 
    required: true 
},
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    required: true },
},{timestamps: true});

const growthxuser= mongoose.model("growthxuser", userSchema);
export default growthxuser;

```
Assignment Schema
```js
import mongoose from "mongoose";

//creating assignment schema
const assignmentSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true },
  task: { 
    type: String,
     required: true },
  admin: {
     type: String,
     required: true },
  status: {
     type: String, 
    enum: ['pending', 'accept', 'reject'], default: 'pending' },//setting default status as pending and enum as accept and reject
 
},{timestamps: true});//setting timestamps containig created at and updated at value
//creating assignment model
const growthxassignment = mongoose.model("growthxassignment", assignmentSchema);
export default growthxassignment;

```

connect to database for which we need mongoose so check in depedencies if not then install

```js
import mongoose from "mongoose";
//connecting to database
const connectDB = async () => {
    try {    
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`MongoDB Connected: ${conn.connection.host}`);    
    } catch (error) {
        throw error;
    }
    }
   export  {connectDB};

```
CONTROLLER
user controller
```js
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import Assignment from "../models/assignment.model.js";
import cookieParser from "cookie-parser";

//function to register user and admin
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);   // Hashing the password with the help of bycrpt
    const user = new User({ name, email, password: hashedPassword, role });//creating new user
    await user.save();//saving user
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//function to login user and admin
const loginUser = async (req, res) => {
  const { email, password } = req.body;  //accessing email and password from request
  try {
    const user = await User.findOne({ email }); //finding user in database
    if (!user) return res.status(404).json({ error: 'User not found' }); //checking user if it is present in database or not

    const isMatch = await bcrypt.compare(password, user.password); //comparing password with hashed password
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' }); //creating token by using payload and secret
    res.cookie('token', token, { httpOnly: true, secure: true }); //setting token in cookie
    return res.status(200).json({ token });
  } catch (error) {
   return res.status(500).json({ error: error.message });
  }
};

const uploadAssignment = async (req, res) => {
   const userId = req.user.name; //getting user name from req.user which is set in auth middleware
  const {  task, admin } = req.body; //accessing task and admin from request
  try {
    const assignment = new Assignment({ userId, task, admin });//creating new assignment
    await assignment.save();
    res.status(201).json({ message: 'Assignment uploaded', assignment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { registerUser, loginUser, uploadAssignment };

```
admin controller
```js
import Assignment from "../models/assignment.model.js";

//function to get all assignments of admin
const getAssignments = async (req, res) => {
  const admin = await Assignment.find({ admin:req.user._id }); //finding admin details to gets his name
  try {
    const assignments = await Assignment.find({ admin: req.user.name });//finding assignments mention in the name of admin
    return res.status(200).json(assignments);
  } catch (error) {
    returnres.status(500).json({ error: error.message });
  }
};

//function to update status of assignment
const updateAssignmentStatus = async (req, res) => {
  const path=req.url;   //accessing url
  const status=path.split("/")[3]; //splitting url to find status
  const { id } = req.params;//accessing id of assignment
  try {
    const assignment = await Assignment.findByIdAndUpdate(id, { status: status }, { new: true }); //finding assignment and updating status
   return res.status(200).json({ message: `Assignment ${status}`, assignment });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { getAssignments, updateAssignmentStatus };

```





