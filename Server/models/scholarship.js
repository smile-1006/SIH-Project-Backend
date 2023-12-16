const mongoose = require("mongoose");

const scholarshipSchema = mongoose.Schema({
    3 : {
        type : String,
        required : true
    },
    name_of_student : {
        type : String,
        required : true
    },
    institute_id : {
        type : String,
        required : true
    },
    institute_state : {
        type : String,
        enum : ["Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"],
        required : true
    },
    institute_name_address : {
        type : String,
        required : true
    
    },
    amount_released : {
        type : String,
        required : true
    },
    month : {
        type : String,
        enum : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        required : true
    },
    year : {
        type : Number,
        required : true
    }
    
})


module.exports = mongoose.model("Scholarship", scholarshipSchema);