require('dotenv').config();
const express = require('express');

const app = express();

app.get('/',(req,res)=>{
    res.send("hello")
});

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log("server started on port ",PORT);
})