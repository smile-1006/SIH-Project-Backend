const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

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

exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};


function isfileTypeSupported(type, supportedTypes)
{   
    return supportedTypes.includes(type);
}

exports.updateDisplayPicture = async (req, res) => {
    try{
        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;
        
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = displayPicture.name.split('.')[1].toLowerCase();


        //validation
        if(!isfileTypeSupported(fileType, supportedTypes))
        {
            return res.status(400).json({
                success : false,
                message : "File not supported"
            })
        }

        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
          )
        const updatedProfile = await User.findByIdAndUpdate({ _id : userId }, { image : image.secure_url }, { new : true });
          
        return res.status(200).json({
            success : true,
            message : `Image Updated Successfully`,
            data : updatedProfile
        });
    }
    catch(error){
        return res.status(500).json({
			success: false,
			message: error.message,
		});
    }
}


