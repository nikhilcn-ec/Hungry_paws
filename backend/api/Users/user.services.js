const res = require("express/lib/response");
const pool = require("../../config/dbconfig");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

module.exports = {  

   getUsers:callBack => {
     pool.query(
        `select * from organisation`,
        [],     
        (error, results, fields) => {
            if(error){
                console.log(error)
            }
            return callBack(null, results);
        }      
     );
   },
   getUserById:(id,callBack) => {
       pool.query(
            `select * from organisation where id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    console.log(error);
                }                
                return callBack(null, results);
            }
       );
   },
   updateUser:(id,callBack) =>{
        pool.query(
            `update organisation set orgname=?, orgaddress=?, phone=?,email=?,contactname=?,logo=? where id = ?`,
            [   data.orgname,
                data.orgaddress,
                data.phone,
                data.email,
                data.contactname,
                data.logo,               
                id
            ],
            (error, results, fields) => {
                if(error){
                    console.log(error);
                }
                return callBack(null, results[0]);
            }
        );
   },
   deleteUser:(id,callBack) => {
        pool.query(
            `delete from organisation where id = ?`,
            [id],
            (error, results, fields) => {
                if(error){
                    console.log(error);
                }
                return callBack(null, results);
            }
        );
  }  
};