const mongoose=require("mongoose");
mongoose.connect("mongodb://0.0.0.0/signup").then(()=>console.log("connected"));