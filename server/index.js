const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
dotenv.config()
const userRoutes = require('./Routes/userRoute')
const authRoutes = require('./Routes/authRoute')
const cookieParser = require('cookie-parser')

mongoose.connect(process.env.MONGO_connect).then(() => {console.log('Mongodb is connected')}).catch((err)=>{
    console.log(err)
})


const app = express()
app.use(express.json())

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error'

    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
})

app.use(cookieParser)

app.listen(3000 , ()=>{
    console.log('Server start to run at port 3000')
})