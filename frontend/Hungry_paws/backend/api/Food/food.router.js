const { create, getById,updatebyId,updateRejectbyId, getData,deleteById ,getRequest} = require('./food.conrtoller');
const router = require("express").Router();

router.post("/add", create)
        .get("/:id/add", getById)
        .post("/:id/update", updatebyId)
        .post("/:id/updateReject", updateRejectbyId)
        .get("/", getData)
        .get("/get", getRequest)
        .delete("/:id/delete",deleteById);


module.exports = router;


