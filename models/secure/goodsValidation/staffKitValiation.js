const yup = require("yup");

exports.schema = yup.object().shape({
  goodAmount: yup
    .number("مقدار جنس حتمی می باشد!")
    .required("مقدار جنس حتمی می باشد!")
    .min(0, "نباید کمتر از صفر باشد"),
  Dates: yup
    .number().required()
    .min(1346, "نیاید تاریخ ثبت از 1346 پایین باشد!")
    .max(1450, "نباید از سال 1450 به بالا باشد!"),
});
