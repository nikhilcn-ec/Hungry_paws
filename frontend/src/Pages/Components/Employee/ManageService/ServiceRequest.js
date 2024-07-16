import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, TextField, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import EditIcon from '@material-ui/icons/Edit';
import { DataGrid } from '@mui/x-data-grid';
import "./styles.css"; // Replace "styles.css" with the actual path to your CSS file

import axios from "../../../../api/axios";
const URL = './service/pending';

const ServiceRequest = () => {    

    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "first_name", headerName: "first name", width: 130 },
        { field: "last_name", headerName: "last name", width: 130 },
        { field: "contact", headerName: "contact", width: 130 },
        { field: "pname", headerName: "product name", width: 130 },
        { field: "problem", headerName: "problem", width: 130 },
        { field: "date", headerName: "date", width: 130 },
        { field: "status", headerName: "status", width: 130 },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 250,
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
            <EditIcon style={{ cursor: "pointer" }} onClick={(e) => {
                e.stopPropagation();
                console.log(props.selectedRow.id);
                setEditData(props.selectedRow);
                setId(props.selectedRow.id);
                setOpen(true);                
            }}/>
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
            const response = await axios.get(URL); 
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

    return  (
        <>
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
        <Box sx={{ flexGrow: 1, padding: '0px', height: 400, width: '100%' }} >  {/* Adjust the width here */}
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

export default ServiceRequest;
