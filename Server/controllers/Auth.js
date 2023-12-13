const bcrypt = require("bcrypt");
const User = require("../models/User");
const OTP = require("../models/OTP");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/passwordUpdate");
const { successfullyRegistered } = require("../mail/successfullyRegistration");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, accountType } = req.body;
    if (!firstName || !lastName || !email || !password || !accountType) {
      return res.status(403).send({
        success: false,
        message: "All Fields Are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists. Please sign in to continue.",
      });
    }

    // const response = await OTP.find({ email }).sort({ created : -1 }).limit(1);
    //   console.log(response);
    //   if(response.length == 0)
    //   {
    //       return res.status(400).json({
    //           success : false,
    //           message : "Invalid OTP"
    //       });
    //   }else if(otp !== response[0].otp) {
    //       return res.status(400).json({
    //           success : false,
    //           message : "Invalid OTP"
    //       });
    //   }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profileDetails = await Profile.create({
      gender : null,
      dateOfBirth : null,
      about : null,
      contactNumber : null
    })

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      additionalDetails : profileDetails._id,
      image : `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
      accountType,
    });

    try{
      const emailResponse = await mailSender(
        user.email, `Welcome to Aicte!`, 
        successfullyRegistered(`${user.firstName} ${user.lastName}`, `${user.accountType}`)
      );

    }catch(err){
        res.status(200).json({
        success: true,
        message: "User Registered Successfully",
      });
    }
  
    return res.status(200).json({
      success: true,
      message: "User Registered Successfully",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Please try again!",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered with Us please Signup to Continue",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          email: user.email,
          id: user._id,
          accountType: user.accountType,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User login successfully",
      });
    } 
    else {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password",
      });
    }
  } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success : false,
            "message" : "Internal Server Error"
        })
  }
};

exports.sendotp = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user is already present
    // Find user with provided email
    const checkUserPresent = await User.findOne({ email });
    // to be used in case of signup

    // If user found with provided email
    if (checkUserPresent) {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `User is Already Registered`,
      });
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const result = await OTP.findOne({ otp: otp });
    console.log("Result is Generate OTP Func");
    console.log("OTP", otp);
    console.log("Result", result);
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    console.log("OTP Body", otpBody);
    res.status(200).json({
      success: true,
      message: `OTP Sent Successfully`,
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.changePassword = async (req, res) => {
    try{

        const userDetails = await User.findOne(req.user.body);

        const { oldPassword, newPassword, confirmNewPassword } = req.body;

        const isPasswordMatch = await bcrypt.compare(oldPassword, userDetails.password);

        if(!isPasswordMatch){
          return res.status(401).json({
            success : false,
            message : "old password doesn't match"
          })
        }

        if(newPassword !== confirmNewPassword){
          return res.status(401).json({
            success : false,
            message : "New Password & Confirm New Password doesn't match"
          })
        }

        const encryptedPassword = await bcrypt.hash(newPassword, 10);

        const updatedUserDetails = await User.findByIdAndUpdate(req.user.id, { password : encryptedPassword }, { new : true });

        try{
          const emailResponse = await mailSender(
            updatedUserDetails.email, `Password Updated Successfully`, 
            passwordUpdated(
              updatedUserDetails.email, `${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
            )
          );

              console.log("Email sent successfully:", emailResponse.response);
        }
        catch(error){
            console.error("Error occurred while sending email:", error);
            return res.status(500).json({
              success : false,
              message : "Error occurred while sending email",
              error : error.message
            });
        }

        return res.status(200).json({
          success : true,
          message : "Password Updated Succesfully"
        })


    }   
    catch(err){ 
        console.log("Error occurred while updating password:", err);
        return res.status(500).json({
          success : false,
          message : "Error occurred while updating password",
          error : err.message
        })
    }
};
