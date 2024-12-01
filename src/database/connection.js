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
