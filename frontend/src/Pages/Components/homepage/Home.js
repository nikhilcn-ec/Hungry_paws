import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link, Outlet, NavLink } from "react-router-dom"; 
import { useAuthContext } from '../../../context/AuthContext';
import AppBarNav from '../sidebar/Appbar';
import "./homepage.css";
import SideBarDrawer from '../sidebar/SidebarDrawer';
import Sidebar from '../sidebar/Sidebar';

const drawerWidth = 240;
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),  
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Home() {

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />     
     
      <div className='' style={{ display:""}}>
        <SideBarDrawer /> 
        <AppBarNav drawerWidth={drawerWidth} /> 
      </div>  
      <div className="content" >                       
        <DrawerHeader /> 
        <Outlet />        
      </div>
     
    </Box>
  );
}