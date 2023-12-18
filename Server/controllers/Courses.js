const Course = require("../models/Course");

const ITEMS_PER_PAGE = 10;

exports.create_course = async(req, res) => {
    try{
        const { course_name, instructor_name, institute_name, platform, duration, start_in, course_status } = req.body;

        if(!instructor_name || !institute_name || !platform || !duration || !start_in || !course_name || !course_status)
        {
            console.log({instructor_name, institute_name, platform, duration, start_in, course_name, course_status});
            return res.status(400).json({
                success : false,
                message : "All fields are required"
            })
        }

        const existingCourse = await Course.findOne({ course_name: course_name, instructor_name: instructor_name });

        if(existingCourse){
            return res.status(401).json({
                success : false,
                message : "Your Course is already their"
            })
        }

        await Course.create({
            course_name, institute_name, instructor_name, platform, duration, start_in, course_status
        })

        return res.status(200).json({
            success : true,
            message : "Course Added"
        })


    }
    catch(error){
        console.log(error.message);
        return res.status(400).json({
            success : false,
            message : "Please try again"
        })
    }
    

    

    
}