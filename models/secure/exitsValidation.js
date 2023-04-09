const yup = require("yup");

exports.schema = yup.object().shape({
  quantity: yup
    .number("مقدار اجناس صادره از گدام حتمی می باشد!")
    .required("مقدار اجناس صادره از گدام حتمی می باشد!")
    .min(1,"مقدار اجناس صادر از گدام باید حد اقل یک عدد باشد!"),
  //@ amount become repeate 
    goodWasts: yup
    .number("مقدار وافیات جنس صادره از گدام حتمی میباشد!")
    .required(" مقدار وافیات جنس صادره از گدام حتمی میباشد!"),

    priceWasts: yup
    .number("قیمت وافیات جنس صادره از گدام حتمی میباشد!")
    .required("قیمت وافیات جنس صادره از گدام حتمی میباشد!"),
    // for dates I thank validation is not required;

    placeSend: yup
    .string("جنس بجایکه صارد میگردد حتمی میباشد!")
    .required("جنس بجایکه صارد میگردد حتمی میباشد!")
    .min(3,"بجای که جنس صارد میشود نباید کمتر از سه حرف باشد!"),
});
