//* MsODEL REQUIRS
const bookRegisers = require("../../models/goodsManagementModels/registerBook")
const goods = require("../../models/goodsManagementModels/goods");
const entries = require("../../models/goodsManagementModels/entries");
const exits = require("../../models/goodsManagementModels/exits");
const entryDocuments = require("../../models/goodsManagementModels/entryDocuments");
const exportDocuments = require("../../models/goodsManagementModels/exportDocuments");
const studnetKits = require("../../models/goodsManagementModels/studentKit");
const students = require("../../models/officeManagementModels/students");
const students_rooms = require('../../models/officeManagementModels/students_room');
const staffs = require('../../models/goodsManagementModels/staff');
const staffKits = require('../../models/goodsManagementModels/staffKit');
const rooms = require('../../models/officeManagementModels/room');
const User = require('../../models/user');
// const moment = require('moment');
const { checkDate } = require('../../utils/checkdate')
const bcrypt =require('bcryptjs');
// const { number} = require("yup/lib/locale");

// @desc render goods management page
// @routes GET /goods-management
exports.getGoodsManagement = (req, res) => {
    res.render("goods-management/goods-management", {
        pageTittle: "مدیریت جنسی",
        path: "/goods-management"
    })
}

// @desc render Add bookRegister page
// @routes GET /goods-managem/bookRegister
exports.getAddBookRegister = async (req, res) => {
    res.render("./goods-management/show-bookRegister", {
        pageTittle: "راجستر کتاب جدید",
        path: "/goods-management/show-bookRegister",
        errors: [],
        // message: req.flash("success_msg"),
        // messages: req.flash("error_msg")
    })
}

// @desc render list of BookRegisters 
// @routes GET /goods-management/show-bookRegister
exports.getShowBookRegister = async (req, res) => {
    const bookRegisters = await bookRegisers.find({
        /*status: "exist"*/
    }).sort({
        'name': -1
    });
    res.render("./goods-management/show-bookRegister", {
        pageTittle: "نمایش کتاب",
        path: "/goods-management/show-bookRegister",
        table: "ok",
        bookRegisters,
        errors: [],
        // message: req.flash("success_msg"),
        // messages: req.flash("error_msg")
    })

}
// @desc render list One of Book from  BookRegisters 
// @routes GET /goods-management/show-oneBookRegister
exports.getShowOneBookRegister = async (req, res) => {

    const bookRegister = await bookRegisers.findById({
        _id: req.params.id
    });

    const bookRegisters = await bookRegisers.find({
        $and: [{
            bookName: bookRegister.bookName
        },
        {
            skin: bookRegister.skin
        }
        ]
    }).sort({
        'page': 1
    });
    res.render("./goods-management/show-oneBookRegister", {
        pageTittle: "نمایش کتاب",
        secondLayout: "ok",
        path: "/goods-management/show-oneBookRegister/:id",
        table: "ok",
        bookRegisters,
        // message: req.flash("success_msg"),
        // messages: req.flash("error_msg")
    })
}

// @desc render goods BookRegister page
// @routes GET /goods-management/edit-bookRegiser/:id
exports.getEditBookRegister = async (req, res) => {

    try {
        const bookRegister = await bookRegisers.findById({
            _id: req.params.id
        });
        if (bookRegister) {
            return res.render("./goods-management/edit-bookRegister", {
                pageTittle: "ویرایش نمودن جنس",
                secondLayout: "ok",
                path: "/goods-management/edit-bookRegister/:id",
                errors: [],
                table: "ok",
                bookRegister,
                // message: req.flash("success_msg"),
                // messages: req.flash("error_msg")
            })
        }
    } catch (err) {
        err.inner.forEach((err) => {
            errors.push({
                name: err.path,
                message: err.message,
            });
        });
    }
}

// @desc render Add new goods page
// @routes GET /goods-managem/new-goods
exports.getAddNewGoods = async (req, res) => {
    res.render("./goods-management/add-goods", {
        pageTittle: "اضافه کردن جنس جدید",
        path: "/goods-management/add-goods",
        errors: [],
    })
}

// @desc render list of goods 
// @routes GET /goods-management/show-goods
exports.getShowGoods = async (req, res) => {
    const mattress_Add = await goods.findOne({ name: "دوشک" });
    const pillow_Add = await goods.findOne({ name: "بالشت" });
    const coverlet_Add = await goods.findOne({ name: "روجایی" });
    const quilt_Add = await goods.findOne({ name: "کمپل" });
    const bed_Add = await goods.findOne({ name: "چپرکت" });
    const mirror_Add = await goods.findOne({ name: "آینه روی" });
    const windowShade_Add = await goods.findOne({ name: "پرده" });
    const carpet_Add = await goods.findOne({ name: "فرش" });
    const table_Add = await goods.findOne({ name: "میز" });
    const chair_Add = await goods.findOne({ name: "چوکی" });
    if (!mattress_Add) { await goods.create({ name: "دوشک" }) }
    if (!pillow_Add) { await goods.create({ name: "بالشت" }) }
    if (!coverlet_Add) { await goods.create({ name: "روجایی" }) }
    if (!quilt_Add) { await goods.create({ name: "کمپل" }) }
    if (!bed_Add) { await goods.create({ name: "چپرکت" }) }
    if (!mirror_Add) { await goods.create({ name: "آینه روی" }) }
    if (!windowShade_Add) { await goods.create({ name: "پرده" }) }
    if (!carpet_Add) { await goods.create({ name: "فرش" }) }
    if (!table_Add) { await goods.create({ name: "میز" }) }
    if (!chair_Add) { await goods.create({ name: "چوکی" }) }

    const records = await goods.find({
        /*status: "exist"*/
    }).sort({
        'date': -1
    })
    res.render("./goods-management/show-goods", {
        pageTittle: "نمایش اجناس",
        path: "/goods-management/show-goods",
        table: "ok",
        records: records,
    })
}

// @desc render goods edit page
// @routes GET /goods-management/edit-goods/:id
exports.getEditGoods = async (req, res) => {
    try {
        const good = await goods.findOne({
            _id: req.params.id
        });
        if (good) {
            return res.render("./goods-management/edit-goods", {
                pageTittle: "ویرایش نمودن جنس",
                secondLayout: "ok",
                path: "/goods-management/edit-goods/:id",
                errors: [],
                table: "ok",
                good,
            })
        }
    } catch (err) {
        err.inner.forEach((err) => {
            errors.push({
                name: err.path,
                message: err.message,
            });
        });
    }
}

// @desc render add entries registration page
// @routes GET /goods-management/add-entries
exports.getAddEntries = async (req, res) => {
    const bookName = await bookRegisers.distinct("bookName")
    const skin = await bookRegisers.distinct("skin")
    const page = await bookRegisers.distinct("page")
    const year = await bookRegisers.distinct("year")
    const entryDocument = await entryDocuments.distinct("docNum");
    const g = await goods.find();
    res.render("./goods-management/add-entries", {
        pageTittle: "اضافه کردن جنس در ادخالات",
        path: "/goods-management/add-entries",
        errors: [],
        entryDocument,
        bookName,
        skin,
        page,
        year,
        goods: g,
        // message: req.flash("success_msg"),
        // messages: req.flash("error_msg")
    })
}

// @routes GET /goods-management/show-entries
exports.getShowEntries = async (req, res) => {
    const bookName = await bookRegisers.distinct("bookName")
    const skin = await bookRegisers.distinct("skin")
    const page = await bookRegisers.distinct("page")
    const year = await bookRegisers.distinct("year")
    const entryDocument = await entryDocuments.distinct("docNum");
    const entry = await entries.find({
        /*status: "exist"*/
    }).populate("goods_fk").populate("entryDocument_fk").populate("registerBook_fk").sort({
        'date': -1
    })
    res.render("./goods-management/show-entries", {
        pageTittle: " نمایش اجناس در ادخالات",
        path: "/goods-management/show-entries",
        table: "ok",
        entry,
        bookName,
        skin,
        page,
        year,
        entryDocument,
    })
}

// @desc render list One of Book from  oneEnties 
// @routes GET /goods-management/show-oneEnties
exports.getShowOneEntries = async (req, res) => {

    // const oneEntries = await entries.findById({
    //     _id: req.params.id
    // });
    // // console.log(oneEntries)
    const bookName = await bookRegisers.distinct("bookName")
    const skin = await bookRegisers.distinct("skin")
    const page = await bookRegisers.distinct("page")
    const year = await bookRegisers.distinct("year")
    const entryDocument = await entryDocuments.distinct("docNum");
    try {

        const entry = await entries.findOne({
            _id: req.params.id
        }).populate("goods_fk").populate("entryDocument_fk").populate("registerBook_fk")
        if (entry) {
            res.render("./goods-management/show-oneEntries", {
                pageTittle: " یک جنس در ادخالات",
                path: "/goods-management/show-oneEntries/:id",
                table: "ok",
                entry,
                bookName,
                skin,
                page,
                year,
                entryDocument,
            })
        }
    } catch{
        res.redirect("back");
    }
}

// @desc render Entries edit page
// @routes GET /goods-management/edit-Entries/:id
exports.getEditEntries = async (req, res) => {
    const g = await goods.find();
    try {
        const bookName = await bookRegisers.distinct("bookName")
        const skin = await bookRegisers.distinct("skin")
        const page = await bookRegisers.distinct("page")
        const year = await bookRegisers.distinct("year")
        const entryDocument = await entryDocuments.distinct("docNum");
        const entry = await entries.findOne({
            _id: req.params.id
        }).populate("goods_fk").populate("entryDocument_fk").populate("registerBook_fk").sort({
            'date': -1
        })
        // console.log("get edit");
        if (entry) {
            return res.render("./goods-management/edit-entries", {
                pageTittle: "ویرایش نمودن ادخالات",
                secondLayout: "ok",
                path: "/goods-management/edit-entries/:id",
                errors: [],
                table: "ok",
                entry,
                bookName,
                skin,
                page,
                year,
                entryDocument,
                goods: g,
            })
        }
    } catch (err) {
        err.inner.forEach((err) => {
            errors.push({
                name: err.path,
                message: err.message,
            });
        });
    }
}

// @desc render add exits registration page
// @routes GET /goods-management/add-exits
exports.getAddExits = async (req, res) => {
    const bookName = await bookRegisers.distinct("bookName")
    const skin = await bookRegisers.distinct("skin")
    const page = await bookRegisers.distinct("page")
    const year = await bookRegisers.distinct("year")
    const exportDocument = await exportDocuments.distinct("docSequenceNum");
    const g = await goods.find();
    res.render("./goods-management/add-exits", {
        pageTittle: "اضافه کردن جنس در اخراجات",
        path: "/goods-management/add-exits",
        errors: [],
        bookName,
        skin,
        page,
        year,
        exportDocument,
        goods: g,
        // message: req.flash("success_msg"),
        // messages: req.flash("error_msg")
    })
}

// @desc render show exits 
// @routes GET /goods-management/show-exits
exports.getShowExits = async (req, res) => {
    const bookName = await bookRegisers.distinct("bookName")
    const skin = await bookRegisers.distinct("skin")
    const page = await bookRegisers.distinct("page")
    const year = await bookRegisers.distinct("year")
    const exportDocument = await exportDocuments.distinct("docSequenceNum");
    const exit = await exits.find({
        /*status: "exist"*/
    }).populate("goods_fk").populate("exportDocument_fk").populate("registerBook_fk")
        .sort({
            'date': -1
        });
    res.render("./goods-management/show-exits", {
        pageTittle: "نمایش اجناس در اخراجات",
        path: "/goods-management/show-exits",
        table: "ok",
        exit,
        exportDocument,
        year,
        page,
        skin,
        bookName,
        // message: req.flash("success_msg"),
        // messages: req.flash("error_msg")
    })
}

// @desc render show oneExits 
// @routes GET /goods-management/show-oneExits

exports.getShowOneExits = async (req, res) => {

    const bookName = await bookRegisers.distinct("bookName")
    const skin = await bookRegisers.distinct("skin")
    const page = await bookRegisers.distinct("page")
    const year = await bookRegisers.distinct("year")
    const exportDocument = await exportDocuments.distinct("docSequenceNum");
    const exit = await exits.findOne({
        _id: req.params.id
    }).populate("goods_fk").populate("exportDocument_fk").populate("registerBook_fk")
    res.render("./goods-management/show-oneExits", {
        pageTittle: " یک جنس در ادخالات",
        path: "/goods-management/show-oneExits/:id",
        table: "ok",
        exit,
        bookName,
        skin,
        page,
        year,
        exportDocument,
    })
}

// @desc render Exits edit page
// @routes GET /goods-management/edit-Exits/:id
exports.getEditExits = async (req, res) => {

    const g = await goods.find();
    try {
        const good = await goods.distinct("name")
        const bookName = await bookRegisers.distinct("bookName")
        const skin = await bookRegisers.distinct("skin")
        const page = await bookRegisers.distinct("page")
        const year = await bookRegisers.distinct("year")
        const exportDocument = await exportDocuments.distinct("docSequenceNum");
        const exit = await exits.findOne({
            _id: req.params.id
        }).populate("goods_fk").populate("exportDocument_fk").populate("registerBook_fk")
            .sort({
                'date': -1
            });
        // console.log(good)
        if (exit) {
            return res.render("./goods-management/edit-exits", {
                pageTittle: "ویرایش نمودن اخراجات",
                secondLayout: "ok",
                path: "/goods-management/edit-exits/:id",
                errors: [],
                table: "ok",
                exit,
                exportDocument,
                year,
                page,
                skin,
                bookName,
                good,

                // message: req.flash("success_msg"),
                // messages: req.flash("error_msg")
            })
        }

    } catch (err) {
        err.inner.forEach((err) => {
            errors.push({
                name: err.path,
                message: err.message,
            });
        });
    }
}

// @desc render add entryDocument
// @routes GET /goods-management/add-entryDocument
exports.getAddEntryDocument = async (req, res) => {

    const bookName = await bookRegisers.distinct("bookName")
    const skin = await bookRegisers.distinct("skin")
    const page = await bookRegisers.distinct("page")
    const year = await bookRegisers.distinct("year")

    res.render("./goods-management/add-entryDocument", {
        pageTittle: "اضافه کردن حواله وارده",
        path: "/goods-management/add-entryDocument",
        errors: [],
        bookName: bookName,
        skin,
        page,
        year: year,
        // message: req.flash("success_msg"),
        // messages: req.flash("error_msg")
    })
}

// @desc render show entrytDocument
// @routes GET /goods-management/show-entryDocument
exports.getShowEntryDocument = async (req, res) => {

    const entryDocument = await entryDocuments.find({}).populate("registerBook_fk");
    res.render("./goods-management/show-entryDocument", {
        pageTittle: "نمایش حوله وارده",
        path: "/goods-management/show-entryDocument",
        errors: [],
        entryDocument,
        // message: req.flash("success_msg"),
        // messages: req.flash("error_msg")
    })
}

// @desc render show One entrytDocument
// @routes GET /goods-management/show-oneEntryDocument
exports.getShowOneEntryDocument = async (req, res) => {

    const entryDocument = await entryDocuments.findOne({ _id: req.params.id }).populate("registerBook_fk");
    res.render("./goods-management/show-oneEntryDocument", {
        pageTittle: "نمایش حوله وارده",
        path: "/goods-management/show-oneEntryDocument/id",
        errors: [],
        entryDocument,
        // message: req.flash("success_msg"),
        // messages: req.flash("error_msg")
    })

}

