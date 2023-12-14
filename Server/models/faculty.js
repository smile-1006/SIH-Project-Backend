const mongoose = require("mongoose");

const faculty_Schema = mongoose.Schema({
    faculty_id : {
        type : Number,
        required : true
    },
    name : {
        type : String,
        required : true,
        trim : true
    },
    gender : {
        type : String,
        enum : ['M','F'],
        required : true,
        trim : true
    },
    designation : {
        type : String,
        required : true,
        trim : true
    },
    date_of_joining : {
        type : Date,
        required : true
    },
    institute_name : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    }
})


const facultyschema = mongoose.model("faculty_schema", faculty_Schema);

module.exports = facultyschema;
