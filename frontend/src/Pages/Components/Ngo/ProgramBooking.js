
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import { useState,useEffect } from 'react';
import ApplicationStore from '../../../utils/localStorageUtil';
import axios from '../../../api/axios';
const URL="./booking";

function ProgramBooking ()  {    
    const columns = [
        { field: "id", headerName: "SL.NO", width: 150 },
        { field: "barcode_number", headerName: "barcode_number", width: 150 },
        { field: "student_id", headerName: "customer_id", width: 150 },
        { field: "booking_status", headerName: "booking_status", width: 150 },
        { field: "booking_date", headerName: "booking_date", width: 150 },
        { field: "program_date", headerName: "program_date", width: 150 },
        { field: "program", headerName: "program", width: 150 },

        { field: "place_id", headerName: "place_id  ", width: 150 },

          {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width:180,
            cellClassName:'actions',
            getActions : (params) => {
                return [
                        <EditData selectedRow={params.row}/>,
                       
                ];            
            }            
        },
      ];
      const empid= ApplicationStore().getStorage("empid");
      const [dataList, setDataList] = useState([]); 
      const [newbalance, setNewbalance] = useState(''); 
      const [id, setId] = useState(''); 


      useEffect(() => {
        loadData();        
    },[]);

    const loadData = async () => {
      try {
          const response = await axios.get(URL);
  
          if (response.data.status === 401) {
              setDataList([]);
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
  const handleRequest=()=>{
    // e.preventDefault();
    const URL2="./food";
    const method = "POST";    
        const data = {ngo_id:empid,booking_id:id};
        const mainURL = URL2+'/add';
        serviceMethod(mainURL,method,data, handleSuccess, handleException);


  }

      const [open,setOpen] =useState(false);
      const EditData = (props) => {
        return (
          <Button 
          style={{ cursor: "pointer" }} 
          onClick={() => {
            // e.stopPropagation();
            console.log(props.selectedRow.id);
            setId(props.selectedRow.id);
            handleRequest(); // Assuming handleRequest is a function you want to call
          }}
          size="small" 
          variant="contained"  
          color="secondary"
        >
          REQUEST FOOD
        </Button>
        
          );
          
    }
    const serviceMethod = async (mainURL,method,data,handleSuccess,handleException) => {
        try{
            const response = await axios.post(mainURL,data);
            return handleSuccess(response.data);  
        }catch(err){
            if(!err?.response){
                console.log("No server response");
            }else{                
                return handleException(err?.response.data);
            }
        }                  
      };
      
        
    
        const handleSuccess = (data) => {  
          console.log(data);
          alert("category name added successfully");
          setOpen(false);
        }
    
        const handleException = (data) => {
          alert("error adding category name");
          console.log(data);
        }

    
    return (
        <>
        
        <div className="GridContent">
        <div style={{ padding: '5px' }}>
        <Box sx={{ position: 'relative', top: '10px', left: '70px', height: 400, width: '90%' }}>
      <DataGrid
        rows={dataList}
        columns={columns}
      />    
    </Box>
  </div>
        </div>


        </>
      );
};
export default ProgramBooking;
      