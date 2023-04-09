const mongoose = require("mongoose");

const {
  schema
} = require("../secure/goodsValidation/studentKitValidation");

const studentKitSchema = mongoose.Schema({
  mattress: {
    type: Number,
    required: true,
    min: 0,
    max: 2,
  },
  pillow: {
    type: Number,
    required: true,
    min: 0,
    max: 2,
  },
  coverlet: {
    type: Number,
    required: true,
    min: 0,
    max: 2,
  },
  quilt: {
    type: Number,
    required: true,
    min: 0,
    max: 2,
  },
  bed: {
    type: Number,
    required: true,
    min: 0,
    max: 2,
  },
  mirror: {
    type: Number,
    required: true,
    min: 0,
    max: 2,
  },
  windowShade: {
    type: Number,
    required: true,
    min: 0,
    max: 2,
  },
  carpet: {
    type: Number,
    required: true,
    min: 0,
    max: 2,
  },
  table: {
    type: Number,
    required: true,
    min: 0,
    max: 2,
  },
  chair: {
    type: Number,
    required: true,
    min: 0,
    max: 2,
  },
  Dates: {
    type: Number,
    required: true,
    min: 1343,
    max: 1450,
  },

  room_fk: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "room"
  },
  students_fk: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "students"
  },
  registerBook_fk: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bookRegisters"
  },
});
studentKitSchema.statics.studentKitValidation = function (body) {
  return schema.validate(body, {
    abortEarly: false,
  });
};
module.exports = mongoose.model("studentKits", studentKitSchema);