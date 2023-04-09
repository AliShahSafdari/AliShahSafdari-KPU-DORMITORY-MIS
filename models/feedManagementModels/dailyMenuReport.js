const mongoose = require("mongoose");

// const { schema } = require("../secure/feedManagement/dailyMenuValidation");

const dailyMenuReportSchema = mongoose.Schema({
    ingradient: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 32,
    },
    //kiogram
    totalIngradientAmount: {
        type: mongoose.Schema.Types.Decimal128,
        max: 1000,
        default: 0
    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "purchased"],
    },
    ingradientType: {
        type: String,
        default: "stock",
        enum: ["stock", "m-7"],
    },
    dailyMenu_fk: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "dailyMenu",
    }
});

// dailyMenuReportSchema.statics.dailyMenuValidation = function (body) {
//     return schema.validate(body, { abortEarly: false });
// }

module.exports = mongoose.model("dailyMenuReport", dailyMenuReportSchema);