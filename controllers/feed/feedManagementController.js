//* MODEL REQUIRS
const dailyMenu = require("../../models/feedManagementModels/dailyMenu")
const dailyMenuReport = require("../../models/feedManagementModels/dailyMenuReport")
const AddIngToStk = require("../../models/feedManagementModels/stock")
const stkExport = require("../../models/feedManagementModels/stockExport")
const menu = require("../../models/feedManagementModels/menu")
const purchase = require("../../models/feedManagementModels/purchase")
const room = require("../../models/officeManagementModels/room")
//* EXTERNAL REQUIRS AND MODULES
const moment = require('moment');
const { checkDate } = require('../../utils/checkdate')
const bcrypt =require('bcryptjs');
const User = require("../../models/user");
// const InvoiceGenerator = require('../../utils/pdfGenerator');

const { formDate } = require('../../public/dist/formDate');

function getDates(startDate, stopDate) {
  var dateArray = [];
  var currentDate = moment(startDate);
  var stopDate = moment(stopDate);
  while (currentDate <= stopDate) {
    dateArray.push(moment(currentDate, 'YYYY-MM-DD').locale("en").format('YYYY-MM-DD'))
    currentDate = moment(currentDate).add(1, 'days');
  }
  return dateArray;
}

//* CONTROLLERS
exports.getFeedManagement = async (req, res) => {
  const foodmenuS = await menu.distinct('menuType')
  res.render("feed-management", {
    pageTittle: "بخش مدیریت ارتزاقی",
    path: "/feed-management",
    table: "ok",
    text: "hello adndkfjslf kjdslfjksl",
    foodMenu: foodmenuS
  });
};

// @desc DMIS feed management today menu
// @rout GET /feed-management/today-menu
exports.getTodayMenu = async (req, res) => {
  const errors = []
  const foodmenuS = await menu.distinct('menuType')
  const rooms = await room.distinct('roomNum')
  const floors = await room.distinct('floorNum')
  const blocks = await room.distinct('blockNum')
  res.render("./feed-management/today-menu", {
    pageTittle: "تابلو غذایی امروز",
    path: "/feed-management/today-menu",
    table: "ok",
    foodMenu: foodmenuS,
    errors,
    rooms,
    floors,
    blocks
  })
}

// @desc DMIS feed management add ingradients to stock
// @rout GET /feed-management/add-ingradient-to-stock
exports.getAddIngradientToStock = async (req, res) => {
  const ingradients = await AddIngToStk.find()
  const foodmenuS = await menu.distinct('menuType')
  res.render("./feed-management/show-stock", {
    pageTittle: "تابلو غذایی امروز",
    path: "/feed-management/show-stock",
    table: "ok",
    errors: [],
    foodMenu: foodmenuS,
    ingradients
  })
}

// @desc DMIS feed management show daily menus
// @rout GET /feed-management/show-daily-menus
exports.getShowDailyMenus = async (req, res) => {
  const errors = []
  const dailymenus = await dailyMenu.find().sort({ date: -1 })
  const foodmenuS = await menu.distinct('menuType')
  res.render("./feed-management/show-daily-menu", {
    pageTittle: "تابلو غذایی روزانه",
    path: "/feed-management/show-daily-menu",
    table: "ok",
    errors,
    foodMenu: foodmenuS,
    dailymenus,
    formDate
  })
}

// @desc DMIS feed management show total report
// @rout GET /feed-management/show-total-report/:id
exports.getShowTotalReport = async (req, res) => {
  const foodmenuS = await menu.distinct('menuType')
  const { id } = req.params
  const menuId = id
  const ingradients = []
  let totalPriceMenu = 0;

  const todayMenu = await dailyMenu.findOne({ _id: menuId })

  const stkExpIng = await stkExport.find({ dailyMenu_fk: menuId })
  const m7PIng = await purchase.find({ dailyMenu_fk: menuId })

  for (let ingradient of stkExpIng) {
    ingradients.push({
      ingradient: ingradient.ingradient,
      amount: ingradient.amount,
      price: ingradient.price,
      totalPrice: ingradient.totalPrice
    })
    totalPriceMenu = totalPriceMenu + Number(ingradient.totalPrice)
  }

  for (let ingradient of m7PIng) {
    ingradients.push({
      ingradient: ingradient.ingradient,
      amount: ingradient.amount,
      price: ingradient.price,
      totalPrice: ingradient.totalPrice,
      from: ingradient.from
    })
    totalPriceMenu = totalPriceMenu + Number(ingradient.totalPrice)
  }

  const m7Numbers = await purchase.find({ dailyMenu_fk: menuId }).distinct("docNumber")

  res.render("./feed-management/show-total-report", {
    pageTittle: "قیمت مجموعی",
    path: "/feed-management/menu",
    table: "ok",
    secondLayout: "ok",
    foodMenu: foodmenuS,
    ingradients,
    todayMenu,
    stkExpIng,
    m7PIng,
    m7Numbers,
    formDate
  })
}

// @desc DMIS feed management show daily menu report
// @rout GET /feed-management/show-daily-menu-report/:id
exports.getShowDailyMenuReport = async (req, res) => {
  const { id } = req.params
  const report = await dailyMenuReport.find({ dailyMenu_fk: id }).populate("dailyMenu_fk")
  const foodmenuS = await menu.distinct('menuType')
  res.render("./feed-management/show-daily-menu-report", {
    pageTittle: "تابلو غذایی روزانه",
    path: "/feed-management/menu",
    table: "ok",
    secondLayout: "ok",
    foodMenu: foodmenuS,
    report,
    id,
    formDate
  })
}

// @desc DMIS feed management show daily menu report
// @rout GET /feed-management/edit-daily-menu-report/:id
exports.getEditDailyMenuReport = async (req, res) => {
  const errors = []
  const foodmenuS = await menu.distinct('menuType')
  const dlMenu = await dailyMenu.findOne({ _id: req.params.id })
  return res.render("./feed-management/edit-daily-menu", {
    pageTittle: "تابلو غذایی روزانه",
    path: "/feed-management/menu",
    table: "ok",
    secondLayout: "ok",
    foodMenu: foodmenuS,
    errors,
    dlMenu,
    formDate
  })
}

// @desc DMIS feed management stock
// @rout GET /feed-management/stock
exports.getShowStock = async (req, res) => {
  const errors = []
  const foodmenuS = await menu.distinct('menuType')
  const ingradients = await AddIngToStk.find()
  res.render("./feed-management/show-stock", {
    pageTittle: "دیپوی مواد غذایی",
    path: "/feed-management/show-stock",
    table: "ok",
    errors,
    foodMenu: foodmenuS,
    ingradients
  })
}

// @desc DMIS feed management show stock purchase
// @rout GET /feed-management/show-stock-purchase
exports.getShowStockPurchase = async (req, res) => {
  const foodmenuS = await menu.distinct('menuType')
  const ing = await purchase.find({ ingradientType: "stock" }).sort({ date: -1 })
  const message = '';
  res.render("./feed-management/show-stock-purchase", {
    pageTittle: "گزارش ادخالات به دیپو",
    path: "/feed-management//show-stock-purchase",
    table: "ok",
    foodMenu: foodmenuS,
    message,
    ingradients: ing,
    formDate
  })
}

