const pool = require("../../config/dbconfig");

module.exports  = {
     creates:(data, callBack) => {
        pool.query(
            `select * from post where id = ?`,
            [data.id],
            (err,results) =>{
                var date=new Date();
                var pstatus="active";
                if(results == ""){
                    pool.query(
                        `insert into post(user_id,title,description,date,image,status)values(?,?,?,?,?,?)`,
                         [
                            data.user_id,
                            data.title,
                            data.description,
                            date,
                            data.image,
                            pstatus
                            
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
     getsById : (id, callBack) => {
        pool.query(`select * from post where id = ?`,
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
     //getting the products data
     gets:(callBack) => {
         pool.query(
            `select * from post`,
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
     updates:(data, id, callBack) => {
        pool.query(
            `select * from student where  id = ?`,
            [
                
                id
            ],
            (err,results) =>{
                if(results == ""){
                    pool.query(
                        `UPDATE student SET student_name=?,student_email=?,student_contact=?,student_image=?,balance=?,student_status=? WHERE  id = ?`,
                         [
                            data.student_name,
                            data.student_email,
                            data.student_contact,
                            data.student_image,
                            data.balance,
                            data.student_status,
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
     deletesById:(id,callBack) => {
        pool.query(`delete from post where id=?`,
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
