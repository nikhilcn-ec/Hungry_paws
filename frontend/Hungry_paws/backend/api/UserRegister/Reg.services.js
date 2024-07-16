const pool = require("../../config/dbconfig");
const res = require("express/lib/response");
const { genSaltSync, hashSync} = require("bcrypt");

module.exports = {
    create:(data,callBack) => {
        pool.query(`select * from userregister where email = ?`,
            [data.email],
            (error,results) => {
                if(results == ""){
                    pool.query(
                        `INSERT INTO userregister(first_name, last_name, username,email,contact) VALUES (?,?,?,?,?)`,
                        [
                            data.first_name,
                            data.last_name,
                            data.username,
                            data.email,
                            data.contact,
                            data.password
                        ],
                        (error) => {
                            if(error){
                                return callBack(error);
                            }else{
                                var user="user";
                                pool.query(
                                    `INSERT INTO users(first_name, last_name, username,email,contact,password,userRole) VALUES (?,?,?,?,?,?,?)`,
                                    [
                                        data.first_name,
                                        data.last_name,
                                        data.username,
                                        data.email,
                                        data.contact,
                                        data.password,
                                        user
                                    ],
                                    (error)=> {
                                        if(error){
                                            return callBack(error);
                                        }else{
                                            message = {
                                                email:data.email,
                                                password:data.password
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
    getRegByIDs:(id, callBack) =>{
        pool.query(`select * from userregister where id = ?`,
            [id],
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
    updatebyIds:(id,callBack) =>{
        pool.query(
            `update userregister set username=?, email=?, phone=?, password=?, didx=? where id = ?`,
            [   data.username,
                data.email,
                data.phone,
                data.password,
                data.didx ,            
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
    getRegs:(callBack) =>{
        pool.query(`select * from userregister`,        
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
        pool.query(`delete from userregister where id=?`,
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