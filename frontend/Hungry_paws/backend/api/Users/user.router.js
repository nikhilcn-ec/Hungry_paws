const { createUser,getUserById,getUsers,updateUser,deleteUser } =  require("./user.controller");
const { verifyToken } = require("../Auth/auth.controller");
const router = require("express").Router();

router.get("/:id", getUserById)
        .get("/", getUsers)
        .post("/:id", updateUser)
        .delete("/:id", deleteUser);

module.exports =  router;