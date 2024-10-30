const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    sname:{
        type: String,
        required: true
    },
    fname:{
        type: String,
        required: true
    },
    mobilenumber:{
        type: String,
        required: true,
    },
    fmobilenumber:{
        type: String,
        required: true,
    },
    emailID:{
        type: String,
        required: true,
    },
    coursstartyear:{
        type: String,
        required: true,
    },
    collegename:{
        type: String,
        required: true,
    },
    department:{
        type: String,
        required: true,
    },
    course:{
        type: String,
        required: true,
    },
    collegerollnumber:{
        type: String,
        required: true,
    },
    urollnumber:{
        type: String,
        required: true,
    },
    selectsemester:{
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    state:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Student', StudentSchema);