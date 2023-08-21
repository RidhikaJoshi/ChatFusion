const express=require('express');
const app=express();


const dotenv=require('dotenv');
dotenv.config();

const { chats }= require("./Data/data");

app.get("/",(req,res)=>{
    res.send("Hello Server");
});

app.get("/api/chat",(req,res)=>{
    res.send(chats);
});
app.get("/api/chat/:id",(req,res)=>{
   
    console.log(req.params.id);
    const singlechat=chats.find((x)=>x._id===req.params.id);
     res.send(singlechat);
})
const PORT =process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
