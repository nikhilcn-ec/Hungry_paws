const router = require("express").Router();
const orgRouter=require("../Organisation/org.router");
const userRouter=require("../Users/user.router");
const authRouter=require("../Auth/auth.router");
const userregisterRouter = require("../UserRegister/Reg.router");
const categoryRouter=require("../Category/cat.router");


const ngoRouter = require("../Ngo/ngo.router");
const empRouter = require("../Employee/emp.router");
const foodRouter = require("../Food/food.router");
const postRouter = require("../Post/post.router");
const volRouter = require("../Volunteer/vol.router");
const rescueRouter = require("../Rescue/rescue.router");
const galleryRouter = require("../Gallery/gallery.router");
const donRouter = require("../Donation/don.router");
const petRouter = require("../Adopt/adopt.router");
const reqRouter = require("../AdoptRequest/req.router");
const vacRouter = require("../Vaccine/vac.router");
const veterRouter = require("../Veterinary/veter.router");

const {verifyToken} = require("../Auth/auth.controller");


router.use("/api/organisation",orgRouter);
router.use("/api/users",userRouter);
router.use("/api/auth",authRouter);
router.use("/api/userRegister",userregisterRouter);
router.use("/api/category",categoryRouter);

router.use("/api/ngo",ngoRouter);
router.use("/api/employee",empRouter);
router.use("/api/food",foodRouter);

router.use("/api/post",postRouter);
router.use("/api/volunteer",volRouter);
router.use("/api/rescue",rescueRouter);
router.use("/api/gallery",galleryRouter);
router.use("/api/donation",donRouter);
router.use("/api/adopt",petRouter);
router.use("/api/adopt_request",reqRouter);
router.use("/api/vaccine",vacRouter);
router.use("/api/veterinary",veterRouter);

//cafe

module.exports = router; 