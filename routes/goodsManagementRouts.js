const {
    Router
} = require("express");

const { goodsManagementBehavior, authenticated, directorAndgoodsManagementBehavior } = require("../middlewares/auth");
const goodsManagementController = require("../controllers/goods/goodsManagementcontroller");

const router = Router();

// @desc DMIS goods management page
// @rout GET /goods-managementa
router.get("/", authenticated, goodsManagementBehavior, goodsManagementController.getGoodsManagement);

// @desc DMIS goods management page
// @rout GET /goods-management
router.get("/show-bookRegister", authenticated, directorAndgoodsManagementBehavior, goodsManagementController.getShowBookRegister);

// @desc DMIS goods management list goods page
// @rout GET /goods-management/show-goods
// router.get("/show-bookRegister", authenticated, directorAndgoodsManagementBehavior, goodsManagementController.getShowBookRegister);

// @desc DMIS goods management list One BookRegister page
// @rout GET /goods-management/show-oneBookRegister
router.get("/show-oneBookRegister/:id", authenticated, directorAndgoodsManagementBehavior, goodsManagementController.getShowOneBookRegister);

// @desc DMIS goods management Edit  BookRegiste
// @rout GET /goods-management/edit-BookRegiser
router.get("/edit-bookRegister/:id", authenticated, goodsManagementBehavior, goodsManagementController.getEditBookRegister);


// @desc DMIS goods management adding new goods page
// @rout GET /goods-management/new-goods
router.get("/add-goods", authenticated, goodsManagementBehavior, goodsManagementController.getAddNewGoods);

// @desc DMIS goods management list goods page
// @rout GET /goods-management/show-goods
router.get("/show-goods", authenticated, directorAndgoodsManagementBehavior, goodsManagementController.getShowGoods);

// @desc DMIS office management edit goods page
// @rout GET /office-management/edit-goods
router.get("/edit-goods/:id", authenticated, goodsManagementBehavior, goodsManagementController.getEditGoods);


// @desc DMIS goods management list entries page
// @rout GET /goods-management/good-management/add-entries
router.get("/add-entries", authenticated, goodsManagementBehavior, goodsManagementController.getAddEntries);


// @desc DMIS goods management list entries page
// @rout GET /goods-management/show-entries
router.get("/show-entries", authenticated, directorAndgoodsManagementBehavior, goodsManagementController.getShowEntries);

// @desc DMIS goods management list One Entries page
// @rout GET /goods-management/show-oneEntries
router.get("/show-oneEntries/:id", authenticated, goodsManagementBehavior, goodsManagementController.getShowOneEntries);


// @desc DMIS office management edit entries page
// @rout GET /office-management/edit-entries
router.get("/edit-entries/:id", authenticated, goodsManagementBehavior, goodsManagementController.getEditEntries);


// @desc DMIS goods management list exits page
// @rout GET /goods-management/good-management/add-exits
router.get("/add-exits", authenticated, goodsManagementBehavior, goodsManagementController.getAddExits);

// @desc DMIS goods management list One Exits page
// @rout GET /goods-management/show-oneExits
router.get("/show-oneExits/:id", authenticated, goodsManagementBehavior, goodsManagementController.getShowOneExits);

// @desc DMIS goods management list exits page
// @rout GET /goods-management/show-exits
router.get("/show-exits", authenticated, directorAndgoodsManagementBehavior, goodsManagementController.getShowExits);


// @desc DMIS office management edit entries page
// @rout GET /office-management/edit-entries
router.get("/edit-exits/:id", authenticated, goodsManagementBehavior, goodsManagementController.getEditExits);


// @desc DMIS goods management list entryDocument page
// @rout GET /goods-management/good-management/add-entryDocument
router.get("/add-entryDocument", authenticated, goodsManagementBehavior, goodsManagementController.getAddEntryDocument);

// @desc DMIS goods management list entryDocument page
// @rout GET /goods-management/good-management/add-entryDocument
router.get("/show-oneEntryDocument/:id", authenticated, goodsManagementBehavior, goodsManagementController.getShowOneEntryDocument);


// @desc DMIS goods management list show entryDocument page
// @rout GET / goods-management/ good-management/show-entryDoucment
router.get("/show-entryDocument", authenticated, directorAndgoodsManagementBehavior, goodsManagementController.getShowEntryDocument);

// @desc DMIS goods management list show entryDocument page
// @rout GET / goods-management/ good-management/edit-entryDocument
router.get("/edit-entryDocument/:id", authenticated, goodsManagementBehavior, goodsManagementController.getEditEntryDocument);


// @desc DMIS goods management list entryDocument page
// @rout GET / goods-management/ good-management/add-entryDoucment
router.get("/add-exportDocument", authenticated, goodsManagementBehavior, goodsManagementController.getAddNewExportDoucment);


// @desc DMIS goods management list show exportDocument page
// @rout GET / goods-management/ good-management/show-exportDoucment
router.get("/show-exportDocument", authenticated, directorAndgoodsManagementBehavior, goodsManagementController.getShowExportDoucment);

