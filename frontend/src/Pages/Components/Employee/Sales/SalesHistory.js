import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, TextField, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import EditIcon from '@material-ui/icons/Edit';
import { DataGrid } from '@mui/x-data-grid';

import axios from "../../../../api/axios";
const URL = './purchase';

const SalesHistory = () => {    

    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "product_track", headerName: "Bill NO", width: 130 },
        { field: "user_fullname", headerName: "Buyer name", width: 130 },
        { field: "user_address", headerName: "address", width: 130 },
        { field: "user_city", headerName: "city", width: 130 },
        { field: "user_pin", headerName: "pin code", width: 130 },
        { field: "payment_no", headerName: "payment No", width: 130 },
        { field: "payment_method", headerName: "Payment Method", width: 130 },
        { field: "amount", headerName: "Amount", width: 130 },
        { field: "date", headerName: "Date", width: 130 }
        
    ];

   

    
  
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
    
    

    return  (
        <>
            
            
            <div style={{ marginTop: '10px', padding: '2px', width: '100%' }}>
  <div className="GridContent" style={{ width: '100%' }}>
    <Box sx={{ flexGrow: 3, padding: '0px', height: 500, width: '90%' }}>
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

export default SalesHistory;
