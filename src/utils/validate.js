
//validating data  when user registers
    const validateUserRegistration=(data) => {
      const { name, email, password, role } = data;
  
      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return { isValid: false, message: 'Name is required and must be a non-empty string.' };       //validating name
      }
  
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { isValid: false, message: 'A valid email is required.' };//validating email
      }
  
      if (!password || password.length < 6) {
        return { isValid: false, message: 'Password must be at least 6 characters long.' };   //validating password
      }
  
      if (!role || !['user', 'admin'].includes(role)) {
        return { isValid: false, message: "Role must be either 'user' or 'admin'." };//validating role
      }
  
      return { isValid: true };
    }
  
    const validateUserLogin= (data) => {
      const { email, password } = data;
  
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { isValid: false, message: 'A valid email is required.' }; //validating email
      }
  
      if (!password || password.trim().length === 0) {
        return { isValid: false, message: 'Password is required.' }; //validating password
      }
  
      return { isValid: true };
    }

  
    const validateAssignmentUpload =(data) => {
      const { userId, task, admin } = data;
  
      if (!userId || typeof userId !== 'string' || userId.trim().length === 0) {
        return { isValid: false, message: 'User ID is required and must be a non-empty string.' };   //validating user id
      }
  
      if (!task || typeof task !== 'string' || task.trim().length === 0) {
        return { isValid: false, message: 'Task description is required and must be a non-empty string.' };  //validating task
      }
  
      if (!admin || typeof admin !== 'string' || admin.trim().length === 0) {
        return { isValid: false, message: 'Admin ID is required and must be a non-empty string.' };  //validating admin id
      }
  
      return { isValid: true };
    }

  
   const validateAssignmentStatusUpdate= (data) => {
      const { status } = data;
  
      if (!status || !['accepted', 'rejected'].includes(status)) {
        return { isValid: false, message: "Status must be either 'accepted' or 'rejected'." };
      }
  
      return { isValid: true };
    }

    export { validateUserRegistration, validateUserLogin, validateAssignmentUpload, validateAssignmentStatusUpdate };