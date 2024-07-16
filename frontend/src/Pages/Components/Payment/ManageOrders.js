import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, TextField, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import EditIcon from '@material-ui/icons/Edit';
import { DataGrid } from '@mui/x-data-grid';
import axios from "../../../api/axios";
import { useNavigate } from 'react-router-dom';
import Navbar from "../Main/components/Navbar";

const URL = './order/getBookings';

const ManageOrder = () => {

    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "barcode_number", headerName: "Order Number", width: 150 },
        // { field: "serving_time", headerName: "Serving Time", width: 130 },
        { field: "student_id", headerName: "Customer ID", width: 150 },
        
        { field: "booking_status", headerName: "Status", width: 150 },
        { field: "booking_date", headerName: "booking_date", width: 200 },
        { field: "program_date", headerName: "program_date", width: 150 },
        { field: "program", headerName: "program", width: 130 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 130,
            cellClassName: 'actions',
            getActions: (params) => {
                return [
                    <EditData selectedRow={params.row} />
                ];
            }
        },
    ];

    const [editData, setEditData] = useState([]);
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const [id, setId] = useState('');
    const navigate = useNavigate();
    const serviceUpdateMethod = async (mainURL, data, handleSuccess, handleException) => {
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
    const EditData = (props) => {
        return (
            <Button style={{ cursor: "pointer" }} 
            size='small'
            variant="contained"
            color="secondary"
            onClick={(e) => {
                e.stopPropagation();
                console.log(props.selectedRow.barcode_number);
                navigate('/CustViewOrder', { state: { barcode_number: props.selectedRow.barcode_number } });
                // setEditData(props.selectedRow);
                // setId(props.selectedRow.id);
                // setOpen(true);                
            }} >View</Button>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = "POST";
        const data = { id, amount };
        const mainURL = URL + '/' + data.id + '/update';
        console.log("URL:", URL + '/' + id + '/update');
        serviceMethod(mainURL, method, data, handleSuccess, handleException);
        setOpen(false);
    }



    const [dataList, setDataList] = useState([]);
    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {
        loadData();
    }, [refreshData]);

    const loadData = async () => {
        try {
            const response = await axios.post(URL);
            if (response.data.status == 401) {
                setDataList('');
            } else {
                setDataList(response.data.data);
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

    }

    const handleException = (data) => {
        console.log(data);
    }

    return (
        <>
            <Navbar />
            <Dialog
                fullWidth={true}
                maxWidth="lg"
                sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: '100%' } }}
                open={open}
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle>{"Service Charge"}</DialogTitle>
                    <DialogContent>
                        <Grid item xs={12}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={3}>
                                    <FormControl fullWidth>
                                        <TextField
                                            value={amount}
                                            margin="dense"
                                            id="outlined-basic"
                                            label="amount"
                                            variant="outlined"
                                            required
                                            onChange={(e) => { setAmount(e.target.value) }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions sx={{ margin: '10px' }}>
                        <Button
                            size="large"
                            variant="outlined"
                            autoFocus
                            onClick={(e) => {
                                setOpen(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            size="large"
                            variant="contained"
                            type="submit"
                        >
                            {"Update"}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            <div style={{ marginTop: '10px', padding: '2px' }}>
                <div className="GridContent">
                    <Box sx={{ flexGrow: 1, padding: '0px', height: 400, width: '80%',margin: 'auto',  flexDirection: 'column', justifyContent: 'center',marginTop:'60px' }} >  {/* Adjust the width here */}
                        <DataGrid
                            rows={dataList}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            experimentalFeatures={{ newEditingApi: true }}
                        />
                    </Box>
                </div>
            </div>
        </>
    );
}

export default ManageOrder;
