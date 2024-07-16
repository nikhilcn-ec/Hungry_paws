const { create, getById , get, update, deleteById} = require("./adopt.controller");
const router = require("express").Router();


router.post("/add", create)
        .get("/:id/add", getById)
        .get("/", get)
        .post("/:id/update", update)
        .delete("/:id/delete", deleteById);

module.exports = router;