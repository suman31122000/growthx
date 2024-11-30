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
