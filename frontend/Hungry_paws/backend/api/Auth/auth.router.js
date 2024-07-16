const {login,otpGeneration, createUser, updatePassword, getCompanyUsers ,getUsers, logoutUser ,logoutdetail,changePassword,forgotPassword,getUserById,updateUserById} = require("./auth.controller");

const router = require("express").Router();

router.post("/login", login)
    .post("/register", createUser)
    .post("/mailsent/mail", otpGeneration)
    .post("/updatePassword", updatePassword)
    .get("/getUser",getCompanyUsers)
    .get("/getUserById",getUserById)
    .post("/updateUserByID",updateUserById)
    .get("/get",getUsers)
    .post("/logout",logoutUser)
    .post("/changePassword",changePassword)
    .post("/forgotPassword",forgotPassword)
    .get("/getlogout",logoutdetail);
module.exports =  router;