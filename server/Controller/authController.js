const User = require('../Models/UserModel.js')
const bcryptjs = require('bcryptjs');
const errorHandler = require('../Utils/err.js')



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
            next(errorHandler(400 , 'Username or email already exists'))
            // return res.status(400).json({ message: 'Username or email already exists' });
        }
        // Generic error response
        next(error)
    }
};

module.exports = {
    signup
};
