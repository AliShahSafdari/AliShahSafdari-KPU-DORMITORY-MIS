const { Router } = require("express");

const feedManagementController = require("../controllers/feed/feedManagementController");

const { authenticated, feedManagementBehavior, directorAndfeedManagementBehavior } = require("../middlewares/auth");

const router = Router();

// @desc DMIS feed management page
// @rout GET /feed-management
router.get("/", authenticated, directorAndfeedManagementBehavior, feedManagementController.getFeedManagement);

// @desc DMIS feed management today menu
// @rout GET /feed-management/today-menu
router.get("/today-menu", authenticated, directorAndfeedManagementBehavior, feedManagementController.getTodayMenu);

// @desc DMIS feed management show daily menus
// @rout post /feed-management/show-daily-menus
router.post("/show-daily-menus", authenticated, feedManagementBehavior, feedManagementController.handleTodayMenu);

// @desc DMIS feed management add ingradients to stock
// @rout GET /feed-management/add-ingradient-to-stock
router.get("/add-ingradient-to-stock", authenticated, directorAndfeedManagementBehavior, feedManagementController.getAddIngradientToStock);

// @desc DMIS feed management add ingradient to stock
// @rout POST /feed-management/add-ingradient-to-stock
router.post("/add-ingradient-to-stock", authenticated, feedManagementBehavior, feedManagementController.handleAddIngradientToStock);

// @desc DMIS feed management show daily menus
// @rout GET /feed-management/show-daily-menus
router.get("/show-daily-menus", authenticated, directorAndfeedManagementBehavior, feedManagementController.getShowDailyMenus);

// @desc DMIS feed management show daily menu report
// @rout GET /feed-management/show-daily-menu-report/:id
router.get("/show-daily-menu-report/:id", authenticated, directorAndfeedManagementBehavior, feedManagementController.getShowDailyMenuReport);

// @desc DMIS feed management show daily menu report
// @rout GET /feed-management/edit-daily-menu-report/:id
router.get("/edit-daily-menu-report/:id", authenticated, feedManagementBehavior, feedManagementController.getEditDailyMenuReport);

// @desc DMIS feed management edit user page
// @routes GET /feed-management/edit-account/:id
router.get("/edit-account/:id", authenticated, feedManagementBehavior, feedManagementController.getEditAccount);

// @desc DMIS feed management show daily menu report
// @rout POST /feed-management/edit-daily-menu-report/:id
router.post("/edit-daily-menu-report", authenticated, feedManagementBehavior, feedManagementController.handleEditDailyMenuReport);

// @desc DMIS feed management delete daily menu report
// @rout GET /feed-management/delete-daily-menu-report/:id
router.get("/delete-daily-menu-report/:id", authenticated, feedManagementBehavior, feedManagementController.getDeleteDailyMenuReport);

// @desc DMIS feed management stock
// @rout GET /feed-management/stock
router.get("/stock", authenticated, directorAndfeedManagementBehavior, feedManagementController.getShowStock);

// @desc DMIS feed management show stock purchase
// @rout GET /feed-management/show-stock-purchase
router.get("/show-stock-purchase", authenticated, directorAndfeedManagementBehavior, feedManagementController.getShowStockPurchase);

// @desc DMIS feed management show daily purchase
// @rout GET /feed-management/show-daily-purchase
router.get("/show-daily-purchase", authenticated, directorAndfeedManagementBehavior, feedManagementController.getShowDailyPurchase);

// @desc DMIS feed management stock purchase
// @rout GET /feed-management/stock-purchase
router.get("/stock-purchase", authenticated, directorAndfeedManagementBehavior, feedManagementController.getStockPurchase);

// @desc DMIS feed management daily purchase
// @rout GET /feed-management/daily-purchase
router.get("/daily-purchase", authenticated, directorAndfeedManagementBehavior, feedManagementController.getDailyPurchase);

// @desc DMIS feed management daily purchase
// @rout POST /feed-management/daily-purchase
router.post("/daily-purchase", authenticated, feedManagementBehavior, feedManagementController.handlePurchase);

// @desc DMIS feed management daily purchase menu
// @rout POST /feed-management/daily-purchase-menu
router.post("/daily-purchase-menu", authenticated, feedManagementBehavior, feedManagementController.getPurchaseMenu);

// @desc DMIS feed management daily purchase menu stock
// @rout GET /feed-management/daily-purchase-menu-stock/:id
router.get("/daily-purchase-menu-stock/:id", authenticated, feedManagementBehavior, feedManagementController.getPurchaseMenuStock);

