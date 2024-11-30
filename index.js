import {connectDB} from "./src/database/connection.js";
import dotenv from "dotenv";
import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT || 5000;
//connecting to database
//then listening to port mentioned
connectDB().then(() => {
    app.listen(process.env.PORT||3001, () => {
        console.log("database connected");
        console.log(`server is running on port ${process.env.PORT}`);
    })
})
    .catch((error) => {
        console.log(error);
    })