// @desc DMIS feed management show stock export
// @rout GET /feed-management/show-stock-export
exports.getShowStockExport = async (req, res) => {
  const errors = []
  const foodmenuS = await menu.distinct('menuType')
  const ingradients = await stkExport.find().sort({ date: 1 })
  const stkIngradients = await AddIngToStk.find()
  const message = '';

  res.render("./feed-management/show-stock-export", {
    pageTittle: "گزارش اخراجات از دیپو",
    path: "/feed-management//show-stock-export",
    table: "ok",
    foodMenu: foodmenuS,
    errors,
    message,
    ingradients,
    stkIngradients,
    formDate
  })
}

// @desc DMIS feed management edit user page
// @routes GET /feed-management/edit-account/:id
exports.getEditAccount = async (req, res) => {
  const selectUser = await User.findOne({ _id: req.params.id });
  if (selectUser.position !== "مدیر ارتزاقی") {
    req.flash("error_msg", "دسترسی غیرمجاز");
    return res.redirect("back");
  }

  res.render("indexFiles/edit-user", {
    pageTittle: "ویرایش استفاده کننده",
    path: "/admin/edit-user",
    fullname: selectUser.fullname,
    email: selectUser.email,
    id: selectUser._id,
    errors: [],
    position: req.user.position
  })
}

// @desc DMIS feed management stock edit purchase
// @rout GET /feed-management/stock-edit-purchase/:id
exports.getEditStockPurchase = async (req, res) => {
  const errors = []
  const stockPurchase = await purchase.findOne({ _id: req.params.id })

  res.render("./feed-management/edit-stock-purchase", {
    pageTittle: "گزارش اخراجات از دیپو",
    path: "/feed-management/menu",
    table: "ok",
    secondLayout: "ok",
    stockPurchase,
    errors,
    formDate
  })

}

// @desc DMIS feed management show daily purchase
// @rout GET /feed-management/show-daily-purchase
exports.getShowDailyPurchase = async (req, res) => {
  const errors = []
  const foodmenuS = await menu.distinct('menuType')
  const ing = await purchase.find({ ingradientType: "m-7" }).sort({ date: 1 })
  const m7IngNames = await purchase.find({ ingradientType: "m-7" }).distinct('ingradient')

  res.render("./feed-management/show-daily-purchase", {
    pageTittle: "گزارش خرید روزانه",
    path: "/feed-management//show-daily-purchase",
    table: "ok",
    foodMenu: foodmenuS,
    errors,
    ingradients: ing,
    m7IngNames,
    formDate
  })
}

// @desc DMIS feed management stock purchase
// @rout GET /feed-management/stock-purchase
exports.getStockPurchase = async (req, res) => {
  const foodmenuS = await menu.distinct('menuType')
  const ing = await AddIngToStk.find()
  res.render("./feed-management/stock-purchase", {
    pageTittle: "ادخالات به دیپو",
    path: "/feed-management/stock-purchase",
    table: "ok",
    foodMenu: foodmenuS,
    ingradients: ing
  })
}

// @desc DMIS feed management daily purchase
// @rout GET /feed-management/daily-purchase
exports.getDailyPurchase = async (req, res) => {
  const errors = []
  const foodmenuS = await menu.distinct('menuType')
  res.render("./feed-management/daily-purchase", {
    pageTittle: "خرید اجناس تازه",
    path: "/feed-management/daily-purchase",
    table: "ok",
    foodMenu: foodmenuS,
    errors
  })
}

// @desc DMIS feed management daily purchase menu
// @rout POST /feed-management/daily-purchase-menu
exports.getPurchaseMenu = async (req, res) => {
  const errors = []
  const foodmenuS = await menu.distinct('menuType')
  const ingradients = []

  if (!req.body.ingradient) {
    req.flash("error_msg", "لطفا یک جنس تازه را انتخاب نمایید!")
    return res.redirect(`/feed-management/show-daily-menu-report/${req.body.menuId}`)
  }

  if (typeof req.body.ingradient == 'object') {
    for (let a of req.body.ingradient) {
      let ing = await dailyMenuReport.findOne({ _id: a })
      ingradients.push(ing);
    }
  } else {
    let ing = await dailyMenuReport.findOne({ _id: req.body.ingradient })
    ingradients.push(ing);
  }

  const menuId = req.body.menuId.trim()

  const dm = await dailyMenu.findOne({ _id: menuId })

  res.render("./feed-management/daily-purchase", {
    pageTittle: "خرید اجناس تازه",
    path: "/feed-management/daily-purchase-menu",
    table: "ok",
    foodMenu: foodmenuS,
    errors,
    ingradients,
    menuId,
    dailyMenu: dm
  })
}

// @desc DMIS feed management daily purchase menu stock
// @rout GET /feed-management/daily-purchase-menu-stock/:id
exports.getPurchaseMenuStock = async (req, res) => {
  const errors = []
  const foodmenuS = await menu.distinct('menuType')
  const tempDailyMenu = await dailyMenu.findOne({ _id: req.params.id })
  const stkDailyMenu = await dailyMenuReport.find({ dailyMenu_fk: req.params.id, ingradientType: "stock" })
  return res.render("./feed-management/daily-purchase", {
    pageTittle: "اخراج از دیپو",
    path: "/feed-management/daily-purchase-stock",
    table: "ok",
    myLayout: "second",
    foodMenu: foodmenuS,
    errors,
    secondLayout: "ok",
    ingradients: stkDailyMenu,
    dailyMenu: tempDailyMenu,
    menuId: req.params.id
  })
}

// @desc DMIS feed management add new menu
// @rout GET /feed-management/add-new-menu
exports.getAddNewMenu = async (req, res) => {
  const ing = await AddIngToStk.find()
  const foodmenuS = await menu.distinct('menuType')

  res.render("./feed-management/add-new-menu", {
    pageTittle: "اضافه کردن تابلو جدید",
    path: "/feed-management/add-new-menu",
    table: "ok",
    errors: [],
    ingradients: ing,
    foodMenu: foodmenuS
  })

}

// @desc DMIS feed management  menu
// @rout GET /feed-management/menu/:id
exports.getMenu = async (req, res) => {
  const { id } = req.params
  const foodmenuS = await menu.distinct('menuType')
  const ing = await menu.find({ menuType: id })
  const ingstk = await AddIngToStk.find();
  const errors = []
  res.render("./feed-management/menu", {
    pageTittle: "منو",
    path: "/feed-management/menu",
    table: "ok",
    secondLayout: "ok",
    foodMenu: foodmenuS,
    errors,
    ingradients: ing,
    ingradients_stk: ingstk,
    thisMenu: id,
  })
}