// @desc DMIS goods management list show one exportDocument page
// @rout GET / goods-management/ good-management/show-oneExportDoucment
router.get("/show-oneExportDocument/:id", authenticated, goodsManagementBehavior, goodsManagementController.getShowOneExportDoucment);


// @desc DMIS goods management list show exportDocument page
// @rout GET / goods-management/ good-management/edit-exportDocument
router.get("/edit-exportDocument/:id", authenticated, goodsManagementBehavior, goodsManagementController.getEditExportDocument);

// @desc DMIS goods management list add Staff page
// @rout GET / goods-management/ good-management/add-staff
router.get("/add-staff", authenticated, goodsManagementBehavior, goodsManagementController.getAddStaff);

// @desc DMIS goods management list show Staff page
// @rout GET / goods-management/ good-management/show-staffs
router.get("/show-staffs", authenticated, directorAndgoodsManagementBehavior, goodsManagementController.getShowStaffs);

// @desc DMIS goods management list edit Staff page
// @rout GET / goods-management/ good-management/edit-staffs
router.get("/edit-staff/:id", authenticated, goodsManagementBehavior, goodsManagementController.getEditStaff);


// @desc DMIS goods management list add studnetKit page
// @rout GET / goods-management/ good-management/add-studentKit
router.get("/add-studentKit", authenticated, goodsManagementBehavior, goodsManagementController.getAddStudentKit);


// @desc DMIS goods management list studentkit page
// @rout GET /goods-management/show-studentKit
router.get("/show-studentKits", authenticated, directorAndgoodsManagementBehavior, goodsManagementController.getShowStudentKit);

// @desc DMIS goods management list show-studentKit page
// @rout GET /goods-management/show-studentKit
router.get("/show-oneStudentKit/:id", authenticated, directorAndgoodsManagementBehavior, goodsManagementController.getShowOneStudentKit);

// @desc DMIS goods management list edit-oneStudentKit page
// @rout GET /goods-management/edit-oneStudentKit
router.get("/edit-oneStudentKit/:id", authenticated, goodsManagementBehavior, goodsManagementController.getEditOneStudentKit);


// @desc DMIS goods management list add staffKit page
// @rout GET / goods-management/ good-management/add-staffKit
router.get("/add-kitStaff", authenticated, goodsManagementBehavior, goodsManagementController.getAddStaffKit);


// @desc DMIS goods management show staffKits
// @rout POST /goods-magagement/show-staffKits
router.get("/show-staffKits", authenticated, directorAndgoodsManagementBehavior, goodsManagementController.getShowStaffKits);

// @desc DMIS goods management show OnsStaffKits
// @rout POST /goods-magagement/show-oneStaffKits
router.get("/show-oneStaffKit/:id", authenticated, directorAndgoodsManagementBehavior, goodsManagementController.getShowOneStaffKits);

// @desc DMIS goods management Edit OnsStaffKits
// @rout POST /goods-magagement/edit-oneStaffKits
router.get("/edit-oneStaffKit/:id", authenticated, goodsManagementBehavior, goodsManagementController.getEditOneStaffKit);



// @desc DMIS goods management adding RagisterBook
// @rout POSTrch-id /goods-magagement/regiserBook
router.post("/search-id", goodsManagementController.handelSearchId);

// @desc DMIS goods management ajax staffKit search
// @rout POST /goods-magagement/add-staffKit 
router.post("/search-id1", goodsManagementController.handelSearchId1);

// @desc DMIS goods management adding RagisterBook
// @rout POST /goods-magagement/regiserBook
router.post("/show-bookRegister", authenticated, goodsManagementBehavior, goodsManagementController.handleAddBookRegister);

// @desc DMIS goods management edit RagisterBook
// @rout POST /goods-magagement/edit-regiserBook
router.post("/edit-bookRegister/:id", authenticated, goodsManagementBehavior, goodsManagementController.handleEditBookRegister);


// @desc DMIS goods management adding new goods
// @rout POST /goods-magagement/new-goods
router.post("/add-goods", authenticated, goodsManagementBehavior, goodsManagementController.handleAddNewGoods);


// @desc DMIS goods management edit goods page
// @rout GET /goods-management/edit-goods
router.post("/edit-goods/:id", authenticated, goodsManagementBehavior, goodsManagementController.handleEditGoods);


// @desc DMIS goods management adding entries
// @rout POST /goods-magagement/new-entries
router.post("/add-entries", authenticated, goodsManagementBehavior, goodsManagementController.handleAddEntries);


// @desc DMIS goods management edit entries page
// @rout GET /goods-management/edit-entries
router.post("/edit-entries/:id", authenticated, goodsManagementBehavior, goodsManagementController.handleEditEntries);


// @desc DMIS goods management adding exits
// @rout POST /goods-magagement/new-exits
router.post("/add-eixts", authenticated, goodsManagementBehavior, goodsManagementController.handleAddExits);

// @desc DMIS goods management edit exits page
// @rout GET /goods-management/edit-exits
router.post("/edit-exits/:id", authenticated, goodsManagementBehavior, goodsManagementController.handleEditExits);


