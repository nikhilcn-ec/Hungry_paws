const { create,getStudentByID,updatebyIds,getStudents,deleteByIds } = require('./org.services');
const fs = require('fs');
const mime = require('mime');
var nodemailer = require('nodemailer');
const SMTPConnection = require("nodemailer/lib/smtp-connection");

module.exports = {
    createStudent:(req,res) => {
        const body = req.body;
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
                    subject:"Organization admin Login credentials",
                    text:"Your Login password for "+results.email+" is "+results.password
                };
        
                mail(mailReq,res); 
            }    
        });
    },

    getStudentById:(req, res) => {
        const body = req.body;
        const id = req.params.id;
        getStudentByID(body,id,(err,results) => {
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
        
        
        updatebyIds( body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json( {
                    success:0,
                    status:500,
                    error:err
                }); 
            }
            else{
                return res.status(200).json({
                    success:1,
                    message:results,
                    status:200
                });
            }            
        });
    },
    getStudentData:(req,res) => {
        getStudents((err,results) => {
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