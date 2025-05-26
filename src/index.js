import {config} from "dotenv";
import path from "path";
config({ path: path.resolve(process.cwd(), '.env') });
import app from "./app.js";
import dbConnection from "./db/index.js";

const PORT=process.env.PORT || 8000;
dbConnection()
.then(()=>{
    app.listen(PORT,()=>{
    console.log("server running on port : ",PORT);
    });
})
.catch((error)=>{
    console.log("Database connection failed");
});