const mongoose = require("mongoose");

const nirf_schema = mongoose.Schema({
    ranking_year : {
        type : String,
        required : true
    },
    ranking_category : {
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
})


const nirfschema = mongoose.model("nirf_ranking_of_institute", nirf_schema);

module.exports = nirfschema;