// @desc render Entry Document edit page
// @routes GET /goods-management/edit-entryDcoutment/:id
exports.getEditEntryDocument = async (req, res) => {
    const bookName = await bookRegisers.distinct("bookName")
    const skin = await bookRegisers.distinct("skin")
    const page = await bookRegisers.distinct("page")
    const year = await bookRegisers.distinct("year")
    try {
        const entryDocument = await entryDocuments.findOne({
            _id: req.params.id
        }).populate("registerBook_fk");
        if (entryDocument) {
            return res.render("./goods-management/edit-entryDocument", {
                pageTittle: "ویرایش نمودن حواله وارده",
                secondLayout: "ok",
                path: "/goods-management/edit-entryDocument/:id",
                errors: [],
                table: "ok",
                bookName,
                skin,
                page,
                year,
                entryDocument,
                // message: req.flash("success_msg"),
                // messages: req.flash("error_msg")

            })
        }
    } catch (err) {
        err.inner.forEach((err) => {
            errors.push({
                name: err.path,
                message: err.message,
            });
        });
    }
}

// @desc render exportDocument registration page
// @routes GET /goods-management/add-exportDoucment
exports.getAddNewExportDoucment = async (req, res) => {

    const bookName = await bookRegisers.distinct("bookName")
    const skin = await bookRegisers.distinct("skin")
    const page = await bookRegisers.distinct("page")
    const year = await bookRegisers.distinct("year")

    res.render("./goods-management/add-exportDocument", {
        pageTittle: "نمایش حواله صادره",
        path: "/goods-management/add-exportDocument",
        errors: [],
        bookName,
        skin,
        page,
        year,
        // message: req.flash("success_msg"),
        // messages: req.flash("error_msg")
    })
}

// @desc render show exportDocument
// @routes GET /goods-management/show-exportDocument
exports.getShowExportDoucment = async (req, res) => {
    const exportDocument = await exportDocuments.find({}).populate("registerBook_fk");

    res.render("./goods-management/show-exportDocument", {
        pageTittle: "اضافه نمودن حواله صادره ",
        path: "/goods-management/show-exportDocument",
        errors: [],
        exportDocument,
        // message: req.flash("success_msg"),
        // messages: req.flash("error_msg")
    })
}

// @desc render show One exportDocument
// @routes GET /goods-management/show-oneexportDocument
exports.getShowOneExportDoucment = async (req, res) => {
    try {
        const exportDocument = await exportDocuments.findOne({ _id: req.params.id }).populate("registerBook_fk");
        res.render("./goods-management/show-oneExportDocument", {
            pageTittle: "نمایش حوله صادره",
            path: "/goods-management/show-oneExportDocument/id",
            errors: [],
            exportDocument,
            // message: req.flash("success_msg"),
            // messages: req.flash("error_msg")
        })
    }
    catch{
        res.redirect("/goods-management/show-ExportDocument");
    }

}


// @desc render Export Document edit page
// @routes GET /goods-management/edit-ExportDcoutment/:id
exports.getEditExportDocument = async (req, res) => {
    const bookName = await bookRegisers.distinct("bookName")
    const skin = await bookRegisers.distinct("skin")
    const page = await bookRegisers.distinct("page")
    const year = await bookRegisers.distinct("year")

    try {
        const exportDocument = await exportDocuments.findOne({
            _id: req.params.id
        }).populate("registerBook_fk");
        if (exportDocument) {
            return res.render("./goods-management/edit-exportDocument", {
                pageTittle: "ویرایش نمودن حواله صادره",
                secondLayout: "ok",
                path: "/goods-management/edit-exportDocument/:id",
                errors: [],
                table: "ok",
                bookName: bookName,
                skin,
                page,
                year: year,
                exportDocument,
                // message: req.flash("success_msg"),
                // messages: req.flash("error_msg")
            })
        }

    } catch (err) {
        console.log(err);
        err.inner.forEach((err) => {
            errors.push({
                name: err.path,
                message: err.message,
            });
        });
    }
}

// @desc render Add new staff page
// @routes GET /goods-managem/add-staff
exports.getAddStaff = async (req, res) => {
    res.render("./goods-management/add-staff", {
        pageTittle: "اضافه کردن کارمند",
        path: "/goods-management/add-staff",
        errors: [],
        // messages: req.flash("error_msg"),
        // message: req.flash("success_msg"),
    })
}
// @desc render show staff page
// @routes GET /goods-managem/show-staffs
exports.getShowStaffs = async (req, res) => {
    const staff = await staffs.find({
        /*status: "exist"*/
    }).sort({
        'date': -1
    })
    res.render("./goods-management/show-staffs", {
        pageTittle: "نمایش تمام کارمندان",
        path: "/goods-management/show-staffs",
        table: "ok",
        staffs: staff,
        // messages: req.flash("error_msg"),
        // message: req.flash("success_msg")
    })
}

// @desc render staff edit  page
// @routes GET /goods-management/edit-staffs/:id
exports.getEditStaff = async (req, res) => {
    try {
        const staff = await staffs.findOne({
            _id: req.params.id
        });
        if (staff) {
            return res.render("./goods-management/edit-staff", {
                pageTittle: "ویرایش نمودن کارمند",
                secondLayout: "ok",
                path: "/goods-management/edit-staff/:id",
                errors: [],
                table: "ok",
                staff,
                // messages: req.flash("error_msg"),
                // message: req.flash("success_msg")
            })
        }
    } catch (err) {
        console.log(err);
        err.inner.forEach((err) => {
            errors.push({
                name: err.path,
                message: err.message,
            });
        });
    }
}

// @desc render exportDocument registration page
// @routes GET/goods-management/add-exportDoucment
exports.getAddStudentKit = async (req, res) => {
    const bookName = await bookRegisers.distinct("bookName")
    const skin = await bookRegisers.distinct("skin")
    const page = await bookRegisers.distinct("page")
    const year = await bookRegisers.distinct("year")

    res.render("./goods-management/add-studentKit", {
        pageTittle: "اضافه نمودن البسه محصل",
        path: "/goods-management/add-studentKit",
        errors: [],
        bookName,
        skin,
        page,
        year,
        // message: req.flash("success_msg"),
        // messages: req.flash("error_msg"),
    })
}

// @desc render show studentkits
// @routes GET/goods-management/add-show studentkit
exports.getShowStudentKit = async (req, res) => {
    const bookName = await bookRegisers.distinct("bookName")
    const skin = await bookRegisers.distinct("skin")
    const page = await bookRegisers.distinct("page")
    const year = await bookRegisers.distinct("year")
    const studentKit = await studnetKits.find({
        /*status: "exist"*/
    }).populate("room_fk").populate("students_fk").populate("registerBook_fk")
        .sort({
            'date': -1
        });
    res.render("./goods-management/show-studentKits", {
        pageTittle: "نمایش اجناس",
        path: "/goods-management/show-studentKits",
        table: "ok",
        year,
        page,
        skin,
        bookName,
        StudentKit: studentKit,
    })
}

// @desc render Export Document edit page
// @routes GET /goods-management/edit-ExportDcoutment/:id
exports.getShowOneStudentKit = async (req, res) => {
    const bookName = await bookRegisers.distinct("bookName")
    const skin = await bookRegisers.distinct("skin")
    const page = await bookRegisers.distinct("page")
    const year = await bookRegisers.distinct("year")
    const studentKit = await studnetKits.findById({
        _id: req.params.id
    }).populate("room_fk").populate("students_fk").populate("registerBook_fk");
    let same = 0;
    let good = await goods.findOne({ name: "دوشک" });
    same = (good.price * studentKit.mattress) + same;
    //2
    good = await goods.findOne({ name: "بالشت" });
    same = (good.price * studentKit.pillow) + same;
    // 3
    good = await goods.findOne({ name: "روجایی" });
    same = (good.price * studentKit.coverlet) + same;
    //4 
    good = await goods.findOne({ name: "کمپل" });
    same = (good.price * studentKit.quilt) + same;
    // 5
    good = await goods.findOne({ name: "چپرکت" });
    same = (good.price * studentKit.bed) + same;
    // 6
    good = await goods.findOne({ name: "آینه روی" });
    same = (good.price * studentKit.mirror) + same;
    // 7
    good = await goods.findOne({ name: "پرده" });
    same = (good.price * studentKit.windowShade) + same;
    // 8
    good = await goods.findOne({ name: "فرش" });
    same = (good.price * studentKit.carpet) + same;
    // 9
    good = await goods.findOne({ name: "میز" });
    same = (good.price * studentKit.table) + same;
    // 10
    good = await goods.findOne({ name: "چوکی" });
    same = (good.price * studentKit.chair) + same;

    res.render("./goods-management/show-oneStudentKit", {
        pageTittle: "نمایش اجناس",
        secondLayout: "ok",
        path: "/goods-management/show-oneStudentKit/:id",
        table: "ok",
        year,
        page,
        skin,
        bookName,
        studentKit,
        same,
        // message: req.flash("success_msg"),
        // messages: req.flash("error_msg"),

    })
}

// @desc render export edit page
// @routes GET /goods-management/edit-/:id
exports.getEditOneStudentKit = async (req, res) => {
    const bookName = await bookRegisers.distinct("bookName")
    const skin = await bookRegisers.distinct("skin")
    const page = await bookRegisers.distinct("page")
    const year = await bookRegisers.distinct("year")
    try {
        const studentKit = await studnetKits.findById({
            _id: req.params.id
        }).populate("room_fk").populate("students_fk").populate("registerBook_fk");

        // console.log(studentKit)
        if (studentKit) {
            return res.render("./goods-management/edit-oneStudentKit", {
                pageTittle: "ویرایش اجناس کارمندان",
                secondLayout: "ok",
                path: "/goods-management/edit-oneStudentKit/:id",
                errors: [],
                table: "ok",
                studentKit,
                bookNames: bookName,
                skins: skin,
                pages: page,
                years: year,
                message: req.flash("success_msg", ""),
                // messages: req.flash("error_msg"),

            })
        }
    } catch (err) {
        console.log(err);
        err.inner.forEach((err) => {
            errors.push({
                name: err.path,
                message: err.message,
            });
        });
    }
}

// @desc render AddStaffKit registration page
// @routes GET/goods-management/add-staffKit
exports.getAddStaffKit = async (req, res) => {
    const good = await goods.distinct("name")
    const bookName = await bookRegisers.distinct("bookName")
    const skin = await bookRegisers.distinct("skin")
    const page = await bookRegisers.distinct("page")
    const year = await bookRegisers.distinct("year")

    const staff_kit = await staffKits.find({

    }).populate("goods_fk").populate("staff_fk").populate("registerBook_fk").sort({ 'date': '-1' });

    // console.log("dffasfsa");
    // console.log(staff_kit);
    res.render("./goods-management/add-kitStaff", {
        pageTittle: "ثبت اجناس کارمند",
        path: "/goods-management/add-kitStaff",
        errors: [],
        good,
        bookName,
        skin,
        page,
        year,
        // message: req.flash("success_msg"),
        // messages: req.flash("error_msg"),
    })
}

// @desc render Show_Staff_Kit repreasent page
// @routes GET/goods-management/show-staffkits
exports.getShowStaffKits = async (req, res) => {
    const good = await goods.distinct("name")
    const bookName = await bookRegisers.distinct("bookName")
    const skin = await bookRegisers.distinct("skin")
    const page = await bookRegisers.distinct("page")
    const year = await bookRegisers.distinct("year")
    const staffKit = await staffKits.find({

    }).populate("goods_fk").populate("staff_fk").populate("registerBook_fk");

    // console.log(staff);
    res.render("./goods-management/show-staffKits", {
        pageTittle: "نمایش اجناس کارمندان",
        path: "/goods-management/show-staffKits",
        errors: [],
        staffkits: staffKit,
        good,
        bookName,
        skin,
        page,
        year,
        // message: req.flash("success_msg"),
        // messages: req.flash("error_msg"),
    })
}

// @desc render Show_Staff_Kit repreasent page
// @routes GET/goods-management/show-staffkits
exports.getShowOneStaffKits = async (req, res) => {
    const good = await goods.distinct("name")
    const bookName = await bookRegisers.distinct("bookName")
    const skin = await bookRegisers.distinct("skin")
    const page = await bookRegisers.distinct("page")
    const year = await bookRegisers.distinct("year")

    try {
        const staffKit = await staffKits.findOne({
            _id: req.params.id
        }).populate("goods_fk").populate("staff_fk").populate("registerBook_fk");
        console.log(staffKit)

        if (staffKit) {
            return res.render("./goods-management/show-oneStaffKit", {
                pageTittle: "نمایش اجناس کارمندان",
                secondLayout: "ok",
                path: "/goods-management/show-oneStaffKit/:id",
                errors: [],
                table: "ok",
                staffkits: staffKit,
                good,
                bookName,
                skin,
                page,
                year,

                // messages: req.flash("error_msg"),
                // message: req.flash("success_msg")
            })
        }
    } catch (err) {
        console.log(err);
        err.inner.forEach((err) => {
            errors.push({
                name: err.path,
                message: err.message,
            });
        });
    }
}

// @desc render onestaffKit edit  page
// @routes GET /goods-management/edit-oneStaffKits/:id
exports.getEditOneStaffKit = async (req, res) => {
    const good = await goods.distinct("name")
    const bookNames = await bookRegisers.distinct("bookName")
    const skins = await bookRegisers.distinct("skin")
    const pages = await bookRegisers.distinct("page")
    const years = await bookRegisers.distinct("year")

    try {
        const staffKit = await staffKits.findOne({
            _id: req.params.id
        }).populate("goods_fk").populate("staff_fk").populate("registerBook_fk");
        console.log(staffKit)
        if (staffKit) {
            return res.render("./goods-management/edit-oneStaffKit", {
                pageTittle: "ویرایش اجناس کارمندان",
                secondLayout: "ok",
                path: "/goods-management/edit-oneStaffKit/:id",
                errors: [],
                table: "ok",
                staffkits: staffKit,
                good,
                bookNames,
                skins,
                pages,
                years,
                // messages: req.flash("error_msg"),
                // message: req.flash("success_msg")
            })
        }
    } catch (err) {
        console.log(err);
        err.inner.forEach((err) => {
            errors.push({
                name: err.path,
                message: err.message,
            });
        });
    }
}

// @desc DMIS goods management handle searching tazkiraNum or studentid by ajax
// @rout POST /goods-management/search-id
exports.handelSearchId = async (req, res) => {
    try {
        const {
            searchId
        } = req.body;
        const student = await students.findOne({
            $or: [{
                studentId: searchId
            }, {
                tazkiraNum: searchId
            }]
        })
        console.log(student)
        if (student !== null) {
            return res.send(student.name)
        }
        res.send("هیچ محصلی با این نام پیدا نشد");
    } catch (err) {
        console.log(err);
    }
}

// @desc DMIS goods management handle searching tazkiraNum or idCard by ajax for staff
// @rout POST /goods-management/search-id1
exports.handelSearchId1 = async (req, res) => {
    try {
        const {
            searchId
        } = req.body;
        const staff = await staffs.findOne({
            $or: [{
                idCard: searchId
            }, {
                tazkiraNum: searchId
            }]
        })
        if (staff !== null) {
            return res.send(staff.name)
        }
        res.send("هیچ کارمند با این نام پیدا نشد");
    } catch (err) {
        console.log(err);
    }
}

