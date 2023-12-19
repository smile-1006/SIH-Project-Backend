const mongoose = require("mongoose");

const unapproved_Institutes_Schema = mongoose.Schema({
ref_no : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    }
})


const unapprovedInstitute = mongoose.model("UnApproved_Institute", unapproved_Institutes_Schema);

module.exports = unapprovedInstitute;
