const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const Post = require("../models/Post");


// @PUT for update user
const updateUser = asyncHandler(async (req, res) => {
    const { userId } = req.params.id;
    if (req.body._id === userId) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },{new:true})
            res.status(200).json(updatedUser);
         } catch (err) {
           res.status(500).json(err);
         }
    } else {
        res.status(500).json("you can only update your account");        
    }   
});

// @DELETE for delete user
const deleteUser = asyncHandler(async (req, res) => {
    const { userId } = req.params.id;
    if (req.body._id === userId) {
        // try {
        //     const user = await User.findById(userId);
            try {
                // await Post.deleteMany({ username: user.username });
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("user have been deleted!");
            } catch (err) {
                res.status(500).json(err);
            }
    // } 
//         catch (err) {
//             res.status(404).json("User not found");
//         }
}
     else {
        res.status(500).json("you can only delete your account");        
    }   
});

const singleUser = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id;
        const oneUser = await User.findById(userId);
        const {password,...others}=oneUser._doc
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
})





module.exports = { updateUser, deleteUser, singleUser };