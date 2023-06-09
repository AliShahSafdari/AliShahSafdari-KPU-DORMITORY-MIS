const yup = require("yup");

exports.schema = yup.object().shape({
  summary: yup
    .string("خلاصه حواله صادر حتمی میباشد!")
    .required("خلاصه حواله وارده حتمی میباشد!")
    .min(2, "خلاصه حواله وارده نباید کمتر از دو حرف باشد!"),
  from: yup
    .string("مبدا حواله وارده حتمی میباشد!")
    .required("مبدا حواله وارده حتمی میباشد!")
    .min(2, "مبدا حواله وارده نباید کمتراز دو حرف باشد!")
    .max(255, "مبدا حواله وارده نباید بشتر از 255 حرف باشد!"),

  to: yup
    .string("مبدا حواله وارده حتمی میباشد!")
    .required("مبدا حواله وارده حتمی میباشد!")
    .min(2, "مبدا حواله وارده نباید کمتراز دو حرف باشد!")
    .max(255, "مبدا حواله وارده نباید بشتر از 255 حرف باشد!"),

  docNum: yup
    .string()
    .required("نمبر حواله وارده حتمی میباشد!")
    .min(1, "نمبر حواله وارده نباید کمتر از یک حرف باشد!")
    .max(255, "نمبر حواله وارده نباید بشتر از 50 حرف باشد!"),

  docDate: yup
    .string("تاریخ  حواله وارده حتمی میباشد!")
    .max(50, "تاریخ حواله وارده نباید بشتر از 50 حرف باشد!"),

  docEntryDate: yup
    .string()
    .max(50, "تاریخ ورود حواله وارده نباید بشتر از 50 حرف باشد!"),

  considration: yup
    .string("ملاحضات حواله وارده در حتمی میباشد!")
    .max(255, "آدرس حواله وارده درکتاب نباید بشتر از 255 حرف باشد!"),
});