import React , {useState, useEffect} from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import axios from "../../../api/axios";
const URL = './category';

const CatAdd = ({ open, setOpen, isAddButton, rowData, setRefreshData}) => {
    
    //basic information
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    // const [orgaddress, setAddress] = useState('');
    // const [phone, setPhone] = useState('');
    // const [email, setEmail] = useState('');
    // const [contactname,setContact] =useState('');
    // const [logo, setLogo]=useState('');
    


    const serviceMethod = async (mainURL,method,data,handleSuccess,handleException) => {
        try{
            const response = await axios.post(mainURL,data);
            return handleSuccess(response.data);  
        }catch(err){
            if(!err?.response){
                console.log("No server response");                
            }else{                
                return handleException(err?.response.data);
            }
        }                  
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = "POST";
        if(isAddButton){           
            const data = {name};
            const mainURL = URL+'/add';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
        }else{
            const data = {id,name};
            const mainURL = URL +'/'+data.id+ '/update';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
        } 
    };

    useEffect(() => {
        setOpen(open);
        loadData();
    },[rowData]);

    const loadData = () => {
        setId(rowData.id );
        setName(rowData.name );

       
    };

    const handleSuccess = (data) => {         
        setOpen(false);     
        setRefreshData((oldValue) => {
            return !oldValue;
        });
    }

    const handleException = (data) => {
        console.log(data);
    }

    return (
        <Dialog
            
            maxWidth = ""
            sx = {{'& .MuiDialog-paper':{width: '30%', maxHeight: '100%' }}
            }
            open={open}
        >

          <form onSubmit={handleSubmit} >
            <DialogTitle>
                {isAddButton ? "Add Category" : "Edit Category"}
            </DialogTitle>        
            <DialogContent>
                <Grid item xs={12}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        value={name}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "Name"
                                        variant = "outlined"
                                        fullWidth
                                        required
                                        
                                        onChange={(e) => { setName(e.target.value)}}
                                        
                                    />
                                </FormControl>
                        </Grid>
                      
                    </Grid>
                </Grid>                  
                                  
          </DialogContent>
          <DialogActions sx = {{ margin: '10px' }} >
                <Button 
                   size = "large"
                   variant = "outlined"
                   color="secondary"
                   autoFocus 
                   onClick={(e)=>{
                          setOpen(false);
                         
                    }} >
                   Cancel 
               </Button> 
               <Button                 
                   size="large"
                   variant ="contained"
                   type = "submit"
                   color="secondary">  {isAddButton ? "Add" : "Update"}
               </Button> 
            </DialogActions> 
            </form>            
    </Dialog>
    );
}

export default CatAdd;