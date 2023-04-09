const { Router } = require("express");

const { authenticated, notAuthenticated, directorBehavior } = require('../middlewares/auth');

const indexController = require("../controllers/index/indexController");

const router = Router();

// @desc DMIS index page
// @rout GET /
router.get("/", authenticated, indexController.getIndex);

// @desc DMIS login page
// @rout GET /login
router.get("/login", notAuthenticated, indexController.getLogin);

// @desc DMIS handle logout
// @route GET /logout
router.get("/logout", authenticated, indexController.handleLogout);

// @desc DMIS create new user
// @rout GET /admin/create-new-user
router.get("/admin/create-new-user", authenticated, directorBehavior, indexController.getAddNewUser);

// @desc DMIS create new user
// @rout GET /admin/create-new-user
router.get("/admin/edit-user/:id", authenticated, directorBehavior, indexController.getEditUser);

router.post("/admin/edit-user/:id", authenticated, directorBehavior, indexController.handleEditUser);

// @desc DMIS forgot password page
// @rout GET /admin/forgot-password
router.get("/forgot-password", notAuthenticated , indexController.getForgotPassword);

// @desc show forgot password page by security key
// @routes post /password-key
router.post("/password-key", indexController.getForgotPasswordByKey);

// @desc handle forgot password by security key
// @routes post /find-password-by-key
router.post("/find-password-by-key", indexController.handleForgotPasswordByKey);

// @desc handle forgot password by security key
// @routes get /find-password-by/email/:email
router.post("/ressetPassword/:id", indexController.handleRessetPassword);

// @desc DMIS handle login
// @route POST /login
router.post("/login", notAuthenticated, indexController.handleLogin, indexController.rememberMe);


// @desc DMIS handle create new user
// @rout Post /admin/create-new-user
router.post("/admin/create-new-user", authenticated, directorBehavior, indexController.createUser);

router.get("/admin/take-backup", authenticated, directorBehavior, indexController.backup);

router.post("/admin/restore-db", authenticated, directorBehavior, indexController.RestoreDB);

// @desc DMIS forgot password by email
// @rout POST /resset-password-by-email
router.post("/resset-password-by-email",indexController.handleRessetPasswordByEmail);

router.get("/reset-password-by-email-token/:token",indexController.handleTokenPassword)

module.exports = router;