// @desc BookRegiser 
// @routes POST /goods-management/bookRegister
exports.handleAddBookRegister = async (req, res) => {
    const bookRegisters = await bookRegisers.find({
        /*status: "exist"*/
    }).sort({
        'name': -1
    });
    const errors = [];
    try {

        await bookRegisers.registerBookValidation(req.body);

        //this part check the year  
        let currentDate = new Date();
        var arrDates = currentDate.getFullYear().toString().split(' ');
        var comperDate = parseInt(arrDates) - 621;

        if (parseInt(comperDate) < parseInt(req.body.year)) {
            req.flash("error_msg", "شما سال را اشتبا وارد نمودید!");
            return res.redirect("back");
        }

        const books = await bookRegisers.findOne({
            $and: [{
                bookName: req.body.bookName
            },
            {
                skin: req.body.skin
            }, {
                page: req.body.page
            }, {
                year: req.body.year
            }
            ]
        });
        if (books != null) {
            req.flash("error_msg", " کتابی با این نام صفحه،جلد و سال قبلا موجود بوده!");
            return res.redirect("back");
        }

        await bookRegisers.create(
            req.body
        );
        req.flash("success_msg", "کتاب مذکور موفقانه ثبت گردید");
        res.redirect("back");

    } catch (err) {

        err.inner.forEach((e) => {
            errors.push({
                name: e.path,
                message: e.message,
            });
        });

        return res.render("goods-management/show-bookRegister", {
            pageTittle: "اضافه کردن کتاب",
            path: "goods-management/show-bookRegister",
            errors,
            bookRegisters,
            // message: req.flash("success_msg"),
            // messages: req.flash("error_msg")
        });
    }
}

// @desc Add goods 
// @routes POST /goods-management/add-goods
exports.handleAddNewGoods = async (req, res) => {
    const errors = [];
    try {
        await goods.goodsValidation(req.body);
        const {
            name,
        } = req.body;
        const good = await goods.findOne({
            name,
        });
        if (good) {
            req.flash("error_msg", "جنس قبلا موجود بوده!");
            return res.redirect("add-goods");
        }
        await goods.create(
            req.body
        );
        req.flash("success_msg", "ثبت جنس موفقیت آمیز بود");
        return res.redirect("add-goods");


    } catch (err) {
        err.inner.forEach((e) => {
            errors.push({
                name: e.path,
                message: e.message,
            });
        });
        return res.render("goods-management/add-goods", {
            pageTittle: "اضافه کردن جنس جدید",
            path: "goods-management/add-goods",
            errors,
            // message: req.flash("success_msg"),
            // messages: req.flash("error_msg")
        });
    }
}

// @desc Add entr\\ies 
// @routes POST /goods-management/add- entries
exports.handleAddEntries = async (req, res) => {
    const errors = [];
    const bookName = await bookRegisers.distinct("bookName")
    const skin = await bookRegisers.distinct("skin")
    const page = await bookRegisers.distinct("page")
    const year = await bookRegisers.distinct("year")
    const entryDocument = await entryDocuments.distinct("docNum");
    // @Element form goods for choosing the nameOFGood
    const g = await goods.find();
    try {
        await entries.entriesValidation(req.body);
        const books = await bookRegisers.findOne({
            $and: [{
                bookName: req.body.nameBook
            },
            {
                skin: req.body.skin
            }, {
                page: req.body.page
            }, {
                year: req.body.year
            }
            ]
        });

        const documentNamber = await entryDocuments.findOne({
            docNum: req.body.numDoc
        });
        if (books === null || documentNamber === null) {
            if (books === null) {
                req.flash("error_msg", "کتابی با این مشخصات موجود نیست!");

            }
            if (documentNamber === null) {
                req.flash("error_msg", "نمبر حواله اشتباه است!");

            }
            return res.redirect("/goods-management/add-entries")
        }
        if (!req.body.dates) {
            req.flash("error_msg", "تاریخ ضروری میباشد!");
            return res.redirect("/goods-management/add-entries")
        }
        // comper with DateNow
        if (checkDate(req.body.dates) === false) {
            req.flash("error_msg", "تاریخ اشتباه است!");
            return res.redirect("/goods-management/add-entries")
        }

        const registerBook_fk = books._id;
        const entryDocument_fk = documentNamber._id;
        const good = await goods.findById({
            _id: req.body.goods_fk
        });
        console.log(req.body.dates);
        console.log("befor the entry id1");
        const temp = parseInt(good.quantityOfGoods) + parseInt(req.body.quantity);
        good.name = good.name;
        good.price = req.body.price;
        good.quantityOfGoods = temp;
        good.save();
        await entries.create({
            goods_fk: req.body.goods_fk,
            quantity: req.body.quantity,
            price: req.body.price,
            entryDocument_fk,
            placeFromRecieved: req.body.placeFromRecieved,
            dates: req.body.dates,
            registerBook_fk,
            considration: req.body.considration,
        });
        req.flash("success_msg", "ثبت ادخالات موفقعیت آمیز بود");
        res.redirect("/goods-management/add-entries");

    } catch (err) {
        console.log(err)
        err.inner.forEach((e) => {
            errors.push({
                name: e.path,
                message: e.message,
            });
        });
        res.render("./goods-management/add-entries", {
            pageTittle: "اضافه کردن جنس در ادخالات",
            path: "/goods-management/add-entries",
            errors,
            entryDocument,
            bookName,
            skin,
            page,
            year,
            goods: g,
            // message: req.flash("success_msg"),
            // messages: req.flash("error_msg")
        })
    }
}

// @desc Add Exits\\ies 
// @routes POST /goods-management/add-exits
exports.handleAddExits = async (req, res) => {
    const errors = [];
    // const good = await goods.distinct("name")
    const bookName = await bookRegisers.distinct("bookName")
    const skin = await bookRegisers.distinct("skin")
    const page = await bookRegisers.distinct("page")
    const year = await bookRegisers.distinct("year")
    const exportDocument = await exportDocuments.distinct("docSequenceNum");
    const exit = await exits.findOne({
        _id: req.params.id
    }).populate("goods_fk").populate("exportDocument_fk").populate("registerBook_fk")
        .sort({
            'date': -1
        });
    // @Element form goods for choosing the nameOFGood 
    const g = await goods.find();
    try {
        await exits.exitsValidation(req.body);
        let { goods_fk, quantity, placeSend, dates, considration } = req.body
        const books = await bookRegisers.findOne({
            $and: [{
                bookName: req.body.nameBook
            },
            {
                skin: req.body.skin
            }, {
                page: req.body.page
            }, {
                year: req.body.year
            }
            ]
        });
        const documentNamber = await exportDocuments.findOne({ docNum: req.body.numDoc });
        if (!books || !documentNamber) {
            if (!books) {
                req.flash("error_msg", "کتابی با این مشخصات موجود نیست!");
            }
            if (!documentNamber) {
                req.flash("error_msg", "نمبر حواله اشتباه است!");
            }
            return res.redirect("add-exits");
        }

        if (!req.body.dates) {
            req.flash("error_msg", "تاریخ ضروری میباشد!");
            return res.redirect("add-exits")
        }

        // comper with DateNow
        if (checkDate(req.body.dates) === false) {
            req.flash("error_msg", "تاریخ اشتباه است!");
            return res.redirect("add-exits")
        }

        const exportDocument_fk = documentNamber._id;
        const registerBook_fk = books._id;

        const good = await goods.findById({
            _id: req.body.goods_fk
        });
        if (parseInt(good.quantityOfGoods) >= parseInt(req.body.quantity)) {
            const temp = parseInt(good.quantityOfGoods) - parseInt(req.body.quantity);
            const price = good.price;
            good.quantityOfGoods = temp;
            await good.save();
            await exits.create({ goods_fk, quantity, price, exportDocument_fk, placeSend, dates, registerBook_fk, considration, });
            req.flash("success_msg", "ثبت اخراجات شما موفقانه انجام شد");
            res.redirect("add-exits");
        } else {

            req.flash("error_msg", `ثبت اخراجات شما بخاطر نبود کافی ( ${good.name} ) انجام نشد!`);
            res.redirect("add-exits");
        }
    } catch (err) {
        err.inner.forEach((e) => {
            errors.push({
                name: e.path,
                message: e.message,
            });
        });
        return res.render("./goods-management/add-exits", {
            pageTittle: "ویرایش نمودن ادخالات",
            path: "/goods-management/add-exits",
            errors,
            table: "ok",
            exit,
            exportDocument,
            year,
            page,
            skin,
            bookName,
            goods: g,
            // message: req.flash("success_msg"),
            // messages: req.flash("error-msg")
        })
    }
}

// @desc Add EnteyDocument\\ies 
// @routes POST /goods-management/add-entryDocument
exports.handleAddEntryDocument = async (req, res) => {
    const errors = [];
    const bookName = await bookRegisers.distinct("bookName")
    const skin = await bookRegisers.distinct("skin")
    const page = await bookRegisers.distinct("page")
    const year = await bookRegisers.distinct("year")
    try {

        await entryDocuments.entryDocumentValidation(req.body);
        const entryDocumentChecking = await entryDocuments.findOne({
            docNum: req.body.docNum
        })
        if (entryDocumentChecking) {
            req.flash("error_msg", "قبلا حواله وارده بااین مشخصات موجوداست!");
            return res.redirect("add-entryDocument");
        }

        let { summary, from, to, docNum, docDate, docEntryDate, page, skin, bookName, year, considration } = req.body;
        const books = await bookRegisers.findOne({
            $and: [{
                bookName: bookName
            },
            {
                skin: skin
            }, {
                page: page
            }, {
                year: year
            }
            ]
        });
        if (!books) {
            req.flash("error_msg", "کتابی با این مشخصات موجود نیست!");
            return res.redirect("add-entryDocument");
        }
        if (!req.body.docEntryDate) {
            req.flash("error_msg", "تاریخ ورودی حواله ضروری میباشد!");
            return res.redirect("add-exits")
        }
        if (!req.body.docDate) {
            req.flash("error_msg", "تاریخ حواله ضروری میباشد!");
            return res.redirect("add-exits")
        }
        if (checkDate(req.body.docEntryDate) === false) {
            req.flash("error_msg", "تاریخ ورودی حواله اشتباه است!");
            return res.redirect("add-entryDocument");
        }
        // comper with DateNow
        if (checkDate(req.body.docDate) === false) {
            req.flash("error_msg", "تاریخ ورودی حواله اشتباه است!");
            return res.redirect("add-entryDocument");
        }

        const registerBook_fk = books._id;
        await entryDocuments.create({ summary, from, to, docNum, docDate, docEntryDate, considration, registerBook_fk, });
        req.flash("success_msg", "ثبت حواله وارده موفقانه انجام شد");
        return res.redirect("add-entryDocument");
    } catch (err) {
        err.inner.forEach((e) => {
            errors.push({
                name: e.path,
                message: e.message,
            });
        });
        return res.render("goods-management/add-entryDocument", {
            pageTittle: "ثبت حواله وارده",
            path: "/goods-management/add-entryDocument",
            errors,
            bookName: bookName,
            skin,
            page,
            year: year,
            // message: req.flash("success_msg"),
            // messages: req.flash("error_msg")
        });
    }
}

// @desc Add ExportDocument\\ies 
// @routes POST /goods-management/add-exportDocument
exports.handleAddExportDocument = async (req, res) => {
    const errors = [];
    const bookName = await bookRegisers.distinct("bookName")
    const skin = await bookRegisers.distinct("skin")
    const page = await bookRegisers.distinct("page")
    const year = await bookRegisers.distinct("year")
    try {

        await exportDocuments.exportDocumentValidation(req.body);
        const exportDocumentChecking = await exportDocuments.findOne({
            docSequenceNum: req.body.docSequenceNum
        })
        if (exportDocumentChecking) {
            req.flash("error_msg", "قبلا حواله خارجه بااین مشخصات موجوداست!");
            return res.redirect("add-exportDocument");
        }
        let { summary, from, to, docSequenceNum, docDate, docExportDate, page, skin, bookName, year, considration } = req.body;
        const books = await bookRegisers.findOne({
            $and: [{
                bookName: bookName
            },
            {
                skin: skin
            }, {
                page: page
            }, {
                year: year
            }
            ]
        });

        if (!books) {
            req.flash("error_msg", "کتابی با این مشخصات موجود نیست!");
            return res.redirect("add-exportDocument");
        }

        if (!req.body.docDate) {
            req.flash("error_msg", "تاریخ حواله ضروری میباشد!");
            return res.redirect("add-exits")
        }

        if (!req.body.docExportDate) {
            req.flash("error_msg", "تاریخ  صدور ضروری میباشد!");
            return res.redirect("add-exits")
        }


        if (checkDate(req.body.docDate) === false) {
            req.flash("error_msg", "تاریخ حوله اشتباه است!");
            return res.redirect("add-exportDocument");
        }
        // comper with DateNow
        if (checkDate(req.body.docExportDate) === false) {
            req.flash("error_msg", "تاریخ صدور حوله اشتباه است!");
            return res.redirect("add-exportDocument");
        }
        const registerBook_fk = books._id;
        await exportDocuments.create({ summary, from, to, docSequenceNum, docDate, docExportDate, considration, registerBook_fk, });
        req.flash("success_msg", "ثبت حواله صارده موفقانه انجام شد");
        return res.redirect("add-exportDocument");
    } catch (err) {
        err.inner.forEach((e) => {
            errors.push({
                name: e.path,
                message: e.message,
            });
        });
        return res.render("goods-management/add-exportDocument", {
            pageTittle: "اضافه نمودن حواله صادره",
            path: "/goods-management/add-exportDocument",
            errors,
            bookName: bookName,
            skin,
            page,
            year: year,
            // message: req.flash("success_msg"),
            // messages: req.flash("error_msg")
        });
    }
}

