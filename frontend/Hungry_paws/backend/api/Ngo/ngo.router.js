const { createReg, getRegById,updatebyId, getRegData,deleteById } = require('./ngo.controller');
const router = require("express").Router();

router.post("/add", createReg)
        .get("/:id", getRegById)
        .post("/:id/update", updatebyId)
        .get("/", getRegData)        
        .delete("/:id/delete",deleteById);


module.exports = router;


