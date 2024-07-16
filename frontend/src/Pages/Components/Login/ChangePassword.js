import  React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SlideNotification from '../Alert/SlideNotification';
import { useNavigate } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { useAuthContext } from '../../../context/AuthContext';
import axios from '../../../api/axios';
import ApplicationStore from '../../../utils/localStorageUtil';

const LOGIN_URL = './auth/changePassword';

function ChangePassword() {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message,setMessage] = useState("");
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword,setConfirmNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const { Login, email, user} = useAuthContext();
  const  userDetails  = ApplicationStore().getStorage('empDetails'); 
  const navigate = useNavigate();
    
  const handleSubmit = (event) => {
        event.preventDefault();
      };
      
  
    const handleSave = async (e) => {
      e.preventDefault();         
      try{
        const data = {username:userDetails.username,email:userDetails.email,newPassword,oldPassword,confirmPassword:confirmNewPassword};  
        

        const response = await axios.post( LOGIN_URL,data,
          {
             headers: {'Content-Type':'application/json' }                    
          }
       );       
       const dataResponse = response.data;     
       if(dataResponse.success === 1){           
           setOpen(true);
           setMessage("Password Updated Successfully");
           setSeverity("success");
       }      
     
    }catch(err){
        if(!err?.response){
          console.log("No server response");
        }else{        
          console.log(err?.response.data);
          setOpen(true);
          setMessage("Something Went Wrong");
          setSeverity("error");
           
        }      
      }     
    }    

    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
            
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Change Password
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} >
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Old Password"
                name="oldPassword"
                autoComplete="password"
                type="password"
                autoFocus
                value={oldPassword}
                onChange={(e)=> { 
                  setOldPassword(e.target.value); 
                }}
                required
              />
              <TextField
                margin="normal"
                fullWidth
              
                label="New Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={newPassword}
                onChange={(e)=>setNewPassword(e.target.value)}
                required
              />
              <TextField
                margin="normal"
                fullWidth
              
                label="Confirm Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={confirmNewPassword}
                onChange={(e)=>setConfirmNewPassword(e.target.value)}
                required
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary"/>}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSave}
              >
                Submit
              </Button>          
            </Box>
          </Box>  
          <SlideNotification open={open} setOpen={setOpen} severity={severity} Message={message} />      
        </Container>
    );
};
export default ChangePassword;