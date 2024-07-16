import React , {useState, useEffect} from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { InputLabel } from "@mui/material";
import Select from '@mui/material/Select';
import axios from "../../../api/axios";
const URL ='./ngo';

const NgoDailog=({open, setOpen, isAddButton, rowData, setRefreshData})=>{
    const [id,setId] = useState('');
    const [first_name, setFirstname] = useState('');
    const [last_name,setLastname]=useState('');
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [contact,setContact]=useState('');
    const [password,setPassword]=useState('');
    const [departmentList,setDepartmentList]=useState('');
    
    // const [error, setError] = useState({ userName: false, email: false, confirmPassword: false, });

    const serviceMethod = async(mainURL,method,data,handleSuccess,handleException)=>{
      try{
        const response = await axios.post(mainURL,data);
            return handleSuccess(response.data);
      }
      catch(err){
        if(!err?.response){
            console.log("No server response");                
        }else{                
            return handleException(err?.response.data);
        }
    }           
    };

    const handleSubmit=(e)=>{
      e.preventDefault();
      const method ="POST";
      if(isAddButton){
        const data ={first_name,last_name,username,email,contact,password};
        const mainURL = URL + '/add';
        serviceMethod(mainURL,method,data,handleSuccess,handleException);
      
      }else{
        const data ={id,first_name,last_name,username,email,contact,password};
        const mainURL=URL+'/'+data.id+'/update';
        serviceMethod(mainURL,method,data,handleSuccess,handleException);

      }

    };

    useEffect(() => {
      setOpen(open);
      loadData();
  },[rowData]);

  const loadData = async() => {
     

      try{
        let URL='./ngo/';
        const response = await axios.get( URL );              
        if(response.data.status == 401){
            setDepartmentList('');      
        }else{
            setDepartmentList(response.data.data);
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

    

    return(
        <>
      <Dialog open={open} >
      <form onSubmit={handleSubmit} >
        <DialogTitle>{isAddButton ? "Add User" : "Edit User"}</DialogTitle>
        <DialogContent>
          
        <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={first_name}
                  onChange={(e) => { setFirstname(e.target.value)}}
                  autoFocus
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "purple",
                      },
                    },
                  }}
                  InputLabelProps={{
                    style: { color: 'purple' }, // Change to the desired label color
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={last_name}
                  onChange={(e) => { setLastname(e.target.value)}}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "purple",
                      },
                    },
                  }}
                  InputLabelProps={{
                    style: { color: 'purple' }, // Change to the desired label color
                  }}
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Username"
                  name="lastName"
                  autoComplete="family-name"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value)}}sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "purple",
                      },
                    },
                  }}
                  InputLabelProps={{
                    style: { color: 'purple' }, // Change to the desired label color
                  }}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  
                  onChange={(e) => { setEmail(e.target.value)}}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "purple",
                      },
                    },
                  }}
                  InputLabelProps={{
                    style: { color: 'purple' }, // Change to the desired label color
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Phone number"
                  name="email"
                  autoComplete="email"
                  value={contact}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "purple",
                      },
                    },
                  }}
                  InputLabelProps={{
                    style: { color: 'purple' }, // Change to the desired label color
                  }}
                  onChange={(e) => { setContact(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete=""
                  value={password}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "purple",
                      },
                    },
                  }}
                  InputLabelProps={{
                    style: { color: 'purple' }, // Change to the desired label color
                  }}
                  onChange={(e) => { setPassword(e.target.value)}}
                />
              </Grid>
              
            </Grid>
            </DialogContent>
            <DialogActions>
              
          <Button sx={{color:'black'}}
          onClick={(e)=>{setOpen(false);}} color='secondary'>
            Cancel 
            </Button>


          <Button variant='contained' color='secondary'
          type ="submit" 
          sx={{bgcolor:'#4E4E4E','&:hover':{bgcolor:'#302f2f'}}}>
            {isAddButton?"Add":"Update"}
          </Button>
          
        </DialogActions>
        </form>
      </Dialog>
        </>
    )
};
export default NgoDailog;