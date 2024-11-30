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
