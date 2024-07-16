import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
const URL = './userRegister';




export default function RegisterForm() {
    const [id, setId] = useState('');
    const [first_name, setFirstname] = useState('');
    const [last_name,setLastname]=useState('');
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [contact,setContact]=useState('');
    const [password,setPassword]=useState('');
    const navigate = useNavigate();

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
        try{      
            const data = {first_name,last_name,username,email,contact,password};
            const mainURL = URL+'/add';
            serviceMethod(mainURL,method,data, handleSuccess,handleException);
        }catch(e){
        console.error(e);}
        } 

        const handleSuccess = (data) => {         
            console.log(data);
            alert("registered successfully");
            navigate('/Login');   
        }
    
        const handleException = (data) => {
            console.log(data);
        }
    
  

  return (
    
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, mb: 2,
                 background:"purple", 
                 height:"50px",
                 '&:hover': {
                    background: "#80008036", // Change to the desired hover color
                    color:"purple"
                 }, 
                
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="Login" variant="body2" style={{ color: 'purple' }}>
                  <b>Return To Sign Up?</b>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    
  );
}