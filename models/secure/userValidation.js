const yup = require("yup");

exports.schema = yup.object().shape({
  fullname: yup
    .string("نام و نام خانوادگی الزامی است")
    .required("نام و نام خانوادگی الزامی است")
    .min(3, "نام و نام خانوادگی حداقل دارایی چهار کاراکتر باشد")
    .max(255),
  email: yup
    .string("لطفا یک ایمیل معتبر وارد بنمایید")
    .required("ایمیل الزامی است"),
  position: yup.string("مقام خویش را وارید نمایید").required("وارید نمودن مقام الزامی است"),
  firstQuestion:yup.string("سوال امنیتی را یک کلمه انتخاب کنید").required("سوال امنیتی اول را پر کنید"),
  secondQuestion:yup.string("سوال امنیتی را یک کلمه انتخاب کنید").required("سوال امنیتی دوم را پر کنید"),
  thirdQuestion:yup.string("سوال امنیتی را یک کلمه انتخاب کنید").required("سوال امنیتی سوم را پر کنید"),
  password: yup
    .string()
    .min(4, "رمز ورود حداقل دارایی چهار کاراکتر باشد")
    .max(255)
    .required("کلمه عبور ضروری است"),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "تکرار کلمه عبور باید با هم  مطابقت داشته باشد"
    ),
});

