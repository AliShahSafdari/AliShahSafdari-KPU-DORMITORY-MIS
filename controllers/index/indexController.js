const bcrypt = require('bcryptjs');
const passport = require('passport');
const { spawn } = require('child_process');
const path = require('path');
const appRoot = require('app-root-path');
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../../utils/mailer");




const User = require("../../models/user");
const user = require('../../models/user');


// @desc show show index page
// @routes get /
exports.getIndex = (req, res) => {
  res.render("indexFiles/index", {
    pageTittle: "صحفه اصلی",
    path: "/",
    position: req.user.position,
  });
};


// @desc show login page
// @routes get /login
exports.getLogin = (req, res) => {
  res.render("indexFiles/pages-sign-in", {
    pageTittle: "صحفه ورود",
    path: "/login",
    layout: "./layouts/signLayout",
    error: req.flash("error")
  });
};


// @desc show add user page
// @routes get /admin/create-new-user
exports.getAddNewUser = (req, res) => {
  res.render("indexFiles/create-new-user", {
    pageTittle: "ایجاد یوزر جدید",
    path: "/admin/create-new-user",
    errors: [],
    position: req.user.position
  })
}


//? desc  edit Login
// @routes get /admin/edit-user/:id
exports.getEditUser = async(req,res)=>{
  const selectUser = await User.findOne({ _id: req.params.id });
  if(selectUser.position!=="آمر لیلیه"){
    req.flash("error_msg","دسترسی غیرمجاز");
    return res.redirect("back");
  }
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



// @desc handle login
// @routes POST /login
exports.handleLogin = async (req, res, next) => {
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
}

exports.rememberMe = (req, res) => {
  if (req.body.remember) {
    req.session.cookie.originalMaxAge = 7 * 24 * 60 * 60 * 1000;
  } else {
    req.session.cookie.expire = null;
  }

  req.flash("success_msg", "خوش آمدید!");
  if (req.user.position === "آمر لیلیه")
    return res.redirect("/");
  else if (req.user.position === "مدیر جنسی")
    return res.redirect("/goods-management/show-goods");
  else if (req.user.position === "مدیر ارتزاقی")
    return res.redirect("/feed-management/show-daily-menus");
  else if (req.user.position === "مدیر اداری")
    return res.redirect("/office-management/show-students");
}


// @desc show forgot password page
// @routes get /admin/forgot-password
exports.getForgotPassword=(req,res)=>{
  res.render("indexFiles/forgot-password",{
    pageTittle:"فراموشی رمز عبور",
    layout: "./layouts/signLayout",
    errors:[]
  })
}


// @desc show forgot password page by security key
// @routes post /password-key
exports.getForgotPasswordByKey=async(req,res)=>{
  const {email}=req.body;
  const user=await User.findOne({email:email});
  errors=[];
  if (user) {
   return res.render("indexFiles/password-by-security-key",{
      pageTittle:"فراموشی رمز عبور",
      layout: "./layouts/signLayout",
      firstOption:user.firstOption,
      secondOption:user.secondOption,
      thirdOption:user.thirdOption,
      email:user.email,
      errors:[],
    })
  }

  errors.push({name:"not-exist",message:"حسابی با این ایمیل موجود نیست"});
   return res.render("indexFiles/forgot-password",{
      pageTittle:"فراموشی رمز عبور",
      layout: "./layouts/signLayout",
      errors
    })
}


// @desc show forgot password page by security key
// @routes post /find-password-key
exports.handleForgotPasswordByKey=async(req,res)=>{
  const {firstQuestion,secondQuestion,thirdQuestion,email}=req.body;
  const user= await User.findOne({email:email});
 errors=[];
  if (user.firstQuestion === firstQuestion && user.secondQuestion === secondQuestion && user.thirdQuestion === thirdQuestion) {
   return res.render("indexFiles/resset-password",{
      pageTittle:"تغییر رمز",
      layout:"./layouts/signLayout",
      email:user.email,
      auth:"authorized",
      errors:[]
    })
  }
  
  errors.push({name:"wrong-answer",message:"جواب سوال امنیتی شما اشتباه است"});
  res.render("indexFiles/password-by-security-key",{
    pageTittle:"فراموشی رمز عبور",
    layout: "./layouts/signLayout",
    firstOption:user.firstOption,
    secondOption:user.secondOption,
    thirdOption:user.thirdOption,
    email:user.email,
    errors
  })
}

// resset password whit security key
exports.handleRessetPassword=async(req,res)=>{
  const user=await User.findOne({email:req.params.id});
  const {password,confirmPassword}=req.body;
  if (password !== confirmPassword) {
    errors.push({name:"notMatch",message:"رمز عبور و تکرار آن با هم مشابه نیستند"});
    return res.redirect("back");
  }

  const hash = await bcrypt.hash(password, 10);

  user.password=hash;
  await user.save();
  req.flash("success_msg", "شما موفقانه رمز عبور خویش را تغییر دادید");
  return res.redirect("/login")
}


// @desc handle logout
// @routes POST /logout
exports.handleLogout = (req, res) => {
  req.logout((err) => {
    console.log(err);
  });
  req.flash("success_msg", "شما موفقانه از سیستم خارج شدید");
  return res.redirect("/login");

}


// @desc create new user
// @routes POST /admin/create-new-user
exports.createUser = async (req, res) => {
  const errors = [];
  try {
    await User.userValidation(req.body);
    
    const { fullname, email, password, position ,firstQuestion,firstOption ,secondQuestion, secondOption,thirdQuestion ,thirdOption} = req.body;
    const user = await User.findOne({ email });
    if (user) {
      errors.push({ message: "کاربری با این ایمیل موجود است" });
      return res.render("indexFiles/create-new-user", {
        pageTittle: "صحفه ثبت نام",
        path: "/admin/create-new-user",
        errors: errors,
      });
    }

    const pos= await User.findOne({position});
    if (pos) {
      errors.push({name:"position", message: `حساب کاربری ${pos.position} قبلا راجستر شده است` });
      return res.render("indexFiles/create-new-user", {
        pageTittle: "صحفه ثبت نام",
        path: "/admin/create-new-user",
        errors: errors,
      });
    }

    const hash = await bcrypt.hash(password, 10);

    await User.create({ fullname, email, position,firstQuestion,firstOption ,secondQuestion, secondOption,thirdQuestion ,thirdOption, password: hash });
    req.flash("success_msg", "ثبت نام شما موفقیت آمیز بود");
    return res.redirect("/login");
  } catch (err) {
    err.inner.forEach((err) => {
      errors.push({
        name: err.path,
        message: err.message,
      });
    });
  }

  return res.render("indexFiles/create-new-user", {
    pageTittle: "صحفه ثبت نام",
    path: "/admin/create-new-user",
    errors,
  });
}


//? desc handle edit user
/// @routes post /admin/edit-user/:id
exports.handleEditUser =async (req,res)=>{
  errors=[];
  let selectUser=[];
  try{
  selectUser = await User.findOne({ _id: req.params.id });
  const { fullname, email, password,confirmPassword, position} = req.body;
  if(selectUser && selectUser.position!=="آمر لیلیه"){
    req.flash("error_msg","دسترسی غیرمجاز");
    return res.redirect("back");
  }

  await User.userValidation(req.body);

  const hash = await bcrypt.hash(password, 10);
  selectUser.fullname=fullname;
  selectUser.email=email;
  selectUser.password=hash;
  selectUser.save();
console.log("object");

  req.flash("success_msg","موفقانه آپدیت شد");
  return res.redirect("/");
} catch (err) {
  console.log(err);
  err.inner.forEach((err) => {
    errors.push({
      name: err.path,
      message: err.message,
    });
  });
}
res.render("indexFiles/edit-user",{
  pageTittle:"ویرایش استفاده کننده",
  path:"/admin/edit-user",
  fullname:selectUser.fullname,
  email:selectUser.email,
  id:selectUser._id,
  errors,
  position:req.user.position
})
}





//? Backup process
exports.backup = (req, res) => {
  const DB_Name = process.env.DB_Name;
  const ArchivePath = path.join(`${appRoot}`, 'backups', `${DB_Name}_${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}.gz`);
  
  backupDB();
  res.send();
  function backupDB() {
    const child = spawn('mongodump', [
      `--db=${DB_Name}`,
      `--archive=${ArchivePath}`,
      '--gzip',
    ])

    child.stdout.on('data', (data) => {
      console.log('stdout:\n', data);
    })

    child.stderr.on('data', (data) => {
      console.log('stderr:\n', Buffer.from(data).toString());
    })
    
    
    child.on('error', (error) => {
      console.log('error:\n', error);
    })

    child.on('exit', (code, signal) => {
      if (code) console.log('process exit with code:', code);
      else if (signal) console.log('process killed with code:', signal)
      else {
        console.log('Backup is successfull ✅');
      }
    })
    
  }
}

//* Restore Process
//? mongorestore --db=DMIS_db --archive=./DMIS_db.gzip --gzip
exports.RestoreDB = (req, res) => {
  // console.log(req.files.restore.name);
  const DB_Name = process.env.DB_Name;
  // console.log(req.files.restore);
  const ArchivePath = path.join(`${appRoot}`, 'backups', `${req.files.restore.name}`);

  console.log(ArchivePath);
  restoredatabase();
  res.send();
  function restoredatabase() {
    const child = spawn('mongorestore', [
      `--db=${DB_Name}`,
      `--archive=${ArchivePath}`,
      '--gzip',
    ])
    
    child.stdout.on('data', (data) => {
      console.log('stdout:\n', data);
    })
    
    child.stderr.on('data', (data) => {
      console.log('stderr:\n', Buffer.from(data).toString());
    })
    

    child.on('error', (error) => {
      console.log('error:\n', error);
    })
    
    child.on('exit', (code, signal) => {
      if (code) console.log('process exit with code:', code);
      else if (signal) console.log('process killed with code:', signal)
      else {
        console.log('Restore is successfull ✅');
      }
    })

  }
}


exports.handleRessetPasswordByEmail=async(req,res)=>{
  const errors=[];
  const {email}=req.body;
  console.log(req.body);
  const user= await User.findOne({email:email});
  if(!user){
    req.flash("error_msg","ایمیل شما اشتباه است");
    errors.push({name:"not-exist",message:"ایمیل در دیتابس موجود نیست"});
    return res.render("indexFiles/forgot-password",{
      pageTittle:"فراموشی رمز عبور",
      layout: "./layouts/signLayout",
      errors
    })
  }

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  
  const ressetLink = `http://localhost:3000/reset-password-by-email-token/${token}`;
  
  sendEmail(
    user.email,
    user.fullname,
    "تغییر رمز عبور",
    `جهت تغییر رمز عبور رویی لینک زیر کلیک کنید <br><hr>
    <a href="${ressetLink}"> برایی تغییر رمز عبور اینجا کلیک کنید </a>`
    );
    req.flash(
      "success_msg",
      "لینک حاوی تغییر رمز عبور به شما توسط ایمیل ارسال گردید"
      );
      
      return res.redirect("/login");  
      
}

exports.handleTokenPassword=async(req,res)=>{
  console.log("object");
const token = req.params.token;
let decodedToken;
try {
decodedToken = jwt.verify(token, process.env.JWT_SECRET);
console.log(decodedToken);
} catch (err) {
console.log(err);
if (!decodedToken) {
  return res.redirect("/404");
}
}

return res.render("indexFiles/resset-password",{
  pageTittle:"تغییر رمز",
  layout:"./layouts/signLayout",
  email:decodedToken.email,
  auth:"authorized",
  errors:[]
})
}