const errorHandler = require('../Utils/err');
const bcryptjs = require('bcryptjs');
const User = require('../Models/UserModel.js')

const test = (req, res) => {
   res.json({message: 'API is working'});
}

const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to update this user'));
    }
    if (req.body.password && req.body.password.length < 8) {
        return next(errorHandler(400, 'Password must be at least 8 characters long'));
    } else if (req.body.password) {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return next(errorHandler(400, 'Username must be between 7 and 20 characters long'));
        }
        if (req.body.username.includes(' ')) {
            return next(errorHandler(400, 'Username cannot contain spaces'));
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400, 'Username must be in lowercase'));
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(errorHandler(400, 'Username can only contain letters and numbers'));
        }
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: req.body.username,
                email: req.body.email, // Corrected typo here
                profilePicture: req.body.profilePicture,
                password: req.body.password,
            }
        }, { new: true });
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};
const deleteUser = async (req,res,next) =>{
    if(req.user.id !== req.params.userId){
        return next(errorHandler(403,'You re not allowed to delete user'))
    }
    try {
    
        await User.findByIdAndDelete(req.params.userId)
        res.status(200).json('user has been deleted')
    } catch (error) {
        next(error)
        
    }

}

const signout = (req,res,next) =>{
    try {
        res.clearCookie('access_token').status(200).json('User has been signout')
    } catch (error) {
        next(error)
    }
}

module.exports = {
    test, updateUser,deleteUser,signout
};
