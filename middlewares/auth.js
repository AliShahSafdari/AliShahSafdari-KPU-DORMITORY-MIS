exports.authenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

exports.notAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('back')
    } else {
        next();
    }
};

exports.officeManagementBehavior = (req, res, next) => {
    if (req.user.position === "مدیر اداری") {
        return next();
    }
    res.redirect('back');
}

exports.feedManagementBehavior = (req, res, next) => {
    if (req.user.position === "مدیر ارتزاقی") {
        return next();
    }
    res.redirect('back');
}

exports.goodsManagementBehavior = (req, res, next) => {
    if (req.user.position === "مدیر جنسی") {
        return next();
    }
    res.redirect('back');
}

exports.directorBehavior = (req, res, next) => {
    if (req.user.position === "آمر لیلیه") {
        return next();
    }
    res.redirect('/404');
}

exports.directorAndgoodsManagementBehavior = (req, res, next) => {
    if (req.user.position === "مدیر جنسی" || req.user.position === "آمر لیلیه") {
        return next();
    }
    res.redirect('/404');
}

exports.directorAndfeedManagementBehavior = (req, res, next) => {
    if (req.user.position === "مدیر ارتزاقی" || req.user.position === "آمر لیلیه") {
        return next();
    }
    res.redirect('/404');
}
