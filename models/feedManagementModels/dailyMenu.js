const mongoose = require("mongoose");

const { schema } = require("../secure/feedManagement/dailyMenuValidation");
const { editSchema } = require("../secure/feedManagement/dailyMenuValidation");

const dailyMenuSchema = mongoose.Schema({
  attReportNumber: {
    type: String,
    required: true,
    maxlength: 32,
  },
  numberOfStudents: {
    type: Number,
    required: true,
    min: 1,
    max: 3000,
  },
  menuType: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 16,
  },
  date: {
    type: String,
    unique: true,
    required: true,
    // default: Date.now,
  },
  descriptions: {
    type: String,
    maxlength: 256,
  }
});

dailyMenuSchema.statics.dailyMenuValidation = function (body) {
  return schema.validate(body, { abortEarly: false });
}

dailyMenuSchema.statics.dailyMenuEditValidation = function (body) {
  return editSchema.validate(body, { abortEarly: false });
}

module.exports = mongoose.model("dailyMenu", dailyMenuSchema);