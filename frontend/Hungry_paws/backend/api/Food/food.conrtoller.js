const { creates,getByIDs,updatebyIds,getDatas,deleteByIds,updateRejectedbyId,getRequested } = require('./food.services');
const fs = require('fs');
const mime = require('mime');
var nodemailer = require('nodemailer');
const SMTPConnection = require("nodemailer/lib/smtp-connection");

module.exports = {
    create:(req,res) => {
        const body = req.body;
        creates(body,(err,results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    status:500,
                    error:err
                });
            }else{
                return res.status(200).json({
                    success:1,
                    data:results,
                    status:200
                });
            }  
        });
    },

    getById:(req, res) => {
        const id = req.params.id;
        getByIDs(id,(err,results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    status:500,
                    error:err
                });
            }else{
                return res.status(200).json({
                    success:1,
                    message:results,
                    status:200
                });
            }
        });
    },
    updatebyId:(req,res) => {
        const body = req.body;
        const id = req.params.id;
        updatebyIds(body, id, (err, results) => {
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
     updateRejectbyId:(req,res) => {
        const body = req.body;
        const id = req.params.id;
        updateRejectedbyId(body, id, (err, results) => {
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
    getData:(req,res) => {
        
        getDatas((err,results) => {
                if(err){
                    return res.status(500).json({
                        success:0,
                        status:500,
                        error:err
                    });
                }else{
                    return res.status(200).json({
                        sucsess:1,
                        data:results
                    });
                }
        });
    },
    getRequest:(req,res) => {
        
        getRequested((err,results) => {
                if(err){
                    return res.status(500).json({
                        success:0,
                        status:500,
                        error:err
                    });
                }else{
                    return res.status(200).json({
                        sucsess:1,
                        data:results
                    });
                }
        });
    },
    deleteById:(req,res) => {
        const id = req.params.id;
        deleteByIds(id, (err, results) => {
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

