
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useState,useEffect } from 'react';
import axios from '../../../api/axios';
const URL="./food/get";

function BookingRequest ()  {    
    const columns = [
        { field: "id", headerName: "SL.NO", width: 150 },
        { field: "first_name", headerName: "first_name", width: 150 },
        { field: "program", headerName: "program", width: 220 },
        { field: "program_date", headerName: "program_date", width: 150 },
        { field: "request_status", headerName: "request_status", width: 150 },
        { field: "request_date", headerName: "request_date", width: 150 },
         
      ];
    
      const [dataList, setDataList] = useState([]); 

      useEffect(() => {
        loadData();        
    },[]);

    const loadData = async () => {
      try {
          const response = await axios.get(URL);
  
          if (response.data.status === 401) {
              setDataList([]);
          } else {
              const responseData = response.data.data;
              for (let i = 0; i < responseData.length; i++) {
                  responseData[i].id = i + 1;
              }
              setDataList(responseData);
          }
      } catch (err) {
          if (!err?.response) {
              console.log("No server response");
          } else {
              console.log(err?.response.data);
          }
      }
  };
    
    return (
      <div style={{ padding: '5px' }}>
      <Box sx={{ position: 'relative', top: '10px', left: '70px', height: 400, width: '90%' }}>
      <DataGrid
        rows={dataList}
        columns={columns}
      />    
    </Box>
  </div>
      );
};
export default BookingRequest;
      