// @desc DMIS feed management stock purchase
// @rout POST /feed-management/stock purchase
router.post("/stock-purchase", authenticated, feedManagementBehavior, feedManagementController.handleStockPurchase);

// @desc DMIS feed management add new menu
// @rout GET /feed-management/add-new-menu
router.get("/add-new-menu", authenticated, feedManagementBehavior, feedManagementController.getAddNewMenu);

// @desc DMIS feed management add new menu
// @rout POST /feed-management/add-new-menu
router.post("/add-new-menu", authenticated, feedManagementBehavior, feedManagementController.handleAddNewMenu);

// @desc DMIS feed management  menu
// @rout GET /feed-management/menu/:id
router.get("/menu/:id", authenticated, directorAndfeedManagementBehavior, feedManagementController.getMenu);

// @desc DMIS feed management menu edit menu
// @rout GET /feed-management/menu/edit-menu/:menuType/:id
router.get("/menu/edit-menu/:menuType/:id", authenticated, feedManagementBehavior, feedManagementController.getEditMenu);

// @desc DMIS feed management edit  purchase
// @rout GET /feed-management/edit-purchase/:id
router.get("/edit-purchase/:id", authenticated, feedManagementBehavior, feedManagementController.getEditPurchase);

// @desc DMIS feed management edit purchase
// @rout POST/feed-management/edit-purchase
router.post("/edit-purchase/", authenticated, feedManagementBehavior, feedManagementController.handleEditPurchase);

// @desc DMIS feed management delete ingradient
// @rout GET /feed-management/menu/delete-ingradient/:menuType/:id
router.get("/menu/delete-ingradient/:menuType/:id", authenticated, feedManagementBehavior, feedManagementController.deleteIngradient);

// @desc DMIS feed management delete menu
// @rout GET /feed-management/menu/delete-menu/:menuType
router.get("/menu/delete-menu/:menuType", authenticated, feedManagementBehavior, feedManagementController.deleteMenu);

// @desc DMIS feed management delete purchase
// @rout GET /feed-management/delete-purchase/:id
router.get("/delete-purchase/:id", authenticated, feedManagementBehavior, feedManagementController.deletePurchase);

// @desc DMIS feed management update ingradient
// @rout post /feed-management/menu/update-ingradient
router.post("/menu/update-ingradient", authenticated, feedManagementBehavior, feedManagementController.updateIngradient);

// @desc DMIS feed management add to menu
// @rout POST /feed-management/add-to-menu
router.post("/add-to-menu", authenticated, feedManagementBehavior, feedManagementController.handleAddToMenu);

// @desc DMIS feed management show total report
// @rout GET /feed-management/show-total-report/:id
router.get("/show-total-report/:id", authenticated, directorAndfeedManagementBehavior, feedManagementController.getShowTotalReport);

// @desc DMIS feed management show stock export
// @rout GET /feed-management/show-stock-export
router.get("/show-stock-export", authenticated, directorAndfeedManagementBehavior, feedManagementController.getShowStockExport);

// @desc DMIS feed management calculation report
// @rout POST /feed-management/calculation-report
router.post("/calculation-report", authenticated, directorAndfeedManagementBehavior, feedManagementController.getShowCalculationReport)

// @desc DMIS feed management calculation report stockExport
// @rout POST /feed-management/calculation-report-stockExport
router.post("/calculation-report-stockExport", authenticated, directorAndfeedManagementBehavior, feedManagementController.getShowCalculationReportStockExport)

// @desc DMIS feed management stock edit purchase
// @rout GET /feed-management/stock-edit-purchase/:id
router.get("/stock-edit-purchase/:id", authenticated, feedManagementBehavior, feedManagementController.getEditStockPurchase)

// @desc DMIS feed management edit stock purchase
// @rout POST /feed-management/edit-stock-purchase
router.post("/edit-stock-purchase", authenticated, feedManagementBehavior, feedManagementController.handleEditStockPurchase)

// router.post("/download-report-stockExport", feedManagementController.downloadReportStockExport)

// router.post("/hijri", feedManagementController.handleHijri)

// @desc DMIS office management edit user page
// @routes GET /office-management/edit-account/:id
router.get("/edit-account/:id",authenticated,feedManagementBehavior,feedManagementController.getEditAccount);

// @desc DMIS office management edit user page
// @routes GET /feed-management/edit-account/:id
router.post("/edit-account/:id",authenticated,feedManagementBehavior,feedManagementController.handleEditAccount);


module.exports = router;