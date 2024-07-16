import React , {useState, useEffect} from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import axios from "../../../../api/axios";
const URL = './adopt';

const AddPet = ({ open, setOpen, isAddButton, rowData, setRefreshData}) => {
    
    //basic information
    const [id, setId] = useState('');
    const [animal_name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [breed_name, setBreed] = useState('');
    const [helth_condition,setCondition] =useState('');
    const [description, setDesc]=useState('');
    const [age, setAge] = useState('');
    const [color, setColor] = useState('');
    const [city,setCity] =useState('');
    const [status, setStatus]=useState('');
    const [image, setImage]=useState('');
    


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
            const data = {animal_name,gender,city,status,image,breed_name,helth_condition,description,age,color};
            const mainURL = URL+'/add';
            serviceMethod(mainURL,method,data, handleSuccess, handleException);
        }else{
            const data = {id,animal_name,gender,city,status,image,breed_name,helth_condition,description,age,color};
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
                                    size="small"
                                        value={animal_name}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "name"
                                        variant = "outlined"
                                        fullWidth
                                        required
                                        onChange={(e) => { setName(e.target.value)}}
                                    />
                                </FormControl>
                               
                               </Grid>
                               <Grid item xs={6}>
                            <FormControl fullWidth>                      
                            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={gender}
                                    label="Age"
                                    onChange={(e)=>setGender(e.target.value)}
                                >
                                    <MenuItem value={"male"}>male</MenuItem>
                                    <MenuItem value={"female"}> female</MenuItem>
                                    {/* <MenuItem value={30}>Thirty</MenuItem> */}
                                </Select>
                                </FormControl>
                               
                               </Grid> 
                               <Grid item xs={6}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        size="small"
                                        value={breed_name}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "breed"
                                        variant = "outlined"
                                        fullWidth
                                        required
                                        onChange={(e) => { setBreed(e.target.value)}}
                                    />
                                </FormControl>
                               
                               </Grid>
                               <Grid item xs={12}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        size="small"
                                        value={helth_condition}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "condition"
                                        variant = "outlined"
                                        fullWidth
                                        required
                                        onChange={(e) => { setCondition(e.target.value)}}
                                    />
                                </FormControl>
                               
                               </Grid>
                               <Grid item xs={12}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        size="small"
                                        value={description}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "description"
                                        variant = "outlined"
                                        fullWidth
                                        required
                                        onChange={(e) => { setDesc(e.target.value)}}
                                    />
                                </FormControl>
                               
                               </Grid>
                               <Grid item xs={6}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        size="small"
                                        value={age}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "age"
                                        variant = "outlined"
                                        fullWidth
                                        required
                                        onChange={(e) => { setAge(e.target.value)}}
                                    />
                                </FormControl>
                               
                               </Grid> 
                               <Grid item xs={6}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        size="small"
                                        value={color}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "color"
                                        variant = "outlined"
                                        fullWidth
                                        required
                                        onChange={(e) => { setColor(e.target.value)}}
                                    />
                                </FormControl>
                               
                               </Grid> 
                               <Grid item xs={6}>
                            <FormControl fullWidth>                      
                                    <TextField 
                                        size="small"
                                        value={city}
                                        margin = "dense"
                                        id = "outlined-basic"
                                        label = "City"
                                        variant = "outlined"
                                        fullWidth
                                        required
                                        onChange={(e) => { setCity(e.target.value)}}
                                    />
                                </FormControl>
                               
                               </Grid> 
                               <Grid item xs={6}>
                            <FormControl fullWidth>                      
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={status}
                                    label="Age"
                                    onChange={(e)=>setStatus(e.target.value)}
                                >
                                    <MenuItem value={"available"}>available</MenuItem>
                                    <MenuItem value={"not available"}> notavailable</MenuItem>
                                    {/* <MenuItem value={30}>Thirty</MenuItem> */}
                                </Select>
                                </FormControl>
                               
                               </Grid> 
                               <Grid item xs={12}>
                            <FormControl fullWidth>                      
                            <TextField
                                        fullWidth
                                        
                                        onBlur={() => {
                                        }}
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files.length > 0) {
                                                setImage(e.target.files[0]);
                                                const reader = new FileReader();
                                                reader.onload = () => {
                                                    if (reader.readyState === 2) {
                                                        setImage(reader.result);
                                                    }
                                                }
                                                reader.readAsDataURL(e.target.files[0]);
                                            }
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                        type="file"
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

export default AddPet;