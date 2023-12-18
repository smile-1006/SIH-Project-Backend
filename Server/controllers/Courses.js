const Course = require("../models/Course");


exports.addCourse = async(req, res) => {
    try{
        const { course_name, instructor_name, platform, duration, start_in, course_status } = req.body;

        if(!course_name || !instructor_name || !platform || !duration || !start_in || !course_status){
            return res.status(400).json({
                success : false,
                message : "All Fields are Mandatory"
            })
        }

        //check the auth for AICTE-MEMBER or Admin
        const existingID = await Course.findOne({ course_status});

        if(existingID){
            return res.status(400).json({
                success : false,
                message : "The Institute with this AICTE ID is already registered, please Put unique ID."
            })
        }

        const newInstitution = await Course.create({
            course_name, 
            instructor_name, 
            platform, 
            duration, 
            start_in, 
            course_status
        });

        res.status(200).json({
			success: true,
			message: "Course Added Successfully",
            data : newInstitution
		});


}