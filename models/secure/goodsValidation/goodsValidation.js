const yup = require("yup");
const nameRegex = /^[\u0600-\u06ff]|[\ufb50-\ufc3f]*$/;
const nameRegex1 = /^[\u0600-\u06ff\s]*$/;
// const regex = /^[\p{Arabic}\d-\[\]_+]*$/;
exports.schema = yup.object().shape({
  name: yup
    .string()
    .required("نام جنس حتمی میباشد!")
    .matches(nameRegex1, "لطفا نام جنس را وارد نماید!")
    .min(2, "نام جنس حد اقل دو حرف باشد!")
    .max(255, "نام جنس نباید بیشتر از 255 حرف باشد!"),
});