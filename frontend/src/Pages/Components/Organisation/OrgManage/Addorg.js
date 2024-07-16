import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, TextField, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import axios from '../../../../api/axios';
const URL = './organisation';

const Addorg = ({ open, setOpen, isAddButton, rowData, setRefreshData }) => {

    const [id, setId] = useState('');
    const [first_name, setName] = useState('');
    const [last_name, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [designation, setDesignation] = useState('');


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
        // if (validateForm()) {
        const method = "POST";
        if (isAddButton) {
            const data = { first_name, last_name, email, contact, address, designation };
            const mainURL = URL + '/add';
            serviceMethod(mainURL, method, data, handleSuccess, handleException);
        } else {
            const data = { id, first_name, last_name, email, contact, address, designation };
            const mainURL = URL + '/' + data.id + '/update';
            serviceMethod(mainURL, method, data, handleSuccess, handleException);
        }
        // }
    };

    useEffect(() => {
        setOpen(open);
        loadData();
    }, [rowData]);

    const loadData = () => {
        setId(rowData.id);
        setName(rowData.first_name);
        setLastname(rowData.last_name);
        setEmail(rowData.email);
        setContact(rowData.contact);
        setAddress(rowData.address);
        setDesignation(rowData.designation);

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
                    {isAddButton ? "Add Organisation" : "Edit Organisation"}
                </DialogTitle>
                <DialogContent>
                    <Grid item xs={12}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <TextField
                                        value={first_name}
                                        margin="dense"
                                        id="outlined-basic"
                                        label="first Name"
                                        variant="outlined"
                                        required
                                        // error={!!orgNameError}
                                        // helperText={orgNameError}
                                        onChange={(e) => { setName(e.target.value) }}

                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <TextField
                                        value={last_name}
                                        margin="dense"
                                        id="outlined-basic"
                                        label="last name"
                                        variant="outlined"
                                        required
                                        // error={!!orgAddressError}
                                        // helperText={orgAddressError}
                                        onChange={(e) => { setLastname(e.target.value) }}

                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <TextField
                                        value={email}
                                        margin="dense"
                                        id="outlined-basic"
                                        label="email"
                                        variant="outlined"

                                        required
                                        // error={!!phoneError}
                                        // helperText={phoneError}
                                        onChange={(e) => { setEmail(e.target.value) }}

                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <TextField
                                        value={contact}
                                        margin="dense"
                                        id="outlined-basic"
                                        label="contact"
                                        variant="outlined"
                                        required
                                        // error={!!emailError}
                                        // helperText={emailError}
                                        onChange={(e) => { setContact(e.target.value) }}

                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <TextField
                                        value={address}
                                        margin="dense"
                                        id="outlined-basic"
                                        label="address"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        // error={!!contactNameError}
                                        // helperText={contactNameError}
                                        onChange={(e) => { setAddress(e.target.value) }}

                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <TextField
                                        value={designation}
                                        margin="dense"
                                        id="outlined-basic"
                                        label="designation"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        // error={!!contactNameError}
                                        // helperText={contactNameError}
                                        onChange={(e) => { setDesignation(e.target.value) }}

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
export default Addorg;