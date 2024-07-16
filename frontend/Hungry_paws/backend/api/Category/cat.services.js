const res = require("express/lib/response");
const { callbackPromise } = require("nodemailer/lib/shared");
const pool = require("../../config/dbconfig");

module.exports  = {
     create:(data, callBack) => {      
        pool.query(
            `select * from category where id = ?`,
            [data.id],
            (err,results) =>{
                var date=new Date();
                if(results == ""){
                    var status="active";
                    pool.query(
                        `INSERT INTO category(name,date,status) VALUES (?,?,?)`,
                         [
                            data.name,
                            date,
                            status
                         ],
                         (err,results) =>{
                             if(err){
                                return callBack(err);   
                             }
                             else{
                                 return callBack(null, results);
                             }
                         }
                     );
                }else if(err){
                    return callBack(err);
                }else{
                    err = "Data Found Duplicate";
                    return callBack(err);
                }
            }
         ); 
                  
     },
     getProductById:(id,callBack) => {
        pool.query(
            `select * from category where id = ?`,
            [id],
            (err,results,fields) => {
                if(err){
                    return callBack(err);
                }
                else if(results == ""){
                    err = "Data not found";
                    return callBack(err)
                }else{
                    return callBack(null, results);
                }
                
            }
        );
     },
     //getting the products data
     getProducts:(callBack) => {
         pool.query(
            `select * from category`,
            (err,results) => {
                if(err){
                    return callBack(err);
                }else if(results == ""){
                    err = "Data Not Found";
                    return callBack(err);
                }else{
                    return callBack(null, results);
                }

            }
         );
     },
     updateProduct:(data, id, callBack) => {
        pool.query(
            `select * from category where name = ? and id <> ?`,
            [
                data.name,
                id
            ],
            (err,results) =>{
                if(results == ""){
                    pool.query(
                        `UPDATE category SET name=? WHERE  id = ?`,
                         [
                            data.name,
                            id
                         ],
                         (err,results) =>{
                             if(err){
                                return callBack(err);   
                             }
                             else{
                                 return callBack(null, results);
                             }
                         }
                     );
                }else if(err){
                    return callBack(err);
                }else{
                    err = "Data Found Duplicate";
                    return callBack(err);
                }
            }
         );         
     },
     deleteProductById:(id,callBack) => {
        pool.query(`delete from category where id=?`,
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
     },
     
     
    
     
};
