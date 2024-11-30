import express from "express";
import  Router  from "express";
import { registerUser, loginUser, uploadAssignment } from "../controller/user.controller.js";
import { getAssignments ,updateAssignmentStatus} from "../controller/admin.controller.js";
import auth from "../middleware/authmiddleware.js";

//creating routes
const router = Router();
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/admin').post(auth,registerUser);
router.route('/assignments/:id/accept').post(auth,updateAssignmentStatus);
router.route('/assignments/:id/reject').post(auth,updateAssignmentStatus);
router.route('/assignments').get(auth,getAssignments);
router.route('/upload').post(auth,uploadAssignment);
export default router;




