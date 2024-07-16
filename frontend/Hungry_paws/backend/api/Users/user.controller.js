const { getUsers, getUserById, updateUser, deleteUser,fetchUser } = require("./user.services");
const { get } = require("express/lib/response");
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const SMTPConnection = require("nodemailer/lib/smtp-connection");

module.exports = {              

    /** GETTING USER BY ID  */
    getUserById:(req,res) => { 
        const id = req.params.id;        

        getUserById(id,(err, results) =>{
            if(err){
                console.log(err);
                return;                
            }
            if(results == ""){
                return res.json({
                    success:0,
                    message:"Record not found"
                });
            }
            else{
                return res.json({
                    success:1,
                    data:results
                });
            }
        });
    },

    /**GETTING ALL USERS */
    getUsers:(req,res) =>{
        getUsers((err, results) => {
            if(err){
                console.log(err);
                return;                
            }
            if(results == ""){
                return res.json({
                    success:0,
                    message:"Records not found "
                });
            }
            else{
                return res.json({
                    success:1,
                    data:results
                });
            }
        });
    },
    
    /** UPDATING USERS DATA */
    updateUser:(req,res) =>{
        const body = req.body;
        const id = req.params.id;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(id, body, (err, results) => {
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

    /** DELETING THE USER */
    deleteUser:(req,res) => {
        const id = req.params.id;
        deleteUser(id, (err, results) =>{
            if(err){
                console.log(err);
                return err;                
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"Record not found"
                });
            }
            else{
                return res.json({
                    success:1,
                    data:"Deleted data successfully"
                });
            }
        });
    }    
}