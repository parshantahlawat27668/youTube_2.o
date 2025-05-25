import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const dbConnection = async ()=>{
try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}?retryWrites=true&w=majority`);
    console.log("Database connected ! HOST: ", connectionInstance.connection.host);
} catch (error) {
    console.error("DB connection failed", error);
    process.exit(1);
}
}
export default dbConnection;