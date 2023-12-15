const Scholarship = require("../models/Scholarship");


exports.addOrUpdateScholarship = async(req, res) => {

    try {
        console.log(req.body.student_ID);
        const { student_ID, name_of_student, institute_id, institute_state, institute_name_address, amount_released, month, year } = req.body;

        if(student_ID === undefined || name_of_student === undefined || institute_id === undefined || institute_state === undefined || institute_name_address === undefined || amount_released === undefined || month === undefined || year === undefined)
        {
            return res.status(401).json({
                success : false,
                message : "All field are required"
            });
        }

        const existingStudent = await Scholarship.findOne( { student_ID : student_ID });
        if(existingStudent)
        {
            if(year === existingStudent.year && month === existingStudent.month && amount_released === existingStudent.amount_released){
                return res.status(400).json({
                    success : false,
                    message : "Already got Scholarship"
                })
            }
            else
            {
                await Scholarship.findOneAndUpdate( { student_ID }, { amount_released : amount_released, month : month, year : year });
                return res.status(200).json({
                    success : true,
                    message : "Scholarship Updated for this Student"
                })
            }
        }
        else
        {
            const data = await Scholarship.create( { student_ID, name_of_student, institute_id, institute_state, institute_name_address, amount_released, month, year });
            return res.status(200).json({
                success : true,
                message : "Scholarship Added for this Student"
            })
        }
    }catch(error) {
        return res.status(500).json({
            success : false,
            message : "Try Again Later"
        })
    }
    
}


exports.getAllScholarships = async(req, res) => {
    try{
        const allScholarships = await Scholarship.find({});
        const totalScholarshipsDistributed = allScholarships.length;

            return res.status(200).json({
                success : true,
                "Total Scholarships Distributed" : totalScholarshipsDistributed,
                data : allScholarships
            })
    }
    catch(error){
        console.log(error);
		return res.status(404).json({
			success: false,
			message: `Can't Fetch Scholarship Data`,
			error: error.message,
		});
    }
}