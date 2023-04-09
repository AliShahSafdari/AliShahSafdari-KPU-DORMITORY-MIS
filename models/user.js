const mongoose = require("mongoose");

const { schema } = require("./secure/userValidation");

const userSchema = mongoose.Schema({
  fullname: {
    type: "string",
    required: [true, "نام و نام خانوادگی الزامی میباشد"],
    trim: true,
  },
  email: {
    type: "string",
    required: true,
    unique: [true, "ایمیل باید منحصر به فرد باشد"],
  },
  position: {
    type: "string",
    required: true,
    enum: ["مدیر جنسی", "مدیر اداری", "مدیر ارتزاقی", "آمر لیلیه"]
  },
  firstQuestion:{
    type: "string",
    required:true,
    trim:true,
  },
  secondQuestion:{
    type: "string",
    required:true,
    trim:true,
  },
  thirdQuestion:{
    type: "string",
    required:true,
    trim:true,
  },
  firstOption:{
    type: "string",
    required:true,
  },
  secondOption:{
    type: "string",
    required:true,
  },
  thirdOption:{
    type: "string",
    required:true,
  },
  password: {
    type: "string",
    minLength: 4,
    maxLength: 255,
  },
});

userSchema.statics.userValidation = function (body) {
  return schema.validate(body, { abortEarly: false });
}

module.exports = mongoose.model("User", userSchema);
