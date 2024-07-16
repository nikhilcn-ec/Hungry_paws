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

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),
  url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
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

const URL = "./feedback";

const Checkout = () => {
  const empid = ApplicationStore().getStorage("empid");
  const [pname, setPname] = useState('');
  const [productlist, setProductlist] = useState([]);
  const [product_id, setProduct_id] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showDataGridForm, setShowDataGridForm] = useState(false);
  const [feedbacklist, setFeedbacklist] = useState([]);

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
    const data = { empid, product_id: pname, feedback };
    const mainURL = URL + '/add';
    serviceMethod(mainURL, method, data, handleSuccess, handleException);
    setShowDataGridForm(true);
  };

  useEffect(() => {
    loadData();
    loadData2();
  }, []);

  const loadData = async () => {
    try {
      let URL = './products/';
      const response = await axios.get(URL);
      if (response.data.status == 401) {
        setProductlist([]);
      } else {
        setProductlist(response.data.data);
      }
    } catch (err) {
      if (!err?.response) {
        console.log("No server response");
      } else {
        console.log(err?.response.data);
      }
    }
  };
  const loadData2 = async () => {
    try {
      const response = await axios.get(URL);
      if (response.data.status == 401) {
        setFeedbacklist([]);
      } else {
        setFeedbacklist(response.data.data);
      }
    } catch (err) {
      if (!err?.response) {
        console.log("No server response");
      } else {
        console.log(err?.response.data);
      }
    }
  };
  const handleSuccess = (data) => {
    alert("submitted");
  };

  const handleException = (data) => {
    console.log(data);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "first_name", headerName: "first name", width: 130 },
    { field: "last_name", headerName: "last name", width: 130 },
    { field: "contact", headerName: "contact", width: 130 },
    { field: "pname", headerName: "product name", width: 130 },
    { field: "feedback", headerName: "feedback", width: 130 },
    { field: "date", headerName: "date", width: 130 },
    { field: "status", headerName: "status", width: 130 },
  ];

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          {showDataGridForm ? (
            <DataGridForm feedbacklist={feedbacklist} columns={columns} />
          ) : (
            <>
              <Title>Your Feedback</Title>
              <Form>
                <FormControlWrapper>
                  <InputLabelWrapper id="demo-simple-select-label">Product Name</InputLabelWrapper>
                  <SelectWrapper
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={pname}
                    label="Age"
                    onChange={(e) => {
                      setPname(e.target.value);
                    }}
                  >
                    {productlist.map(product => (
                      <MenuItem key={product.id} value={product.id}>{product.pname}</MenuItem>
                    ))}
                  </SelectWrapper>
                </FormControlWrapper>
                <TextFieldWrapper
                  id="outlined-multiline-static"
                  label="Multiline"
                  multiline
                  rows={4}
                  value={feedback}
                  onChange={(e) => {
                    setFeedback(e.target.value);
                  }}
                />
                <Agreement>
                  <b></b>
                </Agreement>
                <ButtonWrapper type="submit" onClick={handleSubmit}>
                  SUBMIT
                </ButtonWrapper>
              </Form>
            </>
          )}
        </Wrapper>
      </Container>
    </>
  );
};

const DataGridForm = ({ feedbacklist, columns }) => {
//   if (!feedbacklist || !columns) {
//     return (
//       <DataGridWrapper>
//         <p>Loading...</p>
//       </DataGridWrapper>
//     );
//   }

  return (
    <DataGridWrapper>
      <h3>Your Feedback</h3>
      <DataGrid rows={feedbacklist} columns={columns} pageSize={5} />
    </DataGridWrapper>
  );
};

export default Checkout;
