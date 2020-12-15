const { default: Axios } = require("axios");
const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000; 
require('dotenv').config()

const Twitter = require("./api/helpers/twitter.js");
const twitter = new Twitter();

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin" , "*");
    next();
})

app.get('/tweets' , (req,res) => {
    //req.query is used to get the paramter passed in the get request eg:http://localhost:3000/tweets/?q=coding&count=10 we will get {q:'coding',count:'10'}
    const query = req.query.q;
    const count = req.query.count;
    const maxId = req.query.max_id
    twitter.get(query,count,maxId).then((response)=>{
        res.status(200).send(response.data);
    }).catch((error)=>{
        res.status(400).send(error);
    })
   
})

app.get('/trends' , (req,res) => {
    //req.query is used to get the paramter passed in the get request eg:http://localhost:3000/trends/?id=23424848 we will get {id:'23424848'}
    const id = req.query.id;
    twitter.getTrend(id).then((response)=>{
        res.status(200).send(response.data);
    }).catch((error)=>{
        res.status(400).send(error);
    })
   
})


app.listen(port, () =>{
    console.log(`Listening to port at http://localhost:${port}`);
})