import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Link from '@material-ui/core/Link';
import { useAuthContext } from '../../../context/AuthContext';
import axios from '../../../api/axios';
import Notification from '../Alert/Notification';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import ApplicationStore from '../../../utils/localStorageUtil';

const LOGIN_URL = './auth/login';


function Login() {


  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(0);
  const [message, setMessage] = useState("");
  const { Login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(1);
    setMessage("Loading ...")
    try {
      const data = { email, password };
      const response = await axios.post(LOGIN_URL, data,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      const dataResponse = response.data;

      var i = 0;
      function myTimer() {
        console.log("hello " + i);
        i++;
        if (i == 2 && dataResponse.success === 1) {
          setLoading(2);
          setMessage("Login successfull");
        }

        if (i == 4 && dataResponse.success === 1) {
          clearInterval(intervalId);

          const userData = {
            userToken: dataResponse.data.userToken,
            userRole: dataResponse.data.userRole,
            email: dataResponse.data.email,
            // companyCode: dataResponse.data.userCompany,
            empid: dataResponse.data.empid,
            empDetails: dataResponse.data.empDetails
          };

          Login(userData);
          if (dataResponse.data.userRole == "admin") {
            navigate('/Dashboard');
          } else if (dataResponse.data.userRole == "user") {
            navigate('/CustHome');
          }
             
           else {
            navigate('');
          }
          setEmail('');
          setPassword('');
        }
      }

      var intervalId = setInterval(myTimer, 1000);

    } catch (err) {
      if (!err?.response) {
        console.log("No server response");
      } else {
        console.log(err?.response.data);
        var i = 0;
        var intervalId;

        function myCatchTimer() {
          console.log("catch timer " + i);
          i++;
          if (i == 3) {
            clearInterval(intervalId);
            setMessage("Something Went Wrong!");
            setLoading(3);

            // Add any additional error handling logic here.
          }
        }
        intervalId = setInterval(myCatchTimer, 1000);
      }
    }
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
          <b>Login</b>
        </Typography>
       
        <Grid container>
          <Grid item xs>            
              <h5>New User ? &nbsp;
                <Link href="RegisterForm" variant="body2" style={{ color: 'purple' }}>
                  <b>Sign up here</b>
                </Link>
              </h5> 
          </Grid>
        </Grid>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} >
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setUser(e.target.value)
            }}
            
            required
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
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
          {
            loading == 1 ? <Notification severity={"info"} message={"Loading...."} firstInfo={"Please wait"} secInfo={message} /> :
              loading == 2 ? <Notification severity={"success"} message={"Login success"} firstInfo={"Thank for waiting"} secInfo={message} /> :
                loading == 3 ? <Notification severity={"error"} message={"Login success"} firstInfo={"Sorry"} secInfo={message} /> : ""
          }
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
            onClick={handleSave}
                  
          >
            Sign In

          </Button>
        
        </Box>
      </Box>
    </Container>
  );
};
export default Login;