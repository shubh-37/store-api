require('dotenv').config();
require('express-async-errors');



const express = require('express');
const app = express();
const mongodb = require('mongodb');
const bodyParser = require('body-parser');

const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('<h1>Store API</h1> <a href = "/api/v1/products"> products route</a>')
})

app.use('/api/v1/products',productsRouter);

//product routes

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async ()=>{
    try{
        //connectDB
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, ()=>{
            console.log(`Server running on port: ${PORT}...`)
        });
    }catch(error){
        console.log(error);
    }
}

start();
