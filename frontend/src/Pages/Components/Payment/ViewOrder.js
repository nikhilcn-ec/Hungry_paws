import React, { useState, useEffect } from 'react';
import {
  Button, Box, Typography,FormControl, Input, InputLabel, MenuItem, Select, TextField, Grid,
} from '@mui/material';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import { DataGrid } from '@mui/x-data-grid';
import axios from '../../../api/axios';
import { Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import { useAuthContext } from '../../../context/AuthContext';
import Navbar from '../Main/components/Navbar';

// import SalAdd from './SalAdd';

const URL = './order/getBarcodeItems';

const ViewOrder = () => {
  const [id, setId] = useState('');
  const [product_id, setProd_id] = useState('');
  const [dataList, setDataList] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [refreshComponent, setRefreshComponent] = useState(false);
  const [isAddButton, setIsAddButton] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [name,setName] = useState(""); 
  const [address,setAddress] = useState("");
  const [contact,setContact] = useState("");
  const [open, setOpen] = useState(false);
  const [trackno, setTrackno] = useState('');
  const [subTotal, setSubTotal] = useState(0);
  const {state} = useLocation();

  const barcode_number = state ? state.barcode_number : null;

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'pname', headerName: 'Item', width: 150 },
    { field: 'quantity', headerName: 'quantity', width: 150 },
    { field: 'price', headerName: 'Price', width: 150 },
    { field: 'Total', headerName: 'Total', width: 150, renderCell: (params) => <div>{params.row.quantity * params.row.price}</div> },
    
  ];

  useEffect(() => {
    loadData();
    console.log("barcode"+barcode_number);

  }, [barcode_number]);

  const loadData = async () => {
        const method = 'POST';
        try {
        const data = { barcode_number: barcode_number };
        const mainURL = URL;
        serviceMethod(mainURL, method, data, handleSuccess, handleException);
        } catch (e) {
        console.error(e);
        }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
  };
  const serviceMethodUpdate = async (mainURL, data, handleSuccess, handleException) => {
    try {

      const response = await axios.delete(mainURL, data);
      return handleSuccess(response.data);
    } catch (err) {
      if (!err?.response) {
        console.log("No server response");
      } else {
        return handleException(err?.response.data);
      }
    }
  };

  const serviceMethod = async (mainURL, method, data, handleSuccess, handleException) => {
    try {
      const response = await axios.post(mainURL, data);
      return handleSuccess(response.data);
    } catch (err) {
      if (!err?.response) {
        console.log('No server response');
      } else {
        return handleException(err?.response.data);
      }
    }
  };

  const handleSuccess = (data) => {
    setDataList(data.data.barCodeItems);
    calculateSubTotal(data.data.barCodeItems);
    setPaymentStatus(data.data.stuData[0].booking_status);
    setName(data.data.stuData[0].student_name);
    setAddress(data.data.stuData[0].student_address);
    setContact(data.data.stuData[0].student_contact);    
  };

  const calculateSubTotal = (cart) => {
    let total = 0;
    if (cart.length > 0) {
      cart.forEach(item => {
        total += parseInt(item.price) * parseInt(item.quantity);
      });
    }
    setSubTotal(total);
  }

  const CustomFooterStatusComponent = (props) => {
    return (
      <Box sx={{ p: 1, display: 'flex' }}>
        <Grid item xs={2}>          
            <b>Grand Total:</b> &nbsp;{subTotal} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;         
        </Grid>       
        <Grid item xs={2}>           
              <b>PaymentStatus:</b> {paymentStatus}            
          </Grid>
      </Box>
    );
  }

  const DeleteData = (props) => {
    return (
      <DeleteIcon
        onClick={() => {
          console.log(props.selectedRow.id);
          const data = { id: props.selectedRow.id };
          const mainURL = URL + '/' + data.id + '/delete';
          serviceMethodUpdate(mainURL, data, handleSuccess, handleException);
        }}
      />
    );
  };
  const handleException = (data) => {
    console.log(data);
    setDataList([]);
    setPaymentStatus('');
    setSubTotal('');
  };
  const navigate=useNavigate();
  const handleBack=()=>{
    navigate("/CustManageOrder");
  }


  return (
    <>
    <Navbar/>
<Box sx={{ p: 2, bgcolor: 'grey.200', borderRadius: 4, width: '700px', height: '500px', margin: 'auto',  flexDirection: 'column', justifyContent: 'center',marginTop:'30px' }}>
          <Typography variant="h5" gutterBottom>
          Order Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1">
              <b>BarCode Number:</b> {barcode_number}
            </Typography>
            <Typography variant="body1">
              <b>Name:</b> {name}
            </Typography>
            <Typography variant="body1">
              <b>Address:</b> {address}
            </Typography>
            <Typography variant="body1">
              <b>Mobile no:</b> {contact}
            </Typography>
          </Grid>

          {/* Render each item manually with headings */}
          <Grid container item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
            <Typography variant="body1">Item Name</Typography>
            <Typography variant="body1">Quantity</Typography>
            <Typography variant="body1">Price</Typography>
            <Typography variant="body1">Total Price</Typography>
          </Grid>

          {dataList.map((item) => (
            <Grid container item xs={12} key={item.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1">{item.pname}</Typography>
              <Typography variant="body1">{item.quantity}</Typography>
              <Typography variant="body1">{item.price}</Typography>
              <Typography variant="body1">{item.quantity * item.price}</Typography>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Typography variant="body1">
              <b>Grand Total:</b> {subTotal}
            </Typography>
            <Typography variant="body1">
              <b>Payment Status:</b> {paymentStatus}
            </Typography>
          </Grid>
          <Grid container spacing={2}>
          <Grid item xs={10}>
            </Grid>
          <Grid item xs={2}>
          <Button variant="contained"color='secondary' size='small' onClick={handleBack}>Back</Button>
          </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ViewOrder;