const { create, getProducts, getProductById, updateProduct, deleteProductById } = require("./cat.services");
const { genSaltSync, hashSync} = require("bcrypt");
const { get } = require("express/lib/response");
var nodemailer = require('nodemailer');

module.exports = {
    createProduct:(req,res) => {
        const body = req.body;
        create(body, (err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    data:err
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    data:results
                });
            }
        });
     },
     getProductById:(req,res) => {
        const id = req.params.id;
        getProductById(id, (err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    data:err
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    data:results
                });
            }
        });
     },
     getProducts:(req,res) => {        
        getProducts((err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    data:err
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    data:results
                });
            }
        });
     },
     updateProduct:(req,res) => {
        const body = req.body;
        const id = req.params.id;
        updateProduct(body, id, (err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    message:results
                });
            }
        });
     },
     deleteProductById:(req,res) => {
        const id = req.params.id;
        deleteProductById(id, (err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    error:err,
                    status:500
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    data:results
                });
            }
        });
     }
};