// @desc DMIS feed management menu edit menu
// @rout GET /feed-management/menu/edit-menu/:menuType/:id
exports.getEditMenu = async (req, res) => {
  const errors = []
  const { menuType, id } = await req.params
  const foodmenuS = await menu.distinct('menuType')
  const ingradient = await menu.findById(id)
  res.render("./feed-management/edit-menu", {
    pageTittle: "منو",
    path: "/feed-management/menu/edit-menu",
    table: "ok",
    thirdLayout: "ok",
    foodMenu: foodmenuS,
    errors: errors,
    menuType,
    ingradient
  })
}

// @desc DMIS feed management edit  purchase
// @rout GET /feed-management/edit-purchase/:id
exports.getEditPurchase = async (req, res) => {
  const errors = []
  const { id } = await req.params
  const foodmenuS = await menu.distinct('menuType')
  const ingradient = await purchase.findById(id)
  res.render("./feed-management/edit-purchase", {
    pageTittle: "ویرایش خرید روزانه",
    path: "/feed-management/menu/edit-menu",
    table: "ok",
    thirdLayout: "ok",
    foodMenu: foodmenuS,
    errors: errors,
    ingradient
  })
}

// @desc DMIS feed management calculation report
// @rout POST /feed-management/calculation-report
exports.getShowCalculationReport = async (req, res) => {
  const errors = [];
  const foodmenuS = await menu.distinct('menuType')
  let ingradient = ''
  let ingradientPriceCheker = ''
  let errorFlag = false

  if ((moment(req.body.startDate) > moment(req.body.endDate)) || !req.body.startDate || !req.body.endDate) {
    errorFlag = true
    req.flash("error_msg", "لطفا تاریخ شروع و ختم حساب را درست وارد نمایید!")
    errors.push({
      name: 'date',
      message: "لطفا تاریخ شروع و ختم حساب را درست وارد نمایید!"
    })
    // return res.redirect("/feed-management/show-daily-purchase");
  }

  if (typeof req.body.ingradientNames == 'undefined') {
    errorFlag = true
    req.flash("error_msg", "لطفا یک جنس را انتخاب نمایید!")
    errors.push({
      name: 'ingradient',
      message: "لطفا یک جنس را انتخاب نمایید!"
    })
  }

  if (errorFlag) {
    const ing = await purchase.find({ ingradientType: "m-7" }).sort({ date: 1 })
    const m7IngNames = await purchase.find({ ingradientType: "m-7" }).distinct('ingradient')

    res.render("./feed-management/show-daily-purchase", {
      pageTittle: "گزارش خرید روزانه",
      path: "/feed-management//show-daily-purchase",
      table: "ok",
      foodMenu: foodmenuS,
      errors,
      ingradients: ing,
      m7IngNames,
      formDate
    })
  }

  if (typeof req.body.ingradientNames != 'object') {

    ingradient = await purchase.find({
      date: {
        $gte: req.body.startDate,
        $lte: req.body.endDate
      },
      ingradient: req.body.ingradientNames,
      ingradientType: 'm-7'
    })

    // const dates = getDates(req.body.startDate, req.body.endDate)

    return res.render('./feed-management/show-calculation-report', {
      pageTittle: "منو",
      path: "/feed-management/menu",
      table: "ok",
      secondLayout: "ok",
      amount: "one",
      errors,
      foodMenu: foodmenuS,
      ingradient,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      // dates,
      formDate
    });


  } else {

    ingradient = await purchase.find({
      date: {
        $gte: req.body.startDate,
        $lte: req.body.endDate
      },
      ingradient: req.body.ingradientNames,
      ingradientType: 'm-7'
    })

    // ------------- ingradientPriceCheker -------------
    // ingradientPriceCheker = await purchase.find({
    //   date: {
    //     $gte: req.body.startDate,
    //     $lte: req.body.endDate
    //   },
    //   ingradient: req.body.ingradientNames,
    //   ingradientType: 'm-7'
    // }).distinct("price")

    // ingradientNameCheker = await purchase.find({
    //   date: {
    //     $gte: req.body.startDate,
    //     $lte: req.body.endDate
    //   },
    //   ingradient: req.body.ingradientNames,
    //   ingradientType: 'm-7'
    // }).distinct("ingradient")
    // if (Number(ingradientPriceCheker.length) != Number(ingradientNameCheker.length)) {
    //   req.flash("error_msg", "در تاریخ های انتخاب شده قیمت اجناس با هم متفاوت است! لطفا جنسی که تاریخ آن یکسان است را انتخاب نمایید!")
    //   return res.redirect('/feed-management/show-daily-purchase')
    // }
    // ---------- end of ingradientPriceCheker ----------

    const dates = getDates(req.body.startDate, req.body.endDate)

    return res.render('./feed-management/show-calculation-report', {
      pageTittle: "منو",
      path: "/feed-management/menu",
      table: "ok",
      secondLayout: "ok",
      amount: "more",
      errors,
      foodMenu: foodmenuS,
      ingradient,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      ingradientNames: req.body.ingradientNames,
      dates,
      // formDate
    });

  }

}

// @desc DMIS feed management calculation report stockExport
// @rout POST /feed-management/calculation-report-stockExport
exports.getShowCalculationReportStockExport = async (req, res) => {
  const errors = [];
  const foodmenuS = await menu.distinct('menuType')

  if ((moment(req.body.startDate) > moment(req.body.endDate)) || !req.body.startDate || !req.body.endDate) {
    req.flash("error_msg", "لطفا تاریخ شروع و ختم حساب را درست وارد نمایید!")
    errors.push({
      name: 'date',
      message: "لطفا تاریخ شروع و ختم حساب را درست وارد نمایید!"
    })
    const ingradients = await stkExport.find().sort({ date: 1 })
    const stkIngradients = await AddIngToStk.find()

    res.render("./feed-management/show-stock-export", {
      pageTittle: "گزارش اخراجات از دیپو",
      path: "/feed-management/show-stock-export",
      table: "ok",
      foodMenu: foodmenuS,
      errors,
      ingradients,
      stkIngradients,
      formDate
    })
    // return res.redirect("back");
  }

  let ingradient = ''

  ingradient = await stkExport.find({
    date: {
      $gte: req.body.startDate,
      $lte: req.body.endDate
    },
  })

  const ingradientNames = await AddIngToStk.find().distinct("ingradient")

  const dates = getDates(req.body.startDate, req.body.endDate)
  // return res.send(dates)
  return res.render('./feed-management/show-calculation-report', {
    pageTittle: "منو",
    path: "/feed-management/menu",
    table: "ok",
    secondLayout: "ok",
    amount: "stkExports",
    errors,
    foodMenu: foodmenuS,
    ingradient,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    ingradientNames,
    dates,
    formDate
  });

}

//  handlers

