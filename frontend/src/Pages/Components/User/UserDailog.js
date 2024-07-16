import React , {useState, useEffect} from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { InputLabel } from "@mui/material";
import Select from '@mui/material/Select';
import axios from "../../../api/axios";
const URL ='./userRegister';

const UserDailog=({open, setOpen, isAddButton, rowData, setRefreshData})=>{
    const [id,setId] = useState('');
    const [username, setUsername] = useState('');
    const [email,setEmail]= useState('');
    const [phone,setPhone] = useState('');
    const [password,setPassword] = useState('');
    const [didx,setDidx] = useState('');
    const [departmentList, setDepartmentList] = useState([]);
    const [department, setDepartment] = useState('');
    
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
        const data ={username,email,phone,password,didx:department};
        const mainURL = URL + '/add';
        serviceMethod(mainURL,method,data,handleSuccess,handleException);
      
      }else{
        const data ={id,username,email,phone,password,didx};
        const mainURL=URL+'/'+data.id+'/update';
        serviceMethod(mainURL,method,data,handleSuccess,handleException);

      }

    };

    useEffect(() => {
      setOpen(open);
      loadData();
  },[rowData]);

  const loadData = async() => {
      setId(rowData.id );
      setUsername(rowData.username);
      setEmail(rowData.email);
      setPhone(rowData.phone);
      setPassword(rowData.password);
      setDidx(rowData.didx);

      try{
        let URL='./department/';
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
          
          <TextField
          value={username}
            autoFocus
            margin="dense"
            id="outlined-basic"
            label="User Name"
            fullWidth
            variant="standard"
            onChange={(e)=>{setUsername(e.target.value)}}
          />

          <TextField
          value={email}
            margin="dense"
            id="outlined-basic"
            label="Email-ID"
            fullWidth
            variant="standard"
            onChange={(e)=>{setEmail(e.target.value)}}
          />
          <TextField
            value={phone}
            margin="dense"
            id="outlined-basic"
            label="Phone number"
            fullWidth
            variant="standard"
            onChange={(e)=>{setPhone(e.target.value)}}
             />


          <TextField
            value={password}
            margin="dense"
            id="outlined-basic"
            label="Password"
            fullWidth
            variant="standard"
            onChange={(e)=>{setPassword(e.target.value)}}
          />
              <FormControl fullWidth> 
              <InputLabel id="demo-simple-select-label">department</InputLabel>
              <Select
              
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={department}
              label="DEPARTMENT"
              onChange={(e) => {
                   setDepartment(e.target.value);
                  console.log(e.target.value);
              }}         
              >
              {departmentList.map(department => (
                  <MenuItem  value={department.id}>{department.deptName}</MenuItem>
                            
              ))}
              </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              
          <Button sx={{color:'black'}}
          onClick={(e)=>{setOpen(false);}}>
            Cancel 
            </Button>


          <Button variant='contained' 
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
export default UserDailog;