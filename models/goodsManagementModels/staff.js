const mongoose = require("mongoose");

const { schema } = require("../secure/goodsValidation/staffValidation");

const staffSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 200,
  },
  fName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 200,
  },
  gFName: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 200,
  },
  Job: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  province: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  destrict: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  tazkiraNum: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  idCard: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  phoneNum: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 15,
  },
});
staffSchema.statics.staffValidation = function (body) {
  return schema.validate(body, {
    abortEarly: false,
  });
};
module.exports = mongoose.model("staffs", staffSchema);