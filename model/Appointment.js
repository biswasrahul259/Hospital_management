const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const patientSchema = Schema({
    patientName: {
        type: String,
        require: true,
    },
    patientPhone: {
        type: String,
        require: true,
    },
    bookingDate: {
        type: String,
        require: true,
    },
    bookingTime: {
        type: String,
        require: true,
    },
    message: {
        type: String,
        require: true,
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: "department"
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "doctor"
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false,
    },

})

const patient = mongoose.model("patient", patientSchema)
module.exports = patient