const mongoose = require("mongoose");

const {
    schema
} = require("../secure/goodsValidation/registerBookValidation");
const {
    number
} = require("yup/lib/locale");

const registerBookSchema = mongoose.Schema({
    bookName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    skin: {
        type: Number,
        required: true,
        min: 1,
    },
    page: {
        type: Number,
        required: true,
        min: 1,
    },
    year: {
        type: Number,
        required: true,
        min: 1343,
        max: 1450,
    },
});

registerBookSchema.statics.registerBookValidation = function (body) {
    return schema.validate(body, {
        abortEarly: false
    });
}

module.exports = mongoose.model("bookRegisters", registerBookSchema);