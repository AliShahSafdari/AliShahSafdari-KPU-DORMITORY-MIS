const { Router } = require("express")

const officeManagementController = require("../controllers/office/officeManagementController")

const { authenticated, officeManagementBehavior } = require("../middlewares/auth");


const router = Router();

// @desc DMIS office management page
// @rout GET /office-management
router.get("/", authenticated, officeManagementController.getOfficeManagement);

// @desc DMIS office management adding new student page
// @rout GET /office-management/add-new-stundent
router.get("/add-new-student", authenticated, officeManagementBehavior, officeManagementController.getAddNewStudent);

// @desc DMIS office management list student page
// @rout GET /office-management/show-students
router.get("/show-students", authenticated, officeManagementController.getShowStudents);

// @desc DMIS office management list existance student page
// @rout GET /office-management/show-exist-students
router.get("/show-exist-students", authenticated, officeManagementController.getShowExistStudents);

// @desc DMIS office management list hanging student page
// @rout GET /office-management/show-hanging-students
router.get("/show-hanging-students", authenticated, officeManagementController.getShowHangingStudents);

// @desc DMIS office management list graduated student page
// @rout GET /office-management/show-graduated-students
router.get("/show-graduated-students", authenticated, officeManagementController.getShowGraduatedStudents);

// @desc DMIS office management list suspension student page
// @rout GET /office-management/show-suspension-students
router.get("/show-suspension-students", authenticated, officeManagementController.getShowSuspensionStudents);


// @desc DMIS office management edit student page 
// @rout GET /office-management/edit-student/
router.get("/edit-student/:id", authenticated, officeManagementBehavior, officeManagementController.getEditStudent);


// @desc DMIS office management list of students in rooms page
// @rout GET /office-management/show-rooms
router.get("/show-rooms", authenticated, officeManagementController.getShowRoom);

// @desc DMIS office management list of students in rooms page
// @rout GET /office-management/show-students-in-rooms
router.post("/show-students-in-rooms", authenticated, officeManagementController.getShowStudentsInRoom);

// @desc DMIS office management registering new book
// @rout GET /office-management/book-registeration
router.get("/add-room", authenticated, officeManagementBehavior, officeManagementController.getAddRoom);

// @desc DMIS office management registering new book
// @rout GET /office-management/book-registeration
router.get("/room-arangement", authenticated, officeManagementController.getRoomArrange);

// @desc DMIS office management adding new room page
// @rout GET /office-management/add-room
router.get("/book-register", authenticated, officeManagementBehavior, officeManagementController.getBookRegisteration);

// @desc render student edit page
// @routes GET /office-management/show-books
router.get("/show-books", authenticated, officeManagementController.getShowBooks);

// @desc DMIS office management edit user page
// @routes GET /office-management/edit-account/:id
router.get("/edit-account/:id",authenticated,officeManagementBehavior,officeManagementController.getEditAccount);

// @desc DMIS office management edit user page
// @routes GET /office-management/edit-account/:id
router.post("/edit-account/:id",authenticated,officeManagementBehavior,officeManagementController.handleEditAccount);

// @desc DMIS office management handle adding new student 
// @rout POST /office-management/add-new-stundent
router.post("/add-new-student", authenticated, officeManagementBehavior, officeManagementController.handleAddNewStudent);

// @desc DMIS office management handle adding new student 
// @rout POST /office-management/add-new-stundent
router.post("/add-new-student1", authenticated, officeManagementBehavior, officeManagementController.handleAddNewStudent1);

// @desc DMIS office management handle adding new room
// @rout POST /office-management/add-room
router.post("/add-room", authenticated, officeManagementBehavior, officeManagementController.handleRoomRegistration);

// @desc DMIS office management handle adding student in new room
// @rout POST /office-management/room-arrangement
router.post("/room-arangement", authenticated, officeManagementBehavior, officeManagementController.handleRoomArangement);

// @desc DMIS office management handle adding new room
// @rout POST /office-management/add-room
router.post("/book-register", authenticated, officeManagementBehavior, officeManagementController.handleBookRegisteration);

// @desc DMIS office management handle searching tazkiraNum or studentid by ajax
// @rout POST /office-management/search-id
router.post("/search-id", authenticated, officeManagementBehavior, officeManagementController.handelSearchId);

// @desc DMIS office management handle editting student
// @rout POST /office-management/edit-stundents/:id
router.post("/edit-student/:id", authenticated, officeManagementBehavior, officeManagementController.handleEditStudent);

// @desc DMIS office management handle deleting student
// @rout get /office-management/delete-stundents/:id
router.get("/delete-student/:id", authenticated, officeManagementBehavior, officeManagementController.handleDeleteStudent);

// @desc DMIS office management handle deleting student from rooms
// @rout get office-management/delete-students-from-room/:id
router.get("/delete-students-from-room/:id", authenticated, officeManagementBehavior, officeManagementController.getDeleteStudentFromRoom)


module.exports = router;