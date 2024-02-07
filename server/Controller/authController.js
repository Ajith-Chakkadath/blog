const User = require('../Models/UserModel.js')
const bcryptjs = require('bcryptjs');
const errorHandler = require('../Utils/err.js')
const jwt = require('jsonwebtoken')



const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password || username == '' || email == '' || password == '') {
      next(errorHandler(400,'all field are required'))
    }

    try {
        const hasedPassword = bcryptjs.hashSync(password ,10)
        const newUser = new User({
            username,
            email,
            password: hasedPassword
        });
      
        await newUser.save();
     
        res.json('Signup successful');
    } catch (error) {
        // Handle errors, for example, duplicate key error
        if (error.code === 11000) { // MongoDB duplicate key error
           return next(errorHandler(400 , 'Username or email already exists'))
            // return res.status(400).json({ message: 'Username or email already exists' });
        }
        // Generic error response
        next(error)
    }
};

const signin = async (req,res,next ) =>{
    const { email, password } = req.body;
    if ( !email || !password ||  email == '' || password == '') {
      next(errorHandler(400,'all field are required'))
    }

    try {
        const validUser = await User.findOne({email})

        if(!validUser){
           return next(errorHandler(400,'Wrong Crediental'))
        }
        const validPassword = bcryptjs.compareSync(password,validUser.password)
            if(!validPassword){
                  return next(errorHandler(400,'Wrong Crediental'))
            }

        const token = jwt.sign(
           { id:validUser._id},process.env.JWT_SECRET,
        )

        const {password:passWord , ...rest} = validUser._doc
            res.status(200).cookie('access_token', token ,{httpOnly:true}).json(rest)
        
    } catch (error) {
        next(error)
    }
}

const google = async (req,res,next)=>{
const {name , email , googlePhotoUrl} = req.body
try {
    const user = await User.findOne({email})
    if(user){
        const token = jwt.sign({ id:user._id},process.env.JWT_SECRET)
        const {password , ...rest} = user._doc
        res.status(200).cookie('access_token', token ,{httpOnly:true}).json(rest)
    }else{
        const generatedpassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
        const hasedPassword =  bcryptjs.hashSync(generatedpassword ,10)
        const newUser = new User({
            username : name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-3),
            email,
            password: hasedPassword,
            profilePicture : googlePhotoUrl
        });
      
        await newUser.save();
        const token = jwt.sign({ id:newUser._id},process.env.JWT_SECRET)
        const {password , ...rest} = newUser._doc
        res.status(200).cookie('access_token', token ,{httpOnly:true}).json(rest)
    }
    
} catch (error) {
    next(error)
}
}

module.exports = {
    signup,signin,google
};
