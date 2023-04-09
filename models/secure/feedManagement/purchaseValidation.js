const yup = require("yup");

exports.stockPurchaseSchema = yup.object().shape({
    docNumber: yup
        .string()
        .required("لطفا نمبر مکتوب را وارد نمایید!")
        .min(1, "نمبر مکتوب نباید کمتر از یک حرف باشد")
        .max(32, "نمبر مکتوب نباید بیشتر از 32 حرف باشد!"),

    ingradient: yup
        .string()
        .required("لطفا نام جنس را وارد نمایید!")
        .min(1, "نام جنس نباید کمتر از یک حرف باشد!")
        .max(32, "نام جنس نباید بیشتر از 32 حرف باشد!"),

    ingradientType: yup
        .string(),

    amount: yup
        .number()
        .required("مقدار جنس حتمی میباشد!"),

    price: yup
        .number()
        .required("لطفا قیمت جنس را وارد نمایید!"),

    date: yup
        .date()
        .required("لطفا تاریخ را وارد نمایید!"),

    from: yup
        .string()
        .required("از جای که اخذ شده حتمی می باشد!")
        .min(1, "از جایکه اخذ شده نباید کمتر از یک حرف باشد!")
        .max(64, "از جایکه اخذ شده نباید بیشتر از 64 حرف باشد!"),

    description: yup
        .string()
        .max(256, "ملاحضات نباید بیشتر از 256 حرف باشد!")
});

exports.purchaseInfo = yup.object().shape({
    docNumber: yup
        .string()
        .required("لطفا نمبر مکتوب را وارد نمایید!")
        .min(1, "نمبر مکتوب نباید کمتر از یک حرف باشد")
        .max(32, "نمبر مکتوب نباید بیشتر از 32 حرف باشد!"),

    date: yup
        .date()
        .required("لطفا تاریخ را وارد نمایید!"),

    from: yup
        .string()
        .required("از جای که اخذ شده حتمی می باشد!")
        .min(1, "از جایکه اخذ شده نباید کمتر از یک حرف باشد!")
        .max(64, "از جایکه اخذ شده نباید بیشتر از 64 حرف باشد!"),

    description: yup
        .string()
        .max(256, "ملاحضات نباید بیشتر از 256 حرف باشد!")
});

exports.purchaseIngradients = yup.object().shape({

    ingradient: yup
        .string()
        .required("لطفا نام جنس را وارد نمایید!")
        .min(1, "نام جنس نباید کمتر از یک حرف باشد!")
        .max(32, "نام جنس نباید بیشتر از 32 حرف باشد!"),

    amount: yup
        .number()
        .required("مقدار جنس حتمی میباشد!")
        .max(100000, "مقدار جنس نباید بیشتر از صد تن باشد!"),

    price: yup
        .number()
        .required("لطفا قیمت جنس را وارد نمایید!")
        .max(100000000, "قیمت نباید بیشتر از صد میلیون افغانی باشد!")

});