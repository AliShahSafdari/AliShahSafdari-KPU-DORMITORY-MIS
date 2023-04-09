const mongoose = require("mongoose");
const { date } = require("yup");

const students_roomSchema = mongoose.Schema({
    student_fk: { type: mongoose.Schema.Types.ObjectId, ref: "students" },
    room_fk: { type: mongoose.Schema.Types.ObjectId, ref: "room" },
    date: { type: String }
});

students_roomSchema.statics.students_roomValidation = function (body) {
    return schema.validate(body, { abortEarly: false });
}

module.exports = mongoose.model("students_room", students_roomSchema);
