const yup = require("yup");

exports.schema = yup.object().shape({

  goods_fk: yup.string().required("انتخاب جنس حتمی میباشد!"),
  quantity: yup
    .number("مقدار اجناس صادره از گدام حتمی می باشد!")
    .required("مقدار اجناس صادره از گدام حتمی می باشد!")
    .positive("مقدار جنس که از گدام خارج میگردد باید عدد مثبت باشد!")
    .min(1, "مقدار اجناس صادر از گدام باید حد اقل یک عدد باشد!"),
  placeSend: yup
    .string("جنس بجایکه صارد میگردد حتمی میباشد!")
    .required("جنس بجایکه صارد میگردد حتمی میباشد!")
    .min(3, "بجای که جنس صارد میشود نباید کمتر از سه حرف باشد!"),
  dates: yup
    .string(),
  // .required("تاریخ ضروری می باشد!"),
  considration: yup
    .string().min(3, "نیاید کمتر از سه حرف باشد")
    .max(255, "نباید بشتر از 255 باشد!"),

});