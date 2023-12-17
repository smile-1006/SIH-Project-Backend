const mongoose = require("mongoose");


const courseSchema = mongoose.Schema({
    course_name : {
        type : String,
        required : true
    },
    instructor_name : {
        type : String,
        required : true
    },
    institute_name : {
        type : String,
        required : true
    },
    platform : {
        type : String,
        enum : ["CEC", "UGC", "NITTTR", "IIMB", "AICTE", "IGNOU", "NPTEL", "NIOS"],
        required : true
    },
    duration : {
        type : String,
        enum : ["15 Weeks", "4 Weeks", "12 Weeks", "8 Weeks", "6 Weeks", "24 Weeks", "Self Paced"],
        required : true
    },
    start_in : {
        type : String,
        required : true
    },
    course_status : {
        type : String,
        enum : ["Upcoming", "Ongoing"],
        required : true
    }
})

module.exports = mongoose.model("Courses", courseSchema);