// @desc Add StudnentKit\\ies 
// @routes POST /goods-management/add-studentKit
exports.handleAddNewStudentKit = async (req, res) => {
    const errors = [];
    const bookName = await bookRegisers.distinct("bookName")
    const skin = await bookRegisers.distinct("skin")
    const page = await bookRegisers.distinct("page")
    const year = await bookRegisers.distinct("year")
    try {

        await studnetKits.studentKitValidation(req.body);
        const student = await students.findOne({
            $or: [{
                studentId: req.body.IdNumber
            }, {
                tazkiraNum: req.body.IdNumber
            }]
        });

        const books = await bookRegisers.findOne({
            $and: [{
                bookName: req.body.nameBook
            },
            {
                skin: req.body.skin
            }, {
                page: req.body.page
            }, {
                year: req.body.year
            }
            ]
        });
        // console.log("beffor the studnet and book")
        if (!books || !student) {
            if (!books) {
                req.flash("error_msg", "آدرس کتاب به این نام، جلد، صفحه، سال موجود نیست !");
            }
            if (!student) {
                req.flash("error_msg", "این محصل که شما وارد نمودین در لیلیه نیست !");
            }
            return res.redirect("add-studentKit");
        }
        // console.log("affter the studnet and book")

        const student_roomTest = await students_rooms.findOne({
            student_fk: student._id
        });
        // console.log("affter the studnet_room")

        if (!student_roomTest) {
            req.flash("error_msg", "این محصل که شما وارد هنوز اطاق ندارد !");
            return res.redirect("add-studentKit");
        }

        // This is the best check date for my project @started
        //   This part check the time entry whit the date form student_rooms
        var Dates = new Date().getFullYear().toString();
        var arrDates = Dates.split('-')
        var comperDate = parseInt(arrDates[0]) - 621;
        // console.log(comperDate)
        if (parseInt(comperDate) < parseInt(req.body.Dates)) {
            req.flash("error_msg", "شما سال را اشتبا وارد نمودید!");
            return res.redirect("add-studentKit");
        }
        // @ the end of time

        //This section get the regiserBook Address 
        const registerBook_fk1 = books._id;
        //    In continue of check the regiserBook this part reach the good that is exit or not 
        const mattress_Add = await goods.findOne({
            name: "دوشک"
        });
        if (!mattress_Add) {
            console.log("mattress not exist!");
            req.flash("error_msg", "جنس دوشک درگدام هیچ ثبت نشد در اول آن جنس را ثبت نماید");
            return res.redirect("add-studentKit");
        }
        // In this part check the student_room table to find the student room 
        const student_room = await students_rooms.findById({
            _id: student_roomTest._id
        }).populate("student_fk").populate("room_fk");
        // res.send(student_room);
        const add_room = await rooms.findById({
            _id: student_room.room_fk._id
        });

        // this part show the repeatStudentKit of one sudent in one year
        const repeatStudentKit = await studnetKits.findOne({
            $and: [{
                students_fk: student._id
            }, {
                room_fk: add_room._id
            },
            {
                Dates: req.body.Dates
            },
            ]
        });
        if (repeatStudentKit != null) {
            req.flash("error_msg", "جنس قبلا گرفته شد ");
            return res.redirect("add-studentKit");
        }

        // strat this is the pillow places
        const pillow_Add = await goods.findOne({ name: "بالشت" });
        if (!pillow_Add) {
            req.flash("error_msg", "جنس بالشت درگدام هیچ ثبت نشد در اول آن جنس را ثبت نماید");
            return res.redirect("add-studentKit");
        }
        // strat this is the coverlet places
        const coverlet_Add = await goods.findOne({ name: "روجایی" });
        if (!coverlet_Add) {
            req.flash("error_msg", "روجائی درگدام هیچ ثبت نشد در اول آن جنس را ثبت نماید");
            return res.redirect("add-studentKit");
        }

        // strat this is the quilt places
        const quilt_Add = await goods.findOne({ name: "کمپل" });
        if (!quilt_Add) {
            req.flash("error_msg", "کمپل درگدام هیچ ثبت نشد در اول آن جنس را ثبت نماید");
            return res.redirect("add-studentKit");
        }

        // strat this is the bed places
        const bed_Add = await goods.findOne({ name: "چپرکت" });
        if (!bed_Add) {
            req.flash("error_msg", "چپرکت درگدام هیچ ثبت نشد در اول آن جنس را ثبت نماید");
            return res.redirect("add-studentKit");
        }

        // strat this is the mirror places
        const mirror_Add = await goods.findOne({ name: "آینه روی" });
        if (!mirror_Add) {
            req.flash("error_msg", "آینه روی درگدام هیچ ثبت نشد در اول آن جنس را ثبت نماید");
            return res.redirect("add-studentKit");
        }

        // strat this is the windowShade places
        const windowShade_Add = await goods.findOne({ name: "پرده" });
        if (!windowShade_Add) {
            req.flash("error_msg", "پرده درگدام هیچ ثبت نشد در اول آن جنس را ثبت نماید");
            return res.redirect("add-studentKit");
        }

        // strat this is the carpet places
        const carpet_Add = await goods.findOne({ name: "فرش" });
        if (!carpet_Add) {
            req.flash("error_msg", "فرش درگدام هیچ ثبت نشد در اول آن جنس را ثبت نماید");
            return res.redirect("add-studentKit");
        }

        // strat this is the table places
        const table_Add = await goods.findOne({ name: "میز" });
        if (!table_Add) {
            req.flash("error_msg", "میز درگدام هیچ ثبت نشد در اول آن جنس را ثبت نماید");
            return res.redirect("add-studentKit");
        }

        // strat this is the chair places
        const chair_Add = await goods.findOne({ name: "چوکی" });
        if (!chair_Add) {
            req.flash("error_msg", "چوکی درگدام هیچ ثبت نشد در اول آن جنس را ثبت نماید");
            return res.redirect("add-studentKit");
        }
        // after condation 

        // this code must transfer from here and depent to mattress
        if (parseInt(mattress_Add.quantityOfGoods) >= parseInt(req.body.mattress)) {
            const tempMattress = parseInt(mattress_Add.quantityOfGoods) - parseInt(req.body.mattress)
            mattress_Add.quantityOfGoods = tempMattress;
            await mattress_Add.save();
        } else {
            req.flash("error_msg", "مقدار دوشک درکدام کمتراز تعداد است شما به محصل میدهد");
            return res.redirect("add-studentKit");
        }
        // console.log("afther first goods");
        // end mattress places

        // this code must transfer from here
        if (parseInt(pillow_Add.quantityOfGoods) >= parseInt(req.body.pillow)) {
            const tempPillow = parseInt(pillow_Add.quantityOfGoods) - parseInt(req.body.pillow)
            pillow_Add.quantityOfGoods = tempPillow;
            await pillow_Add.save();

        } else {
            req.flash("error_msg", "مقدار بالشت درکدام کمتراز تعداد است شما به محصل میدهد");
            return res.redirect("add-studentKit");
        }
        // end mattress places

        // this code must transfer from here
        if (parseInt(coverlet_Add.quantityOfGoods) >= parseInt(req.body.coverlet)) {
            const tempCoverlet = parseInt(coverlet_Add.quantityOfGoods) - parseInt(req.body.coverlet)
            coverlet_Add.quantityOfGoods = tempCoverlet;
            await coverlet_Add.save();
        } else {
            req.flash("error_msg", "مقدار روجایی درکدام کمتراز تعداد است شما به محصل میدهد");
            return res.redirect("add-studentKit");
        }
        // end coverlet places


        // this code must transfer from here
        if (parseInt(quilt_Add.quantityOfGoods) >= parseInt(req.body.quilt)) {
            const tempQuilt = parseInt(quilt_Add.quantityOfGoods) - parseInt(req.body.quilt)
            quilt_Add.quantityOfGoods = tempQuilt;
            await quilt_Add.save();

        } else {
            req.flash("error_msg", "مقدار کمپل درکدام کمتراز تعداد است شما به محصل میدهد");
            return res.redirect("add-studentKit");
        }
        // end quilt places


        // this code must transfer from here
        if (parseInt(bed_Add.quantityOfGoods) >= parseInt(req.body.bed)) {
            const tempBed = parseInt(bed_Add.quantityOfGoods) - parseInt(req.body.bed)
            bed_Add.quantityOfGoods = tempBed;
            await bed_Add.save();
        } else {
            req.flash("error_msg", "مقدار چپرکت درکدام کمتراز تعداد است شما به محصل میدهد");
            return res.redirect("add-studentKit");
        }
        // end bed places

        // this code must transfer from here
        if (parseInt(mirror_Add.quantityOfGoods) >= parseInt(req.body.mirror)) {
            const tempMirror = parseInt(mirror_Add.quantityOfGoods) - parseInt(req.body.mirror)
            mirror_Add.quantityOfGoods = tempMirror;
            await mirror_Add.save();
        } else {
            req.flash("error_msg", "مقدار آینه روی درکدام کمتراز تعداد است شما به محصل میدهد");
            return res.redirect("add-studentKit");
        }
        // end mirror places

        // this code must transfer from here
        if (parseInt(windowShade_Add.quantityOfGoods) >= parseInt(req.body.windowShade)) {
            const tempWindowShade = parseInt(windowShade_Add.quantityOfGoods) - parseInt(req.body.windowShade)
            windowShade_Add.quantityOfGoods = tempWindowShade;
            await windowShade_Add.save();
        } else {
            req.flash("error_msg", "مقدار پرده درکدام کمتراز تعداد است شما به محصل میدهد");
            return res.redirect("add-studentKit");
        }
        // end windowShade places

        // this code must transfer from here
        if (parseInt(carpet_Add.quantityOfGoods) >= parseInt(req.body.carpet)) {
            const tempCarpet = parseInt(carpet_Add.quantityOfGoods) - parseInt(req.body.carpet)
            carpet_Add.quantityOfGoods = tempCarpet;
            await carpet_Add.save();
        } else {
            req.flash("error_msg", "مقدار فرش درکدام کمتراز تعداد است شما به محصل میدهد");
            return res.redirect("add-studentKit");
        }
        // end carpet places

        // this code must transfer from here
        if (parseInt(table_Add.quantityOfGoods) >= parseInt(req.body.table)) {
            const tempTable = parseInt(table_Add.quantityOfGoods) - parseInt(req.body.table)
            table_Add.quantityOfGoods = tempTable;
            await table_Add.save();
        } else {
            req.flash("error_msg", "مقدار میز درکدام کمتراز تعداد است شما به محصل میدهد");
            return res.redirect("add-studentKit");
        }
        // end table places

        // this code must transfer from here
        if (parseInt(chair_Add.quantityOfGoods) >= parseInt(req.body.chair)) {
            const tempchair = parseInt(chair_Add.quantityOfGoods) - parseInt(req.body.chair)
            chair_Add.quantityOfGoods = tempchair;
            await chair_Add.save();
        } else {
            req.flash("error_msg", "مقدار چوکی درکدام کمتراز تعداد است شما به محصل میدهد");
            return res.redirect("add-studentKit");
        }
        // end chair places

        await studnetKits.create({
            mattress: req.body.mattress,
            pillow: req.body.pillow,
            coverlet: req.body.coverlet,
            quilt: req.body.quilt,
            bed: req.body.bed,
            mirror: req.body.mirror,
            windowShade: req.body.windowShade,
            carpet: req.body.carpet,
            table: req.body.table,
            chair: req.body.chair,
            Dates: req.body.Dates,
            room_fk: add_room._id,
            students_fk: student._id,
            registerBook_fk: registerBook_fk1,
        });

        req.flash("success_msg", "ثبت جنس موفقیت آمیز بود");
        return res.redirect("add-studentKit");


    } catch (err) {
        err.inner.forEach((e) => {
            errors.push({
                name: e.path,
                message: e.message,
            });
        });
        res.render("./goods-management/add-studentKit", {
            pageTittle: "اضافه نمودن البسه محصل",
            path: "/goods-management/add-studentKit",
            errors,
            bookName,
            skin,
            page,
            year,
        })
    }
}

// @desc Add staff\\ies 
// @routes POST /goods-management/add-staff
exports.handleAddStaff = async (req, res) => {
    const errors = [];
    try {
        // return res.send(req.body);
        console.log("beforvalidation")
        await staffs.staffValidation(req.body);
        console.log("after validartion")
        const card = req.body.idCard;
        const tazkira = req.body.tazkiraNum;

        const staff = await staffs.findOne({
            $or: [{
                idCard: card
            }, {
                tazkiraNum: tazkira
            }]
        });
        console.log(staff)
        if (staff) {
            req.flash("error_msg", " این کارمند قبلا ثبت شد!");
            res.redirect("add-staff");
        } else {

            await staffs.create(req.body);
            req.flash("success_msg", "ثبت کارمند موفقیت آمیز بود");
            res.redirect("add-staff");
        }
        console.log("after else ")

    } catch (err) {
        console.log(err);
        err.inner.forEach((e) => {
            errors.push({
                name: e.path,
                message: e.message,
            });
        });
        res.render("./goods-management/add-staff", {
            pageTittle: "اضافه کردن کارمند",
            path: "/goods-management/add-staff",
            errors,
            // messages: req.flash("error_msg"),
            // message: req.flash("success_msg"),
        })
    }
}


// @desc Add staffKit\\ies Staff_Kit
// @routes POST /goods-management/add-staffKit
exports.handleAddNewStaffKit = async (req, res) => {
    const good = await goods.distinct("name")
    const bookName = await bookRegisers.distinct("bookName")
    const skin = await bookRegisers.distinct("skin")
    const page = await bookRegisers.distinct("page")
    const year = await bookRegisers.distinct("year")
    const errors = [];

    try {

        // console.log("in staff kit")
        await staffKits.staffKitValiation(req.body);
        const goodInformation = await goods.findOne({ name: req.body.goodName });

        const staffInformation = await staffs.findOne({
            $or: [{
                idCard: req.body.IdNumber
            },
            {
                tazkiraNum: req.body.IdNumber
            },]
        });
        const books = await bookRegisers.findOne({
            $and: [{
                bookName: req.body.nameBook
            },
            {
                skin: req.body.skin
            }, {
                page: req.body.page
            }, {
                year: req.body.year
            }
            ]
        });

        if (!staffInformation || !books) {

            if (!staffInformation) {
                req.flash("error_msg", "کارمند به این آدی نمبر یا نمبرتذکره موجود نمی باشد!");
            }
            if (!books) {
                req.flash("error_msg", "آدرس کتاب به این نام، جلد، صفحه، سال موجود نیست !");
            }
            return res.redirect("back")
        }

        //this part check the year  
        let currentDate = new Date();
        var arrDates = currentDate.getFullYear().toString().split(' ');
        var comperDate = parseInt(arrDates) - 621;
        if (parseInt(comperDate) < parseInt(req.body.Dates)) {
            req.flash("error_msg", "شما سال را اشتبا وارد نمودید!")
            return res.redirect("back")
        }
        const staffKit_preExist = await staffKits.findOne({
            $and: [{
                goods_fk: goodInformation._id
            },
            {
                staff_fk: staffInformation._id
            }, {
                Dates: req.body.Dates
            },
            ]
        });
        if (staffKit_preExist) {
            req.flash("success_msg", "جنس قبلا گرفته شد است!");
            return res.redirect("back")
        }
        // res.send(req.body);
        if (parseInt(goodInformation.quantityOfGoods) < parseInt(req.body.goodAmount)) {
            req.flash("error_msg", "مقدار جنس درگدام کمتراز تعداد است ک شما به کارمند میدهد!");
            return res.redirect("back")
        }
        const tempGood = parseInt(goodInformation.quantityOfGoods) - parseInt(req.body.goodAmount)
        goodInformation.quantityOfGoods = tempGood;
        await goodInformation.save();

        const staff_fk = staffInformation._id;

        const registerBook_fk = books._id;

        const goods_fk = goodInformation._id;
        const {
            Dates,
            goodAmount
        } = req.body;

        await staffKits.create({ goodAmount, Dates, goods_fk, staff_fk, registerBook_fk })
        req.flash("success_msg", "ثبت جنس کارمند موفقیت آمیز بود");
        res.redirect("add-kitStaff");
    } catch (err) {
        console.log(err);
        err.inner.forEach((e) => {
            errors.push({
                name: e.path,
                message: e.message,
            });
        });
        res.render("./goods-management/add-kitStaff", {
            pageTittle: "ثبت اجناس کارمند",
            path: "/goods-management/add-kitStaff",
            errors: [],
            good,
            bookName,
            skin,
            page,
            year,
            // message: req.flash("success_msg"),
            // messages: req.flash("error_msg"),
        })
    }
}


// @desc Edit goods 
// @routes Post/goods-management/edit-goods
exports.handleEditGoods = async (req, res) => {
    const errors = [];
    const good = await goods.findOne({
        _id: req.params.id
    });
    // console.log(good)
    try {
        if (!good) {
            return res.redirect("/404")
        }
        await goods.goodsValidation(req.body);
        const previousGoodExit = await goods.findOne({
            name: req.body.name
        });
        if (previousGoodExit) {
            if (!previousGoodExit._id.equals(good._id)) {
                req.flash("error_msg", "جنس که وارد نموده هستین قبلا به همین نام موجود است!");
                return res.redirect("./goods-management/edit-goods");
            }
        }
        let flag = false;
        const mattress_Add = await goods.findOne({ name: "دوشک" });
        const pillow_Add = await goods.findOne({ name: "بالشت" });
        const coverlet_Add = await goods.findOne({ name: "روجایی" });
        const quilt_Add = await goods.findOne({ name: "کمپل" });
        const bed_Add = await goods.findOne({ name: "چپرکت" });
        const mirror_Add = await goods.findOne({ name: "آینه روی" });
        const windowShade_Add = await goods.findOne({ name: "پرده" });
        const carpet_Add = await goods.findOne({ name: "فرش" });
        const table_Add = await goods.findOne({ name: "میز" });
        const chair_Add = await goods.findOne({ name: "چوکی" });
        if (good._id.equals(mattress_Add._id)) {
            flag = true;
        }
        if (good._id.equals(pillow_Add._id)) {
            flag = true;
        }
        if (good._id.equals(coverlet_Add._id)) {
            flag = true;
        }
        if (good._id.equals(quilt_Add._id)) {
            flag = true;
        }
        if (good._id.equals(bed_Add._id)) {
            flag = true;
        }
        if (good._id.equals(mirror_Add._id)) {
            flag = true;
        }
        if (good._id.equals(windowShade_Add._id)) {
            flag = true;
        }
        if (good._id.equals(carpet_Add._id)) {
            flag = true;
        }
        if (good._id.equals(table_Add._id)) {
            flag = true;
        }
        if (good._id.equals(chair_Add._id)) {
            flag = true;
        }
        if (flag) {
            good.price = req.body.price;
            await good.save();
            req.flash("success_msg", "شما موفقانه ویرایش نمودید");
            return res.redirect("/goods-management/show-goods")
        }
        const { name, price, } = req.body;
        good.name = name;
        good.price = price;
        good.save();
        req.flash("success_msg", "شما موفقانه ویرایش نمودید");
        return res.redirect("/goods-management/show-goods")
    } catch (err) {
        //  console.log(err);
        err.inner.forEach((e) => {
            errors.push({
                name: e.path,
                price: e.path,
                quantityOfGoods: e.path,
                message: e.message,
            });
        });
        return res.render("./goods-management/edit-goods", {
            pageTittle: "ویرایش نمودن جنس",
            path: "/goods-management/edit-goods",
            secondLayout: "ok",
            errors,
            table: "ok",
            good,
        });
    }
}

