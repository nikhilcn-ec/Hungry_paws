const { createStudent, getStudentById,updatebyId, getStudentData,deleteById } = require('./org.controller');
const router = require("express").Router();

router
        .post("/:email/update", updatebyId)
        // .get("/", getStudentData)
        // .delete("/:id/delete",deleteById);


module.exports = router;


