const mongoose = require("mongoose");

const { schema } = require("../secure/studentsValidation");

const studentSchema = mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 255,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 255,
  },
  fName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 255,
  },
  gFName: {
    type: String,
    trim: true,
    minlength: 2,
    maxlength: 255,
  },
  classroom: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100,
  },
  faculty: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 255,
  },
  department: {
    type: String,
    trim: true,
    minlength: 2,
    maxlength: 255,
  },
  province: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 255,
  },
  destrict: {
    type: String,
    trim: true,
    minlength: 2,
    maxlength: 255,
  },
  tazkiraNum: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 255,
  },
  phonNum: {
    type: String,
    trim: true,
    minlength: 9,
    maxlength: 20,
  },
  photo: {
    type: String,
  },
  kawayef: {
    type: String,
    enum: ["hanging", "graduated", "exist", "suspension", "uderPercent", "repeatSemester"],
  },
  date: {
    type: String,
  },
  document_fk: { type: mongoose.Schema.Types.ObjectId, ref: "document" },
  book_fk: { type: mongoose.Schema.Types.ObjectId, ref: "book" },
});

studentSchema.statics.studentValidation = function (body) {
  return schema.validate(body, { abortEarly: false });
};

module.exports = mongoose.model("students", studentSchema);
