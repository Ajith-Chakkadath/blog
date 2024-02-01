const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
dotenv.config()
const userRoutes = require('./Routes/userRoute')

mongoose.connect(process.env.MONGO_connect).then(() => {console.log('Mongodb is connected')}).catch((err)=>{
    console.log(err)
})


const app = express()

app.listen(3000 , ()=>{
    console.log('Server start to run at port 3000')
})

app.use('/api', userRoutes)