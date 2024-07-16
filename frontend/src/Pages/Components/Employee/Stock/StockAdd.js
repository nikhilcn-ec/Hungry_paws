import React , {useState, useEffect} from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import axios from "../../../../api/axios";
const URL = './stock';

const StockAdd = ({ open, setOpen, isAddButton, rowData, setRefreshData}) => {
    
    //basic information
    const [id, setId] = useState('');
    const [product_id, setProd_id] = useState('');
    const [quantity,setQuantity]=useState('');
    const [productlist, setProduct_list] = useState([]);
    const [pname, setPname] = useState('');
   


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
            const data = {product_id:pname,quantity};
            const mainURL = URL+'/add';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
        }else{
            const data = {id,product_id,quantity};
            const mainURL = URL +'/'+data.id+ '/update';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
        } 
    };

    useEffect(() => {
        setOpen(open);
        loadData();
    },[rowData]);

    const loadData =async () => {
        setId(rowData.id );
        setProd_id(rowData.product_id );
        setQuantity(rowData.quantity);
        try{
            let URL='./products/';
            const response = await axios.get( URL );              
            if(response.data.status == 401){
                setProduct_list('');      
            }else{
                setProduct_list(response.data.data);
            }
        }catch(err){
            if(!err?.response){
                console.log("No server response");
            }else{
                 console.log(err?.response.data);
            }
        } 

       
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
                            <InputLabel id="demo-simple-select-label">Product Name</InputLabel>
                            <Select
                            
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={pname}
                            label="Category name"
                            onChange={(e) => {
                                setPname(e.target.value);
                                console.log(e.target.value);
                            }}         
                            >
                            {productlist.map(product => (
                                <MenuItem  value={product.id}>{product.pname}</MenuItem>
                                            
                            ))}
                            </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        value={quantity}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "Name"
                                        variant = "outlined"
                                        required
                                        
                                        onChange={(e) => { setQuantity(e.target.value)}}
                                        
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

export default StockAdd;