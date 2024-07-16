const res = require("express/lib/response");
const { callbackPromise } = require("nodemailer/lib/shared");
const pool = require("../../config/dbconfig");

module.exports  = {
     creates:(data, callBack) => {
        var userid=data.empid;
         pool.query(
            `select * from food_request where id = ?`,
            [data.id],
            (err,results) =>{
                var date=new Date();
                var request_status="initiated";
                if(results == ""){
                    pool.query(
                        `INSERT INTO food_request(ngo_id,booking_id,request_status,request_date) VALUES (?,?,?,?)`,
                         [
                            data.ngo_id,
                            data.booking_id,
                            request_status,
                            date,
                            
                            
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
     getByIDs:(id,callBack) => {
        pool.query(
            `select * from feedback where id = ?`,
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
     getDatas:(callBack) => {
        
         pool.query(
            `SELECT fr.id, n.first_name, b.program, b.program_date, fr.request_status, fr.request_date
            FROM food_request fr
            JOIN ngo n ON fr.ngo_id = n.id
            JOIN booking b ON fr.booking_id = b.id
            WHERE fr.request_status = 'initiated'
            `,
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
     getRequested:(callBack) => {
        
        pool.query(
           `SELECT fr.id, n.first_name, b.program, b.program_date, fr.request_status, fr.request_date
           FROM food_request fr
           JOIN ngo n ON fr.ngo_id = n.id
           JOIN booking b ON fr.booking_id = b.id
           `,
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
     updatebyIds:(data, id, callBack) => {
        var request_status="donated";
                    pool.query(
                        `UPDATE food_request SET request_status=? WHERE  id = ?`,
                         [
                            
                            request_status,
                            
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
               
            
                  
     },
     updateRejectedbyId:(data, id, callBack) => {
        var request_status="rejected";
                    pool.query(
                        `UPDATE food_request SET request_status=? WHERE  id = ?`,
                         [
                            
                            request_status,
                            
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
                
     },
     deleteByIds:(id,callBack) => {
        pool.query(
            `delete from feedback  where id = ?`,
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
     
     
    
     
};
