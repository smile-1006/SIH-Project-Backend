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


// exports.addInstitute = async(req, res) => {
//     try{
//         const { aicte_id, name, address, district, institution, state } = req.body;

//         if(!aicte_id || !name || !address || !district || institution || !state){
//             return res.status()
//         }
//     }
//     catch(err){
        
//     }   
// }