const express = require('express');
const {Studentsignup,Studentlogin,GetstudentData,changepassword,findeuser,forgotpassword}=require('../controller/controller');
const router=express.Router();

router.route('/studentsignup').post(Studentsignup);
router.route('/studentlogin').post(Studentlogin);
router.route("/getstudentdata/:email").get(GetstudentData);
router.route("/changepassword").put(changepassword);
router.route("/findeuser").post(findeuser);
router.route("/forgotpassword").post(forgotpassword);
module.exports=router;