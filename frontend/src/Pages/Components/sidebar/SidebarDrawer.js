import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link, Outlet, NavLink } from "react-router-dom";
import { useAuthContext } from '../../../context/AuthContext';
import ApplicationStore from "../../../utils/localStorageUtil";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  zindex: 1
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),

  // Set the height
  height: '100px', // You can adjust the value as needed

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function SideBarDrawer() {

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [openSubList, setOpenSubList] = React.useState(false);
  const { user, Logout, trackgeneration } = useAuthContext();
  const [sidebarIndex, setSidebarIndex] = React.useState(0);
  const userRole = ApplicationStore().getStorage('userRole');

  const handleSideBar = () => {
    setOpen(!open);
  };

  const [active, setActive] = React.useState(false);

  const menuItemsAdmin = [
    {
      path: "/Dashboard",
      name: "Dashboard",
      // icon:<DashboardCustomizeIcon />
    },
    {
      path: "/ViewWork",
      name: "Our Work",
      //icon:<PersonOutlineIcon />
    },
    {
      path: "/ViewVol", 
      name: "Volunteer",
      //icon:<PersonOutlineIcon />
    },
    {
      path: "/ViewRescue", 
      name: "Rescue",
      //icon:<PersonOutlineIcon />
    },
    {
      path: "/ViewGallery", 
      name: "Gallery",
      //icon:<PersonOutlineIcon />
    },
    {
      path: "/ViewDonation", 
      name: "Donation",
    },
    {
      path:"/ViewPet",
      name:"Pet Dog"
    },
    {
      path: "/ViewPetRequest",
      name: "Pet Request",
      // icon:<PersonOutlineIcon />
    },
  

    
    {
      path: "/ViewVaccine",
      name: "Vaccination",
      // icon:<LockResetSharpIcon />
    },
    {
      path: "/ViewVeternity",
      name: "Veterinary",
      // icon:<LockResetSharpIcon />
    },
    {
      path: "/ChangePassword",
      name: "Setting",
      // icon:<LockResetSharpIcon />
    },
    
    
  ];

  const menuItemsUser = [
    {
      path: "/DashboardNgo",
      name: "Dashboard",
      //icon:<DashboardCustomizeIcon />
    },
    {
      path: "/ProgramBooking",
      name: "Program Booking",
      //icon:<PersonOutlineIcon />
    },
    {
      path: "/BookingRequest",
      name: "Booking Request",
      //icon:<PersonOutlineIcon />
    },
    
    {
      path: "/Profile",
      name: "Profile",
      // icon:<PersonOutlineIcon />
    },
  

    
    {
      path: "/ChangePassword",
      name: "Setting",
      // icon:<LockResetSharpIcon />
    },
    
    {
      path: "/Logout",
      name: "Logout",
      //icon:<LogoutIcon />
    },

  ]



  const handleSubList = () => {
    setOpenSubList(!openSubList);

    // const newArray = [...menuItemsAdmin];

    // // Modify the item at the specified index


    // newArray[sidebarIndex].openState;

    // // Update the state with the new array
    // setMenuItemsAdmin(newArray);



  }

  return (
    <Drawer variant="permanent" open={open} >
      <DrawerHeader style={{ backgroundColor: "white" }}>
        {/* <IconButton onClick={handleSideBar} style={{ color:"white"  }}>
                    {open === true ? <ChevronLeftIcon /> : <ChevronRightIcon /> }
                </IconButton> */}
      </DrawerHeader>
      <Divider style={{ backgroundColor: "purple" }} />
      <List style={{ padding: '10px' }} >
        {
          userRole == "admin" ?
            menuItemsAdmin.map((text, index) => (
              text.childrens ?
                <div key={text.name}> {/* Make sure to add a unique key */}
                  <Link to={text.path} style={{ textDecoration: 'none' }} onClick={() => setSidebarIndex(index)}>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                      <ListItemButton
                        sx={{
                          minHeight: 10,
                          justifyContent: open ? 'initial' : 'center',
                          px: 2.5,
                          bgcolor: index === sidebarIndex ? "purple" : "",
                          borderRadius: open ? '10px' : '',
                          "&:hover": {
                            //backgroundColor: 'rgba(255, 255, 255, 0.04)'
                          }
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                            color: index === sidebarIndex ? 'purple' : 'grey'
                          }}
                        >
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text.name} sx={{ opacity: open ? 10 : 0, color: "grey" }} />
                        {text.childrens ? (
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : 'auto',
                              justifyContent: 'center',
                              color: index === sidebarIndex ? 'purple' : 'grey'
                            }}
                          >
                            <IconButton onClick={() => handleSubList(index)} style={{ color: "white" }}>
                              {openSubList && sidebarIndex === index ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                            </IconButton>
                          </ListItemIcon>
                        ) : ""}
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  {text.childrens && openSubList && sidebarIndex === index ? (
                    text.childrens.map((childText, childIndex) => (
                      <Link to={childText.path} style={{ textDecoration: 'none' }} onClick={() => setSidebarIndex(childIndex)}>
                        <ListItem key={childText} disablePadding sx={{ display: 'block', height: 50 }} onClick={(e) => { trackgeneration(e); }}>
                          <ListItemButton
                            sx={{
                              justifyContent: open ? 'initial' : 'center',
                              px: 2.5,
                              bgcolor: childIndex === sidebarIndex ? "rgba(255, 255, 255, 0.04)" : "",
                              borderRadius: open ? '10px' : '',
                              "&:hover": {
                                backgroundColor: 'rgba(255, 255, 255, 0.04)'
                              }
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                                color: childIndex === sidebarIndex ? 'white' : '#0745bbf0'
                              }}
                            >
                              {/* Add appropriate icons here */}
                            </ListItemIcon>
                            <ListItemText primary={childText.name} sx={{ opacity: open ? 10 : 0, color: "white" }} />
                          </ListItemButton>
                        </ListItem>
                      </Link>
                    ))
                  ) : null}
                </div>

                : <Link to={text.path} style={{ textDecoration: 'none' }} onClick={(e) => { setSidebarIndex(index) }} >
                  <ListItem key={text} disablePadding sx={{ display: 'block', height: 50 }} onClick={(e) => { trackgeneration(e) }} >
                    <ListItemButton
                      sx={{
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                        backgroundColor: index === sidebarIndex ? "#80008036" : "",
                        borderRadius: open ? '10px' : '',
                        "&: hover": {
                          backgroundColor: 'purple'                         
                        }
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                          color: index === sidebarIndex ? 'purple' : 'grey',
                        
                        }}
                      >
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text.name} sx={{ opacity: open ? 10 : 0, color: index === sidebarIndex ? 'purple' : 'grey' }} />
                    </ListItemButton>
                  </ListItem>
                </Link>
            )) :
            userRole == "user" ?
            menuItemsUser.map((text, index) => (
              text.childrens ?
                <div key={text.name}> {/* Make sure to add a unique key */}
                  <Link to={text.path} style={{ textDecoration: 'none' }} onClick={() => setSidebarIndex(index)}>
                    <ListItem disablePadding sx={{ display: 'block' }}>
                      <ListItemButton
                        sx={{
                          minHeight: 10,
                          justifyContent: open ? 'initial' : 'center',
                          px: 2.5,
                          bgcolor: index === sidebarIndex ? "purple" : "",
                          borderRadius: open ? '10px' : '',
                          "&:hover": {
                            //backgroundColor: 'rgba(255, 255, 255, 0.04)'
                          }
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                            color: index === sidebarIndex ? 'purple' : 'grey'
                          }}
                        >
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text.name} sx={{ opacity: open ? 10 : 0, color: "grey" }} />
                        {text.childrens ? (
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : 'auto',
                              justifyContent: 'center',
                              color: index === sidebarIndex ? 'purple' : 'grey'
                            }}
                          >
                            <IconButton onClick={() => handleSubList(index)} style={{ color: "white" }}>
                              {openSubList && sidebarIndex === index ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                            </IconButton>
                          </ListItemIcon>
                        ) : ""}
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  {text.childrens && openSubList && sidebarIndex === index ? (
                    text.childrens.map((childText, childIndex) => (
                      <Link to={childText.path} style={{ textDecoration: 'none' }} onClick={() => setSidebarIndex(childIndex)}>
                        <ListItem key={childText} disablePadding sx={{ display: 'block', height: 50 }} onClick={(e) => { trackgeneration(e); }}>
                          <ListItemButton
                            sx={{
                              justifyContent: open ? 'initial' : 'center',
                              px: 2.5,
                              bgcolor: childIndex === sidebarIndex ? "rgba(255, 255, 255, 0.04)" : "",
                              borderRadius: open ? '10px' : '',
                              "&:hover": {
                                backgroundColor: 'rgba(255, 255, 255, 0.04)'
                              }
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                                color: childIndex === sidebarIndex ? 'white' : '#0745bbf0'
                              }}
                            >
                              {/* Add appropriate icons here */}
                            </ListItemIcon>
                            <ListItemText primary={childText.name} sx={{ opacity: open ? 10 : 0, color: "white" }} />
                          </ListItemButton>
                        </ListItem>
                      </Link>
                    ))
                  ) : null}
                </div>

                : <Link to={text.path} style={{ textDecoration: 'none' }} onClick={(e) => { setSidebarIndex(index) }} >
                  <ListItem key={text} disablePadding sx={{ display: 'block', height: 50 }} onClick={(e) => { trackgeneration(e) }} >
                    <ListItemButton
                      sx={{
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                        backgroundColor: index === sidebarIndex ? "#80008036" : "",
                        borderRadius: open ? '10px' : '',
                        "&: hover": {
                          backgroundColor: 'purple'                         
                        }
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                          color: index === sidebarIndex ? 'purple' : 'grey',
                        
                        }}
                      >
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text.name} sx={{ opacity: open ? 10 : 0, color: index === sidebarIndex ? 'purple' : 'grey' }} />
                    </ListItemButton>
                  </ListItem>
                </Link>
            )) :""
            

        }
      </List>
      <Divider />
    </Drawer>
  );


}