// @desc Edit bookRegiser 
// @routes Post/goods-management/edit-bookRegister
exports.handleEditBookRegister = async (req, res) => {
    // console.log("hi alishah in handle edit book regiser");
    const errors = [];
    const bookRegister = await bookRegisers.findOne({
        _id: req.params.id
    });

    try {

        await bookRegisers.registerBookValidation(req.body);
        const testBookRegister = await bookRegisers.findOne({
            $and: [{
                bookName: req.body.bookName
            },
            {
                skin: req.body.skin
            },
            {
                page: req.body.page
            },
            {
                year: req.body.year
            }]
        })

        //this part check the year  
        let currentDate = new Date();
        var arrDates = currentDate.getFullYear().toString().split(' ');
        var comperDate = parseInt(arrDates) - 621;
        if (parseInt(comperDate) < parseInt(req.body.year)) {
            req.flash("error_msg", "شما سال را اشتبا وارد نمودید!")
            return res.redirect(`/goods-management/edit-bookRegister/${req.params.id}`)
        }
        // console.log("hi alishah in handle edit book regiser");
        if (testBookRegister) {
            if (!testBookRegister._id.equals(bookRegister._id)) {
                req.flash("error_msg", " کتابی با این مشخصات قبلا وجود داشته!");
                return res.redirect(`/goods-management/edit-bookRegister/${req.params.id}`)
            }
        }

        bookRegister.bookName = req.body.bookName;
        bookRegister.skin = req.body.skin;
        bookRegister.page = req.body.page;
        bookRegister.year = req.body.year;
        await bookRegister.save();
        req.flash("success_msg", "شما موفقانه این بخش کتاب را ویرایش نمودید!");
        return res.redirect(`/goods-management/show-oneBookRegister/${req.params.id}`)
    } catch (err) {
        // console.log("beffor error")
        // console.log(err);
        err.inner.forEach((e) => {
            errors.push({
                name: e.path,
                message: e.message,
            });
        });
        return res.render("./goods-management/edit-bookRegister", {
            pageTittle: "ویرایش نمودن کتاب",
            secondLayout: "ok",
            path: "/goods-management/edit-bookRegister/:id",
            errors,
            table: "ok",
            bookRegister,
        });
    }
}

// @desc Edit entries
// @routes Post/goods-management/edit-entries
exports.handleEditEntries = async (req, res) => {
    const errors = [];
    const g = await goods.find();
    // 
    const bookName = await bookRegisers.distinct("bookName")
    const skin = await bookRegisers.distinct("skin")
    const page = await bookRegisers.distinct("page")
    const year = await bookRegisers.distinct("year")
    const entryDocument = await entryDocuments.distinct("docNum");
    const entry = await entries.findOne({
        _id: req.params.id
    }).populate("goods_fk").populate("entryDocument_fk").populate("registerBook_fk").sort({
        'date': -1
    })
    // 
    const good = await goods.findOne({
        _id: req.body.lastId
    });
    const newGood = await goods.findOne({
        _id: req.body.goods_fk
    });
    try {
        await entries.entriesValidation(req.body);
        if (!entry) {
            return res.redirect("back")
        }
        let { goods_fk, quantity, price, placeFromRecieved, dates, considration, } = req.body;

        const books = await bookRegisers.findOne({
            $and: [{
                bookName: req.body.nameBook
            },
            {
                skin: req.body.skin
            }, {
                page: req.body.page
            }, {
                year: req.body.year
            }
            ]
        });

        const documentNamber = await entryDocuments.findOne({
            docNum: req.body.numDoc
        });
        if (!books || !documentNamber) {
            if (!books) {
                req.flash("error_msg", "کتابی با این مشخصات موجود نیست!");
            }
            if (!documentNamber) {
                req.flash("error_msg", "نمبر حواله اشتباه است!");
            }
            return res.redirect(`/goods-management/edit-entries/${req.params.id}`)
        }
        if (req.body.dates) {
            // comper with DateNow
            if (checkDate(req.body.dates) === false) {
                req.flash("error_msg", "تاریخ اشتباه است!");
                return res.redirect(`/goods-management/edit-entries/${req.params.id}`)
            }
        }
        const entryDocument_fk = documentNamber._id;
        const registerBook_fk = books._id;

        //for same goods
        if (good._id.equals(newGood._id)) {

            if (parseInt(good.quantityOfGoods) >= parseInt(entry.quantity)) {

                const temp = (parseInt(good.quantityOfGoods) + parseInt(req.body.quantity)) - parseInt(entry.quantity);
                good.price = req.body.price;
                good.quantityOfGoods = temp;
                await good.save();
            } else {
                if (parseInt(req.body.quantity) >= parseInt(entry.quantity)) {
                    const temp1 = (parseInt(good.quantityOfGoods) + parseInt(req.body.quantity)) - parseInt(entry.quantity);
                    good.price = req.body.price;
                    good.quantityOfGoods = temp1;
                    await good.save();
                } else {
                    req.flash("error_msg", `مقدار جنس وارده در اخالات نباید کمتر از ( ${entry.quantity} ) باشد `);
                    return res.redirect(`/goods-management/edit-entries/${req.params.id}`)
                }
            }
        } else {
            //this condation for different goods
            if (parseInt(good.quantityOfGoods) >= parseInt(entry.quantity) && parseInt(entry.quantity) >= parseInt(req.body.quantity)) {
                const temp = parseInt(good.quantityOfGoods) - parseInt(entry.quantity);
                good.name = good.name;
                good.price = req.body.price;
                good.quantityOfGoods = temp;
                await good.save();
                const temp1 = parseInt(newGood.quantityOfGoods) + parseInt(entry.quantity);
                newGood.name = newGood.name;
                newGood.price = req.body.price;
                newGood.quantityOfGoods = temp1;
                await newGood.save();
            } else {
                req.flash("error_msg", `نبابرنبود مقدار کافی جنس در مقدارآن ما نمی توانیم  تغییرات بیاوریم`);
                return res.redirect(`/goods-management/edit-entries/${req.params.id}`)
            }
        }
        entry.goods_fk = goods_fk;
        entry.quantity = quantity;
        entry.price = price;
        entry.entryDocument_fk = entryDocument_fk;
        entry.placeFromRecieved = placeFromRecieved;
        if (req.body.dates) {
            entry.dates = dates;
        }
        entry.registerBook_fk = registerBook_fk;
        entry.considration = considration;
        await entry.save();
        req.flash("success_msg", "شما موفقانه ویرایش نمودید");
        return res.redirect(`/goods-management/show-oneEntries/${req.params.id}`)

    } catch (err) {
        err.inner.forEach((e) => {
            errors.push({
                name: e.path,
                message: e.message,
            });
        });
        return res.render("./goods-management/edit-entries", {
            pageTittle: "ویرایش نمودن ادخالات",
            secondLayout: "ok",
            path: "/goods-management/edit-entries/:id",
            errors,
            table: "ok",
            entry,
            bookName,
            skin,
            page,
            year,
            entryDocument,
            goods: g,
        })
    }
}

// @desc Edit exits
// @routes Post/goods-management/edit-exits
exports.handleEditExits = async (req, res) => {
    const errors = [];
    const g = await goods.find();
    const good = await goods.distinct("name")
    const bookName = await bookRegisers.distinct("bookName")
    const skin = await bookRegisers.distinct("skin")
    const page = await bookRegisers.distinct("page")
    const year = await bookRegisers.distinct("year")
    const exportDocument = await exportDocuments.distinct("docSequenceNum");
    const exit = await exits.findOne({
        _id: req.params.id
    }).populate("goods_fk").populate("exportDocument_fk").populate("registerBook_fk");
    //
    try {
        await exits.exitsValidation(req.body);
        const previousGood = await goods.findOne({
            name: req.body.previousName
        });
        const newGood = await goods.findOne({
            name: req.body.goods_fk
        });
        const books = await bookRegisers.findOne({
            $and: [{
                bookName: req.body.nameBook
            },
            {
                skin: req.body.skin
            }, {
                page: req.body.page
            }, {
                year: req.body.year
            }
            ]
        });
        const documentNamber = await exportDocuments.findOne({
            docNum: req.body.numDoc
        });
        if (!newGood || !books || !documentNamber || !exit) {
            if (!newGood) {

                req.flash("error_msg", "این جنس در گدام وجود ندارد!");
            }
            if (!books) {
                req.flash("error_msg", "کتابی با این صفحه ، جلد و سال یافت نشد!");
            }
            if (!documentNamber) {

                req.flash("success_msg", "نمبر مکتوب با این مشحضات موجود نیست!");
            }
            return res.redirect(`/goods-management/edit-exits/${req.params.id}`)
        }
        if (req.body.dates) {
            if (checkDate(req.body.dates) === false) {
                req.flash("error_msg", "تاریخ اشتباه است!");
                return res.redirect(`/goods-management/edit-exits/${req.params.id}`)
            }
        }
        const exportDocument_fks = documentNamber._id;
        const registerBook_fks = books._id;
        const goods_fks = await goods.findById({
            _id: newGood._id
        });
        if (previousGood._id.equals(newGood._id)) {
            // because of condition quantity of exits from database add whit good quantity form database
            const sam = (parseInt(exit.quantity) + parseInt(newGood.quantityOfGoods))
            if (sam >= parseInt(req.body.quantity)) {
                // after condition new price subtract from total of both quantity of goods and exits
                const temp = parseInt(sam) - parseInt(req.body.quantity);
                newGood.quantityOfGoods = temp;
                await newGood.save();
            } else {
                req.flash("success_msg", "در گدام به اندازه که شما میخواهید فعلا جنس موجود نیست!");
                return res.redirect(`/goods-management/edit-exits/${req.params.id}`)
            }
        } else {

            if (parseInt(newGood.quantityOfGoods) >= parseInt(req.body.quantity)) {
                // after the goods became different on that time
                // previous good again add with last exits quantity
                const previousTemp = (parseInt(previousGood.quantityOfGoods) + parseInt(exit.quantity));
                previousGood.quantityOfGoods = previousTemp;
                await previousGood.save();
                // From new good the quantity of exit became subtraction
                const temp1 = parseInt(newGood.quantityOfGoods) - parseInt(req.body.quantity);
                newGood.quantityOfGoods = temp1;
                await newGood.save();
            } else {
                req.flash("success_msg", "در گدام جنس جدید به تعداد که شما میخواهید نیست!");
                return res.redirect(`/goods-management/edit-exits/${req.params.id}`)
            }
        }
        exit.goods_fk = goods_fks._id;
        exit.quantity = req.body.quantity;
        exit.registerBook_fk = registerBook_fks;
        exit.exportDocument_fk = exportDocument_fks;
        exit.placeSend = req.body.placeSend;
        if (req.body.dates) { exit.dates = req.body.dates; }
        exitconsidration = req.body.considration;
        await exit.save();
        req.flash("success_msg", "شما موفقانه ویرایش نمودید");
        return res.redirect(`/goods-management/show-oneExits/${req.params.id}`);
    } catch (err) {
        err.inner.forEach((e) => {
            errors.push({
                name: e.path,
                message: e.message,
            });
        });
        return res.render("./goods-management/edit-exits", {
            pageTittle: "ویرایش نمودن اخراجات",
            secondLayout: "ok",
            path: "/goods-management/edit-exits/:id",
            errors,
            table: "ok",
            exit,
            exportDocument,
            year,
            page,
            skin,
            bookName,
            good,
            goods: g,
        })
    }
}

// @desc Edit entryDocument
// @routes Post/goods-management/edit-entryDocument
exports.handleEditEntryDocument = async (req, res) => {
    const errors = [];
    const bookName = await bookRegisers.distinct("bookName")
    const skin = await bookRegisers.distinct("skin")
    const page = await bookRegisers.distinct("page")
    const year = await bookRegisers.distinct("year")
    const entryDocument = await entryDocuments.findOne({
        _id: req.params.id
    }).populate("registerBook_fk");
    try {
        await entryDocuments.entryDocumentValidation(req.body);
        if (!entryDocument) {
            return res.redirect("back")
        }
        await entryDocuments.entryDocumentValidation(req.body);
        const entryDocumentChecking = await entryDocuments.findOne({
            docNum: req.body.docNum
        })
        if (entryDocumentChecking) {
            if (!(entryDocument._id.equals(entryDocumentChecking._id))) {
                req.flash("error_msg", "قبلا حواله وارده بااین مشخصات موجود بوده!");
                return res.redirect(`/goods-management/edit-entryDocument/${req.params.id}`)
            }
        }
        const { summary, from, to, docNum, docDate, docEntryDate, page, skin, bookName, year, considration } = req.body;

        const books = await bookRegisers.findOne({
            $and: [{
                bookName: bookName
            },
            {
                skin: skin
            }, {
                page: page
            }, {
                year: year
            }
            ]
        });
        if (!books) {
            req.flash("error_msg", "کتابی با این مشخصات موجود نیست!");
            return res.redirect(`/goods-management/edit-entryDocument/${req.params.id}`)
        }

        if (req.body.docEntryDate) {
            if (checkDate(req.body.docEntryDate) === false) {
                req.flash("error_msg", "تاریخ حواله اشتباه است!");
                return res.redirect(`/goods-management/edit-entryDocument/${req.params.id}`)
            }
        }
        // comper with DateNow
        if (req.body.docDate) {

            if (checkDate(req.body.docDate) === false) {
                req.flash("error_msg", "تاریخ ورودی حواله اشتباه است!");
                return res.redirect(`/goods-management/edit-entryDocument/${req.params.id}`)
            }
        }
        const registerBook_fk = books._id;
        entryDocument.summary = summary;
        entryDocument.from = from;
        entryDocument.to = to;
        entryDocument.docNum = docNum;

        if (req.body.docEntryDate) { entryDocument.docDate = docDate; }

        if (req.body.docEntryDate) { entryDocument.docEntryDate = docEntryDate; }

        entryDocument.considration = considration;
        entryDocument.registerBook_fk = registerBook_fk;
        entryDocument.save();
        req.flash("success_msg", "شما موفقانه ویرایش نمودید");
        return res.redirect(`/goods-management/show-oneEntryDocument/${req.params.id}`)
    } catch (err) {
        err.inner.forEach((e) => {
            errors.push({
                name: e.path,
                message: e.message,
            });
        });
        return res.render("./goods-management/edit-entryDocument", {
            pageTittle: "ویرایش نمودن حواله وارده",
            secondLayout: "ok",
            path: "/goods-management/edit-entryDocument/:id",
            errors,
            table: "ok",
            bookName: bookName,
            skin,
            page,
            year: year,
            entryDocument,
            // message: req.flash("success_msg"),
            // messages: req.flash("error_msg")
        })
    }
}

