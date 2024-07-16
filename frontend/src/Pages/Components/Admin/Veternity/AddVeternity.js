import React , {useState, useEffect} from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import axios from "../../../../api/axios";
const URL = './veterinary';

const AddVeternity = ({ open, setOpen, isAddButton, rowData, setRefreshData}) => {
    
    //basic information
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude,setLongitude] =useState('');
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
            const data = {name,address,contact,latitude,longitude};
            const mainURL = URL+'/add';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
        }else{
            const data = {id,name,address,contact,latitude,longitude};
            const mainURL = URL +'/'+data.id+ '/update';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
        } 
    };

    useEffect(() => {
        setOpen(open);
        loadData();
    },[rowData]);

    const loadData = () => {
        // setId(rowData.id);
        // setTitle(rowData.title);
        // setDesc(rowData.desc);
        // setImage(rowData.image);
       
    };

    const handleSuccess = (data) => {         
        setOpen(false);     
        setRefreshData((oldValue) => {
            return !oldValue;
        });
        alert("success");
    }

    const handleException = (data) => {
        console.log(data);
        alert("error");
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
                                        label = "name"
                                        variant = "outlined"
                                        fullWidth
                                        required
                                        onChange={(e) => { setName(e.target.value)}}
                                    />
                                </FormControl>
                                <FormControl fullWidth>                      
                                    <TextField 
                                        value={address}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "address"
                                        variant = "outlined"
                                        fullWidth
                                        required
                                        onChange={(e) => { setAddress(e.target.value)}}
                                    />
                                </FormControl>
                                <FormControl fullWidth>                      
                                    <TextField 
                                        value={contact}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "contact"
                                        variant = "outlined"
                                        fullWidth
                                        required
                                        onChange={(e) => { setContact(e.target.value)}}
                                    />
                                </FormControl>
                                <FormControl fullWidth>                      
                                    <TextField 
                                        value={latitude}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "latitude"
                                        variant = "outlined"
                                        fullWidth
                                        required
                                        onChange={(e) => { setLatitude(e.target.value)}}
                                    />
                                </FormControl>
                                <FormControl fullWidth>                      
                                <TextField 
                                        value={longitude}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "longitude"
                                        variant = "outlined"
                                        fullWidth
                                        required
                                        onChange={(e) => { setLongitude(e.target.value)}}
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

export default AddVeternity;