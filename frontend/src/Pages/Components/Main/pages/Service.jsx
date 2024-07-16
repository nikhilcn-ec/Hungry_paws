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
const URL = "./service";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5)
  ),
  url("https://static.toiimg.com/thumb/79998972.cms?resizemode=4&width=1200")
    center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 90%;
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
const Desc = styled.p`
  margin: 20px 0px;
`;


const Service = () => {
  const empid = ApplicationStore().getStorage("empid");
  const [pname, setPname] = useState('');
  const [productlist, setProductlist] = useState([]);
  const [product_id, setProduct_id] = useState('');
  const [problem, setProblem] = useState('');
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
    const data = { empid, product_id: pname, problem };
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
    { field: "problem", headerName: "problem", width: 130 },
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
              <Title>Our Service</Title>
              <Desc>
                Online Catering provides full-service wedding catering for your special day.
                We created two wedding packages to make planning your wedding easier than ever.We guide you through curating the perfect menu for you and your guests.
              </Desc>
              <Desc>
                Parties need to be impressive as it reflects one’s persona.Guests expect an enjoyable evening
                and a spectacular dining experience.Food at these  party events is an entertainment element and at the end of the day what you really want.
              </Desc>

              <Desc>
                Birthday party catering services, Naming ceremony catering services, House warming ceremony catering services,
                Baby shower catering services, Engagement catering services, Wedding Reception catering services, Puja & all other Traditional function catering services
              </Desc>

              <Desc>
                Our corporate catering package is an easy drop-off or pick-up service.
                Simply contact us and like magic, large trays of restaurant-quality food will come to you.
                With additional vegan-friendly, gluten-free, and low-carb options, Of Food has your catering covered.
              </Desc>
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

export default Service;
