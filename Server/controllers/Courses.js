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


exports.getAllCourses = async(req, res) => {
    try{
            let { page = 1 } = req.query; // Default to page 1 if not provided  
            const search = req.query.search || "";
            let sort = req.query.sort || "duration";
            let platform = req.query.platform || "All";
            console.log(platform); // Fix variable name

            const platformOption = [
            "CEC",
            "UGC",
            "NITTTR",
            "IIMB",
            "AICTE",
            "IGNOU",
            "NPTEL",
            "NIOS"
            ];
            console.log(platformOption);

            // Fix variable name: change 'sector' to 'platform'
            if (typeof req.query.platform === 'string') {
            platform = req.query.platform.split(","); // Fix variable name
            } else {
            platform = [...platformOption];
            }
            req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

            let sortBy = {};

            // Correct variable names in sortBy logic
            if (sort[0] === "duration") {
            sortBy = { duration: 1 }; // Fix variable name
            } else if (sort[0] === "course_status") {
            sortBy = { aicte_id: 1 };
            }
            console.log(sortBy);

            const totalCount = await Course.countDocuments();
            const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

            if (page < 1 || page > totalPages) {
            return res.status(400).json({
                success: false,
                message: "Invalid page number",
            });
            }

            const skip = (page - 1) * ITEMS_PER_PAGE;

            const allCourses = await Course.find({}, {course_name : true, instructor_name : true ,institute_name : true, platform : true, duration : true, start_in : true, course_status: true}).skip(skip).limit(ITEMS_PER_PAGE);
            //const totalInstituteRegistered = allInstitute.length;

            return res.status(200).json({
                success : true,
                //Registered_Institute : totalInstituteRegistered,
                Total_Institute : totalCount,
                Total_Pages : totalPages,
                Current_Page : page,
                data : allCourses
            })
    }
    catch(error){
        console.log(error);
		return res.status(404).json({
			success: false,
			message: Can't Fetch Institute Data,
			error: error.message,
		});
	}
}
