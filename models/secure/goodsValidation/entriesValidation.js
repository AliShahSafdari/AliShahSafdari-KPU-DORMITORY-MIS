const yup = require("yup");

exports.schema = yup.object().shape({

  goods_fk: yup.string().required("انتخاب جنس حتمی میباشد!"),
  quantity: yup
    .number()
    .required("تعداد جنس ضروری می باشد!")
    .positive("تعداد جنس باید مثبت باشد")
    .min(1, " تعداد جنس حداقل عدد یک باشد!"),
  price: yup
    .number("باید قیمت جنس نمبر باشد!")
    .required("قیمت جنس حتمی می باشد!")
    .positive("قیمت جنس باید عدد مثبت باشد")
    .min(1, "قیمت جنس نباید کمتر از عدد یک باشد"),
  placeFromRecieved: yup
    .string("از جایکه جنس اخذ شده حتمی می باشد!")
    .required("از جایکه جنس اخذشده حتمی می باشذ!")
    .min(3, "از جایکه جنس اخذ شد نباید کمتر از سه حرف باشد"),
  // dates: yup
  //   .string()
  //   .required("تاریخ ضروری می باشد!"),
  considration: yup
    .string().min(3, "نیاید کمتر از سه حرف باشد")
    .max(255, "نباید بشتر از 255 باشد!"),
});