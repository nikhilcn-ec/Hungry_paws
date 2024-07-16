const { create,getRegByIDs,updatebyIds,getRegs,deleteByIds } = require('./ngo.services');


const fs = require('fs');
const mime = require('mime');
var nodemailer = require('nodemailer');
const SMTPConnection = require("nodemailer/lib/smtp-connection");

module.exports = {
    createReg:(req,res) => {
        const body = req.body;
        body.companyCode = req.headers['companycode'];

        create(body,(err,results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    status:500,
                    error:err
                });
            }else{
                

                var mailReq = {
                    to:results.email,
                    subject:"Login credentials",
                    text:"Your Login password for "+results.email+" is "+results.password
                };
        
                mail(mailReq,res); 
            }
        });
    },

    getRegById:(req, res) => {
        const id = req.params.id;
        getRegByIDs(id,(err,results) => {
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
    updatebyId:(req,res) =>{
        const body = req.body;
        const id = req.params.id;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updatebyIds(id, body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json( {
                    success:0,
                    message:"Database Connection error"
                }); 
            }
            else{
                return res.status(200).json({
                    success:1,
                    message:"Updated succesfully"
                });
            }            
        });
    },
    getRegData:(req,res) => {
        getRegs((err,results) => {
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
                        authData:req.authData,
                        status:200
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


const mail = (mailReq,res) => {

    var transporter = nodemailer.createTransport({
            service: 'gmail',       
            PORT:465,
            auth: {
                user: process.env.EMAILID,
                pass: process.env.PASSWORD
            },
            logger:true,
            debug:true
    });

    var infos = "information";
    var err = "error";

    transporter.sendMail(mailReq, function(error, info){
        if (error) {
            console.log(error);
            //mailReq.err = error;            
        } else {

        console.log('Email sent: ' + info.response);        
            return res.json({
                success:1,
                subject:mailReq.subject,
                data:"message sent and Organization with admin data added successfully"
            });             

        }
    }); 
    
};