// @desc DMIS feed management update ingradient
// @rout post /feed-management/menu/update-ingradient
exports.updateIngradient = async (req, res) => {
  const errors = [];
  const foodmenuS = await menu.distinct('menuType')
  const ing = await menu.findById({ _id: req.body.ingradientId })
  const ingradient = await menu.findById({ _id: req.body.ingradientId })

  try {
    await menu.menuValidation(req.body)
  } catch (err) {
    console.log(err);
    err.inner.forEach((err) => {
      errors.push({
        name: err.path,
        message: err.message,
      });
    });

    return res.render(`./feed-management/edit-menu`, {
      pageTittle: "منو",
      path: "/feed-management/menu/edit-menu",
      table: "ok",
      thirdLayout: "ok",
      errors: errors,
      foodMenu: foodmenuS,
      menuType: req.body.menuType,
      ingradient: ing
    });

  }
  ingradient.ingradient = req.body.ingradient;
  ingradient.morningIngradientAmount = req.body.morningIngradientAmount;
  ingradient.noonIngradientAmount = req.body.noonIngradientAmount;
  ingradient.nightIngradientAmount = req.body.nightIngradientAmount;
  ingradient.calory = req.body.calory;
  ingradient.save();

  res.redirect(`/feed-management/menu/${req.body.menuType}`)
}

// @desc DMIS feed management delete ingradient
// @rout GET /feed-management/menu/delete-ingradient/:menuType/:id
exports.deleteIngradient = async (req, res) => {
  const { menuType, id } = await req.params
  await menu.deleteOne({ _id: id })
  res.redirect(`/feed-management/menu/${menuType}`)
}

// @desc DMIS feed management delete menu
// @rout GET /feed-management/menu/delete-menu/:menuType
exports.deleteMenu = async (req, res) => {
  const { menuType } = await req.params
  await menu.deleteMany({ menuType })
  res.redirect("/feed-management/show-daily-menus")
}

// @desc DMIS feed management delete purchase
// @rout GET /feed-management/delete-purchase/:id
exports.deletePurchase = async (req, res) => {
  const { id } = await req.params
  const ingradient = await purchase.findOne({ _id: id })
  if (ingradient.ingradientType == "m-7") {
    const tempDPReport = await dailyMenuReport.findOne({ ingradient: ingradient.ingradient, dailyMenu_fk: ingradient.dailyMenu_fk })
    tempDPReport.status = "pending"
    await tempDPReport.save();
    await purchase.deleteOne({ _id: id })
    return res.redirect("/feed-management/show-daily-purchase")
  } else if (ingradient.ingradientType == "stock") {
    // ---------------- minus from Stock ------------------
    const stockIng = await AddIngToStk.findOne({ _id: ingradient.stock_fk })
    let amount = Number(stockIng.amount) - Number(ingradient.amount)
    stockIng.amount = Number(amount.toFixed(3))
    await stockIng.save()
    // ------------- End of minus from Stock Section ----------------
    await purchase.deleteOne({ _id: id })
    return res.redirect("/feed-management/stock")
  }
}

// @desc DMIS feed management add ingradient to stock
// @rout POST /feed-management/add-ingradient-to-stock
exports.handleAddIngradientToStock = async (req, res) => {
  const foodmenuS = await menu.distinct('menuType')
  const errors = [];
  const ingradients = await AddIngToStk.find()
  try {
    await AddIngToStk.stockValidation(req.body)

    const ing = await AddIngToStk.findOne({ ingradient: req.body.ingradient });
    if (ing) {
      errors.push({ name: "ingradient", message: "ماده غذایی موجود است!" });
      return res.render("./feed-management/show-stock", {
        pageTittle: "اضافه کردن ماده غذایی جدید به دیپو",
        path: "/feed-management/show-stock/add-new",
        table: "ok",
        errors: errors,
        foodMenu: foodmenuS,
        ingradients
      })
    }

    await AddIngToStk.create({ ingradient: req.body.ingradient, description: req.body.description });
    return res.redirect("/feed-management/stock")

  } catch (err) {
    console.log(err);
    err.inner.forEach((err) => {
      errors.push({
        name: err.path,
        message: err.message,
      });
    });

    return res.render("./feed-management/show-stock", {
      pageTittle: " اضافه کردن ماده غذایی جدید به دیپو",
      path: "/feed-management/show-stock/add-new",
      table: "ok",
      errors: errors,
      foodMenu: foodmenuS,
      ingradients
    });
  }

}

// @desc DMIS feed management add new menu
// @rout POST /feed-management/add-new-menu
exports.handleAddNewMenu = async (req, res) => {

  const row = 10;
  const errors = [];
  const ing = await AddIngToStk.find()
  const foodmenuS = await menu.distinct('menuType')

  if (req.body.menuType == '') {

    errors.push({ name: "menuType", message: "لطفا نام منوی غذایی را وارد نمایید!" });
    return res.render("./feed-management/add-new-menu", {
      pageTittle: "اضافه کردن ماده غذایی جدید به دیپو",
      path: "/feed-management/add-new-menu",
      table: "ok",
      errors: errors,
      ingradients: ing,
      foodMenu: foodmenuS
    })

  }

  const m = await menu.findOne({ menuType: req.body.menuType });

  if (m) {

    errors.push({ name: "menuType", message: "این نام در دیتابس موجود است، لطفا نام را تغییر دهید!" });
    return res.render("./feed-management/add-new-menu", {
      pageTittle: "اضافه کردن منوی غذایی جدید",
      path: "/feed-management/add-new-menu",
      table: "ok",
      errors: errors,
      ingradients: ing,
      foodMenu: foodmenuS
    })

  }

  // final step - stock
  for (var i = 0; i < row; i++) {

    if (req.body.ingradient_stock[i] != '') {
      const ingradient_stk = await AddIngToStk.findById(req.body.ingradient_stock[i])

      let morning, noon, night, cl

      (req.body.morningIngradientAmount_stock[i] < 0 || req.body.morningIngradientAmount_stock[i] == '') ? morning = 0 : morning = req.body.morningIngradientAmount_stock[i];
      (req.body.noonIngradientAmount_stock[i] < 0 || req.body.noonIngradientAmount_stock[i] == '') ? noon = 0 : noon = req.body.noonIngradientAmount_stock[i];
      (req.body.nightIngradientAmount_stock[i] < 0 || req.body.nightIngradientAmount_stock[i] == '') ? night = 0 : night = req.body.nightIngradientAmount_stock[i];
      (req.body.calory_stock[i] < 0 || req.body.calory_stock[i] == '') ? cl = 0 : cl = req.body.calory_stock[i];

      await menu.create({ menuType: req.body.menuType, ingradient: ingradient_stk.ingradient, morningIngradientAmount: morning, noonIngradientAmount: noon, nightIngradientAmount: night, calory: cl, stock_fk: req.body.ingradient_stock[i] });
    }

  }

  // final step - m7
  for (var j = 0; j < row; j++) {

    if (req.body.ingradient_m7[j] != '') {

      let morning, noon, night, cl

      (req.body.morningIngradientAmount_m7[j] < 0 || req.body.morningIngradientAmount_m7[j] == '') ? morning = 0 : morning = req.body.morningIngradientAmount_m7[j];
      (req.body.noonIngradientAmount_m7[j] < 0 || req.body.noonIngradientAmount_m7[j] == '') ? noon = 0 : noon = req.body.noonIngradientAmount_m7[j];
      (req.body.nightIngradientAmount_m7[j] < 0 || req.body.nightIngradientAmount_m7[j] == '') ? night = 0 : night = req.body.nightIngradientAmount_m7[j];
      (req.body.calory_m7[j] < 0 || req.body.calory_m7[j] == '') ? cl = 0 : cl = req.body.calory_m7[j];

      await menu.create({ menuType: req.body.menuType, ingradient: req.body.ingradient_m7[j], morningIngradientAmount: morning, noonIngradientAmount: noon, nightIngradientAmount: night, calory: cl });
    }

  }

  return res.redirect(`/feed-management/menu/${req.body.menuType}`)

}

