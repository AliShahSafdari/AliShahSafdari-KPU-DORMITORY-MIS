const yup = require("yup");

exports.schema = yup.object().shape({
    menuType: yup
        .string()
        .required("لطفا نام منوی غذایی را وارد نمایید!")
        .min(1, "نام منوی غذایی حداقل باید یک حرف باشد!")
        .max(8, "نام منوی غذایی نباید بیشتر از 8 حرف باشد!"),

    ingradient: yup
        .string()
        .required("لطفا نام جنس را وارد نمایید!")
        .min(1, "نام جنس نباید کمتر از یک حرف باشد!")
        .max(32, "نام جنس نباید بیشتر از 32 حرف باشد!"),

    // Gram
    morningIngradientAmount: yup
        .number()
        .required("لطفا مقدار استحقاق را وارد نمایید!")
        .max(1000, "استحقاق نباید بیشتر از 1000 گرام باشد!"),

    noonIngradientAmount: yup
        .number()
        .required("لطفا مقدار استحقاق را وارد نمایید!")
        .max(1000, "استحقاق نباید بیشتر از 1000 گرام باشد!"),

    nightIngradientAmount: yup
        .number()
        .required("لطفا مقدار استحقاق را وارد نمایید!")
        .max(1000, "استحقاق نباید بیشتر از 1000 گرام باشد!"),

    calory: yup
        .number()
        .max(10000, "کالوری نباید بیشتر از 10000 گرام باشد!")
        .nullable()
});