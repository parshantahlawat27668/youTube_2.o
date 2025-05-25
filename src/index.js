import {config} from "dotenv";
import path from "path";
config({ path: path.resolve(process.cwd(), '.env') });
import app from "./app.js";
import dbConnection from "./db/index.js";

dbConnection();
const PORT=process.env.PORT;
app.listen(PORT,()=>{
console.log("server running on port : ",PORT);
});