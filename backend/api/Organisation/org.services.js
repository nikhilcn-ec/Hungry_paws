const pool = require("../../config/dbconfig");
const res = require("express/lib/response");
const { genSaltSync, hashSync} = require("bcrypt");

module.exports = {
    create:(data,callBack) => {
        pool.query(`select * from employee where email = ?`,
            [data.email],
            (error,results) => {
                var date=new Date();
                var status= "active";
                if(results == ""){
                    pool.query(
                        `INSERT INTO employee(first_name, last_name, email, contact, address, designation,date,status) VALUES (?,?,?,?,?,?,?,?)`,
                        [
                            data.first_name,
                            data.last_name,
                            data.email,
                            data.contact,
                            data.address,
                            data.designation,
                            date,
                            status
                        ],
                        (error) => {
                            if(error){
                                return callBack(error);
                            }else{
                                var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                                var passwordLength = 8;
                                var password = "";
                                for (var i = 0; i <= passwordLength; i++) {
                                    var randomNumber = Math.floor(Math.random() * chars.length);
                                    password += chars.substring(randomNumber, randomNumber +1);
                                   }
                                   var userRole = "admin";
                                   const salt = genSaltSync(10);
                                   var pwd = hashSync(password, salt);
                                   var rand = "USER" + Math.floor(Math.random() * 90000 + 10000);
                                pool.query(
                                    `INSERT INTO users(first_name, last_name, email, contact, address, designation,date,status,password,username,userRole,companyCode) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
                                    [
                                        data.first_name,
                                        data.last_name,
                                        data.email,
                                        data.contact,
                                        data.address,
                                        data.designation,
                                        data.date,
                                        data.status,
                                        pwd,
                                        rand,
                                        userRole,
                                        data.first_name
                                    ],
                                    (error)=> {
                                        if(error){
                                            return callBack(error);
                                        }else{
                                            message = {
                                                email:data.email,
                                                password:password
                                            };
                                            return callBack(null,message);
                                        }
                                    }                                    
                                );
                                
                            }
                        }
                    );
                }else if(error){
                    return callBack(error);
                }else{
                    return callBack("Duplicate Entry found");
                }
            }
        );        
    },
    getStudentByID:(data,id, callBack) =>{
        
        pool.query(
            `SELECT id, first_name,last_name,email,contact,address,designation,username FROM users WHERE email = ? AND id <> ?`,
            [data.email, id],
            (err, results) => {            
                if (err) {
                    return callBack(err);
                } else if (results.length === 0) {
                    return callBack("Data not found");
                } else {
                    return callBack(null, results);
                }
            }
        );
    },
    updatebyIds: (data, callBack) => {
        pool.query(
            `UPDATE users SET first_name=?,last_name=?,contact=?,address=?,designation=?,username=? WHERE email=?`,
            [
                data.first_name,
                data.last_name,
                data.contact,
                data.address,
                data.designation,
                data.username,
                data.email, // Replace `id` with `data.email` for the WHERE clause
            ],
            (err, results) => {
                if (err) {
                    return callBack(err);
                } else {
                    return callBack(null, results);
                }
            }
        );
    },
    
    
//     updatebyIds:(id,callBack) =>{
//         pool.query(
//             `update organisation set orgname=?, orgaddress=?, phone=?, email=?, contactname=?, logo=? where id = ?`,
//             [ data.orgname,
//                 data.orgaddress,
//                 data.phone,
//                 data.email,
//                 data.contactname,
//                 data.logo,               
//                 id
//             ],
//             (error, results, fields) => {
//                 if(error){
//                     console.log(error);
//                 }
//                 return callBack(null, results[0]);
//             }
//         );
//    },
    getStudents:(callBack) =>{
        pool.query(`select * from employee`,        
            (err,results) => {
                if(err){
                    return callBack(err);
                }else if(results == ""){                    
                    return callBack("Data not found");
                }else{  
                    return callBack(null, results);
                }
            }
        );
    },
    deleteByIds:(id,callBack) =>{
        pool.query(`delete from employee where id=?`,
            [ 
                id
            ],        
            (err,results) => {
                if(err){
                    return callBack(err);
                }else if(results == ""){                    
                    return callBack("Data not found");
                }else{  
                    message = "Data deleted successfully";
                    return callBack(null, message);
                }
            }
    );
}
};