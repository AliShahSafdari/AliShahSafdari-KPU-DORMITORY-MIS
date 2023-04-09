const yup = require("yup");

exports.schema = yup.object().shape({
    ingradient: yup
        .string()
        .required("لطفا نام جنس را وارد نمایید!")
        .min(1, "نام جنس نباید کمتر از یک حرف باشد!")
        .max(32, "نام جنس نباید بیشتر از 32 حرف باشد!"),

    description: yup
        .string()
        .max(128, "ملاحضات نباید بیشتر از 128 حرف باشد!")
});