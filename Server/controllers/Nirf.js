const Institute = require("../models/Institute");
const Nirf = require("../models/Nirf");

exports.addNirf = async(req, res) => {

    try{
        const { ranking_year, ranking_category, institute_id, institute_name, city, state, score, rank, sector } = req.body;

        if(!ranking_year || !ranking_category || !institute_id || !institute_name || !city || !state || !score || !rank || !sector){
            return res.status(400).json({
                success : false,
                message : "All fields are required."
            })
        }

        const existingInstitute = await Nirf.findOne({ $or: [{ institute_name: institute_name }, { institute_id: institute_id }] });
        if(existingInstitute){
            return res.status(400).json({
                success : false,
                message : "Institute already Listed"
            })
        }

        await Nirf.create({ranking_year, ranking_category, institute_id, institute_name, city, state, score, rank, sector});

        return res.status(200).json({
            success : true,
            message : "Institute added in NIRF List"
        })

    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
    
}