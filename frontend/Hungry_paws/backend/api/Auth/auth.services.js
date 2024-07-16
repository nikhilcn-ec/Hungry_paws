const res = require("express/lib/response");
const pool = require("../../config/dbconfig");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { genSaltSync, hashSync } = require("bcrypt");
const { callbackPromise } = require("nodemailer/lib/shared");

module.exports = {
    /*** Authenticating user */
    // fetchUser: (data, callBack) => {
    //     // return callBack("User is not blocked");                    
    //     pool.query(
    //         `select id,userRole,first_name,last_name,contact,designation,address,login_fail_attempt, email, password,companyCode,username from users where email = ?`,
    //         [
    //             data.email,
    //         ],
    //         (error, results, fields) => {
    //             const queryData = results;
    //             if (error) {
    //                 return callBack(error);
    //             } else if (results == "") {
    //                 err = "EmailId is not registered";
    //                 return callBack(err);
    //             }
    //             else {

    //                 //let bool = bcrypt.compareSync(data.password,results[0].password);                   

    //                 if (data.password != results[0].password) {
    //                     const login_fail_attempt = parseInt(results[0].login_fail_attempt) + 1;
    //                     pool.query(
    //                         `Update users set login_fail_attempt = ? where email = ?`,
    //                         [
    //                             login_fail_attempt,
    //                             data.email
    //                         ],
    //                         (err, results, fields) => {
    //                             err = "Password is Incorrect";
    //                             return callBack(err);
    //                         }
    //                     );

    //                 } else {
    //                     pool.query(
    //                         `Update users set login_fail_attempt = ? where email = ?`,
    //                         [
    //                             0,
    //                             data.email
    //                         ],
    //                         (err, results, fields) => {

    //                             var newDate = new Date();
    //                             var time = newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();
    //                             var date = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
    //                             var status = "logged in";
    //                             pool.query(
    //                                 `insert into logs(name,time,date,status) values (?,?,?,?)`,
    //                                 [
    //                                     data.email,
    //                                     time,
    //                                     date,
    //                                     status
    //                                 ],
    //                                 (err, results) => {
    //                                     if (err) {
    //                                         return callBack(err);
    //                                     }
    //                                     else {
    //                                         const user = {
    //                                             id: queryData[0].id,
    //                                             username: queryData[0].name,
    //                                             email: queryData[0].email
    //                                         };
    //                                         const token = jwt.sign({ user }, 'secretkey', { expiresIn: 60 * 60 });
    //                                         const message = {
    //                                             token: token,
    //                                             userRole: queryData[0].userRole,
    //                                             company: queryData[0].companyCode,
    //                                             empid: queryData[0].id, //getting from  userr table
    //                                             username: queryData[0].username,
    //                                             email: queryData[0].email,
    //                                             firstName: queryData[0].first_name,
    //                                             lastName: queryData[0].last_name,
    //                                             contact: queryData[0].contact,
    //                                             designation: queryData[0].designation,
    //                                             address: queryData[0].address

    //                                         };
    //                                         return callBack(null, message);

    //                                     }
    //                                 });
    //                         }
    //                     );
    //                 }
    //             }
    //         }
    //     );
    // },
   fetchUser: (data, callBack) => {
        pool.query(
            `select * from user where email = ?`,
            [
                data.email,
            ],
            (error, results, fields) => {
                const queryData = results;
                if (error) {
                    return callBack(error);
                } else if (results == "") {
                    err = "EmailId is not registered";
                    return callBack(err);
                } else {
                    const user = {
                        id: queryData[0].id,
                        username: queryData[0].name,
                        email: queryData[0].email
                    };
                    const token = jwt.sign({ user }, 'secretkey', { expiresIn: 60 * 60 });
                    const message = {
                        token: token,
                        userRole: queryData[0].userRole,
                        // company: queryData[0].companyCode,
                        empid: queryData[0].id, //getting from  userr table
                        // username: queryData[0].username,
                        email: queryData[0].email,
                        username: queryData[0].name,
                        // firstName: queryData[0].first_name,
                        // lastName: queryData[0].last_name,
                        contact: queryData[0].contact,
                        // designation: queryData[0].designation,
                        // address: queryData[0].address

                    };
                    return callBack(null, message);
                }
            }
        );

    },

    changepwd: (bodyData, callBack) => {
        if (bodyData.newPassword == bodyData.confirmPassword) {
            var email = bodyData.email;
            var userName = bodyData.username;
            var bOldPassword = bodyData.oldPassword;
            var newPassword = bodyData.newPassword;

            pool.query(
                `select password from users where email = ? and username = ?`,
                [email, userName],
                (err, results) => {
                    var queryData = results;
                    if (err) {
                        return callBack(err);
                    } else if (queryData.length == 0) {
                        return callBack("Unable to update your password..!", null);
                    } else if (bOldPassword != queryData[0].password) {
                        return callBack("Invalid current password..!", null);
                    } else {
                        pool.query(
                            `update users set password = ? where email = ? and username=?`,//query
                            [newPassword, email, userName],//passing parameters
                            (err, results) => {//sending response
                                if (err) {
                                    return callBack(err);
                                } else if (results) {
                                    return callBack(null, "Password updated successfully..!")
                                } else {
                                    return callBack("Unable to update your password..!")
                                }
                            }
                        );
                    }
                }
            );
        } else {
            return callBack("Passwords dont match..!", null);
        }
    },
    forgotpwd: (body, callBack) => {
        pool.query(
            `select password,email from users where email = ?`,
            [body.email],
            (error, results) => {
                if (error) {
                    return callBack(error);
                } else if (results.length == 0) {
                    return callBack("data not found");
                } else if (results) {
                    const data = {
                        password: results[0].password
                    }
                    return callBack(null, data);

                }
            }
        )
    },


    /*** creating the new user */
    create: (data, callBack) => {
        pool.query(
            `select * from users where email = ?`,
            [data.email],
            (error, results) => {
                if (results == "") {
                    pool.query(
                        `INSERT INTO users(name,email,mobileno,password,userRole,companyCode) VALUES (?,?,?,?,?,?)`,
                        [
                            data.name,
                            data.email,
                            data.mobileno,
                            data.password,
                            data.userRole,
                            data.companyCode
                        ],
                        (error) => {
                            if (error) {
                                return callBack(error);
                            } else {


                                message = {
                                    email: data.email,
                                    password: data.pass
                                };
                                return callBack(null, message);
                            }
                        }
                    );
                }
                else if (error) {
                    return callBack(error);
                }
                else {
                    error = "Email Id is already Registered";
                    return callBack(error);
                }
            }
        );
    },
    updatePasswordS: (data, callBack) => {
        pool.query(
            `select * from users where email = ?`
            [data.email],
            (error, results) => {
                if (results != "") {
                    pool.query(`update users set password = ? where email = ?`,
                        [
                            data.password,
                            data.email
                        ],
                        (error, results) => {
                            if (error) {
                                return callBack(error);
                            } else {
                                message = "Password updated successfully";
                                return callBack(null, message);
                            }
                        }
                    );
                } else if (error) {
                    return callBack(error);
                }
                else {
                    error = "Email Id is not Registered";
                    return callBack(error);
                }
            }
        );
    },
    getUsers: (companyCode, callback) => {
        pool.query(
            'select * from users where companyCode=? and userRole <> "admin"',
            [companyCode],
            (err, results) => {
                if (results.length == 0) {
                    var empty = "Data not found";
                    return callback(null, empty);
                } else if (results) {
                    return callback(null, null, results);
                } else {
                    return callback(err);
                }
            }
        );
    },
    getUser: (companyCode, callback) => {
        pool.query(
            'select * from users where companyCode=? and userRole <> "user"',
            [companyCode],
            (err, results) => {
                if (results.length == 0) {
                    var empty = "Data not found";
                    return callback(null, empty);
                } else if (results) {
                    return callback(null, null, results);
                } else {
                    return callback(err);
                }
            }
        );
    },
    getUserById: (empid, callBack) => {
        pool.query(
            'select * from users where id = ? ',
            [empid],
            (err, results) => {
                if (results=="") {
                    var empty = "Data not found";
                    return callBack(null, empty);
                } else if (results) {
                    return callBack(null, null, results);
                } else {
                    return callBack(err);
                }
            }
        );
    },
    updateUserById: (data, callBack) => {
        pool.query(
            //`update users set first_name = ?, last_name = ?, email = ?, contact = ?, designation = ?, username = ?  where id = ?`,//query
            `UPDATE users SET first_name=?, last_name=?, email=?, contact=?, designation=?, username=?, address = ? WHERE  id = ?`,
            [data.first_name, data.last_name, data.email, data.contact, data.designation, data.username, data.address, data.id],//passing parameters
            (err, results) => {//sending response
                if (err) {
                    return callBack(err);
                } else if (results) {
                    return callBack(null, "Profile updated successfully..!")
                } else {
                    return callBack("Unable to update your Profile..!")
                }
            }
        );
    },

    logoutUsers: (data, callback) => {

        pool.query(
            `select * from user where email = ?`,
            [
                data.email
            ],
            
                
                    (err, results) => {
                        if (err) {
                            return callback(err);
                        }
                        else if (results) {
                            return callback(null, results);
                        }
                    }
                
            
        );
    },
    logoutdetails: (callback) => {
        pool.query(`select * from logs`,

            (err, results) => {
                if (results.length == 0) {
                    var empty = "Data not found";
                    return callback(null, empty);
                } else if (results) {
                    return callback(null, null, results);
                } else {
                    return callback(err);
                }
            }
        );
    },
};