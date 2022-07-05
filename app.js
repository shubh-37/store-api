require('dotenv').config();
//async errors



const express = require('express');
const app = express();
const mongodb = require('mongodb');
const bodyParser = require('body-parser');

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('<h1>Store API</h1> <a href = "/api/v1/products"> products route</a>')
})

//product routes

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async ()=>{
    try{
        //connectDB
        app.listen(PORT, ()=>{
            console.log(`Server running on port: ${PORT}...`)
        });
    }catch(error){
        console.log(error);
    }
}

start();
