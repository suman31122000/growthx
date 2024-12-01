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

const getadmin=async(req,res)=>{
  try {
    const admin=await User.find({role:"admin"}).select("name email");
    return res.status(200).json(admin)
  } catch (error) {
    console.log(error,"admindata in problem");
  }
}

export { registerUser, loginUser, uploadAssignment,getadmin};
