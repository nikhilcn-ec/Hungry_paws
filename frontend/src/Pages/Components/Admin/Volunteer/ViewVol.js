

import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';
import axios from "../../../../api/axios";

const URL = './volunteer';


const ViewVol = () => {    

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        {
          field: 'name',
          headerName: 'Full Name',
          width: 100,
          editable: true,
        },
        {
          field: 'contact',
          headerName: 'Contact Number',
          width: 130,
          editable: true,
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 100,
          editable: true,
        },
        {
            field: 'gender',
            headerName: 'Gender',
            width: 100,
            editable: true,
          },
          {
            field: 'date_of_birth',
            headerName: 'Date of Birth',
            width: 100,
            editable: true,
          },
          {
            field: 'address',
            headerName: 'Address',
            width: 100,
            editable: true,
          },
          {
            field: 'profession',
            headerName: 'Profession',
            width: 100,
            editable: true,
          },
          {
            field: 'reason',
            headerName: 'Reason',
            width: 100,
            editable: true,
          },
          {
            field: 'date',
            headerName: 'Date',
            width: 100,
            editable: true,
          },
          
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width:100,
            cellClassName:'actions',
            getActions : (params) => {
                return [
                        <DeleteData selectedRow={params.row} />,                        
                ];            
            }            
        },    
    ];
   
    const [open, setOpen] = useState(false);
    const [isAddButton, setIsAddButton] = useState(true);
    const [editData, setEditData] = useState([]);
    const [dataList, setDataList] = useState([]);        
    const [isLoading, setGridLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(false);
    

    const serviceMethod = async (mainURL,data,handleSuccess,handleException) => {
        try{        

            const response = await axios.delete(mainURL,data);
            return handleSuccess(response.data);  
        }catch(err){
            if(!err?.response){
                console.log("No server response");                
            }else{                
                return handleException(err?.response.data);
            }
        }                  
    };


    useEffect(() => {
        loadData();        
    },[refreshData]);

    const loadData = async () => {

        try{
             const response = await axios.get( URL ); 
               if(response.data.status == 401){
                   setDataList('');      
               }else{
                   setDataList(response.data.data);
               }
             
         }catch(err){

            if(!err?.response){
                console.log("No server response");
            }else{
                 console.log(err?.response.data);
            }
        } 
    };
    
    
    
    const DeleteData = (props) => {
        return (
            <DeleteIcon 
                onClick={() => {
                    console.log(props.selectedRow.id);
                    const data = {id:props.selectedRow.id};
                    const mainURL = URL +'/'+data.id+ '/delete';
                    serviceMethod(mainURL,data, handleSuccess, handleException);
                }}
            />
        );
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


    return  (
        <div style={{marginTop:'10px', padding:'25px' }}>
            
            <div className="GridContent">
                <Box sx={{ flexGrow: 1, padding:'0px', height: 400, left:"-120px", width: '100%' }} >                    
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
    );
}

export default ViewVol;