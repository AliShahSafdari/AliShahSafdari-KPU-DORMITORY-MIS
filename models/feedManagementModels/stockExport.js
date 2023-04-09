const mongoose = require("mongoose");

const stockExportSchema = mongoose.Schema({
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
    price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        default: 0.00
    },
    totalPrice: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        default: 0.00
    },
    date: {
        type: String,
        required: true
    },
    // stock_fk: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "stock",
    // },
    dailyMenu_fk: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "dailyMenu",
    }
});

module.exports = mongoose.model("stockExport", stockExportSchema);
