//* MODEL REQUIRS
const students = require("../../models/officeManagementModels/students");
const room = require("../../models/officeManagementModels/room");
const book = require("../../models/officeManagementModels/book");
const students_room = require('../../models/officeManagementModels/students_room');

//* EXTERNAL REQUIRS AND MODULES
const fs = require('fs');
const appRoot = require('app-root-path');
const shortId = require('shortid');
const sharp = require('sharp');
const { search } = require("../../routes/officeManagementRouts");
const User = require("../../models/user");
const bcrypt = require('bcryptjs');



//* CONTROLLERS
// @desc render office management page
// @routes GET /office-management
exports.getOfficeManagement = async (req, res) => {
    res.render("officeManagement/office-management", {
        pageTittle: "مدیریت اداری",
        path: "/office-management",
        position: req.user.position,
        
    })
}

// @desc render student registration page
// @routes GET /office-management/add-new-student
exports.getAddNewStudent = async (req, res) => {
    const books= await book.find({});
    res.render("officeManagement/add-new-student", {
        pageTittle: "اضافه نمودن شاگرد جدید",
        path: "/office-management/add-new-student",
        errors: [],
        books,
        position: req.user.position,
        
    })
}

// @desc render student edit page
// @routes GET /office-management/edit-student/:id
exports.getEditStudent = async (req, res) => {
    try {
        const student = await students.findOne({ _id: req.params.id }).populate('book_fk');
        const books= await book.find({});
        if (student) {
            return res.render("officeManagement/edit-students", {
                pageTittle: "ویرایش نمودن شاگرد",
                secondLayout: "ok",
                path: "/office-management/edit-student/:id",
                errors: [],
                books,
                table: "ok",
                student,
                position: req.user.position,
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

// @desc render student edit page
// @routes GET /office-management/show-books
exports.getShowBooks = async (req, res) => {
    const books = await book.find({});
    res.render("officeManagement/show-books", {
        pageTittle: "نمایش کتاب ها",
        path: "/office-management/show-books",
        table: "ok",
        books,
        position: req.user.position,
    })
}

// @desc render list of students page
// @routes GET /office-management/show-students
exports.getShowStudents = async (req, res) => {
    const books= await book.find({});
    const records = await students.find().sort({ 'date': -1 })
    res.render("officeManagement/show-students", {
        pageTittle: "نمایش تمامی محصلین",
        path: "/office-management/show-students",
        table: "ok",
        records,
        books,
        position: req.user.position,
        errors:[],
    })
}

// @desc render list of existance students page
// @routes GET /office-management/show-exist-students
exports.getShowExistStudents = async (req, res) => {
    const books= await book.find({});
    const records = await students.find({ kawayef:"exist"}).sort({ 'date': -1 })
    res.render("officeManagement/show-students2", {
        pageTittle: "نمایش محصلین موجود در لیلیه",
        path: "/office-management/show-exist-students",
        table: "ok",
        records,
        books,
        position: req.user.position,
    })
}

// @desc render list of existance students page
// @routes GET /office-management/show-hanging-students
exports.getShowHangingStudents = async (req, res) => {
    const books= await book.find({});
    const records = await students.find({ kawayef : "hanging" });
    console.log(records);
    res.render("officeManagement/show-students2", {
        pageTittle: "نمایش محصلین تعجیل گرفته",
        path: "/office-management/show-hanging-students",
        table: "ok",
        records,
        books,
        position: req.user.position,
    })
}

// @desc render list of suspension students page
// @routes GET /office-management/show-suspension-students
exports.getShowSuspensionStudents = async (req, res) => {
    const books= await book.find({});
    const records = await students.find({ kawayef: "suspension" }).sort({ 'date': -1 })
    res.render("officeManagement/show-students2", {
        pageTittle: "نمایش محصلین اخراج شده از لیلیه",
        path: "/office-management/show-suspension-students",
        table: "ok",
        records,
        books,
        position: req.user.position,
    })
}

// @desc render list of suspension graduated page
// @routes GET /office-management/show-graduated-students
exports.getShowGraduatedStudents = async (req, res) => {
    const books= await book.find({});
    const records = await students.find({ kawayef: "graduated" }).sort({ 'date': -1 })
    res.render("officeManagement/show-students2", {
        pageTittle: "نمایش محصلین فارغ شده",
        path: "/office-management/show-graduated-students",
        table: "ok",
        records,
        books,
        position: req.user.position,
    })
}

// @desc render add room registration page
// @routes GET /office-management/add-room
exports.getAddRoom = (req, res) => {
    res.render("officeManagement/room-registration", {
        pageTittle: "اضافه کردن اتاق جدید",
        path: "/office-management/add-room",
        errors: [],
        position: req.user.position,
    })
}

// @desc render add room registration page
// @routes GET /office-management/show-rooms
exports.getShowRoom = async (req, res) => {
    try {
        const roomNums = await room.distinct("roomNum");
        const floorNums = await room.distinct("floorNum")
        const blockNums = await room.distinct("blockNum")
        const years = await students_room.distinct("date")

        res.render("officeManagement/show-rooms", {
            pageTittle: "نمایش محصلین در اتاق ها",
            path: "/office-management/show-rooms",
            errors: [],
            position: req.user.position,
            roomNums,
            floorNums,
            blockNums,
            years,   
        })
    } catch (err) {
        console.log(err);
    }
}

// @desc render add room registration page
// @routes GET /office-management/show-students-in-room
exports.getShowStudentsInRoom = async (req, res) => {
    try {
        // console.log(req.body);
        const { roomNum, floorNum, blockNum, year } = req.body;
        const roomfk = await room.findOne({ $and: [{ roomNum: roomNum }, { floorNum: floorNum }, { blockNum, blockNum }] })
        console.log(roomfk);
        const record = await students_room.find({ $and: [{ room_fk: roomfk }, { date: year }] }).
            populate('student_fk').
            populate('room_fk').
            sort({ date: -1 });
        console.log(record);
        return res.render("officeManagement/show-students-in-rooms", {
            pageTittle: "نمایش محصلین در اتاق ها",
            secondLayout: "ok",
            path: "/office-management/show-students-in-rooms",
            errors: [],
            position: req.user.position,
            record,
        })
    } catch (err) {
        console.log(err);
    }
}

// @desc render add room registration page
// @routes GET /office-management/add-room
exports.getRoomArrange = (req, res) => {
    res.render("officeManagement/room-arangement", {
        pageTittle: "راجستر کردن شاگرد در اتاق جدید",
        path: "/office-management/room-arangement",
        errors: [],
        position: req.user.position,
    })
}

// @desc render book registration page
// @routes GET /office-management/book-register
exports.getBookRegisteration = (req, res) => {
    res.render("officeManagement/book-registeration", {
        pageTittle: "راجستر اتاق",
        path: "/office-management/book-register",
        errors: [],
        position: req.user.position,
    })
}

// @desc DMIS office management edit user page
// @routes GET /office-management/edit-account/:id
exports.getEditAccount =async (req,res)=>{
    const selectUser = await User.findOne({ _id: req.params.id });
    if(selectUser.position!=="مدیر اداری"){
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
// @routes GET /office-management/edit-account/:id
exports.handleEditAccount =async (req,res)=>{
    errors=[];
    let selectUser=[];
    try{
    selectUser = await User.findOne({ _id: req.params.id });
    const { fullname, email, password,confirmPassword, position} = req.body;
    if(selectUser && selectUser.position!=="مدیر اداری"){
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
    return res.redirect("/office-management/show-students");
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
  

// @desc register new student
// @routes POST /office-management/add-new-student
exports.handleAddNewStudent = async (req, res) => {
    const errors = [];
    //?---------uploading photo-----------------------------------------
    let photo = req.files ? req.files.photo : {};
    const photoName = `${shortId.generate()}_${photo.name}`;
    const UploadPath = `${appRoot}/public/img/student_imgs/${photoName}`;
    //?--------End uploading photo-----------------------------------------


    const books= await book.find({});
    const records = await students.find({ status: "graduated" }).sort({ 'date': -1 })
    try {
        req.body = { ...req.body, photo };
        await students.studentValidation(req.body);
        //?---------Decrease the size of photo-----------------------------------------
        await sharp(photo.data).jpeg({ quality: 50 }).toFile(UploadPath).catch((err) => {
            console.log(err);
        })
        console.log("2");
        //?---------End Decrease the size of photo-----------------------------------------
        let { studentId, name, fName, gFName, classroom, faculty, department, province, destrict, tazkiraNum, phonNum, kawayef, date, bookName} = req.body;
        studentId = studentId.toLowerCase();
        const query = await book.findOne({ _id:bookName});
        // const room_fk = query._id;
        const student = await students.findOne({ studentId });
        if (student || !books ) {
            if (student) {
                errors.push({ name: "studentId", message: "محصلی با این آیدی تحصیلی موجود است" });
            }
            if (!query) {
                errors.push({ name: "bookName", message: "کتابی با این مشخصات موجود نیست" });
            }
            
            req.flash("error_msg","خطا هنگام ثبت محصل وجود داشت")
            
            return res.render("officeManagement/add-new-student", {
                pageTittle: "نمایش محصلین فارغ شده",
                path: "/office-management/show-graduated-students",
                table: "ok",
                records,
                position: req.user.position,
                books,
                errors,  
            })
        }
        photo = photoName;
        const book_fk = query._id;
        await students.create({ studentId, name, fName, gFName, classroom, faculty, department, province, destrict, tazkiraNum, phonNum, kawayef, photo, book_fk, date });
        req.flash("success_msg", "شما موفقانه " + name + " ثبت نام نمودید");
        res.redirect("back")

    } catch (err) {
        console.log(err);
        err.inner.forEach((err) => {
            errors.push({
                name: err.path,
                message: err.message,
            });
        });
    }

    req.flash("error_msg","خطا هنگام ثبت محصل وجود داشت");
    return res.render("officeManagement/add-new-student", {
        pageTittle: "نمایش محصلین فارغ شده",
        path: "/office-management/show-graduated-students",
        table: "ok",
        records,
        position: req.user.position,
        errors,
        books,
    })
}




// @desc register new student
// @routes POST /office-management/add-new-student
exports.handleAddNewStudent1 = async (req, res) => {
    const errors = [];
    //?---------uploading photo-----------------------------------------
    let photo = req.files ? req.files.photo : {};
    const photoName = `${shortId.generate()}_${photo.name}`;
    const UploadPath = `${appRoot}/public/img/student_imgs/${photoName}`;
    //?--------End uploading photo-----------------------------------------

    const books= await book.find({});

    const records = await students.find({ status: "graduated" }).sort({ 'date': -1 })
    try {
        req.body = { ...req.body, photo };
        await students.studentValidation(req.body);
        //?---------Decrease the size of photo-----------------------------------------
        await sharp(photo.data).jpeg({ quality: 50 }).toFile(UploadPath).catch((err) => {
            console.log(err);
        })
        console.log("2");
        //?---------End Decrease the size of photo-----------------------------------------
        let { studentId, name, fName, gFName, classroom, faculty, department, province, destrict, tazkiraNum, phonNum, kawayef, date, bookName } = req.body;
        studentId = studentId.toLowerCase();
        const query = await book.findOne({ _id:bookName});
        // const room_fk = query._id;
        const student = await students.findOne({ studentId });
        if (student || !books ) {
            if (student) {
                errors.push({ name: "repeat", message: "محصلی با این آیدی تحصیلی موجود است" });
            }
            if (!query) {
                errors.push({ name: "notExist", message: "کتابی با این مشخصات موجود نیست" });
            }
            
            req.flash("error_msg","خطا هنگام ثبت محصل وجود داشت")
            
            return res.render("officeManagement/show-students", {
                pageTittle: "نمایش محصلین فارغ شده",
                path: "/office-management/show-graduated-students",
                table: "ok",
                records,
                position: req.user.position,
                
                errors,
                books
            })
        }
        photo = photoName;
        const book_fk = query._id;
        await students.create({ studentId, name, fName, gFName, classroom, faculty, department, province, destrict, tazkiraNum, phonNum, kawayef, photo, book_fk, date });
        req.flash("success_msg", "شما موفقانه " + name + " ثبت نام نمودید");
        res.redirect("back")

    } catch (err) {
        console.log(err);
        err.inner.forEach((err) => {
            errors.push({
                name: err.path,
                message: err.message,
            });
        });
    }

    req.flash("error_msg","خطا هنگام ثبت محصل وجود داشت");
    return res.render("officeManagement/show-students", {
        pageTittle: "نمایش محصلین فارغ شده",
        path: "/office-management/show-graduated-students",
        table: "ok",
        records,
        position: req.user.position,
        errors,
        books
    })
}

// @desc registration new room
// @routes POST /office-management/add-room
exports.handleRoomRegistration = async (req, res) => {
    const errors = [];
    try {
        await room.roomValidation(req.body);
        const { roomNum, floorNum, blockNum } = req.body;
        const query = await room.findOne({ $and: [{ roomNum: roomNum }, { floorNum: floorNum }, { blockNum: blockNum }] });
        console.log(query);
        if (query !== null) {
            errors.push({ name: "repeat", message: "این اتاق قبلا درج دیتابس گردیده است" });
            return res.render("officeManagement/room-registration", {
                pageTittle: "صحفه ثبت اتاق",
                path: "/office-management/add-room",
                errors: errors,
                position: req.user.position,
            });
        }

        await room.create(req.body);
        req.flash("success_msg", "شما موفقانه اتاق شماره " + roomNum + " بلاک نمبر " + blockNum + " منزل " + floorNum + " را راجستر نمودید");
        return res.redirect("/office-management");
    } catch (err) {
        err.inner.forEach((err) => {
            errors.push({
                name: err.path,
                message: err.message,
            });
        });
    }
    return res.render("officeManagement/room-registration", {
        pageTittle: "صحفه ثبت اتاق",
        path: "/office-management/add-room",
        errors: errors,
        position: req.user.position,
    });
}

// @desc arangemant room
// @routes POST /office-management/room-arangement
exports.handleRoomArangement = async (req, res) => {
    const errors = [];
    try {
        await room.roomValidation(req.body);

        let { roomNum, floorNum, blockNum, search, date } = req.body;

        date = date.split("-");

        let y = date[0];

        search = search.toLowerCase();

        const query = await room.findOne({ $and: [{ roomNum: roomNum }, { floorNum: floorNum }, { blockNum: blockNum }] });

        const student = await students.findOne({ $or: [{ studentId: search }, { tazkiraNum: search }] });

        const flag = await students_room.findOne({ $and: [{ student_fk: student._id }, { date: y }] })
        // const flag = await students_room.findOne({ $and: [{ student_fk: student._id }, { room_fk: query._id }, { date: y }] })


        if (query === null || student === null || flag) {
            if (query === null) {
                errors.push({ name: "empty", message: "این اتاق در دیتابس موجود نیست" });
            }

            if (student === null) {
                errors.push({ name: "empty_stu", message: "این آیدی ویا نمبرتذکره در دیتابس موجود نیست" });
            }

            if (flag) {
                errors.push({ name: "exist", message: `${student.name} قبلا اتاق اخذ نموده است` });
            }

            return res.render("officeManagement/room-arangement", {
                pageTittle: "صحفه اتاق بندی محصلین",
                path: "/office-management/room-arangement",
                errors: errors,
                position: req.user.position,
                
            });
        }

        await students_room.create({ student_fk: student._id, room_fk: query._id, date: y });

        req.flash("success_msg", `شما موفقانه ${student.name} را در اتاق ${roomNum} منزل ${floorNum} بلاک ${blockNum} ثبت نمودید!`);
        return res.redirect("/office-management/room-arangement");
    } catch (err) {
        err.inner.forEach((err) => {
            errors.push({
                name: err.path,
                message: err.message,
            });
        });
    }
    return res.render("officeManagement/room-arangement", {
        pageTittle: "صحفه اتاق بندی محصلین",
        path: "/office-management/room-arangement",
        errors: errors,
        position: req.user.position,
        
    });
}

// @desc DMIS office management handle searching tazkiraNum or studentid by ajax
// @rout POST /office-management/search-id
exports.handelSearchId = async (req, res) => {
    try {
        const { searchId } = req.body;
        const student = await students.findOne({ $or: [{ studentId: searchId }, { tazkiraNum: searchId }] })
        if (student !== null) {
            console.log(student);
            return res.send(student.name)
        }
        res.send("هیچ محصلی با این نام پیدا نشد");
    } catch (err) {
        console.log(err);
    }
}

// @desc register new book record
// @routes POST /office-management/book-register
exports.handleBookRegisteration = async (req, res) => {
    const errors = [];
    try {
        await book.bookValidation(req.body);
        const { bookName, skinNum, floorNum, blockNum, year } = req.body;
        const query = await book.findOne({ $and: [{ bookName: bookName }, { skinNum: skinNum }, { floorNum: floorNum }, { blockNum: blockNum }, { year: year }] });

        if (query !== null) {
            errors.push({ name: "repeat", message: "مشخصات که شما وارید نموده اید قبلا در دیتابیس ثبت گردیده است" });
            return res.render("officeManagement/book-registeration", {
                pageTittle: "راجستر اتاق",
                path: "/office-management/book-register",
                errors,
                position: req.user.position,
            });
        }
        await book.create({ bookName, skinNum, floorNum, blockNum, year });
        req.flash("success_msg", " شما موفقانه " + bookName + " را ذخیره نمودید");
        return res.redirect("/office-management/book-register");
    } catch (err) {
        err.inner.forEach((error) => {
            errors.push({
                name: error.path,
                message: error.message,
            });
        });
    }
    return res.render("officeManagement/book-registeration", {
        pageTittle: "راجستر اتاق",
        path: "/office-management/book-register",
        errors,
        position: req.user.position,
    });
}

// @desc DMIS office management handle editting student
// @rout POST /office-management/edit-students/:id
exports.handleEditStudent = async (req, res) => {
    const errors = [];
    const student = await students.findOne({ _id: req.params.id });
    const photo = req.files ? req.files.photo : {};
    const photoName = `${shortId.generate()}_${photo.name}`;
    const UploadPath = `${appRoot}/public/img/student_imgs/${photoName}`;
    const books= await book.find({});

    const { name, fName, gFName, classroom, faculty, department, province, destrict, tazkiraNum, phonNum, kawayef, bookName } = req.body;
    try {
        const query = await book.findOne({ _id:bookName});
        if (!student) {
            return res.redirect("/404")
        }
        if (!query) {
            if (!query) {
                errors.push({ name: "notExist", message: "کتابی با این مشخصات موجود نیست" });
            }
            return res.render("officeManagement/edit-students", {
                pageTittle: "صحفه ثبت نام محصل",
                path: "/office-management/edit-students",
                errors,
                books,
                position: req.user.position,
                student
            })
        }

        if (photo.name) {
            await students.studentValidation({ ...req.body, photo });
        }
        else await students.studentValidation({ ...req.body, photo });
        if (Object.keys(photo).length !== 0) {
            fs.unlink(`${appRoot}/public/img/student_imgs/${student.photo}`, async (err) => {
                if (err) { 
                    console.log(err); 
                } 
                    await sharp(photo.data).jpeg({ quality: 50 }).toFile(UploadPath).catch((err) => {
                        console.log(err);
                    })
                
            })
            // await sharp(photo.data).jpeg({ quality: 50 }).toFile(UploadPath).catch((err) => {
            //     console.log(err);
            // })
        }
        if(photo) student.photo=photoName;
        student.book_fk = query._id;
        student.name = name;
        student.fName = fName;
        student.gFName = gFName;
        student.classroom = classroom;
        student.faculty = faculty;
        student.department = department;
        student.province = province;
        student.destrict = destrict;
        student.tazkiraNum = tazkiraNum;
        student.phonNum = phonNum;
        student.kawayef = kawayef;
        //  student.photo === photo ? photoName : student.photo;
        student.save();
        req.flash("success_msg", " شما موفقانه " + student.name + " را ویرایش نمودید");
        return res.redirect("/office-management/show-students")
    } catch (err) {
        err.inner.forEach((err) => {
            errors.push({
                name: err.path,
                message: err.message,
            });
        });
    }
    console.log(errors);
    return res.render("officeManagement/edit-students", {
        pageTittle: "ویرایش نمودن شاگرد",
        secondLayout: true,
        path: "/office-management/edit-student/:id",
        errors,
        books,
        table: "ok",
        student,
        position: req.user.position,
    })
}

// @desc DMIS office management handle deleting student
// @rout get /office-management/delete-stundents/:id
exports.handleDeleteStudent = async (req, res) => {
    try {
        const checkStudent=await students_room.find({student_fk:req.params.id});
        if (checkStudent) {
            req.flash("error_msg","برایی اینکه این محصل را از دیتابیس پاک کنید اول باید اجناس آن تحویل داده شود");
            return res.redirect("back");
        }
        const student = await students.findByIdAndDelete({ _id: req.params.id });
        req.flash("success_msg", " شما موفقانه " + student.name + " را حذف نمودید");
        return res.redirect("/office-management/show-students")
    } catch (err) {
       return res.redirect("/500")
    }
}

// @desc DMIS office management handle deleting student from rooms
// @rout get office-management/delete-students-from-room/:id
exports.getDeleteStudentFromRoom = async (req, res) => {
    try {
        await students_room.findByIdAndRemove({ _id: req.params.id });
        req.flash("success_msg", " شما موفقانه ریکارد حذف نمودید");
        return res.redirect("/office-management/show-rooms")
    } catch (err) {
        res.redirect("/500");
    }
}