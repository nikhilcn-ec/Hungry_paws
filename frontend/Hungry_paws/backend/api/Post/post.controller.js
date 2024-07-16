const { creates, gets, getsById, updates, deletesById } = require("./post.services");
const fs = require('fs');

module.exports = {
    create:(req,res) => {
        const body = req.body;
        let docType = "";       
        uploadDocument(req.body.resumeDoc,"resumeDoc");
        
        
        // if(body.image === ""){
        // }else{
        //     docType = "image";
        //     body.image = uploadDocument(req.body.image,docType);
        // }


        if(body.image === ""){
            
        }else{
            docType = "productImage";
            body.image = uploadDocument(req.body.image,docType);
        }
        
        creates(body, (err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    data:err
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    data:results
                });
            }
        });
     },
     getById:(req,res) => {
        const id = req.params.id;
        getsById(id,(err,results) => {
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
     get:(req,res) => {        
        gets((err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    data:err
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    data:results
                });
            }
        });
     },
     update:(req,res) => {
        const body = req.body;
        const id = req.params.id;
        updates(body, id, (err, results) => {
            if(err){
                return res.status(500).json({
                    success:0,
                    message:err
                });
            }else{
                return res.status(200).json({
                    sucsess:1,
                    message:results
                });
            }
        });
     },
     deleteById:(req,res) => {
        const id = req.params.id;
        deletesById(id, (err, results) => {
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


const uploadDocument = (doc,docType) => {

    let folderName = "";
    let DocPath = "";
    let DocData = doc;
    let base64Data = "";

    const saveFile = (folderPath,folderName,DocData) => {
        DocPath = folderName + '/' + Date.now()+'.jpg';  
        Path  = folderPath + '/' + Date.now()+'.jpg';  
        // to convert base64 format into random filename
        base64Data = DocData.replace(/^data:([A-Za-z-+/]+);base64,/, ''); 
    
        if (!fs.existsSync(folderName)) {                
            fs.mkdirSync(folderName);
            fs.writeFileSync(DocPath, base64Data,  {encoding: 'base64'});                         
        }else{
            fs.writeFileSync(DocPath, base64Data,  {encoding: 'base64'});
        }       
        
        return Path;
    };

    switch(docType){          
            
        case "productImage":
            folderName = './Images/productImage';
            folderPath = '/Images/productImage'; 
            DocPath = saveFile(folderPath,folderName,DocData);    
            break;         

        default:            
            break;
    }    
    
    return DocPath;
     
}