// @desc Edit exportDocument
// @routes Post/goods-management/edit-exportDocument
exports.handleEditExportDocument = async (req, res) => {
    const errors = [];
    const bookName = await bookRegisers.distinct("bookName")
    const skin = await bookRegisers.distinct("skin")
    const page = await bookRegisers.distinct("page")
    const year = await bookRegisers.distinct("year")
    const exportDocument = await exportDocuments.findOne({
        _id: req.params.id
    }).populate("registerBook_fk");
    try {

        if (!exportDocument) {
            return res.redirect(`/goods-management/edit-exportDocument/${req.params.id}`);
        }
        await exportDocuments.exportDocumentValidation(req.body);

        const exportDocumentChecking = await exportDocuments.findOne({
            docNum: req.body.docNum
        })
        // if (exportDocumentChecking) {
        //     if (parseInt(exportDocument._id) === parseInt(exportDocumentChecking._id)) {
               
        //     }else{
        //         req.flash("error_msg", "قبلا حواله صادره بااین مشخصات موجود بوده!");
        //         return res.redirect(`/goods-management/edit-exportDocument/${req.params.id}`);
        //     }
        // }
        const { summary, from, to, docSequenceNum, docDate, docExportDate, considration } = req.body;
        const books = await bookRegisers.findOne({
            $and: [{
                bookName: req.body.bookName
            },
            {
                skin: req.body.skin
            }, {
                page: req.body.page
            }, {
                year: req.body.year
            }
            ]
        });
        if (!books) {
            req.flash("error_msg", " کتابی با این مشخصات موجود نیست !");
            return res.redirect(`/goods-management/edit-exportDocument/${req.params.id}`);
        }
        if (req.body.docDate) {
            if (checkDate(req.body.docDate) === false) {
                req.flash("error_msg", "تاریخ حوله اشتباه است!");
                return res.redirect(`/goods-management/edit-exportDocument/${req.params.id}`);
            }
        }
        // comper with DateNow
        if (req.body.docExportDate) {
            if (checkDate(req.body.docExportDate) === false) {
                req.flash("error_msg", "تاریخ صدور حوله اشتباه است!");
                return res.redirect(`/goods-management/edit-exportDocument/${req.params.id}`);

            }
        }
        const registerBook_fk = books._id;
        exportDocument.summary = summary;
        exportDocument.from = from;
        exportDocument.to = to;
        exportDocument.docSequenceNum = docSequenceNum;

        if (req.body.docDate) { exportDocument.docDate = docDate; }

        if (req.body.docExportDate) { exportDocument.docExportDate = docExportDate; }
        exportDocument.considration = considration;
        exportDocument.registerBook_fk = registerBook_fk;
        exportDocument.save();
        console.log("after the save")
        req.flash("success_msg", "شما موفقانه ویرایش نمودید");
        return res.redirect("/goods-management/show-exportDocument")
    } catch (err) {
        err.inner.forEach((e) => {
            errors.push({
                name: e.path,
                message: e.message,
            });
        });
        return res.render("./goods-management/edit-exportDocument", {
            pageTittle: "ویرایش نمودن حواله صادره",
            secondLayout: "ok",
            path: "/goods-management/edit-exportDocument/:id",
            errors,
            table: "ok",
            bookName: bookName,
            skin,
            page,
            year: year,
            exportDocument,
            // message: req.flash("success_msg"),
            // messages: req.flash("error_msg")

        })
    }
}

// @desc Edit staff 
// @routes Post/goods-management/edit-goods
exports.handleEditStaff = async (req, res) => {
    const errors = [];
    const staff = await staffs.findOne({
        _id: req.params.id
    });
    console.log(staff)
    console.log("id");
    try {
        if (!staff) {
            return res.redirect("/404")
        }

        await staffs.staffValidation(req.body);

        const {
            name,
            fName,
            gFName,
            Job,
            province,
            destrict,
            tazkiraNum,
            idCard,
            phoneNum,
        } = req.body;
        const staff_preExist = await staffs.findOne({
            $or: [{
                idCard: idCard
            }, {
                tazkiraNum: tazkiraNum
            }]
        });
        if (staff_preExist && (req.params.id != staff_preExist._id)) {
            req.flash("error_msg", "شما آدی کارت ویا تذکره نمبر یک کارمند دیگر راکه قبلا موجود است وارد کردین");
            return res.render("./goods-management/edit-staff", {
                pageTittle: "ویرایش نمودن جنس",
                path: "/goods-management/edit-staff/:id",
                secondLayout: "ok",
                errors,
                table: "ok",
                staff,
                // messages: req.flash("error_msg"),
                message: req.flash("success_msg")
            });
        }
        staff.name = name;
        staff.fName = fName;
        staff.gFName = gFName;
        staff.Job = Job;
        staff.province = province;
        staff.destrict = destrict;
        staff.tazkiraNum = tazkiraNum;
        console.log("inafter tazkiratName")
        staff.idCard = idCard;
        staff.phoneNum = phoneNum;
        await staff.save()
        req.flash("success_msg", "شما موفقانه ویرایش نمودید");
        return res.redirect("/goods-management/show-staffs")
    } catch (err) {
        //  console.log(err);
        err.inner.forEach((e) => {
            errors.push({
                name: e.path,
                price: e.path,
                quantityOfGoods: e.path,
                message: e.message,
            });
        });
        return res.render("./goods-management/edit-staff", {
            pageTittle: "ویرایش نمودن جنس",
            path: "/goods-management/edit-staff/:id",
            secondLayout: "ok",
            errors,
            table: "ok",
            staff,
            // messages: req.flash("error_msg"),
            message: req.flash("success_msg")
        });
    }
}

// @desc Edit goods 
// @routes Post/goods-management/edit-goods
exports.handleEditOneStaffKit = async (req, res) => {

    const good = await goods.distinct("name")
    const bookNames = await bookRegisers.distinct("bookName")
    const skins = await bookRegisers.distinct("skin")
    const pages = await bookRegisers.distinct("page")
    const years = await bookRegisers.distinct("year")
    const errors = [];
    const staffKit = await staffKits.findOne({
        _id: req.params.id
    }).populate("goods_fk").populate("staff_fk").populate("registerBook_fk");
    // res.send(newGood);
    // res.send(staffKit)
    // console.log("here")
    try {

        await staffKits.staffKitValiation(req.body);
        // console.log("here1")
        const books = await bookRegisers.findOne({
            $and: [{
                bookName: req.body.nameBook
            },
            {
                skin: req.body.skin
            }, {
                page: req.body.page
            }, {
                year: req.body.year
            }
            ]
        });

        if (!staffKit || !books) {
            req.flash("error_msg", "شما سال را اشتبا وارد نمودید!")

            return res.redirect("back")
        }
        
        //this part check the year  
        let currentDate = new Date();
        var arrDates = currentDate.getFullYear().toString().split(' ');
        var comperDate = parseInt(arrDates) - 621;
        if (parseInt(comperDate) < parseInt(req.body.Dates)) {
            req.flash("error_msg", "شما سال را اشتبا وارد نمودید!")
            // return res.redirect(`/goods-management/edit-bookRegister/${req.params.id}`)
            return res.redirect("back")
        }

        const newGood = await goods.findOne({
            name: req.body.goodName
        });
        const lastGood = await goods.findOne({
            _id: staffKit.goods_fk._id
        });

        if (!newGood && !lastGood) {
            req.flash("error_msg", "شما سال را اشتبا وارد نمودید!")

            return res.redirect(`/goods-management/edit-oneStaffKit/${req.params.id}`);
        }

        let goods_fk = newGood._id;
        if (newGood._id.equals(lastGood._id)) {
            const temp = parseInt(lastGood.quantityOfGoods) + parseInt(staffKit.goodAmount);
            if (parseInt(temp) >= parseInt(req.body.goodAmount)) {
                const tempGood = parseInt(temp) - parseInt(req.body.goodAmount)
                lastGood.quantityOfGoods = tempGood;
                await lastGood.save();
                // goods_fk = lastGood._id;

            } else {
                return res.redirect("back");
            }

        } else {
            if (parseInt(newGood.quantityOfGoods) >= parseInt(req.body.goodAmount)) {
                const temp_Good = parseInt(lastGood.quantityOfGoods) + parseInt(staffKit.goodAmount)
                lastGood.quantityOfGoods = temp_Good;
                await lastGood.save();

                const temp_NewGood = parseInt(newGood.quantityOfGoods) - parseInt(req.body.goodAmount)
                newGood.quantityOfGoods = temp_NewGood;
                await newGood.save();
                // goods_fk = newGood._id;
            } else {
                return res.redirect("back");
            }
        }
        const registerBook_fk = books._id;

        const {
            Dates,
            goodAmount
        } = req.body;

        // console.log(staffKit.goods_fk);
        // console.log(books);
        staffKit.registerBook_fk = books._id;
        staffKit.goods_fk = goods_fk;
        staffKit.goodAmount = goodAmount;
        staffKit.Dates = Dates;

        await staffKit.save();
        req.flash("success_msg", "شما موفقانه ویرایش نمودید");
        return res.redirect("back");
    } catch (err) {
        //  console.log(err);
        err.inner.forEach((e) => {
            errors.push({
                name: e.path      });
        });
        return res.render("./goods-management/edit-oneStaffKit", {
            pageTittle: "ویرایش اجناس کارمندان",
            secondLayout: "ok",
            path: "/goods-management/edit-oneStaffKit/:id",
            errors,
            table: "ok",
            staffkits: staffKit,
            good,
            bookNames,
            skins,
            pages,
            years,
            // messages: req.flash("error_msg"),
            // message: req.flash("success_msg")
        })
    }
}