// @desc DMIS feed management add to menu
// @rout POST /feed-management/add-to-menu
exports.handleAddToMenu = async (req, res) => {
  // return res.send(req.body)
  try {

    var ingStk;
    var ingFresh;

    if (req.body.ingradient_stock && req.body.ingradient_stock != "") {
      ingStk = await menu.findOne({ menuType: req.body.menuType, stock_fk: req.body.ingradient_stock })
      if (ingStk) {
        req.flash("error_msg", "این جنس از قبل موجود است!");
        return res.redirect(`/feed-management/menu/${req.body.menuType}`);
      } else {
        const ingradient_stk = await AddIngToStk.findById(req.body.ingradient_stock)

        let morning, noon, night, cl

        (req.body.morningIngradientAmount_stock == '') ? morning = 0 : morning = req.body.morningIngradientAmount_stock;
        (req.body.noonIngradientAmount_stock == '') ? noon = 0 : noon = req.body.noonIngradientAmount_stock;
        (req.body.nightIngradientAmount_stock == '') ? night = 0 : night = req.body.nightIngradientAmount_stock;
        (req.body.calory_stock == '') ? cl = 0 : cl = req.body.calory_stock;

        await menu.create({ menuType: req.body.menuType, ingradient: ingradient_stk.ingradient, morningIngradientAmount: morning, noonIngradientAmount: noon, nightIngradientAmount: night, calory: cl, stock_fk: req.body.ingradient_stock });
        // req.flash("success_msg", "ثبت نام شما موفقیت آمیز بود");
        return res.redirect(`/feed-management/menu/${req.body.menuType}`);

      }
    } else {
      if (req.body.ingradient_m7 && req.body.ingradient_m7 != "") {
        ingFresh = await menu.findOne({ menuType: req.body.menuType, ingradient: req.body.ingradient_m7 })
        if (ingFresh) {
          req.flash("error_msg", "این جنس از قبل موجود است!");
          return res.redirect(`/feed-management/menu/${req.body.menuType}`);
        } else {

          let morning, noon, night, cl

          (req.body.morningIngradientAmount_m7 == '') ? morning = 0 : morning = req.body.morningIngradientAmount_m7;
          (req.body.noonIngradientAmount_m7 == '') ? noon = 0 : noon = req.body.noonIngradientAmount_m7;
          (req.body.nightIngradientAmount_m7 == '') ? night = 0 : night = req.body.nightIngradientAmount_m7;
          (req.body.calory_m7 == '') ? cl = 0 : cl = req.body.calory_m7;

          await menu.create({ menuType: req.body.menuType, ingradient: req.body.ingradient_m7, morningIngradientAmount: morning, noonIngradientAmount: noon, nightIngradientAmount: night, calory: cl });
          // req.flash("success_msg", "ثبت نام شما موفقیت آمیز بود");
          return res.redirect(`/feed-management/menu/${req.body.menuType}`);

        }
      }
    }
    if (req.body) {
      req.flash("error_msg", "لطفا اطلاعات را درست وارد نمایید!");
      return res.redirect(`/feed-management/menu/${req.body.menuType}`);
    }

    return res.redirect(`/feed-management/menu/${req.body.menuType}`);

  } catch (err) {
    console.log(err)
    return res.redirect(`/feed-management/menu/${req.body.menuType}`);
  }

}

// @desc DMIS feed management stock purchase
// @rout POST /feed-management/stock purchase
exports.handleStockPurchase = async (req, res) => {
  const errors = []
  const foodmenuS = await menu.distinct('menuType')
  const ingradients = await AddIngToStk.find()
  try {
    await purchase.stockPurchaseValidation(req.body)
    const ingradient = await AddIngToStk.findOne({ _id: req.body.ingradient })
    let amount = Number(ingradient.amount) + Number(req.body.amount);
    ingradient.amount = Number(amount.toFixed(3));
    ingradient.save();
    var ttprice = req.body.amount * req.body.price;
    await purchase.create({ docNumber: req.body.docNumber, ingradient: ingradient.ingradient, ingradientType: req.body.ingradientType, amount: req.body.amount, price: req.body.price, totalPrice: Number(ttprice.toFixed(3)), date: req.body.date, from: req.body.from, description: req.body.description, stock_fk: req.body.ingradient });
    res.redirect("/feed-management/stock")
  } catch (err) {
    err.inner.forEach((err) => {
      errors.push({
        name: err.path,
        message: err.message,
      });
    });

    return res.render("./feed-management/show-stock", {
      pageTittle: " ادخالات به دیپو",
      path: "/feed-management/show-stock",
      table: "ok",
      errors: errors,
      foodMenu: foodmenuS,
      ingradients
    });
  }
}

