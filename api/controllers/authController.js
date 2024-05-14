const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// @POST for registeration
const register = asyncHandler(async (req,res) => {
    try {
        //hashingPassword
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(req.body.password, salt);
        //create New User
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        });
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json("Error in Registeration");
    }
})

// @POST for login
const login = asyncHandler(async (req,res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        // handle wrong crendantials 
        !user && res.status(400).json("username is not exist");
        const comparePassword = await bcrypt.compareSync(req.body.password, user.password);
        !comparePassword && res.status(400).json("Wrong Password");    
        // jwt token create
         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
           expiresIn: "7d",
         });
res.cookie("access_token", token, { httpOnly: true }).status(200).json({token,user});
    } catch (err) {
        res.status(500).json("Error in Login");
    }
})

module.exports={register,login}