import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function SlideNotification ({open,setOpen,severity,Message}){
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }    
        setOpen(false);
    };

    return(
        <Snackbar anchorOrigin={{ vertical:"bottom", horizontal:"right" }} open={open} autoHideDuration={6000} onClose={handleClose}  >
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%', }}>
            {Message}
          </Alert>
        </Snackbar>
    );
}

export default SlideNotification;