// @desc DMIS feed management daily purchase
// @rout POST /feed-management/daily-purchase
exports.handlePurchase = async (req, res) => {
  const errors = []
  const foodmenuS = await menu.distinct('menuType')

  if (req.body.ingradientType == "stock") {
    for (let element of req.body.price)
      if (!element) {
        req.flash("error_msg", "لطفا قیمت اجناس را وارد نمایید!")
        return res.redirect(`/feed-management/daily-purchase-menu-stock/${req.body.menuId}`);
      }
  } else if (req.body.ingradientType == "m-7") {
    for (let element of req.body.price)
      if (!element) {
        req.flash("error_msg", "لطفا قیمت اجناس را وارد نمایید!")
        return res.redirect(`/feed-management/show-daily-menu-report/${req.body.menuId}`);
      }
  }

  let menuId = 0
  if (typeof req.body.id == 'object') {
    for (let a of req.body.id) {
      const dailyMenuIng = await dailyMenuReport.findOne({ _id: req.body.id[0] })
      menuId = dailyMenuIng.dailyMenu_fk
    }
  } else {
    const dailyMenuIng = await dailyMenuReport.findOne({ _id: req.body.id })
    menuId = dailyMenuIng.dailyMenu_fk
  }

  const dm = await dailyMenu.findOne({ _id: menuId })

  // general daily purchase
  // if (req.body.path == "/feed-management/daily-purchase") {

  //   const row = 10;
  //   const ingradientInfo = []
  //   try {

  //     const purchaseInfo = { docNumber: req.body.docNumber, date: req.body.date, from: req.body.from, description: req.body.description }
  //     await purchase.purchaseInfoValidation(purchaseInfo)

  //     for (var i = 0; i < row; i++) {
  //       if (req.body.ingradient[i] != "" && (req.body.amount[i] == '' || req.body.price[i] == '')) {
  //         errors.push({ name: "ingradient_" + (i + 1), message: "لطفا اطلاعات را کامل وارد نمایید!" });
  //         return res.render("./feed-management/daily-purchase", {
  //           pageTittle: "خرید اجناس تازه",
  //           path: "/feed-management/daily-purchase",
  //           table: "ok",
  //           foodMenu: foodmenuS,
  //           errors,
  //         })
  //       } else if (req.body.ingradient[i] != "" && req.body.amount[i] != "" && req.body.price[i] != "") {
  //         var a = { ingradient: req.body.ingradient[i], amount: req.body.amount[i], price: req.body.price[i] }
  //         await purchase.purchaseIngradientsValidation(a)
  //         ingradientInfo.push({ ingradient: req.body.ingradient[i], amount: req.body.amount[i], price: req.body.price[i] })
  //       }
  //     }

  //     ingradientInfo.forEach(async (element) => {
  //       var ttprice = element.amount * element.price;
  //       await purchase.create({ docNumber: req.body.docNumber, ingradient: element.ingradient, ingradientType: req.body.ingradientType, amount: element.amount, price: element.price, totalPrice: ttprice, date: req.body.date, from: req.body.from, description: req.body.description });
  //     })

  //     return res.redirect("/feed-management/show-daily-purchase")

  //   } catch (err) {

  //     err.inner.forEach((err) => {
  //       errors.push({
  //         name: err.path,
  //         message: err.message,
  //       });
  //     });

  //     return res.render("./feed-management/daily-purchase", {
  //       pageTittle: "خرید اجناس تازه",
  //       path: req.body.path,
  //       table: "ok",
  //       foodMenu: foodmenuS,
  //       errors,
  //     })

  //   }

  // }

  // daily menu purchase
  // else
  if (req.body.path == "/feed-management/daily-purchase-menu") {
    let siz = 0;
    if (typeof req.body.id == 'object') {
      req.body.id.forEach((element) => {
        siz++
      })
    } else {
      siz++
    }


    const row = siz;
    const ingradientInfo = []
    const ingradients = []

    if (typeof req.body.id == 'object') {
      for (let a of req.body.id) {
        let ing = await dailyMenuReport.findOne({ _id: a })
        ingradients.push(ing);
      }
    } else {
      let ing = await dailyMenuReport.findOne({ _id: req.body.id })
      ingradients.push(ing);
    }

    try {

      const purchaseInfo = { docNumber: req.body.docNumber, date: req.body.date, from: req.body.from, description: req.body.description }
      await purchase.purchaseInfoValidation(purchaseInfo)

      if (row > 1) {

        for (var i = 0; i < row; i++) {
          if (req.body.ingradient[i] != "" && (req.body.amount[i] == '' || req.body.price[i] == '')) {
            errors.push({ name: "ingradient_" + (i + 1), message: "لطفا اطلاعات را کامل وارد نمایید!" });
            return res.render("./feed-management/daily-purchase", {
              pageTittle: "خرید اجناس تازه",
              path: "/feed-management/daily-purchase-menu",
              table: "ok",
              foodMenu: foodmenuS,
              errors,
              ingradients,
              menuId
            })
          } else if (req.body.ingradient[i] != "" && req.body.amount[i] != "" && req.body.price[i] != "") {
            var a = { ingradient: req.body.ingradient[i], amount: req.body.amount[i], price: req.body.price[i] }
            await purchase.purchaseIngradientsValidation(a)
            ingradientInfo.push({ ingradient: req.body.ingradient[i], amount: req.body.amount[i], price: req.body.price[i] })
          }
        }

      } else {

        var a = { ingradient: req.body.ingradient, amount: req.body.amount, price: req.body.price }
        await purchase.purchaseIngradientsValidation(a)
        ingradientInfo.push({ ingradient: a.ingradient, amount: a.amount, price: a.price })

      }

      ingradientInfo.forEach(async (element) => {
        var ttprice = element.amount * element.price;
        await purchase.create({ docNumber: req.body.docNumber, ingradient: element.ingradient, ingradientType: req.body.ingradientType, amount: element.amount, price: element.price, totalPrice: ttprice, date: req.body.date, from: req.body.from, description: req.body.description, dailyMenu_fk: req.body.menuId.trim() });
      })

      ingradients.forEach(async (element) => {
        let ingradient = await dailyMenuReport.findById({ _id: element.id })
        ingradient.status = "purchased"
        ingradient.save();
      })

    } catch (err) {

      err.inner.forEach((err) => {
        errors.push({
          name: err.path,
          message: err.message,
        });
      });

      return res.render("./feed-management/daily-purchase", {
        pageTittle: "خرید اجناس تازه",
        path: "/feed-management/daily-purchase-menu",
        table: "ok",
        foodMenu: foodmenuS,
        errors,
        ingradients,
        menuId,
        dailyMenu: dm
      })

    }


  }


  // daily menu purchase stock
  else if (req.body.path == "/feed-management/daily-purchase-stock") {

    if (typeof req.body.id == 'object') {

      let i = 0;
      for (let element of req.body.id) {


        let dailyMenuIng = await dailyMenuReport.findOne({ _id: element })
        dailyMenuIng.status = "purchased"
        dailyMenuIng.save()

        let stkIng = await AddIngToStk.findOne({ ingradient: dailyMenuIng.ingradient })

        let amount = Number(stkIng.amount) - Number(dailyMenuIng.totalIngradientAmount)
        stkIng.amount = Number(amount.toFixed(3))
        stkIng.save()

        let ttprice = req.body.price[i] * dailyMenuIng.totalIngradientAmount
        await stkExport.create({ ingradient: dailyMenuIng.ingradient, amount: dailyMenuIng.totalIngradientAmount, price: req.body.price[i], totalPrice: Number(ttprice.toFixed(3)), date: req.body.date, dailyMenu_fk: dailyMenuIng.dailyMenu_fk })

        i++;
      }

    } else {

      let dailyMenuIng = await dailyMenuReport.findOne({ _id: req.body.id })
      dailyMenuIng.status = "purchased"
      dailyMenuIng.save()

      let stkIng = await AddIngToStk.findOne({ ingradient: dailyMenuIng.ingradient })

      let amount = Number(stkIng.amount) - Number(dailyMenuIng.totalIngradientAmount)
      stkIng.amount = Number(amount.toFixed(3))
      stkIng.save()

      let ttprice = req.body.price * dailyMenuIng.totalIngradientAmount
      await stkExport.create({ ingradient: dailyMenuIng.ingradient, amount: dailyMenuIng.totalIngradientAmount, price: req.body.price, totalPrice: Number(ttprice.toFixed), date: req.body.date, dailyMenu_fk: dailyMenuIng.dailyMenu_fk })

    }



  }

  return res.redirect(`/feed-management/show-daily-menu-report/${menuId}`)

}

