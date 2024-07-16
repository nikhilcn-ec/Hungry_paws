import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import axios from "../../../api/axios";
const URL = './department';

const SupplierAdd = ({ open, setOpen, isAddButton, rowData, setRefreshData }) => {

    //basic information
    const [id, setId] = useState('');
    const [supplierName, setSupplierName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [place, setPlace] = useState('');
  
    const [address, setAddress] = useState('');
    const [gstIN, setGstIN] = useState('');
    const [categorylist, setCategorylist] = useState([]);
    const [category_id, setCategory_id] = useState('');




    const handleImageClear = () => {
       // setImage(null);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = "POST";
        if (isAddButton) {
            const data = { name:supplierName,place_id:place, supplier_name:supplierName, supplier_gstin:gstIN,supplier_address:address,supplier_phone_number:contactNo};
            const mainURL = URL + '/add';
            serviceMethod(mainURL, method, data, handleSuccess, handleException);
        } else {
            const data = { };
            const mainURL = URL + '/' + data.id + '/update';
            serviceMethod(mainURL, method, data, handleSuccess, handleException);
        }
    };

    useEffect(() => {
        setOpen(open);
        loadData();
    }, [rowData]);

    const loadData = async () => {
        // setId(rowData.id);
        // setPname(rowData.pname);
        // setPrice(rowData.price);
        // setDescription(rowData.description);
        // setImage(rowData.image);
        // setType(rowData.type);
        // setDescription(rowData.description);
        // setCategory_id(rowData.category_id);

        try {
            let URL = './place/';
            const response = await axios.get(URL);
            if (response.data.status == 401) {
                setCategorylist('');
            } else {
                setCategorylist(response.data.data);
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
        setOpen(false);
        setRefreshData((oldValue) => {
            return !oldValue;
        });
    }

    const handleException = (data) => {
        console.log(data);
    }

    return (
        <Dialog
            fullWidth={true}
            maxWidth="lg"
            sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: '100%' } }
            }
            open={open}
        >

            <form onSubmit={handleSubmit} >
                <DialogTitle>
                    {isAddButton ? "Add Supplier" : "Edit Supplier"}
                </DialogTitle>
                <DialogContent>
                    <Grid item xs={12}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Place Name</InputLabel>
                                    <Select

                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={place}
                                        label="Category name"
                                        onChange={(e) => {
                                            setPlace(e.target.value);
                                            console.log(e.target.value);
                                        }}
                                    >
                                        {categorylist.map(category => (
                                            <MenuItem value={category.place_id}>{category.place_name}</MenuItem>

                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <TextField
                                        value={supplierName}
                                        margin="dense"
                                        id="outlined-basic"
                                        label="name"
                                        variant="outlined"
                                        required

                                        onChange={(e) => { setSupplierName(e.target.value) }}

                                    />
                                </FormControl>
                            </Grid>


                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <TextField
                                        value={gstIN}
                                        margin="dense"
                                        id="outlined-basic"
                                        label="GSTIN"
                                        variant="outlined"
                                        required
                                        onChange={(e) => { setGstIN(e.target.value) }}

                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <TextField
                                        value={contactNo}
                                        margin="dense"
                                        id="outlined-basic"
                                        label="Contact No"
                                        variant="outlined"
                                        required

                                        onChange={(e) => { setContactNo(e.target.value) }}

                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <TextField
                                        value={address}
                                        margin="dense"
                                        id="outlined-basic"
                                        label="Address"
                                        variant="outlined"
                                        required

                                        onChange={(e) => { setAddress(e.target.value) }}

                                    />
                                </FormControl>
                            </Grid>
                           


                           


                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions sx={{ margin: '10px' }} >
                    <Button
                        size="large"
                        variant="outlined"
                        autoFocus
                        onClick={(e) => {
                            setOpen(false);

                        }} >
                        Cancel
                    </Button>
                    <Button
                        size="large"
                        variant="contained"
                        type="submit">  {isAddButton ? "Add" : "Update"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default SupplierAdd;