// @desc Edit student Kit  
// @routes Post/goods-management/edit-oneStudentKit
exports.handleEditOneStudentKit = async (req, res) => {

    const errors = [];

    const bookName = await bookRegisers.distinct("bookName")
    const skin = await bookRegisers.distinct("skin")
    const page = await bookRegisers.distinct("page")
    const year = await bookRegisers.distinct("year")
    const studentKit = await studnetKits.findById({
        _id: req.params.id
    }).populate("room_fk").populate("students_fk").populate("registerBook_fk");
    try {
        await studnetKits.studentKitValidation(req.body);

        // this part check the book it is here or not
        const books = await bookRegisers.findOne({
            $and: [{
                bookName: req.body.nameBook
            },
            {
                skin: req.body.skin
            }, {
                page: req.body.page
            }, {
                year: req.body.year
            }
            ]
        });
        if (!books) {
            req.flash("error_msg", "آدرس کتاب به این نام، جلد، صفحه، سال موجود نیست !");
            return res.render("./goods-management/edit-oneStudentKit", {
                pageTittle: "ویرایش اجناس کارمندان",
                secondLayout: "ok",
                path: "/goods-management/edit-oneStudentKit/:id",
                errors,
                table: "ok",
                studentKit,
                bookNames: bookName,
                skins: skin,
                pages: page,
                years: year,
                message: req.flash("success_msg", ""),
                // messages: req.flash("error_msg"),

            })
        }
        const registerBook_fk1 = books._id;

        //this part check the year  
        let currentDate = new Date();
        var arrDates = currentDate.getFullYear().toString().split(' ');
        var comperDate = parseInt(arrDates) - 621;
        console.log(comperDate)
        if (parseInt(comperDate) < parseInt(req.body.Dates)) {
            req.flash("error_msg", "شما سال را اشتبا وارد نمودید!");
            return res.render("./goods-management/edit-oneStudentKit", {
                pageTittle: "ویرایش اجناس کارمندان",
                secondLayout: "ok",
                path: "/goods-management/edit-oneStudentKit/:id",
                errors,
                table: "ok",
                studentKit,
                bookNames: bookName,
                skins: skin,
                pages: page,
                years: year,
                message: req.flash("success_msg", ""),
                // messages: req.flash("error_msg"),

            })
        }

        // this part check the mattress is exist in stook or not
        const mattress_Add = await goods.findOne({ name: "دوشک" });
        let mattress_temp = parseInt(mattress_Add.quantityOfGoods) + parseInt(studentKit.mattress);
        if (!mattress_Add) {
            req.flash("error_msg", "جنس دوشک درگدام هیچ ثبت نشد در اول آن جنس را ثبت نماید");
            return res.render("./goods-management/edit-oneStudentKit", {
                pageTittle: "ویرایش اجناس کارمندان",
                secondLayout: "ok",
                path: "/goods-management/edit-oneStudentKit/:id",
                errors,
                table: "ok",
                studentKit,
                bookNames: bookName,
                skins: skin,
                pages: page,
                years: year,
                message: req.flash("success_msg", ""),
                // messages: req.flash("error_msg"),
            })
        }
        // this part check the pillow is exist in stook or not
        const pillow_Add = await goods.findOne({ name: "بالشت" });
        let pillow_temp = parseInt(pillow_Add.quantityOfGoods) + parseInt(studentKit.pillow);
        if (!pillow_Add) {
            req.flash("error_msg", "جنس بالشت درگدام هیچ ثبت نشد در اول آن جنس را ثبت نماید");
            return res.render("./goods-management/edit-oneStudentKit", {
                pageTittle: "ویرایش اجناس کارمندان",
                secondLayout: "ok",
                path: "/goods-management/edit-oneStudentKit/:id",
                errors,
                table: "ok",
                studentKit,
                bookNames: bookName,
                skins: skin,
                pages: page,
                years: year,
                message: req.flash("success_msg", ""),
                // messages: req.flash("error_msg"),

            })
        }
        // this part check the coverlet is exist in stook or not
        const coverlet_Add = await goods.findOne({ name: "روجایی" });
        let coverlet_temp = parseInt(coverlet_Add.quantityOfGoods) + parseInt(studentKit.coverlet);
        if (!coverlet_Add) {
            req.flash("error_msg", "روجائی درگدام هیچ ثبت نشد در اول آن جنس را ثبت نماید");
            return res.render("./goods-management/edit-oneStudentKit", {
                pageTittle: "ویرایش اجناس کارمندان",
                secondLayout: "ok",
                path: "/goods-management/edit-oneStudentKit/:id",
                errors,
                table: "ok",
                studentKit,
                bookNames: bookName,
                skins: skin,
                pages: page,
                years: year,
                message: req.flash("success_msg", ""),
                // messages: req.flash("error_msg"),

            })
        }
        //  this part check the quilt is exist in stook or not
        const quilt_Add = await goods.findOne({ name: "کمپل" });
        let quilt_temp = parseInt(quilt_Add.quantityOfGoods) + parseInt(studentKit.quilt);
        if (!quilt_Add) {
            req.flash("error_msg", "کمپل درگدام هیچ ثبت نشد در اول آن جنس را ثبت نماید");
            return res.render("./goods-management/edit-oneStudentKit", {
                pageTittle: "ویرایش اجناس کارمندان",
                secondLayout: "ok",
                path: "/goods-management/edit-oneStudentKit/:id",
                errors,
                table: "ok",
                studentKit,
                bookNames: bookName,
                skins: skin,
                pages: page,
                years: year,
                message: req.flash("success_msg", ""),
                // messages: req.flash("error_msg"),

            })
        }
        //  this part check the bed is exist in stook or not
        const bed_Add = await goods.findOne({ name: "چپرکت" });
        let bed_temp = parseInt(bed_Add.quantityOfGoods) + parseInt(studentKit.bed);
        if (!bed_Add) {
            req.flash("error_msg", "چپرکت درگدام هیچ ثبت نشد در اول آن جنس را ثبت نماید");
            return res.render("./goods-management/edit-oneStudentKit", {
                pageTittle: "ویرایش اجناس کارمندان",
                secondLayout: "ok",
                path: "/goods-management/edit-oneStudentKit/:id",
                errors,
                table: "ok",
                studentKit,
                bookNames: bookName,
                skins: skin,
                pages: page,
                years: year,
                message: req.flash("success_msg", ""),
                // messages: req.flash("error_msg"),

            })
        }
        //  this part check the mirror is exist in stook or not
        const mirror_Add = await goods.findOne({ name: "آینه روی" });
        let mirror_temp = parseInt(mirror_Add.quantityOfGoods) + parseInt(studentKit.mirror);
        if (!mirror_Add) {
            req.flash("error_msg", "آینه روی درگدام هیچ ثبت نشد در اول آن جنس را ثبت نماید");
            return res.render("./goods-management/edit-oneStudentKit", {
                pageTittle: "ویرایش اجناس کارمندان",
                secondLayout: "ok",
                path: "/goods-management/edit-oneStudentKit/:id",
                errors,
                table: "ok",
                studentKit,
                bookNames: bookName,
                skins: skin,
                pages: page,
                years: year,
                message: req.flash("success_msg", ""),
                // messages: req.flash("error_msg"),

            })
        }
        //  this part check the windowShade is exist in stook or not
        const windowShade_Add = await goods.findOne({ name: "پرده" });
        let windowShade_temp = parseInt(windowShade_Add.quantityOfGoods) + parseInt(studentKit.windowShade);
        if (!windowShade_Add) {
            req.flash("error_msg", "پرده درگدام هیچ ثبت نشد در اول آن جنس را ثبت نماید");
            return res.render("./goods-management/edit-oneStudentKit", {
                pageTittle: "ویرایش اجناس کارمندان",
                secondLayout: "ok",
                path: "/goods-management/edit-oneStudentKit/:id",
                errors,
                table: "ok",
                studentKit,
                bookNames: bookName,
                skins: skin,
                pages: page,
                years: year,
                message: req.flash("success_msg", ""),
                // messages: req.flash("error_msg"),

            })
        }
        //  this part check the carpet is exist in stook or not
        const carpet_Add = await goods.findOne({ name: "فرش" });
        let carpet_temp = parseInt(carpet_Add.quantityOfGoods) + parseInt(studentKit.carpet);
        if (!carpet_Add) {
            req.flash("error_msg", "فرش درگدام هیچ ثبت نشد در اول آن جنس را ثبت نماید");
            return res.render("./goods-management/edit-oneStudentKit", {
                pageTittle: "ویرایش اجناس کارمندان",
                secondLayout: "ok",
                path: "/goods-management/edit-oneStudentKit/:id",
                errors,
                table: "ok",
                studentKit,
                bookNames: bookName,
                skins: skin,
                pages: page,
                years: year,
                message: req.flash("success_msg", ""),
                // messages: req.flash("error_msg"),

            })
        }
        //  this part check the table is exist in stook or not
        const table_Add = await goods.findOne({ name: "میز" });
        let table_temp = parseInt(table_Add.quantityOfGoods) + parseInt(studentKit.table);
        if (!table_Add) {
            req.flash("error_msg", "میز درگدام هیچ ثبت نشد در اول آن جنس را ثبت نماید");
            return res.render("./goods-management/edit-oneStudentKit", {
                pageTittle: "ویرایش اجناس کارمندان",
                secondLayout: "ok",
                path: "/goods-management/edit-oneStudentKit/:id",
                errors,
                table: "ok",
                studentKit,
                bookNames: bookName,
                skins: skin,
                pages: page,
                years: year,
                message: req.flash("success_msg", ""),
                // messages: req.flash("error_msg"),

            })
        }
        //  this part check the chair is exist in stook or not
        const chair_Add = await goods.findOne({ name: "چوکی" });
        let chair_temp = parseInt(chair_Add.quantityOfGoods) + parseInt(studentKit.chair);
        if (!chair_Add) {
            req.flash("error_msg", "چوکی درگدام هیچ ثبت نشد در اول آن جنس را ثبت نماید");
            return res.render("./goods-management/edit-oneStudentKit", {
                pageTittle: "ویرایش اجناس کارمندان",
                secondLayout: "ok",
                path: "/goods-management/edit-oneStudentKit/:id",
                errors,
                table: "ok",
                studentKit,
                bookNames: bookName,
                skins: skin,
                pages: page,
                years: year,
                message: req.flash("success_msg", ""),
                // messages: req.flash("error_msg"),

            })
        }

        // In this part I check the stook, The stook is full or empty
        let flag = true;
        // This condation just for mattress
        if (parseInt(mattress_temp) < parseInt(req.body.mattress)) {
            req.flash("error_msg", "تعداد دوشک در گدام کافی نیست!");
            flag = false;
        }
        // This condation just for pillow
        if (parseInt(pillow_temp) < parseInt(req.body.pillow)) {
            req.flash("error_msg", "تعداد بالشت در گدام کافی نیست!");
            flag = false;
        }
        // This condation just for coverlet
        if (parseInt(coverlet_temp) < parseInt(req.body.coverlet)) {
            req.flash("error_msg", "تعداد روجائی در گدام کافی نیست!");
            flag = false;
        }
        // This condation just for quilt
        if (parseInt(quilt_temp) < parseInt(req.body.quilt)) {
            req.flash("error_msg", "تعداد کمپل در گدام کافی نیست!");
            flag = false;
        }
        // This condation just for bed
        if (parseInt(bed_temp) < parseInt(req.body.bed)) {
            req.flash("error_msg", "تعداد چپرکت در گدام کافی نیست!");
            flag = false;
        }
        // This condation just for mirror
        if (parseInt(mirror_temp) < parseInt(req.body.mirror)) {
            req.flash("error_msg", "تعداد آینه روی در گدام کافی نیست!");
            flag = false;
        }
        // This condation just for windowShade
        if (parseInt(windowShade_temp) < parseInt(req.body.windowShade)) {
            req.flash("error_msg", "تعداد پرده در گدام کافی نیست!");
            flag = false;
        }
        // This condation just for carpet
        if (parseInt(carpet_temp) < parseInt(req.body.carpet)) {
            req.flash("error_msg", "تعداد فرش در گدام کافی نیست!");
            flag = false;
        }
        // This condation just for table
        if (parseInt(table_temp) < parseInt(req.body.table)) {
            req.flash("error_msg", "تعداد میز در گدام کافی نیست!");
            flag = false;
        }
        // This condation just for chair
        if (parseInt(chair_temp) < parseInt(req.body.chair)) {
            req.flash("error_msg", "تعداد چوکی در گدام کافی نیست!");
            flag = false;
        }
        if (!flag) {
            return res.render("./goods-management/edit-oneStudentKit", {
                pageTittle: "ویرایش اجناس کارمندان",
                secondLayout: "ok",
                path: "/goods-management/edit-oneStudentKit/:id",
                errors,
                table: "ok",
                studentKit,
                bookNames: bookName,
                skins: skin,
                pages: page,
                years: year,
                message: req.flash("success_msg", ""),
                // messages: req.flash("error_msg"),

            })
        }

        //This part the quantity of qoods change and check

        // This two line change the mattress quantity
        mattress_Add.quantityOfGoods = parseInt(mattress_temp) - parseInt(req.body.mattress);
        await mattress_Add.save();

        // This two line change the pillow quantity
        pillow_Add.quantityOfGoods = parseInt(pillow_temp) - parseInt(req.body.pillow);
        await pillow_Add.save();

        // This two line change the coverlet quantity
        coverlet_Add.quantityOfGoods = parseInt(coverlet_temp) - parseInt(req.body.coverlet);
        await coverlet_Add.save();

        // This two line change the quilt quantity
        quilt_Add.quantityOfGoods = parseInt(quilt_temp) - parseInt(req.body.quilt);
        await quilt_Add.save();

        // This two line change the bed quantity
        bed_Add.quantityOfGoods = parseInt(bed_temp) - parseInt(req.body.bed);
        await bed_Add.save();

        // This two line change the mirror quantity
        mirror_Add.quantityOfGoods = parseInt(mirror_temp) - parseInt(req.body.mirror);
        await mirror_Add.save();

        // This two line change the windowShade quantity
        windowShade_Add.quantityOfGoods = parseInt(windowShade_temp) - parseInt(req.body.windowShade);
        await windowShade_Add.save();

        // This two line change the carpet quantity
        carpet_Add.quantityOfGoods = parseInt(carpet_temp) - parseInt(req.body.carpet);
        await carpet_Add.save();

        // This two line change the table quantity
        table_Add.quantityOfGoods = parseInt(table_temp) - parseInt(req.body.table);
        await table_Add.save();

        // This two line change the chair quantity
        chair_Add.quantityOfGoods = parseInt(chair_temp) - parseInt(req.body.chair);
        await chair_Add.save();

        // This part the orginal update of one sutdent kits

        studentKit.mattress = req.body.mattress;
        studentKit.pillow = req.body.pillow;
        studentKit.coverlet = req.body.coverlet;
        studentKit.quilt = req.body.quilt;
        studentKit.bed = req.body.bed;
        studentKit.mirror = req.body.mirror;
        studentKit.windowShade = req.body.windowShade;
        studentKit.carpet = req.body.carpet;
        studentKit.table = req.body.table;
        studentKit.chair = req.body.chair;
        studentKit.registerBook_fk = registerBook_fk1;
        await studentKit.save();


        if (studentKit) {
            req.flash("success_msg", "شما موفقانه ویرایش نمودید");
            const studentKit1 = await studnetKits.findById({
                _id: req.params.id
            }).populate("room_fk").populate("students_fk").populate("registerBook_fk");
            let same = 0;
            let good = await goods.findOne({ name: "دوشک" });
            same = (good.price * studentKit1.mattress) + same;
            //2
            good = await goods.findOne({ name: "بالشت" });
            same = (good.price * studentKit1.pillow) + same;
            // 3
            good = await goods.findOne({ name: "روجایی" });
            same = (good.price * studentKit1.coverlet) + same;
            //4 
            good = await goods.findOne({ name: "کمپل" });
            same = (good.price * studentKit1.quilt) + same;
            // 5
            good = await goods.findOne({ name: "چپرکت" });
            same = (good.price * studentKit1.bed) + same;
            // 6
            good = await goods.findOne({ name: "آینه روی" });
            same = (good.price * studentKit1.mirror) + same;
            // 7
            good = await goods.findOne({ name: "پرده" });
            same = (good.price * studentKit1.windowShade) + same;
            // 8
            good = await goods.findOne({ name: "فرش" });
            same = (good.price * studentKit1.carpet) + same;
            // 9
            good = await goods.findOne({ name: "میز" });
            same = (good.price * studentKit1.table) + same;
            // 10
            good = await goods.findOne({ name: "چوکی" });
            same = (good.price * studentKit1.chair) + same;
            const bookName = await bookRegisers.distinct("bookName")
            const skin = await bookRegisers.distinct("skin")
            const page = await bookRegisers.distinct("page")
            const year = await bookRegisers.distinct("year")
            return res.render("./goods-management/show-oneStudentKit", {
                pageTittle: "نمایش اجناس",
                secondLayout: "ok",
                path: "/goods-management/show-oneStudentKit/:id",
                table: "ok",
                year,
                page,
                skin,
                bookName,
                studentKit: studentKit1,
                same,

            })
        }
    } catch (err) {
        //  console.log(err);
        err.inner.forEach((e) => {
            errors.push({
                name: e.path,
                message: e.message,
            });
        });
        return res.render("./goods-management/edit-oneStudentKit", {
            pageTittle: "ویرایش اجناس کارمندان",
            secondLayout: "ok",
            path: "/goods-management/edit-oneStudentKit/:id",
            errors,
            table: "ok",
            studentKit,
            bookNames: bookName,
            skins: skin,
            pages: page,
            years: year,
            message: req.flash("success_msg", ""),
            // messages: req.flash("error_msg"),

        })
    }
}

// @desc Delete goods 
// @routes Get /goods-management/show-goods
exports.handleDeleteGoods = async (req, res) => {
    try {
        const good = await goods.findById({
            _id: req.params.id
        });
        let flag = false;
        const mattress_Add = await goods.findOne({ name: "دوشک" });
        const pillow_Add = await goods.findOne({ name: "بالشت" });
        const coverlet_Add = await goods.findOne({ name: "روجایی" });
        const quilt_Add = await goods.findOne({ name: "کمپل" });
        const bed_Add = await goods.findOne({ name: "چپرکت" });
        const mirror_Add = await goods.findOne({ name: "آینه روی" });
        const windowShade_Add = await goods.findOne({ name: "پرده" });
        const carpet_Add = await goods.findOne({ name: "فرش" });
        const table_Add = await goods.findOne({ name: "میز" });
        const chair_Add = await goods.findOne({ name: "چوکی" });
        if (good._id.equals(mattress_Add._id)) {
            flag = true;
        }
        if (good._id.equals(pillow_Add._id)) {
            flag = true;
        }
        if (good._id.equals(coverlet_Add._id)) {
            flag = true;
        }
        if (good._id.equals(quilt_Add._id)) {
            flag = true;
        }
        if (good._id.equals(bed_Add._id)) {
            flag = true;
        }
        if (good._id.equals(mirror_Add._id)) {
            flag = true;
        }
        if (good._id.equals(windowShade_Add._id)) {
            flag = true;
        }
        if (good._id.equals(carpet_Add._id)) {
            flag = true;
        }
        if (good._id.equals(table_Add._id)) {
            flag = true;
        }
        if (good._id.equals(chair_Add._id)) {
            flag = true;
        }
        if (flag) {
            req.flash("error_msg", "شما نمی توانید اجناس که مربوط محصلین است حذف نماید");
            return res.redirect("/goods-management/show-goods")
        }
        const staffKit = await staffKits.findOne({
            goods_fk: good._id
        })
        if (staffKit) {
            req.flash("error_msg", "شما نمی توانید این جنس که توسط کارمند گرفته شد حذف نماید");
            return res.redirect("/goods-management/show-goods")
        }
        const entry = await entries.findOne({
            goods_fk: good._id
        })
        if (entry) {
            req.flash("error_msg", "شما نمی توانید این جنس که در ادخالات ثبت شده حذف نماید!");
            return res.redirect("/goods-management/show-goods")
        }
        const good_exit = await exits.findOne({
            goods_fk: good._id
        })
        if (good_exit) {
            req.flash("error_msg", "شما نمی توانید این جنس که در اخراجات ثبت شده حذف نماید!");
            return res.redirect("/goods-management/show-goods")
        }
        const good_delet = await goods.findByIdAndDelete({
            _id: req.params.id
        });

        req.flash("success_msg", "شما موفقانه جنس را حذف نمودید");
        return res.redirect("/goods-management/show-goods")
    } catch (err) {
        res.redirect("/500")
    }
}

// @desc Delete entries 
// @routes  /goods-management/show-entries
exports.handleDeleteEntries = async (req, res) => {
    var name = "";
    try {
        const entry = await entries.findById({
            _id: req.params.id
        });
        const good = await goods.findById({
            _id: entry.goods_fk
        });
        name = good.name

        const goodQ = parseInt(good.quantityOfGoods)
        const entryQ = parseInt(entry.quantity)
        if (goodQ >= entryQ) {
            const temp = parseInt(good.quantityOfGoods) - parseInt(entry.quantity);
            good.quantityOfGoods = temp;
            await good.save();
            const entryDelete = await entries.findByIdAndDelete({
                _id: req.params.id
            });
            req.flash("success_msg", ` شما موفقانه ${good.name} از اخالات اجناس را حذف نمودید`);
            return res.redirect("back");
        } else {
            req.flash("error_msg", `بنابر کم بودن ${good.name}  در دیپو شما نمیتوانید حذف نماید`);
            return res.redirect("back")
        }

    } catch (err) {
        req.flash("error_msg", `شما نمی توانید ${name} را از ادخالات حذف نماید!`);
        return res.redirect("back")
    }
}

