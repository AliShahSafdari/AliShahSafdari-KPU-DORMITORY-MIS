const yup = require("yup");
const nameRegex = /^[\u0600-\u06ff]|[\ufb50-\ufc3f]*$/;
exports.schema = yup.object().shape({
    bookName: yup
        .string("نام کتاب حتمی میباشد!")
        .required("نام کتاب حتمی میباشد!")
        .matches(nameRegex, "لطفا نام کتاب را وارد نماید!")
        .min(2, "نام کتاب حد اقل دو حرف باشد!")
        .max(100, "نام کتاب نباید بیشتر از 255 حرف باشد!"),
    skin: yup
        .number("نمبر جلد حتمی میباشد!")
        .required("نمبر جلد حتمی میباشد!")
        .positive("نمبرجلد باید مثبت باشد!")
        .min(1, "نمبرجلد نباید کمتر از عدد یک باشد"),
    page: yup
        .number("نمبر صفحه حتمی میباشد!")
        .required("نمبر صفحه حتمی میباشد!")
        .positive("نمبر صفحه باید مثبت باشد!")
        .min(1, "نمبر صفحه نباید کمتر از عدد یک باشد"),
    year: yup
        .number()
        .required("سال، ماه و روز حتمی میباشد!")
        .min(1343, "سال نباید کمتراز سال 1345  باشد!")
        .max(1450, "نباید بشتر از سال 1450 باشد!"),
});