const mongoose = require("mongoose");

const instituteSchema = mongoose.Schema({
    aicteID : {
        type : String,
        required : true,
        trim : true,
    },
    name : {
        type : String,
        required : true,
        trim : true
    },
    address : {
        type : String,
        required : true,
        trim : true
    },
    district : {
        type : String,
        required : true,
        trim : true
    },
    institutionType : {
        type : String,
        enum : ["Goverment", "Govt aided", "Private-Self Financing", "State Goverment", "State Private University", "State Government University", "Deemed to be University(Pvt)"],
        required : true
    },
    state : {
        type : String,
        enum : ["Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"],
        required : true
    }
})