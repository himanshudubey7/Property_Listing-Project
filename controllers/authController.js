const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (userId)=>{
    return jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:
        '1d'
    });
};

//register route:

exports.registerUser =async(req,res)=>{
    try{
    const {name, email,password} = req.body;
    const existingUser = await User.findOne({email});
    if(existingUser){
        res.status(400).json({message:'User alreay exists!!'});
    }
    
    const user = User.create({
        name, email,password
    });

    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
    });
}
catch(err){
    res.status(500).json({message:'server error', error: err.message});
}
};

//login route
exports.loginUser= async(req,res)=>{
    try{
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        res.status(400).json({message: 'User not found!!'});
    }
    const isMatch= await user.matchPassword(password);
    if(!isMatch){
        res.status(400).json({message: 'Invalid Credentials!!'});
    }
    res.status(200).json({
        _id: user._id,
        name: user.name,
        email:user.email,
          token: generateToken(user._id),
    });
}
catch(err){
      res.status(500).json({message:'server error', error: err.message});

}
};