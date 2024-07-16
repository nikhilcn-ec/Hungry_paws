import  React, {useState} from 'react';
import { NavLink } from "react-router-dom";
import "./sidebar.css";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import DomainIcon from '@mui/icons-material/Domain';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import ReportIcon from '@mui/icons-material/Report';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import LockResetSharpIcon from '@mui/icons-material/LockResetSharp';
import { useAuthContext } from "../../../context/AuthContext";
import ApplicationStore from "../../../utils/localStorageUtil";


const Sidebar = ({isOpen, setIsOpen }) => {  
    const { user, Logout, trackgeneration } = useAuthContext();
    const userRole = ApplicationStore().getStorage('userRole');
    const [active, setActive ] = useState(false);       
    const menuItemsAdmin = [
        {
            path:"/Dashboard",
            name:"Dashboard",
            icon:<DashboardCustomizeIcon />
        },  
        
        {
            path:"/User",
            name:"User",
            icon:<PersonOutlineIcon />
        },
        {
            path:"/Products",
            name:"Products",
            icon:<SettingsIcon />
        },
        {
            path:"/Sales",
            name:"Sales",
            icon:<DomainIcon />
        },
        {
            path:"/Stock",
            name:"Stock",
            icon:<ChecklistRtlIcon />
        },
        {
            path:"/Service",
            name:"Service",
            icon:<ReportIcon />
        },
        {
            path:"/Feedback",
            name:"Feedback",
            icon:<ExitToAppIcon />
        },
        {
            path:"/Logout",
            name:"Logout",
            icon:<AddAlertIcon />
        },
        {
            path:"/changepassword",
            name:"ChangePassword",
            icon:<LockResetSharpIcon />
        }
                
                 
        
    ];    

    const menuItemsSuperuser=[
        {
            path:"/SuperUserDashboard",
            name:"Dashboard",
            icon:<DashboardCustomizeIcon />
        }, 
        {
            path:"/Category",
            name:"Category",
             icon:<PersonOutlineIcon />
        },              
        {
            path:"/Organisation",
            name:"Employee",
             icon:<PersonOutlineIcon />
        },
        {
            path:"/Products",
            name:"Products",
            icon:<SettingsIcon />
        },
        {
            path:"/Online",
            name:"Online Sales Report",
            icon:<SettingsIcon />
        },
        {
            path:"/Offline",
            name:"Offline Sales Report",
            icon:<SettingsIcon />
        },
        {
            path:"/Service",
            name:"Service Report",
            icon:<SettingsIcon />
        },
        {
            path:"/Feedback",
            name:"Feedback",
            icon:<SettingsIcon />
        },
        {
            path:"/Logout",
            name:"Logout",
            icon:<LogoutIcon />
        },
        
    ]

    const menuItemsUser = [
        {
            path:"/DashboardUser",
            name:"DashboardUser",
            icon:<DashboardCustomizeIcon />
        },    
                
    ];  
    


    
   
    return(
        <div className="sidebarItem" >
            <div className= "top_section">               
           
                <h1 className="logo" style={{ display: isOpen ? 'block' : 'none', marginTop:'35px'}}>Logo</h1>                
            </div>
            <div style={{ padding:'5px 5px', marginLeft:'5px' }}>
                {
                   
                   userRole == "admin" ? 
                   menuItemsAdmin.map((item, index) =>(
                       <>  
                           {
                               item.childrens ? 
                                   <>
                                       <div className="" style={{ border:'1px solid red' }}>
                                           <div  className="link">                            
                                               <div className="linkText" style={{ display: isOpen ? 'block' : 'none', cursor:'pointer' }}  onClick={(e)=>{ setActive(!active)} }>
                                                   <span>
                                                   {item.name}
                                                   </span>                            
                                               </div>
                                           </div>
                                           {
                                               active ? 
                                               item.childrens.map((items, index) => (
                                                   <NavLink to={items.path} className="link" activeClassName="active">                         
                                                       <div className="linkIcon" title={ isOpen ? '' : items.name }>
                                                           <span className="Icon">
                                                           {items.icon}
                                                           </span>                            
                                                       </div>
                                                       <div className="linkText" style={{ display: isOpen ? 'block' : 'none' }}>
                                                           <span>
                                                           {items.name}
                                                           </span>                            
                                                       </div>                                        
                                                   </NavLink>
                                               )) : ""
                                           }        
                                       </div>
                                   </>: 
                                   <NavLink to={item.path} className="link" activeClassName="active" onClick = {(e)=> {trackgeneration(e)}}>                         
                                       <div className="linkIcon" title={ isOpen ? '' : item.name }>
                                           <span className="Icon">
                                           {item.icon}
                                           </span>                            
                                       </div>
                                       <div className="linkText" style={{ display: isOpen ? 'block' : 'none' }} >
                                           <span>
                                           {item.name}
                                           </span>                            
                                       </div>                                        
                                   </NavLink>
                           }                            
                       </>                        
                   )):
                   userRole == "superuser"?
                   menuItemsSuperuser.map((item, index) =>(
                       <>  
                           {
                               item.childrens ? 
                                   <>
                                       <div className="" style={{ border:'1px solid red' }}>
                                           <div  className="link">                            
                                               <div className="linkText" style={{ display: isOpen ? 'block' : 'none', cursor:'pointer' }}  onClick={(e)=>{ setActive(!active)} }>
                                                   <span>
                                                   {item.name}
                                                   </span>                            
                                               </div>
                                           </div>
                                           {
                                               active ? 
                                               item.childrens.map((items, index) => (
                                                   <NavLink to={items.path} className="link" activeClassName="active">                         
                                                       <div className="linkIcon" title={ isOpen ? '' : items.name }>
                                                           <span className="Icon">
                                                           {items.icon}
                                                           </span>                            
                                                       </div>
                                                       <div className="linkText" style={{ display: isOpen ? 'block' : 'none' }}>
                                                           <span>
                                                           {items.name}
                                                           </span>                            
                                                       </div>                                        
                                                   </NavLink>
                                               )) : ""
                                           }        
                                       </div>
                                   </>: 
                                   <NavLink to={item.path} className="link" activeClassName="active">                         
                                       <div className="linkIcon" title={ isOpen ? '' : item.name }>
                                           <span className="Icon">
                                           {item.icon}
                                           </span>                            
                                       </div>
                                       <div className="linkText" style={{ display: isOpen ? 'block' : 'none' }}>
                                           <span>
                                           {item.name}
                                           </span>                            
                                       </div>                                        
                                   </NavLink>
                           }                            
                       </>                        
                   )):
                   menuItemsUser.map((item, index) =>(
                    <>  
                        {
                            item.childrens ? 
                                <>
                                    <div className="" style={{ border:'1px solid red' }}>
                                        <div  className="link">                            
                                            <div className="linkText" style={{ display: isOpen ? 'block' : 'none', cursor:'pointer' }}  onClick={(e)=>{ setActive(!active)} }>
                                                <span>
                                                {item.name}
                                                </span>                            
                                            </div>
                                        </div>
                                        {
                                            active ? 
                                            item.childrens.map((items, index) => (
                                                <NavLink to={items.path} className="link" activeClassName="active">                         
                                                    <div className="linkIcon" title={ isOpen ? '' : items.name }>
                                                        <span className="Icon">
                                                        {items.icon}
                                                        </span>                            
                                                    </div>
                                                    <div className="linkText" style={{ display: isOpen ? 'block' : 'none' }}>
                                                        <span>
                                                        {items.name}
                                                        </span>                            
                                                    </div>                                        
                                                </NavLink>
                                            )) : ""
                                        }        
                                    </div>
                                </>: 
                                <NavLink to={item.path} className="link" activeClassName="active">                         
                                    <div className="linkIcon" title={ isOpen ? '' : item.name }>
                                        <span className="Icon">
                                        {item.icon}
                                        </span>                            
                                    </div>
                                    <div className="linkText" style={{ display: isOpen ? 'block' : 'none' }}>
                                        <span>
                                        {item.name}
                                        </span>                            
                                    </div>                                        
                                </NavLink>
                        }                            
                    </>                        
                    ))

                   
           }
       </div>
       
   </div>
);
}

export default Sidebar;