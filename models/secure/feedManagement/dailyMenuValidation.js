const yup = require("yup");

exports.schema = yup.object().shape({

    attReportNumber: yup
        .string()
        .required("لطفا نمبر راپور حاظری را وارد نمایید!")
        .max(32, "نمبر راپور نباید بیشتر از 32 حرف باشد!"),

    numberOfStudents: yup
        .number()
        .required("لطفا تعداد محصلین حاظر را وارد نمایید!!")
        .positive("تعداد محصلین عدد منفی بوده نمیتواند!!")
        .min(1, "تعداد محصلین حاظر باید بیشتر از یک باشد!")
        .max(3000, "تعداد محصلین حاظر حداکثر 3000 نفر بوده میتواند!"),

    menuType: yup
        .string()
        .required("لطفا منوی غذایی را انتخاب نمایید!"),

    descriptions: yup
        .string()
        .max(256, "توضیحات نباید بیشتر از 256 حرف باشد!"),

});

exports.editSchema = yup.object().shape({

    attReportNumber: yup
        .string()
        .required("لطفا نمبر راپور حاظری را وارد نمایید!")
        .max(32, "نمبر راپور نباید بیشتر از 32 حرف باشد!"),

    numberOfStudents: yup
        .number()
        .required("لطفا تعداد محصلین حاظر را وارد نمایید!!")
        .positive("تعداد محصلین عدد منفی بوده نمیتواند!!")
        .min(1, "تعداد محصلین حاظر باید بیشتر از یک باشد!")
        .max(3000, "تعداد محصلین حاظر حداکثر 3000 نفر بوده میتواند!"),

    descriptions: yup
        .string()
        .max(256, "توضیحات نباید بیشتر از 256 حرف باشد!"),

});