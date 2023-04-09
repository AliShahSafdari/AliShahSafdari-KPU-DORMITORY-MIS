const yup = require("yup");

exports.schema = yup.object().shape({
    bookName: yup
        .string("نام کتاب حتمی میباشد!")
        .required("نام کتاب حتمی میباشد!")
        .min(2, "نام کتاب حد اقل دو حرف باشد!")
        .max(255, "نام کتاب نباید بیشتر از 255 حرف باشد!"),
    skinNum: yup
        .string("نمبر جلد حتمی میباشد!")
        .required("نمبر جلد حتمی میباشد!"),
    floorNum: yup
        .string("نمبر منزل حتمی میباشد!")
        .required("نمبر منزل حتمی میباشد!"),
    blockNum: yup
        .string("نمبر اتاق حتمی میباشد!")
        .required("نمبر اتاق حتمی میباشد!"),
    year: yup
        .string()
        .required("سال، ماه و روز حتمی میباشد!"),
});