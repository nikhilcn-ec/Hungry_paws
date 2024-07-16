import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import axios from "../../../api/axios";
const URL = './products';

const ProdAdd = ({ open, setOpen, isAddButton, rowData, setRefreshData }) => {

    //basic information
    const [id, setId] = useState('');
    const [pname, setPname] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [categorylist, setCategorylist] = useState([]);
    const [category_id, setCategory_id] = useState('');




    const handleImageClear = () => {
        setImage(null);
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
            const data = { category_id: name, pname, price, description, image, type };
            const mainURL = URL + '/add';
            serviceMethod(mainURL, method, data, handleSuccess, handleException);
        } else {
            const data = { id, category_id, pname, price, description, image, type };
            const mainURL = URL + '/' + data.id + '/update';
            serviceMethod(mainURL, method, data, handleSuccess, handleException);
        }
    };

    useEffect(() => {
        setOpen(open);
        loadData();
    }, [rowData]);

    const loadData = async () => {
        setId(rowData.id);
        setPname(rowData.pname);
        setPrice(rowData.price);
        setDescription(rowData.description);
        setImage(rowData.image);
        setType(rowData.type);
        setDescription(rowData.description);
        setCategory_id(rowData.category_id);

        try {
            let URL = './category/';
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
                    {isAddButton ? "Add product" : "Edit product"}
                </DialogTitle>
                <DialogContent>
                    <Grid item xs={12}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Category Name</InputLabel>
                                    <Select

                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={name}
                                        label="Category name"
                                        onChange={(e) => {
                                            setName(e.target.value);
                                            console.log(e.target.value);
                                        }}
                                    >
                                        {categorylist.map(category => (
                                            <MenuItem value={category.id}>{category.name}</MenuItem>

                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <TextField
                                        value={pname}
                                        margin="dense"
                                        id="outlined-basic"
                                        label="name"
                                        variant="outlined"
                                        required

                                        onChange={(e) => { setPname(e.target.value) }}

                                    />
                                </FormControl>
                            </Grid>


                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <TextField
                                        value={price}
                                        margin="dense"
                                        id="outlined-basic"
                                        label="price"
                                        variant="outlined"
                                        required
                                        onChange={(e) => { setPrice(e.target.value) }}

                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <TextField
                                        value={description}
                                        margin="dense"
                                        id="outlined-basic"
                                        label="description"
                                        variant="outlined"
                                        required
                                        onChange={(e) => { setDescription(e.target.value) }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    {/* <div>
                                    <Input
                                        type="file"
                                        inputProps={{ accept: 'image/*' }}
                                        onChange={handleImageUpload}
                                    />
                                    <Button onClick={handleImageClear} disabled={!image}>
                                        Clear Image
                                    </Button>
                                    {image && <img src={image} alt="Uploaded" />}
                                </div> */}
                                    <TextField
                                        fullWidth
                                        label="Product Image"

                                        onBlur={() => {
                                            //validateForNullValue(customerLogo, 'customerLogo');
                                        }}
                                        onChange={(e) => {
                                            if (e.target.files && e.target.files.length > 0) {
                                                setImage(e.target.files[0]);
                                                const reader = new FileReader();
                                                reader.onload = () => {
                                                    if (reader.readyState === 2) {
                                                        setImage(reader.result);
                                                        //   setPreviewBuilding(reader.result);
                                                    }
                                                }
                                                reader.readAsDataURL(e.target.files[0]);
                                            }
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                        type="file"
                                    // inputProps={{
                                    //     accept:"image/png",
                                    // }}
                                    />
                                </FormControl>
                            </Grid>


                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                <InputLabel id="warranty-label">Type</InputLabel>
                                <Select
                                    labelId="warranty-label"
                                    id="warranty-select"
                                    value={type}
                                    onChange={(e) => { setType(e.target.value) }}
                                    label="Warranty"
                                >
                                    <MenuItem value="Veg">Veg</MenuItem>
                                    <MenuItem value="Non Veg">Non Veg</MenuItem>                                    
                                    {/* Add more MenuItem components for additional options */}
                                </Select>
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

export default ProdAdd;