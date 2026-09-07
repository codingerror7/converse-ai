import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.get("/",(req,res)=>{
    res.send("Hello from converse-ai backend server");  
})
app.listen(PORT,()=>{
    try{
        console.log(`Server is running on port ${PORT}`);
    }
    catch(err){
        console.log(err);
    }
});