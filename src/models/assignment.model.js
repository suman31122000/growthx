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
