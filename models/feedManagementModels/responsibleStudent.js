const mongoose = require("mongoose");

const responsibleStudentSchema = mongoose.Schema({
  student_fk: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
  },
  dailyMenu_fk: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "dailyMenu",
  },
});

module.exports = mongoose.model("responsibleStudent", responsibleStudentSchema);