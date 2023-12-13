const { successfullyRegistered } = require("../mail/successfullyRegistration");
const Profile = require("../models/Profile");
const User = require("../models/User");


exports.updateProfile = async(req, res) => {
    try{
        const { dateOfBirth = "", about = "", contactNumber = "" } = req.body;
        const id = req.user.id;

        const userDetails = await User.findOne(id);
        const profile = await Profile.findById(userDetails.additionalDetails);

        profile.dateOfBirth = dateOfBirth;
        profile.about = about;
        profile.contactNumber = contactNumber;

        await profile.save();

        return res.json({
            success : true,
            message : "Profile Updated Successfully",
            profile
        });
    }   
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            error : error.message
        })
    }
}

exports.deleteAccount = async (req, res) => {
    try{
        
        const id = req.user.id;
        const user = await User.findById({ _id : id });
        if(!user) {
            return res.status(404).json({
                success : false,
                message : "User not found"
            })
        }
        
        await Profile.findByIdAndDelete({ _id : id });
        res.status(200).json({
            success : true,
            message : "User deleted Successfully"
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : "User Cannot be deleted Successfully"
        });
    }
}