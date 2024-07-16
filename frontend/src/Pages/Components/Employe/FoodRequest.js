
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogContent, DialogTitle, FormControl, Input, InputLabel, MenuItem, Select, TextField, Grid } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import { useState,useEffect } from 'react';
import ApplicationStore from '../../../utils/localStorageUtil';
import axios from '../../../api/axios';
const URL="./food";

function FoodRequest ()  {    
    const columns = [
      { field: "id", headerName: "SL.NO", width: 150 },
      { field: "first_name", headerName: "first_name", width: 150 },
      { field: "program", headerName: "program", width: 220 },
      { field: "program_date", headerName: "program_date", width: 150 },
      { field: "request_status", headerName: "request_status", width: 150 },
      { field: "request_date", headerName: "request_date", width: 150 },
        

          {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width:190,
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
          const data = {id};
          const mainURL = URL2 +'/'+data.id+ '/update';
          serviceMethod(mainURL,method,data, handleSuccess, handleException);


  }
  const handleFoodRequest=()=>{
    // e.preventDefault();
    const URL2="./food";
    const method = "POST";
          const data = {id};
          const mainURL = URL2 +'/'+data.id+ '/updateReject';
          serviceMethod(mainURL,method,data, handleSuccess2, handleException2);


  }

      const [open,setOpen] =useState(false);
      const EditData = (props) => {
        return (
            <>
            <Button 
              size="small" 
              variant="contained"
              color='secondary'
              style={{ cursor: "pointer" }} 
              onClick={() => {
                // e.stopPropagation();
                console.log(props.selectedRow.id);
                setId(props.selectedRow.id);
                handleRequest(); // Assuming handleRequest is a function you want to call
              }}
            >
              ACCEPT
            </Button>
            <Button 
            size="small" 
            variant="contained"
            color='secondary'
            style={{ cursor: "pointer" }} 
            onClick={() => {
              // e.stopPropagation();
              console.log(props.selectedRow.id);
              setId(props.selectedRow.id);
              handleFoodRequest(); // Assuming handleRequest is a function you want to call
            }}
          >
            REJECT
          </Button>
          </>
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
          alert("Succesffully accepted food request");
          setOpen(false);
        }
    
        const handleException = (data) => {
          alert("Succesffully accepted food request");
          console.log(data);
        }
        const handleSuccess2 = (data) => {  
          console.log(data);
          alert("Succesffully Rejected food request");
          setOpen(false);
        }
    
        const handleException2 = (data) => {
          alert("Succesffully Rejected food request");
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
export default FoodRequest;
      