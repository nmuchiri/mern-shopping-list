const express = require('express')
const mongoose = require('mongoose')
const bodyParser= require('body-parser')

const items = require('./routes/api/items')

//initialize express
const app= express()


//bodyparser middleware
app.use(bodyParser.json())


// DB config

const mongoURI = 'mongodb+srv://Naomi:Prosthetic30@cluster0.gjlp2.mongodb.net/mern-shopping-list?retryWrites=true&w=majority' 
const db = mongoose.connection

// const db= require('./config/keys').mongoURI

// connect to mongoDB using mogoose
mongoose.connect(mongoURI , { // start connection to db
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
},()=>{
    console.log("Mongo connection established.")
})
// connection error handeling.
db.on('error', (err)=> console.log(err.message + ' Mongo is not running'))
db.on('connected', ()=> console.log('Mongo connected: ' + mongoURI))
db.on('disconnected', ()=> console.log('Mongo Disconnected'))

//use routes
app.use('/api/items', items)

const port = process.env.PORT || 5000

app.listen(port, ()=> console.log(`server started on port ${port}`))