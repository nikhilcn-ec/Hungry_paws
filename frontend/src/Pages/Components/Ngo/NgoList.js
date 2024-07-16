import React , {useState, useEffect} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import NgoDailog from "./NgoDailog";
import { Grid } from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { DataGrid } from "@mui/x-data-grid";
import axios from '../../../api/axios';
const URL = './ngo';
  

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const NgoList=()=> {

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'first_name',
      headerName: 'first_name',
      width: 130,
      editable: true,
    },
    {
      field: 'last_name',
      headerName: 'last_name-ID',
      width: 220,
      editable: true,
    },
    {
      field: 'username',
      headerName: 'username',
      width: 150,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'email',
      width: 130,
      editable: true,
    },   
    {
      field: 'contact',
      headerName: 'contact',
      width: 150,
      editable: true,
    },  
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width:150,
        cellClassName:'actions',
        getActions : (params) => {
            return [
                    <EditData selectedRow={params.row}/>,
                    <DeleteData selectedRow={params.row} />,                        
                    
            ];            
        }            
    },    
];
      const [open,setOpen] = useState (false);
      const[isAddButton,setIsAddButton]=useState(true);
      const[editData,setEditData]=useState([]);
      const[dataList,setDataList]=useState([]);
      const[isLoading,setGridLoading]=useState(true);
      const[refreshData,setRefreshData]=useState(false);

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
    const serviceUpdateMethod = async (mainURL,data,handleSuccess,handleException) => {
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

  useEffect(() => {
      loadData();        
  },[refreshData]);

  const loadData = async () => {
      try{

         let URL='./ngo/';
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
  
  const EditData = (props) => {
      return (
          <ModeEditIcon style={{ cursor: "pointer" }} onClick={(e) => {
              e.stopPropagation();
              console.log(props.selectedRow.id);
              setEditData(props.selectedRow);
              setIsAddButton(false);
              setOpen(true);                
          }}/>
      );
  }
  
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
    
return(

  <>
   <div style={{marginTop:'0px', padding:'0px' }}>
        <div className = "">
            <Box sx={{ flexGrow: 1, padding:'10px' }}>
                <Grid container spacing={2}>
                    
                    <Grid item xs={12}>
                        <Button 
                        size="small" 
                        variant="contained"
                        color='secondary'style={{ marginTop:'5px', marginLeft: '0px' ,backgroundColor:'#4E4E4E'}} onClick={(e) => {
                            setIsAddButton(true);
                            setOpen(true);
                            setEditData([]);
                        }} >Add NGO</Button>
                    </Grid>                        
                </Grid>
            </Box>
        </div>
        <div className="">
            <Box sx={{ flexGrow: 0, padding:'0px', height: 400, width: '85%' }} >                    
                <DataGrid
                    rows={dataList}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}                          
                    experimentalFeatures={{ newEditingApi: true }}
                /> 
                <NgoDailog
                    isAddButton ={isAddButton}                        
                    setOpen ={setOpen} 
                    open={open}   
                    rowData={editData}        
                    setRefreshData={setRefreshData}        
                />
            </Box>           
        </div>
    </div>
  
     
    
      
   
    </> 
)
          
};
export default NgoList;
