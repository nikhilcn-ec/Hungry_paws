import axios from "./axios";
const serviceMethod = async (mainURL,method,data,handleSuccess,handleException) => {
    try{        
        if(method === "DELETE"){
            const response = await axios.delete(mainURL,data);
            return handleSuccess(response.data);  
        }
        if(method === "GET"){
            const response = await axios.get(mainURL);
            return handleSuccess(response.data);  
        }
        if(method === "POST"){
            const response = await axios.post(mainURL,data);
            return handleSuccess(response.data);  
        }
        
    }catch(err){
        if(!err?.response){
            console.log("No server response");                
        }else{                
            return handleException(err?.response.data);
        }
    }                  
};

export default serviceMethod;