// @desc DMIS feed management edit purchase
// @rout POST/feed-management/edit-purchase
exports.handleEditPurchase = async (req, res) => {
  const errors = [];
  const foodmenuS = await menu.distinct('menuType')
  const ingradient = await purchase.findById({ _id: req.body.ingradientId })
  try {
    await purchase.stockPurchaseValidation(req.body)
  } catch (err) {
    err.inner.forEach((err) => {
      errors.push({
        name: err.path,
        message: err.message,
      });
    });
    return res.render("./feed-management/edit-purchase", {
      pageTittle: "ویرایش خرید روزانه",
      path: "/feed-management/menu/edit-menu",
      table: "ok",
      thirdLayout: "ok",
      errors: errors,
      foodMenu: foodmenuS,
      ingradient
    });
  }
  ingradient.docNumber = req.body.docNumber;
  ingradient.date = req.body.date;
  ingradient.from = req.body.from;
  ingradient.ingradient = req.body.ingradient;
  ingradient.amount = req.body.amount;
  ingradient.price = req.body.price;
  let ttp = req.body.price * req.body.amount;
  ingradient.totalPrice = Number(ttp).toFixed(3)
  ingradient.description = req.body.description;
  ingradient.save();

  return res.redirect("/feed-management/show-daily-purchase")
}

// @desc DMIS feed management today menu
// @rout post /feed-management/show-daily-menus
exports.handleTodayMenu = async (req, res) => {
  const errors = []
  const foodmenuS = await menu.distinct('menuType')
  const dailymenus = await dailyMenu.find()
  // let flag = "yes";
  try {

    // dailyMenu
    await dailyMenu.dailyMenuValidation(req.body)

    await dailyMenu.create(req.body)
    const tempDailyMenu = await dailyMenu.findOne({ date: req.body.date })

    // menu
    const tempMenu = await menu.find({ menuType: req.body.menuType })


    // for (let element of tempMenu) {
    //   const totalInA = ((Number(element.morningIngradientAmount) + Number(element.noonIngradientAmount) + Number(element.nightIngradientAmount)) / 1000) * req.body.numberOfStudents
    //   if (element.stock_fk != null) {
    //     let stkIng = await AddIngToStk.findOne({ _id: element.stock_fk })
    //     if (Number(stkIng.amount) < Number(totalInA))
    //       flag = "no"
    //   }
    // }


    // if (flag == 'yes') {

    for (let element of tempMenu) {
      const totalInA = ((Number(element.morningIngradientAmount) + Number(element.noonIngradientAmount) + Number(element.nightIngradientAmount)) / 1000) * req.body.numberOfStudents
      let ingType = ""
      if (element.stock_fk == null) {
        ingType = 'm-7'
      } else {
        ingType = 'stock'
      }
      await dailyMenuReport.create({ ingradient: element.ingradient, totalIngradientAmount: totalInA, ingradientType: ingType, dailyMenu_fk: tempDailyMenu.id })
    }

    // } else {

    //   await dailyMenu.deleteOne({ _id: tempDailyMenu.id })

    //   errors.push({
    //     name: "stockError",
    //     message: "موجودی دیپو کافی نمیباشد!"
    //   })
    //   return res.render("./feed-management/today-menu", {
    //     pageTittle: "تابلو غذایی امروز",
    //     path: "/feed-management/today-menu",
    //     foodMenu: foodmenuS,
    //     errors,
    //     rooms,
    //     floors,
    //     blocks
    //   })

    // }
    req.flash("success_msg", "اعاشه روز بعد با موفقیت ثبت شد.")
    return res.redirect('/feed-management/show-daily-menus')

  } catch (err) {

    if (err.inner) {

      err.inner.forEach((err) => {
        errors.push({
          name: err.path,
          message: err.message,
        });
      })

    } else {

      errors.push({
        name: "dbError",
        message: "شما قبلا در این تاریخ یک منوی غذایی ترتیب داده اید! یک تاریخ دیگر را انتخاب نمایید!"
      })

    }

    req.flash("error_msg", "متاسفانه اعاشه روز بعد ثبت نشد!")
    res.render("./feed-management/show-daily-menu", {
      pageTittle: "تابلو غذایی روزانه",
      path: "/feed-management/show-daily-menu",
      table: "ok",
      errors,
      foodMenu: foodmenuS,
      dailymenus,
      formDate
    })

  }

}

exports.downloadReportStockExport = async (req, res) => {
  ingradient = await stkExport.find({
    date: {
      $gte: req.body.startDate,
      $lte: req.body.endDate
    },
  })

  const ingradientNames = await AddIngToStk.find().distinct("ingradient")

  const dates = getDates(req.body.startDate, req.body.endDate)

  const invoiceData = {
    // addresses: {
    //   shipping: {
    //     name: 'مهدی',
    //     address: 'سرک چهادهم چهاردهی',
    //     city: 'کابل',
    //     country: 'افغانستان',
    //     postalCode: 94118
    //   },
    //   billing: {
    //     name: 'مهدی',
    //     address: 'سرک چهادهم چهاردهی',
    //     city: 'کابل',
    //     country: 'افغانستان',
    //     postalCode: 94118
    //   }
    // },
    memo: ingradientNames,
    dates: dates,
    items: [{
      itemCode: 12341,
      // description: 'کمپوتر لپتاپ',
      quantity: 2,
      price: 3000,
      amount: 6000
    }, {
      itemCode: 12342,
      description: 'قاشق',
      quantity: 1,
      price: 2000,
      amount: 2000
    }],
    // subtotal: 8000,
    // paid: 0,
    // invoiceNumber: 1234,
    dueDate: `فورم توحید عمومی تابلوی حبوبات اعاشه محصلان لیلیه پوهنتون پولی تخنیک کابل از بابت ${req.body.startDate} مواد داخل گدام.`
  }


  const ig = new InvoiceGenerator(invoiceData)
  ig.generate()

  return res.send(dates)

}

// @desc DMIS feed management edit stock purchase
// @rout POST /feed-management/edit-stock-purchase
exports.handleEditStockPurchase = async (req, res) => {
  const prePurchase = await purchase.findOne({ _id: req.body.purchaseId })

  if (prePurchase.amount == req.body.amount) {
    prePurchase.docNumber = req.body.docNumber
    prePurchase.price = req.body.price
    let ttp = req.body.price * req.body.amount
    prePurchase.totalPrice = Number(ttp.toFixed(3))

    if (req.body.date) {
      prePurchase.date = req.body.date
    }

    prePurchase.from = req.body.from
    prePurchase.description = prePurchase.description
    prePurchase.save()

  } else {
    let result = Number(req.body.amount) - Number(prePurchase.amount)

    prePurchase.amount = req.body.amount
    prePurchase.docNumber = req.body.docNumber
    prePurchase.price = req.body.price
    ttp = req.body.price * req.body.amount
    prePurchase.totalPrice = Number(ttp.toFixed(3))

    if (req.body.date) {
      prePurchase.date = req.body.date
    }

    prePurchase.from = req.body.from
    prePurchase.description = prePurchase.description
    prePurchase.save()

    const stkIng = await AddIngToStk.findOne({ _id: prePurchase.stock_fk })
    result = Number(stkIng.amount) + Number(result)
    stkIng.amount = Number(result.toFixed(3))
    stkIng.save()
  }

  return res.redirect("/feed-management/show-stock-purchase")
}