// @desc Delete exits 
// @routes  /goods-management/show-exits
exports.handleDeleteExits = async (req, res) => {
    try {
        const exit = await exits.findByIdAndDelete({
            _id: req.params.id
        });
        const good = await goods.findById({
            _id: exit.goods_fk
        });
        const temp = parseInt(good.quantityOfGoods) + parseInt(exit.quantity);
        // good.name = good.name;
        // good.price = good.price;
        good.quantityOfGoods = temp;
        await good.save();
        req.flash("success_msg", "شما موفقانه از اخراجات جنس را حذف نمودید");
        return res.redirect("/goods-management/show-exits")
    } catch (err) {
        console.log(err);
        res.redirect("/500")
    }
}

// @desc Delete entryDocument 
// @routes  /goods-management/delete-entryDocument
exports.handleDeleteEntryDocument = async (req, res) => {
    const entries_T = await entries.findOne({
        entryDocument_fk: req.params.id
    });
    try {
        if (entries_T) {
            req.flash("error_msg", "شما نمی توانید این حواله را حذف نمایید!");
            return res.redirect("/goods-management/show-entryDocument")
        }
        const entryDocument = await entryDocuments.findByIdAndDelete({
            _id: req.params.id
        });
        req.flash("success_msg", "شما موفقانه حواله وارده را حذف نمودید!");
        return res.redirect("/goods-management/show-entryDocument")
    } catch (err) {
        req.flash("error_msg", "شمانمی توانید حواله وارده را حذف نماید!");
        res.redirect("/goods-management/show-entryDocument")
    }
}

// @desc Delete ExportDocument 
// @routes  /goods-management/show-exportDoument
exports.handleDeleteExportDocument = async (req, res) => {
    const exit_T = await exits.findOne({
        exportDocument_fk: req.params.id
    });

    try {
        if (exit_T) {
            req.flash("error_msg", "شما نمی توانید این حواله را حذف نمایید!");
            return res.redirect("/goods-management/show-exportDocument")
        }
        const exportDocument = await exportDocuments.findByIdAndDelete({
            _id: req.params.id
        });
        req.flash("success_msg", "شما موفقانه حواله صادره را حذف نمودید");
        return res.redirect("/goods-management/show-exportDocument")
    } catch (err) {
        req.flash("success_msg", "شما نمتوانید این حواله را حذف نماید!");
        return res.redirect("/goods-management/show-exportDocument")
    }
}

// @desc Delete Staff
// @routes  /goods-management/show-staffs
exports.handleDeleteStaff = async (req, res) => {
    try {

        const staffTest = await staffs.findById({ _id: req.params.id });

        const staffKit = await staffKits.findOne({
            staff_fk: staffTest._id
        });
        if (staffKit) {
            req.flash("error_msg", "شما نمی توانید این کارمند که قبلا جنس گرفته حذف نمانید!");
            return res.redirect("/goods-management/show-staffs")
        }

        const staff = await staffs.findByIdAndDelete({
            _id: req.params.id
        });
        req.flash("success_msg", "شما موفقانه این کارمند را حذف نمودید!");
        return res.redirect("/goods-management/show-staffs")
    } catch (err) {
        req.flash("error_msg", "شما نمتوانید کارمند را حذف نماید!");
        return res.redirect("/goods-management/show-staffs")
    }
}

// @desc Delete One staffKit
// @routes  /goods-management/show-staffKit
exports.handleDeleteOneStaffKit = async (req, res) => {
    try {
        const oneStaffKit = await staffKits.findByIdAndDelete({
            _id: req.params.id
        });
        const good = await goods.findById({
            _id: oneStaffKit.goods_fk
        });
        const temp = parseInt(good.quantityOfGoods) + parseInt(oneStaffKit.goodAmount);
        good.quantityOfGoods = temp;
        await good.save();

        req.flash("success_msg", "شما موفقانه جنس کارمند را حذف نمودید");
        return res.redirect("/goods-management/show-staffKits")
    } catch (err) {
        req.flash("error_msg", "شما نمتوانید جنس کارمند را حذف نماید!");
        return res.redirect("/goods-management/show-staffKits")
    }
}


// @desc Reset One staffKit
// @routes  /goods-management/show-staffKit
exports.handleResetOneStaffKit = async (req, res) => {
    try {
        const oneStaffKit = await staffKits.findById({
            _id: req.params.id
        });
        const good = await goods.findById({
            _id: oneStaffKit.goods_fk
        });
        const temp = parseInt(good.quantityOfGoods) + parseInt(oneStaffKit.goodAmount);
        good.quantityOfGoods = temp;
        await good.save();
        var m = 0;
        oneStaffKit.goodAmount = m;
        await oneStaffKit.save();


        req.flash("success_msg", "شما موفقانه جنس کارمند را ریسیت نمودید");
        return res.redirect("back")
    } catch (err) {
        req.flash("error_msg", "شما نمتوانید جنس کارمند را ریسیت نماید!");
        return res.redirect("back")
    }
}


// @desc Delete One Student Kit
// @routes  /goods-management/show-studentKit
exports.handleDeleteOneStudentKit = async (req, res) => {
    const bookName = await bookRegisers.distinct("bookName")
    const skin = await bookRegisers.distinct("skin")
    const page = await bookRegisers.distinct("page")
    const year = await bookRegisers.distinct("year")
    const studentKit1 = await studnetKits.find().populate("room_fk").populate("students_fk").populate("registerBook_fk");

    const studentKit = await studnetKits.findById({
        _id: req.params.id
    }).populate("room_fk").populate("students_fk").populate("registerBook_fk");
    try {
        // this part check the mattress is exist in stook or not
        const mattress_Add = await goods.findOne({ name: "دوشک" });
        let mattress_temp = parseInt(mattress_Add.quantityOfGoods) + parseInt(studentKit.mattress);
        mattress_Add.quantityOfGoods = mattress_temp;
        await mattress_Add.save();

        // this part check the pillow is exist in stook or not
        const pillow_Add = await goods.findOne({ name: "بالشت" });
        let pillow_temp = parseInt(pillow_Add.quantityOfGoods) + parseInt(studentKit.pillow);
        pillow_Add.quantityOfGoods = pillow_temp;
        await pillow_Add.save();

        // this part check the coverlet is exist in stook or not
        const coverlet_Add = await goods.findOne({ name: "روجایی" });
        let coverlet_temp = parseInt(coverlet_Add.quantityOfGoods) + parseInt(studentKit.coverlet);
        coverlet_Add.quantityOfGoods = coverlet_temp;
        await coverlet_Add.save();


        //  this part check the quilt is exist in stook or not
        const quilt_Add = await goods.findOne({ name: "کمپل" });
        let quilt_temp = parseInt(quilt_Add.quantityOfGoods) + parseInt(studentKit.quilt);
        quilt_Add.quantityOfGoods = quilt_temp;
        await quilt_Add.save();

        //  this part check the bed is exist in stook or not
        const bed_Add = await goods.findOne({ name: "چپرکت" });
        let bed_temp = parseInt(bed_Add.quantityOfGoods) + parseInt(studentKit.bed);
        bed_Add.quantityOfGoods = bed_temp;
        await bed_Add.save();

        //  this part check the mirror is exist in stook or not
        const mirror_Add = await goods.findOne({ name: "آینه روی" });
        let mirror_temp = parseInt(mirror_Add.quantityOfGoods) + parseInt(studentKit.mirror);
        mirror_Add.quantityOfGoods = mirror_temp;
        await mirror_Add.save();

        //  this part check the windowShade is exist in stook or not
        const windowShade_Add = await goods.findOne({ name: "پرده" });
        let windowShade_temp = parseInt(windowShade_Add.quantityOfGoods) + parseInt(studentKit.windowShade);
        windowShade_Add.quantityOfGoods = windowShade_temp;
        await windowShade_Add.save();

        //  this part check the carpet is exist in stook or not
        const carpet_Add = await goods.findOne({ name: "فرش" });
        let carpet_temp = parseInt(carpet_Add.quantityOfGoods) + parseInt(studentKit.carpet);
        carpet_Add.quantityOfGoods = carpet_temp;
        await carpet_Add.save();

        //  this part check the table is exist in stook or not
        const table_Add = await goods.findOne({ name: "میز" });
        let table_temp = parseInt(table_Add.quantityOfGoods) + parseInt(studentKit.table);
        table_Add.quantityOfGoods = table_temp;
        await table_Add.save();

        //  this part check the chair is exist in stook or not
        const chair_Add = await goods.findOne({ name: "چوکی" });
        let chair_temp = parseInt(chair_Add.quantityOfGoods) + parseInt(studentKit.chair);
        chair_Add.quantityOfGoods = chair_temp;
        await chair_Add.save();

        const student_delet_kit = await studnetKits.findOneAndDelete({
            _id: req.params.id
        })

        req.flash("success_msg", "شما موفقانه اجناس محصل را حذف نمودید");
        return res.redirect("/goods-management/show-studentKits")
    } catch (err) {
        req.flash("error_msg", "شما نمتوانید اجناس محصل را حذف نماید!");
        return res.redirect("/goods-management/show-studentKits")
    }
}

// @ reset of one studentkit
exports.handleResetOneStudentKit = async (req, res) => {
    const bookName = await bookRegisers.distinct("bookName")
    const skin = await bookRegisers.distinct("skin")
    const page = await bookRegisers.distinct("page")
    const year = await bookRegisers.distinct("year")
    const studentKit1 = await studnetKits.find().populate("room_fk").populate("students_fk").populate("registerBook_fk");

    const studentKit = await studnetKits.findById({
        _id: req.params.id
    }).populate("room_fk").populate("students_fk").populate("registerBook_fk");
    const lastID = req.params.id;
    try {
        // this part check the mattress is exist in stook or not
        const mattress_Add = await goods.findOne({ name: "دوشک" });
        let mattress_temp = parseInt(mattress_Add.quantityOfGoods) + parseInt(studentKit.mattress);
        mattress_Add.quantityOfGoods = mattress_temp;
        await mattress_Add.save();

        // this part check the pillow is exist in stook or not
        const pillow_Add = await goods.findOne({ name: "بالشت" });
        let pillow_temp = parseInt(pillow_Add.quantityOfGoods) + parseInt(studentKit.pillow);
        pillow_Add.quantityOfGoods = pillow_temp;
        await pillow_Add.save();

        // this part check the coverlet is exist in stook or not
        const coverlet_Add = await goods.findOne({ name: "روجایی" });
        let coverlet_temp = parseInt(coverlet_Add.quantityOfGoods) + parseInt(studentKit.coverlet);
        coverlet_Add.quantityOfGoods = coverlet_temp;
        await coverlet_Add.save();


        //  this part check the quilt is exist in stook or not
        const quilt_Add = await goods.findOne({ name: "کمپل" });
        let quilt_temp = parseInt(quilt_Add.quantityOfGoods) + parseInt(studentKit.quilt);
        quilt_Add.quantityOfGoods = quilt_temp;
        await quilt_Add.save();

        //  this part check the bed is exist in stook or not
        const bed_Add = await goods.findOne({ name: "چپرکت" });
        let bed_temp = parseInt(bed_Add.quantityOfGoods) + parseInt(studentKit.bed);
        bed_Add.quantityOfGoods = bed_temp;
        await bed_Add.save();

        //  this part check the mirror is exist in stook or not
        const mirror_Add = await goods.findOne({ name: "آینه روی" });
        let mirror_temp = parseInt(mirror_Add.quantityOfGoods) + parseInt(studentKit.mirror);
        mirror_Add.quantityOfGoods = mirror_temp;
        await mirror_Add.save();

        //  this part check the windowShade is exist in stook or not
        const windowShade_Add = await goods.findOne({ name: "پرده" });
        let windowShade_temp = parseInt(windowShade_Add.quantityOfGoods) + parseInt(studentKit.windowShade);
        windowShade_Add.quantityOfGoods = windowShade_temp;
        await windowShade_Add.save();

        //  this part check the carpet is exist in stook or not
        const carpet_Add = await goods.findOne({ name: "فرش" });
        let carpet_temp = parseInt(carpet_Add.quantityOfGoods) + parseInt(studentKit.carpet);
        carpet_Add.quantityOfGoods = carpet_temp;
        await carpet_Add.save();

        //  this part check the table is exist in stook or not
        const table_Add = await goods.findOne({ name: "میز" });
        let table_temp = parseInt(table_Add.quantityOfGoods) + parseInt(studentKit.table);
        table_Add.quantityOfGoods = table_temp;
        await table_Add.save();

        //  this part check the chair is exist in stook or not
        const chair_Add = await goods.findOne({ name: "چوکی" });
        let chair_temp = parseInt(chair_Add.quantityOfGoods) + parseInt(studentKit.chair);
        chair_Add.quantityOfGoods = chair_temp;
        await chair_Add.save();

        const student_reset_kit = await studnetKits.findOne({
            _id: req.params.id
        })
        var m = 0;
        student_reset_kit.mattress = m;
        student_reset_kit.pillow = m;
        student_reset_kit.coverlet = m;
        student_reset_kit.quilt = m;
        student_reset_kit.bed = m;
        student_reset_kit.mirror = m;
        student_reset_kit.windowShade = m;
        student_reset_kit.carpet = m;
        student_reset_kit.table = m;
        student_reset_kit.chair = m;
        await student_reset_kit.save();

        req.flash("success_msg", "شما موفقانه اجناس محصل را ریست نمودید");
        return res.redirect("back")
    } catch (err) {
        req.flash("error_msg", "شما نمتوانید اجناس محصل را ریست نماید!");
        return res.redirect("/goods-management/show-studentKits")
    }
}


// @desc DMIS office management edit user page
// @routes GET /office-management/edit-account/:id
exports.getEditAccount =async (req,res)=>{
    const selectUser = await User.findOne({ _id: req.params.id });
    if(selectUser.position!=="مدیر جنسی"){
      req.flash("error_msg","دسترسی غیرمجاز");
      return res.redirect("back");
    }
  console.log(selectUser);
    return res.render("indexFiles/edit-user",{
      pageTittle:"ویرایش استفاده کننده",
      path:"/admin/edit-user",
      fullname:selectUser.fullname,
      email:selectUser.email,
      id:selectUser._id,
      firstQuestion:selectUser.firstQuestion,
      secondQuestion:selectUser.secondQuestion,
      thirdQuestion:selectUser.thirdQuestion,
      errors:[],
      position:req.user.position
    })
}

// @desc DMIS goods management edit user page
// @routes GET /goods-management/edit-account/:id
exports.handleEditAccount =async (req,res)=>{
    errors=[];
    let selectUser=[];
    try{
    selectUser = await User.findOne({ _id: req.params.id });
    const { fullname, email, password,confirmPassword, position} = req.body;
    if(selectUser && selectUser.position!=="مدیر جنسی"){
        // console.log();
      req.flash("error_msg","دسترسی غیرمجاز");
      return res.redirect("back");
    }
    await User.userValidation(req.body);
  
    const hash = await bcrypt.hash(password, 10);
    selectUser.fullname=fullname;
    selectUser.email=email;
    selectUser.password=hash;
    selectUser.save();
  
    req.flash("success_msg","موفقانه آپدیت شد");
    return res.redirect("/goods-management/show-goods");
  } catch (err) {
    console.log(err);
    err.inner.forEach((err) => {
      errors.push({
        name: err.path,
        message: err.message,
      });
    });
  }
  req.flash("error_msg"," آپدیت نشد");
  return res.render("indexFiles/edit-user",{
    pageTittle:"ویرایش استفاده کننده",
    path:"/admin/edit-user",
    fullname:selectUser.fullname,
    email:selectUser.email,
    id:selectUser._id,
    firstQuestion:selectUser.firstQuestion,
    secondQuestion:selectUser.secondQuestion,
    thirdQuestion:selectUser.thirdQuestion,
    errors,
    position:req.user.position
  })
  }