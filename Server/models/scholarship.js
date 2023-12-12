const mongoose = require("mongoose");

const scholarship_schema = mongoose.Schema({
    student_ID : {
        type : Number,
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
        required : true
    },
    institute_name_address : {
        type : String,
        required : true
    
    },
    amount_released : {
        type : Number,
        required : true
    
    },
    
})


const scholarship = mongoose.model("scholarship_Institute", scholarship_schema);

module.exports = scholarship;