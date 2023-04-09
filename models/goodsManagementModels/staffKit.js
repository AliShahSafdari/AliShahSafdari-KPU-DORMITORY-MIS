const mongoose = require("mongoose");

const { schema } = require("../secure/goodsValidation/staffKitValiation");

const staffKitSchema = mongoose.Schema({
  goodAmount: {
    type: Number,
    required: true,
  },
  Dates: {
    type: Number,
    required: true,
    default: 1401,
  },
  goods_fk: { type: mongoose.Schema.Types.ObjectId, ref: "goods" },
  staff_fk: { type: mongoose.Schema.Types.ObjectId, ref: "staffs" },
  registerBook_fk: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bookRegisters"
  }
});
staffKitSchema.statics.staffKitValiation = function (body) {
  return schema.validate(body, {
    abortEarly: false,
  });
};

module.exports = mongoose.model("staffKit", staffKitSchema);
