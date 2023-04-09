const mongoose = require("mongoose");

const { schema } = require("../secure/feedManagement/stockValidation");

const stockSchema = mongoose.Schema({
    ingradient: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 32,
    },
    // Amount is considered as Kilogram
    amount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        default: 0.00
    },
    description: {
        type: String,
        // required: true,
        // minlength: 1,
        maxlength: 128,
    }
});

stockSchema.statics.stockValidation = function (body) {
    return schema.validate(body, { abortEarly: false });
}

module.exports = mongoose.model("stock", stockSchema);
