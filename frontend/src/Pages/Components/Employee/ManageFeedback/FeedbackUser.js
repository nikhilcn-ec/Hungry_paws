

import React, { useEffect, useState } from "react";

import Box from '@mui/material/Box';

import { DataGrid } from '@mui/x-data-grid';

import axios from "../../../../api/axios";
const URL = './feedback';



const FeedbackUser = () => {

    const columns = [
        { field: "id", headerName: "ID", width: 150 },
        { field: "pname", headerName: "product name", width: 200 },
        { field: "feedback", headerName: "feedback", width: 200 },
        { field: "date", headerName: "date", width: 250 },
        { field: "status", headerName: "status", width: 200 },
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







    return (
        <div style={{ marginTop: '10px', padding: '2px' }}>

            <div className="GridContent">
                <Box sx={{ flexGrow: 1, padding: '0px', height: 400, width: '100%' }} >
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

export default FeedbackUser;