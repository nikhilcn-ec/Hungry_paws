import React from 'react';
import "./sidebar.css";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Navigate } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useAuthContext } from '../../../context/AuthContext';
import ApplicationStore from '../../../utils/localStorageUtil';

const Navbar = ({toggle}) => {    
    const { user, Logout } = useAuthContext();
    const userRole = ApplicationStore().getStorage('userRole');
    const copmanyCode = ApplicationStore().getStorage('userCompany');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        Logout();

    };

    return(
        <header className='header'>
            <div className='navbar__title navbar__item'  style={{ textAlign:'center'}}></div>
            <div className='navbar__title navbar__item'  style={{ textAlign:'center'}}>Wellcome To {copmanyCode} Organisation </div> 
            <div className='navbar_right'  style={{ textAlign:'right'}}>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        style={{ color: 'white'}}
                    >
                        <PersonOutlineIcon /><h3 style = {{ marginLeft:'5px'}}>{userRole}</h3>
                    </Button>
                   <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
            </div> 
        </header>



    );
}

export default Navbar;