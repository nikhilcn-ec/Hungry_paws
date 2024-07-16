import React , {useState, useEffect} from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import axios from "../../../../api/axios";
const URL = './purchase';

const SalAdd = ({ open, setOpen, isAddButton, setRefreshData,trackno,refreshComponent}) => {
    
  
    const [id, setId] = useState('');
    const [user_fullname,setFullname]=useState('');
    const [user_address,setAddress]=useState('');
    const [user_city,setCity]=useState('');
    const [user_pin,setPin]=useState('');
    const [payment_method,setMethod]=useState('');
    const [tracknoTotalPrice,setTracknoTotalPrice] = useState(0);
  
 
    


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
        try {        
            const data = {trackno,user_fullname,user_address,user_city,user_pin,payment_method};
            const mainURL = URL+'/add';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
        }
        catch(e){
            console.error(e);
            
        } 
    };
    
    useEffect(() => {
        const method = "POST";
        try {        
            const data = {id:trackno};
            const mainURL = 'track/getTotPrice';
            serviceMethod(mainURL,method,data, trackhandleSuccess, handleException);
        }
        catch(e){
            console.error("error"+e);
            
        } 
    },[trackno,refreshComponent]);
    
    
    const handleSuccess = (data) => {         
        setOpen(false);     
        setRefreshData((oldValue) => {
            return !oldValue;
        });
    }

    const trackhandleSuccess = (data) => {
        setTracknoTotalPrice(data.data);
        console.log("trackno from backen", data);
    };  

    const handleException = (data) => {
        console.log("tracknot found data");
    }

    return (
        <Dialog
            fullWidth = { true }
            maxWidth = "lg"
            sx = {{'& .MuiDialog-paper':{width: '100%', maxHeight: '100%' }}
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
                        
                        <Grid item xs={3}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        value={user_fullname}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "Full name"
                                        variant = "outlined"
                                        required
                                        
                                        onChange={(e) => { setFullname(e.target.value)}}
                                        
                                    />
                                </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        value={user_address}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "Address"
                                        variant = "outlined"
                                        required
                                        
                                        onChange={(e) => { setAddress(e.target.value)}}
                                        
                                    />
                                </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        value={user_city}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "City"
                                        variant = "outlined"
                                        required
                                        
                                        onChange={(e) => { setCity(e.target.value)}}
                                        
                                    />
                                </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        value={user_pin}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "Pin"
                                        variant = "outlined"
                                        required
                                        
                                        onChange={(e) => { setPin(e.target.value)}}
                                        
                                    />
                                </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">payment_method</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={payment_method}
                                label="Age"
                                onChange={ (e) => setMethod(e.target.value)}
                                >
                                <MenuItem value={"debit"}>debit</MenuItem>
                                <MenuItem value={"card"}>card</MenuItem>
                                <MenuItem value={"cash"}>cash</MenuItem>
                                <MenuItem value={"credit"}>credit</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <DialogTitle>
                                Total Price:{tracknoTotalPrice}
                            </DialogTitle>    
                        </Grid>
                        
                    </Grid>
                        
                    
                </Grid>                  
                                  
          </DialogContent>
          <DialogActions sx = {{ margin: '10px' }} >
                <Button 
                   size = "large"
                   variant = "outlined"
                   autoFocus 
                   onClick={(e)=>{
                          setOpen(false);
                         
                    }} >
                   Cancel 
               </Button> 
               <Button                 
                   size="large"
                   variant ="contained"
                   type = "submit">  {isAddButton ? "Add" : "Update"}
               </Button> 
            </DialogActions> 
            </form>            
    </Dialog>
    );
}

export default SalAdd