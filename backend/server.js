require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')


const app = express()

const port = process.env.PORT || 5000;


//middlewares
app.use(express.json())
app.use(cookieParser()) //Helps you know a user's preference on your website
app.use(logger('dev'))  //Helps you write/note all the activities a user does on a website
app.use(express.urlencoded({ extended: false }))
app.use(cors())



mongoose.connect(process.env.MONGO_URI).
then(()=>{
    app.listen(port, ()=>{
        console.log('We are connected to the database')
    })
}).catch((error)=>{
      console.log(error)
})





