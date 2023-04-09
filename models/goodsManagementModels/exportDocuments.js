const mongoose = require("mongoose");

const {
  schema
} = require("../secure/goodsValidation/exportDocumentValidation");

const exportDocSchema = mongoose.Schema({
  summary: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  from: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 255,
  },
  to: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 255,
  },
  docSequenceNum: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 50,
  },
  docDate: {
    type: String,
    maxlength: 15,
  },
  docExportDate: {
    type: String,
    maxlength: 15,
  },
  considration: {
    type: String,
    maxlength: 255,
  },
  registerBook_fk: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bookRegisters"
  },
});
exportDocSchema.statics.exportDocumentValidation = function (body) {
  return schema.validate(body, {
    abortEarly: false,
  });
};
module.exports = mongoose.model("exportDocuments", exportDocSchema);