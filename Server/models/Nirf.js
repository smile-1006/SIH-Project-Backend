const mongoose = require("mongoose");

const nirf_schema = mongoose.Schema({

    ranking_year : {
        type : String,
        required : true
    },
    ranking_category : {
        type : String,
        enum : ["Dental", "Overall", "University", "Medical", "Management", "Research", "Agriculture and Allied Sectors", "Pharmacy", "Law", "Innovation", "Architecture", "College"],
        required : true
    },
    institute_id : {
        type : String,
        required : true
    },
    institute_name : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    state : {
        type : String,
        enum : ["Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"],
        required : true
    },
    score: {
        type : Number,
        required : true
    },
    rank: {
        type : Number,
        required : true
    },
    sector : {
        type : String,
        enum : ["Government", "Govt aided", "Private-Self Financing", "State Government", "State Private University", "State Government University", "Deemed to be University(Pvt)"],
        required : true
    }
})


const nirfschema = mongoose.model("nirf_institutes", nirf_schema);

module.exports = nirfschema;
