exports.get404 = (req, res) => {
    res.render("errors/404", {
        pageTittle: "صحفه مورد نظر پیدا نشد",
        path: "/404",
        layout: "./layouts/signLayout"
    });
};

exports.get500 = (req, res) => {
    res.render("errors/500", {
        pageTittle: "خطای سرور | ۵۰۰",
        path: "/500",
        layout: "./layouts/signLayout"
    });
};