const yup = require("yup");

exports.schema = yup.object().shape({
  studentId: yup
    .string()
    .required("آیدی محصل حتمی میباشد")
    .min(2, "آیدی محصل حداقل 2 حرف باشد")
    .max(200, "آیدی محصل نباید بیشتر از ۲۰۰ حرف باشد"),
  name: yup
    .string("نام محصل حتما حروف باشد")
    .required("نام محصل حتمی میباشد")
    .min(2, "نام محصل حداقل 2 حرف باشد")
    .max(200, "نام محصل نباید بیشتر از ۲۰۰ حرف باشد"),
  fName: yup
    .string("نام پدر محصل حتما حروف باشد")
    .required("نام پدر محصل حتمی میباشد")
    .min(2, "نام پدر محصل حداقل 2 حرف باشد")
    .max(200, "نام پدر محصل نباید بیشتر از ۲۰۰ حرف باشد"),
  gFName: yup
    .string("نام پدر کلان محصل حتما حروف باشد")
    .required("نام پدر کلان محصل حتمی میباشد")
    .min(2, "نام پدر کلان محصل حداقل 2 حرف باشد")
    .max(200, "نام پدر کلان محصل نباید بیشتر از ۲۰۰ حرف باشد"),
  classroom: yup
    .string("صنف حتمی میباشد")
    .required("صنف حتمی میباشد")
    .min(1, "صنف حداقل ۱ حرف باشد")
    .max(100, "نباید بیشتر از ۱۰۰ حرف باشد"),
  faculty: yup
    .string("نام پوهنحی حتمی میباشد")
    .required("نام پوهنحی حتمی میباشد")
    .min(2, " نام پوهنحی حداقل 2 حرف باشد ")
    .max(200, " نام پوهنحی نباید بیشتر از ۲۰۰ حرف باشد"),
  department: yup
    .string("نام دیپارتمنت حتمی میباشد")
    .required("نام دیپارتمنت حتمی میباشد")
    .min(2, " نام دیپارتمنت حداقل 2 حرف باشد")
    .max(200, " نام دیپارتمنت نباید بیشتر از ۲۰۰ حرف باشد"),
  province: yup
    .string("نام ولابت حتمی میباشد")
    .required("نام ولایت حتمی میباشد")
    .min(2, "نام ولایت نباید کمتر از دوحرف داشته باشد")
    .max(200, "نام ولایت نباید بیشتر از ۲۰۰ حرف باشد"),

  destrict: yup
    .string("نام ولسوالی حتمی میباشد")
    .required("نام ولسوالی حتمی میباشد")
    .min(2, "نام ولسوالی حداقل ۳ حرف باشد")
    .max(200, "نام ولسوالی نباید بیشتر از ۲۰۰ حرف باشد"),
  tazkiraNum: yup
    .string("نمبر تذکره حتمی میباشد")
    .required("نمبر تذکره حتمی میباشد")
    .min(3, " نمبر تذکره حداقل ۳ حرف باشد")
    .max(200, " نمبر تذکره نباید بیشتر از ۲۰۰ حرف باشد"),

  phonNum: yup
    .string()
    .required("شماره تماس حتمی میباشد!")
    .min(9, "شماره تماس نباید کمتر از ده عدد داشته باشد")
    .max(15, " شماره تماس نباید بیشتر از ۱۵ عدد باشد"),
  status: yup.mixed().oneOf(
    ["hanging", "graduated", "exist", "suspension", "uderPercent", "repeatSemester"],
    "یکی از این ها باید انتخاب شود !"
  ),
  photo: yup.object().shape({
    name: yup.string(),
    size: yup.number().max(4000000, "حجم عکس نباید بیشتر از ۴MB باشد"),
    mimetype: yup.mixed().oneOf(["image/jpeg", "image/png"], "عکس باید به فرمت jpeg یا png باشد")
  })
});