// @desc DMIS feed management show daily menu report
// @rout POST /feed-management/edit-daily-menu-report/:id
exports.handleEditDailyMenuReport = async (req, res) => {
  const errors = []
  const foodmenuS = await menu.distinct('menuType')
  try {
    await dailyMenu.dailyMenuEditValidation(req.body)
    const preDlMenu = await dailyMenu.findOne({ _id: req.body.menuId })
    if (preDlMenu.numberOfStudents == req.body.numberOfStudents) {
      preDlMenu.attReportNumber = req.body.attReportNumber
      if (req.body.date) {
        if (checkDate(req.body.date) === false) {
          req.flash("error_msg", "تاریخ اشتباه میباشد!")
          return res.redirect(`/feed-management/edit-daily-menu-report/${req.body.menuId}`)
        }
        // -------------- edit date in stock and m-7 purchases
        const ingradientsStk = await stkExport.find({ dailyMenu_fk: req.body.menuId })
        const ingradientsM7 = await purchase.find({ dailyMenu_fk: req.body.menuId })
        for (let ing of ingradientsStk) {
          ing.date = req.body.date
          await ing.save()
        }
        for (let ing of ingradientsM7) {
          ing.date = req.body.date
          await ing.save()
        }
        // -------------- end of edit date in stock and m-7 purchases
        preDlMenu.date = req.body.date
      }
      preDlMenu.descriptions = req.body.descriptions
      await preDlMenu.save()

    } else {

      // ---------------- Number of Students Changed ------------------
      const ingradientsStk = await stkExport.find({ dailyMenu_fk: req.body.menuId })
      const ingradientsM7 = await purchase.find({ dailyMenu_fk: req.body.menuId })
      const dailyMenuIng = await dailyMenuReport.find({ dailyMenu_fk: req.body.menuId })
      // return res.send(ingradientsM7)
      for (let ing of ingradientsStk) {
        if (ing.amount > 0) {
          const stockIng = await AddIngToStk.findOne({ ingradient: ing.ingradient })
          stockIng.amount = Number(stockIng.amount) + Number(ing.amount)
          let ingAmount = (Number(ing.amount) / Number(preDlMenu.numberOfStudents)) * Number(req.body.numberOfStudents)
          let result = Number(stockIng.amount) - Number(ingAmount)
          stockIng.amount = Number(result.toFixed(3))
          ing.amount = ingAmount
          let ttp = ing.price * ingAmount
          ing.totalPrice = Number(ttp.toFixed(3))
          await stockIng.save()
          await ing.save()
        }
      }

      for (let ing of ingradientsM7) {
        if (ing.amount > 0) {
          let ingAmount = (Number(ing.amount) / Number(preDlMenu.numberOfStudents)) * req.body.numberOfStudents
          ing.amount = Number(ingAmount.toFixed(3))
          let ttp = ing.price * ingAmount
          ing.totalPrice = Number(ttp.toFixed(3))
          await ing.save()
        }
      }

      for (let ing of dailyMenuIng) {
        if (ing.totalIngradientAmount > 0) {
          let ingAmount = (Number(ing.totalIngradientAmount) / Number(preDlMenu.numberOfStudents)) * req.body.numberOfStudents
          ing.totalIngradientAmount = ingAmount
          await ing.save()
        }
      }

      preDlMenu.numberOfStudents = req.body.numberOfStudents
      await preDlMenu.save()

      // ------------- end of Students Changed Section ----------------

      preDlMenu.attReportNumber = req.body.attReportNumber
      if (req.body.date) {
        // -------------- edit date in stock and m-7 purchases
        for (let ing of ingradientsStk) {
          ing.date = req.body.date
          await ing.save()
        }
        for (let ing of ingradientsM7) {
          ing.date = req.body.date
          await ing.save()
        }
        // -------------- end of edit date in stock and m-7 purchases
        preDlMenu.date = req.body.date
      }
      preDlMenu.descriptions = req.body.descriptions
      await preDlMenu.save()

    }

    req.flash("success_msg", "تغیرات اعاشه روز بعد با موفقیت ثبت شد.")
    return res.redirect("/feed-management/show-daily-menus")

  } catch (err) {

    if (err.inner) {

      err.inner.forEach((err) => {
        errors.push({
          name: err.path,
          message: err.message,
        });
      })

    } else {

      errors.push({
        name: "date",
        message: "شما قبلا در این تاریخ یک منوی غذایی ترتیب داده اید! یک تاریخ دیگر را انتخاب نمایید!"
      })

    }
    req.flash("error_msg", "متاسفانه تغیرات اعاشه روز بعد ثبت نشد.")
    const dlMenu = await dailyMenu.findOne({ _id: req.body.menuId })
    return res.render("./feed-management/edit-daily-menu", {
      pageTittle: "تابلو غذایی روزانه",
      path: "/feed-management/menu",
      table: "ok",
      secondLayout: "ok",
      foodMenu: foodmenuS,
      errors,
      dlMenu,
      formDate
    })

  }

}

// @desc DMIS feed management delete daily menu report
// @rout GET /feed-management/delete-daily-menu-report/:id
exports.getDeleteDailyMenuReport = async (req, res) => {
  try {
    // ---------------- Add To Stock ------------------
    const ingradientsStk = await stkExport.find({ dailyMenu_fk: req.params.id })
    for (let ing of ingradientsStk) {
      const stockIng = await AddIngToStk.findOne({ ingradient: ing.ingradient })
      let amount = Number(stockIng.amount) + Number(ing.amount)
      stockIng.amount = Number(amount.toFixed(3))
      await stockIng.save()
    }
    // ------------- End of Add To Stock Section ----------------
    // ------------- Deletion -----------------------------------
    await purchase.deleteMany({ dailyMenu_fk: req.params.id })
    await stkExport.deleteMany({ dailyMenu_fk: req.params.id })
    await dailyMenuReport.deleteMany({ dailyMenu_fk: req.params.id })
    await dailyMenu.deleteOne({ _id: req.params.id })
    // ------------- End of Deletion -----------------------------------
    req.flash("success_msg", "حواله اعاشه موفقانه حذف گردید.")
    return res.redirect("/feed-management/show-daily-menus")

  } catch (err) {
    console.log(err)
    return res.redirect("/feed-management/show-daily-menus")
  }
}

// @desc DMIS feed management edit user page
// @routes GET /feed-management/edit-account/:id
exports.getEditAccount =async (req,res)=>{
  const selectUser = await User.findOne({ _id: req.params.id });
  if(selectUser.position!=="مدیر ارتزاقی"){
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

// @desc DMIS office management edit user page
// @routes post /feed-management/edit-account/:id
exports.handleEditAccount =async (req,res)=>{
  errors=[];
  let selectUser=[];
  try{
  selectUser = await User.findOne({ _id: req.params.id });
  const { fullname, email, password,confirmPassword, position} = req.body;
  if(selectUser && selectUser.position!=="مدیر ارتزاقی"){
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
  return res.redirect("/feed-management/show-daily-menus");
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
