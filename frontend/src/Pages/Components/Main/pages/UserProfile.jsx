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
import axios from '../../../../api/axios';
import { useAuthContext } from '../../../../context/AuthContext';
import ApplicationStore from '../../../../utils/localStorageUtil';
import Navbar from "../components/Navbar";
const URL = './userRegister';

export default function UserProfile() {
  
 
  const empid= ApplicationStore().getStorage("empid");
  const [id, setId] = useState(''); // If needed
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [designation, setDesignation] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {   
    loadData();
  },[]);


  const loadData = async () => {  
    
      try{
            const response = await axios.get('auth/getUserById',{
              headers: {'Content-Type':'application/json', "empid":empid },  
                      
           }); 
              if(response.data.status == 401){
                  
              }else{
                setFirstName(response.data.data[0].first_name);
                setLastName(response.data.data[0].last_name);
                setUserName(response.data.data[0].username);
                setEmail(response.data.data[0].email);
                setContact(response.data.data[0].contact);
                setDesignation(response.data.data[0].designation);
                setAddress(response.data.data[0].address);
                 
              }
            
        }catch(err){    
          if(!err?.response){
              console.log("No server response");
          }else{
                console.log(err?.response.data);
          }
      }    
 };


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
        const data = {first_name:firstName,last_name:lastName,username:username,email,contact,designation,address};
        const mainURL = 'auth/updateUserByID';
        serviceMethod(mainURL,method,data, handleSuccess,handleException);
    }catch(e){
      console.error(e);
    }
  } 

  const handleSuccess = (data) => {         
        console.log(data);
         
  }

  const handleException = (data) => {
        console.log(data);
  }



  // The rest of your component code, including handleSubmit and input fields.
  
  return (
    <>
    <Navbar />
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
        {/* ... Avatar, Typography, and other elements ... */}

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
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoFocus
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
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
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
                  onChange={(e) => { setContact(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="address"
                  type="address"
                  id="address"
                  autoComplete=""
                  value={address}
                  onChange={(e) => { setAddress(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="designation"
                  label="designation"
                  type="designation"
                  id="designation"
                  autoComplete=""
                  value={designation}
                  onChange={(e) => { setDesignation(e.target.value)}}
                />
              </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update
          </Button>
        </Box>
      </Box>
    </Container>
    </>
  );
}
