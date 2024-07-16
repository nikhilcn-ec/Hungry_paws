import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Navbar from "../components/Navbar";
import axios from "../../../../api/axios";
import ApplicationStore from "../../../../utils/localStorageUtil";
import { DataGrid } from "@mui/x-data-grid";
import { Description } from "@material-ui/icons";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),
  url("flat.jpg")
    center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin: 20px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const FormControlWrapper = styled(FormControl)`
  width: 100%;
  margin: 10px 0;
`;

const InputLabelWrapper = styled(InputLabel)`
  margin-bottom: 10px;
`;

const SelectWrapper = styled(Select)`
  width: 100%;
`;

const TextFieldWrapper = styled(TextField)`
  width: 100%;
  margin-bottom: 10px;
`;

const ButtonWrapper = styled(Button)`
  width: 100%;
  background-color: teal;
  color: white;
  margin-top: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0;
`;

const DataGridWrapper = styled.div`
  width: 100%;
  height: 400px;
`;

const URL = "./volunteer";

const Volunteer = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [date_of_birth, setDate] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [reason, setReason] = useState('');
  const [profession, setProfession] = useState('');
  



  const serviceMethod = async (mainURL, method, data, handleSuccess, handleException) => {
    try {
      const response = await axios.post(mainURL, data);
      return handleSuccess(response.data);
    } catch (err) {
      if (!err?.response) {
        console.log("No server response");
      } else {
        return handleException(err?.response.data);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = "POST";
    const data = { name,contact,email,gender,date_of_birth,address,profession,reason};
    const mainURL = URL + '/add';
    serviceMethod(mainURL, method, data, handleSuccess, handleException);
    
  };

  
  
  const handleSuccess = (data) => {
    alert("submitted");
    
  };

  const handleException = (data) => {
    console.log(data);
  };

  

  return (
    <>
      {/* <Navbar />
      <Container>
        <Wrapper>
          
            <>
              <Title>Add Volunteer</Title>
              <Form>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                    <TextFieldWrapper
                  id="outlined-m    ultiline-static"
                  label="Enter Name"
                  size="small"
                  rows={4}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                </Grid>
                <Grid item xs={12}>
                <TextFieldWrapper
                  id="outlined-m    ultiline-static"
                  label="Contact_Number"
                  size="small"
                  rows={4}
                  value={contact}
                  onChange={(e) => {
                    setContact(e.target.value);
                  }}
                />
                </Grid>
                <Grid item xs={12}>
                <TextFieldWrapper
                  id="outlined-m    ultiline-static"
                  label="Enter Email"
                  size="small"
                  rows={4}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                </Grid>
                <Grid item xs={12}>
                <TextFieldWrapper
                  id="outlined-m    ultiline-static"
                  size="small"
                  type="date"
                  rows={4}
                  value={date_of_birth}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
                </Grid>
                <Grid item xs={12}>
                <FormControlWrapper>
                  <InputLabelWrapper id="demo-simple-select-label">Gender</InputLabelWrapper>
                  <SelectWrapper
                  size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={gender}
                    label="Age"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  >
              <MenuItem value={"male"}>male</MenuItem>
              <MenuItem value={"female"}>female</MenuItem>
              

                  </SelectWrapper>
                </FormControlWrapper>
                </Grid>
                <Grid item xs={12}>
                <TextFieldWrapper
                  id="outlined-m    ultiline-static"
                  label="Enter Address"
                  size="small"
                  rows={4}
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
                </Grid>
                <Grid item xs={12}>
                <TextFieldWrapper
                  id="outlined-m    ultiline-static"
                  label="Enter Reason"
                  size="small"
                  rows={4}
                  value={reason}
                  onChange={(e) => {
                    setReason(e.target.value);
                  }}
                />
                </Grid>
                <Grid item xs={12}>
                <TextFieldWrapper
                  id="outlined-m    ultiline-static"
                  label="Profession"
                  size="small"
                  rows={4}
                  value={profession}
                  onChange={(e) => {
                    setProfession(e.target.value);
                  }}
                />
                </Grid>
                
                </Grid>
                <Agreement>
                  <b></b>
                </Agreement>
                <ButtonWrapper type="submit" onClick={handleSubmit}>
                  SUBMIT
                </ButtonWrapper>
              </Form>
            </>
          
        </Wrapper>
      </Container> */}
       <section className="ftco-appointment ftco-section  img" style={{backgroundImage: 'url(images/bg_3.jpg)'}}>
  <div className="overlay" />
  <div className="container">
    <div className="row d-md-flex justify-content-end">
      <div className="col-md-12 col-lg-6 half p-3 py-5 pl-lg-5 ">
        <h2 className="mb-4">Volunteer</h2>
        <form action="#" className="appointment">
          <div className="row">
            
            <div className="col-md-6">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Your name"  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Your contact"   value={contact}
                  onChange={(e) => {
                    setContact(e.target.value);
                  }}/>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Your email"    value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}/>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
              <div className="input-wrap">
			            		<div className="icon"><span className="fa fa-calendar"></span></div>
                <input type="text" className="form-control appointment_date" placeholder="Your date_of_birth"   value={date_of_birth}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}/>
                </div>  
              </div>
            </div>
            <div className="col-md-12">
  <div className="form-group">
    <div className="form-field">
      <div className="select-wrap">
        <div className="icon"><span className="fa fa-chevron-down" /></div>
        <select name id className="form-control" value={gender}
                    label="gender"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}>
          <option value={"male"}>male</option>
          <option value={"female"}>female</option>
         
        </select>
      </div>
    </div>
  </div>
</div>

            <div className="col-md-12">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Your address"    value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Your reason"   value={reason}
                  onChange={(e) => {
                    setReason(e.target.value);
                  }}/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Your profession"    value={profession}
                  onChange={(e) => {
                    setProfession(e.target.value);
                  }}/>
              </div>
            </div>
            {/* <div className="col-md-12">
              <div className="form-group">
                <textarea type="text"cols="30" rows="7" className="form-control" placeholder="Your Description" value={description}
                  onChange={(e) => {
                    setDesc(e.target.value);
                  }}/>
              </div>
            </div> */}
           
            
            
            
            <div className="col-md-12">
              <div className="form-group">
                <input type="submit" defaultValue="Send message" className="btn btn-primary py-3 px-4" onClick={handleSubmit} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
    </>
  );
};



export default Volunteer;