// @desc DMIS goods management adding entryDocument
// @rout POST /goods-magagement/add entryDocument
router.post("/add-entryDocument", authenticated, goodsManagementBehavior, goodsManagementController.handleAddEntryDocument);

// @desc DMIS goods management Editing exportDocument
// @rout POST /goods-magagement/edit exportDocument
router.post("/edit-entryDocument/:id", authenticated, goodsManagementBehavior, goodsManagementController.handleEditEntryDocument);

// @desc DMIS goods management adding exportDocument
// @rout POST /goods-magagement/add exportDocument
router.post("/add-exportDocument", authenticated, goodsManagementBehavior, goodsManagementController.handleAddExportDocument);

// @desc DMIS goods management Editing exportDocument
// @rout POST /goods-magagement/edit exportDocument
router.post("/edit-exportDocument/:id", authenticated, goodsManagementBehavior, goodsManagementController.handleEditExportDocument);

// @desc DMIS goods management adding studentKit
// @rout POST /goods-magagement/add studentKit
router.post("/add-studentKit", authenticated, goodsManagementBehavior, goodsManagementController.handleAddNewStudentKit);

// @desc DMIS goods management show-oneStaffKit
// @rout POST /goods-magagement/show-oneStaffKit/:id
router.post("/show-oneStudentKit/:id", authenticated, directorAndgoodsManagementBehavior, goodsManagementController.handleEditOneStudentKit);


// @desc DMIS goods management adding staff
// @rout POST /goods-magagement/add staff
router.post("/add-staff", authenticated, goodsManagementBehavior, goodsManagementController.handleAddStaff);

// @desc DMIS goods management edit staff page
// @rout GET /goods-management/edit-staff
router.post("/edit-staff/:id", authenticated, goodsManagementBehavior, goodsManagementController.handleEditStaff);

// @desc DMIS goods management adding staffKit
// @rout POST /goods-magagement/add staffKit
router.post("/add-staffKit", authenticated, goodsManagementBehavior, goodsManagementController.handleAddNewStaffKit);

// @desc DMIS goods management edit One Staff Kit page
// @rout GET /goods-management/edit-oneStaffKit
router.post("/edit-oneStaffKit/:id", authenticated, goodsManagementBehavior, goodsManagementController.handleEditOneStaffKit);


// @desc DMIS goods management handle deleting goods
// @rout get /goods-management/delete-goods/:id
router.get("/delete-good/:id", authenticated, goodsManagementBehavior, goodsManagementController.handleDeleteGoods);

// @desc DMIS goods management handle deleting entries
// @rout get /goods-management/delete-entries/:id
router.get("/delete-entries/:id", authenticated, goodsManagementBehavior, goodsManagementController.handleDeleteEntries);

// @desc DMIS goods management handle deleting exits
// @rout get /goods-management/delete-exits/:id
router.get("/delete-exits/:id", authenticated, goodsManagementBehavior, goodsManagementController.handleDeleteExits);

// @desc DMIS goods management handle deleting entryDocumet
// @rout get /goods-management/delete-entryDocument/:id
router.get("/delete-entryDocument/:id", authenticated, goodsManagementBehavior, goodsManagementController.handleDeleteEntryDocument);


// @desc DMIS goods management handle deleting exportDocumet
// @rout get /goods-management/delete-exportDocument/:id
router.get("/delete-exportDocument/:id", authenticated, goodsManagementBehavior, goodsManagementController.handleDeleteExportDocument);



// @desc DMIS goods management handle deleting staff
// @rout get /goods-management/delete-staff/:id
router.get("/delete-staff/:id", authenticated, goodsManagementBehavior, goodsManagementController.handleDeleteStaff);

// @desc DMIS goods management handle deleting One Staff Kit
// @rout get /goods-management/delete-oneStaffKit/:id
router.get("/delete-oneStaffKit/:id", authenticated, goodsManagementBehavior, goodsManagementController.handleDeleteOneStaffKit);

// @desc DMIS goods management handle reseting One Staff Kit
// @rout get /goods-management/reset-oneStaffKit/:id
router.get("/reset-oneStaffKit/:id", authenticated, goodsManagementBehavior, goodsManagementController.handleResetOneStaffKit);


// @desc DMIS goods management handle deleting One Student Kit
// @rout get /goods-management/delete-oneStudentKit/:id
router.get("/delete-oneStudentKit/:id", authenticated, goodsManagementBehavior, goodsManagementController.handleDeleteOneStudentKit);

// @desc DMIS goods management handle reseting One Student Kit
// @rout get /goods-management/reset-oneStudentKit/:id

router.get("/reset-oneStudentKit/:id", authenticated, goodsManagementBehavior, goodsManagementController.handleResetOneStudentKit);




// @desc DMIS office management edit user page
// @routes GET /office-management/edit-account/:id
router.get("/edit-account/:id",authenticated,goodsManagementBehavior,goodsManagementController.getEditAccount);

// @desc DMIS office management edit user page
// @routes GET /office-management/edit-account/:id
router.post("/edit-account/:id",authenticated,goodsManagementBehavior,goodsManagementController.handleEditAccount);


module.exports = router;