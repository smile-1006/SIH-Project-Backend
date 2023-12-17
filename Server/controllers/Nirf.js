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

        let lower_case_institute = institute_name.toLowerCase();

        const existingInstitute = await Nirf.findOne({ $or: [{ institute_name: institute_name }, { institute_id: institute_id }] });
        if(existingInstitute){
            return res.status(400).json({
                success : false,
                message : "Institute already Listed"
            })
        }

        await Nirf.create({ranking_year, ranking_category, institute_id, institute_name : lower_case_institute, city, state, score, rank, sector});

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

const ITEMS_PER_PAGE = 1000;

exports.getNirfList = async(req, res) => {
    try{
        const { institute_name } = req.query;
        let { page = 1 } = req.query;

        let filter = {};
        if (institute_name) {
            // Convert the institute name to lowercase to match the way it's stored in the database
            filter.institute_name = institute_name.toLowerCase();
        }

        const nirfData = await Nirf.find(filter);

        const totalCount = await Nirf.countDocuments();
        const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

        

        if (page < 1 || page > totalPages) {
            return res.status(400).json({
                success: false,
                message: "Invalid page number",
            });
        }

        const skip = (page - 1) * ITEMS_PER_PAGE;
        const getNirf = await Nirf.find({}, {ranking_year : true, ranking_category : true , institute_id : true, institute_name : true, city : true, state : true, score : true, rank : true, secter : true}).skip(skip).limit(ITEMS_PER_PAGE);

        
        return res.status(200).json({
            success : true,
                Total_Nirf : totalCount,
                Total_Pages : totalPages,
                Current_Page : page,
                data : getNirf
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