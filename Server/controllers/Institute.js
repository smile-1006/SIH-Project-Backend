const Institute = require("../models/Institute");
const User = require("../models/User");

exports.getAllInstitute = async(req, res) => {
    try{
            const allInstitute = await Institute.find({});
            const totalInstituteRegistered = allInstitute.length;

            return res.status(200).json({
                success : true,
                Registered_Institute : totalInstituteRegistered,
                data : allInstitute
            })
    }
    catch(error){
        console.log(error);
		return res.status(404).json({
			success: false,
			message: `Can't Fetch Institute Data`,
			error: error.message,
		});
	}
}


exports.addInstitute = async(req, res) => {
    try{
        const { aicte_id, name, address, district, institution_type, state } = req.body;

        if(!aicte_id || !name || !address || !district || !institution_type || !state){
            return res.status(400).json({
                success : false,
                message : "All Fields are Mandatory"
            })
        }

        //check the auth for AICTE-MEMBER or Admin
        const existingID = await Institute.findOne({ aicte_id});

        if(existingID){
            return res.status(400).json({
                success : false,
                message : "The Institute with this AICTE ID is already registered, please Put unique ID."
            })
        }

        const newInstitution = await Institute.create({
            aicte_id,
            name,
            address,
            district,
            institution_type,
            state
        });

        res.status(200).json({
			success: true,
			message: "Institution Created Successfully",
            data : newInstitution
		});


    }
    catch(err){
        console.log(err.message);
        return res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }   
}