const { createProduct, getProductById , getProducts, updateProduct, deleteProductById} = require("./req.controller");
const router = require("express").Router();


router.post("/add", createProduct)
        .get("/:id", getProductById)
        .get("/", getProducts)
        .post("/:id/update", updateProduct)
        .delete("/:id/delete", deleteProductById);

module.exports = router;

//localhost:3006/api/products/1  getdata




