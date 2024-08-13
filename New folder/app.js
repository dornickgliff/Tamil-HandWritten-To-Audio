const express=require("express");
const app=express();
app.use(express.json());
app.listen(1000,()=>{
    console.log("server started");
});