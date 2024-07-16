import React, { useState, useEffect } from 'react';
import {Button, Box, FormControl, Input, InputLabel, MenuItem, Select, TextField, Grid} from '@mui/material';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import { DataGrid } from '@mui/x-data-grid';
import { useAuthContext } from '../../../../context/AuthContext';
import axios from '../../../../api/axios';
import SalAdd from './SalAdd';

const URL = './track';

const FormSal = () => {
  const { trackNo } = useAuthContext();
  const [id, setId] = useState('');
  const [product_id, setProd_id] = useState('');
  const [quantity, setQuantity] = useState('');
  const [productlist, setProduct_list] = useState([]);
  const [pname, setPname] = useState('');
  const [dataList, setDataList] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [refreshComponent, setRefreshComponent] = useState(false);
  const [isAddButton, setIsAddButton] = useState(true);
  const [open, setOpen] = useState(false);
  const [trackno, setTrackno] = useState('');

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'product_id', headerName: 'product name', width: 150 },
    { field: 'quantity', headerName: 'quantity', width: 150 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      cellClassName: 'actions',
      getActions: (params) => {
        return [

          <DeleteData selectedRow={params.row} />

        ];
      }
    },
  ];

  useEffect(() => {
    loadData();
    setTrackno(trackNo);
    console.log("track" + trackNo);
  }, [refreshData, trackNo]);

  const loadData = async () => {
    try {
      const response = await axios.get(URL);
      if (response.data.status === 401) {
        setDataList('');
      } else {
        setDataList(response.data.data);
      }
    } catch (err) {
      if (!err?.response) {
        console.log('No server response');
      } else {
        console.log(err?.response.data);
      }
    }
    try {
      const productURL = './products/';
      const response = await axios.get(productURL);
      if (response.data.status === 401) {
        setProduct_list('');
      } else {
        setProduct_list(response.data.data);
      }
    } catch (err) {
      if (!err?.response) {
        console.log('No server response');
      } else {
        console.log(err?.response.data);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = 'POST';
    try {
      const data = { product_id: pname, quantity, trackno };
      const mainURL = URL + '/add';
      serviceMethod(mainURL, method, data, handleSuccess, handleException);
    } catch (e) {
      console.error(e);
    }
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
    setOpen(false);
    setRefreshData((oldValue) => {
      return !oldValue;
    });
  };



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
  };


  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <form onSubmit={handleSubmit} style={{ flex: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              value={trackno}
              margin="dense"
              id="outlined-basic"
              label="Trackno"
              variant="outlined"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Product Name</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pname}
                label="Product Name"
                onChange={(e) => {
                  setPname(e.target.value);
                }}
              >
                {productlist.map((product) => (
                  <MenuItem value={product.id}>{product.pname}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={quantity}
              margin="dense"
              id="outlined-basic"
              label="Quantity"
              variant="outlined"
              required
              fullWidth
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              size="large"
              variant="contained"
              type="submit"
              fullWidth
            >
              Add
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              size="large"
              onClick={(e) => {
                setIsAddButton(true);
                setOpen(true);
                setRefreshComponent((oldValue) => {
                  return !oldValue;
                });
              }}
              variant="contained"
              fullWidth
            >
              Purchase
            </Button>
          </Grid>
        </Grid>
      </form>
      <div style={{ flex: 2 }}>
        <Box sx={{ flexGrow: 3, padding: '0px', height: 400, width: '90%' }}>

          <DataGrid rows={dataList} columns={columns} />
          <SalAdd
            isAddButton={isAddButton}
            setOpen={setOpen}
            open={open}
            setRefreshData={setRefreshData}
            trackno={trackno}
            refreshComponent={refreshComponent}
          />
        </Box>
      </div>
    </div>
  );
};

export default FormSal;
