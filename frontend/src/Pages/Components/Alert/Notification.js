import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';



export default function Notification({message,severity,firstInfo,secInfo}) {
  return (
    <div>
        <Alert severity={severity}>
            {/* <AlertTitle>{message}</AlertTitle> */}
                {firstInfo} — <strong>{secInfo}!</strong>
        </Alert>
        <Box sx={{ width: '100%' }}>
           {severity == "success" ? "" : severity == "error" ? "" :  <LinearProgress />}
        </Box>
    </div>
  );
}