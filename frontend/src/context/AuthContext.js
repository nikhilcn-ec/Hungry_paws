import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationStore from "../utils/localStorageUtil";
import axios from "../api/axios";

const LOGOUT_URL = './auth/logout';

export const AuthContext = createContext({
     user:null,
     login:(user)=>{},
     logout:()=>{}
});

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState('');
    const [userRole, setUserRole] = useState('');
    // const [companyCode, setCompanyCode] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);    
    const [email, setEmail] = useState(''); 
    const [cart,setCart] = useState([]);
    const [empId, setEmpId] = useState('');
    const [trackId,setTrackId] =  useState(0);

    const navigate = useNavigate();
    const url = "http://localhost:3006";

    const [trackNo,setTrackno] = useState(''); 
    

    const trackgeneration = (e) => {
        console.log("from auth context");
        var num = Math.floor(Math.random() * 90000) + 10000;
       
        setTrackno(num);
        console.log("trackno"+trackNo);
        
    };     


    const AddToCart = (productData) => {
        // Assuming cart is an array; make sure it's initialized as an array before using this function
        if (!Array.isArray(cart)) {
          console.error('cart is not an array');
          return;
        }
      
        // Create a copy of the cart array and add the new product
        let updatedCart = [...cart];
      
        // Check if the product is already in the cart
        const productIndex = updatedCart.findIndex((element) => element.id === productData.id);
      
        if (productIndex !== -1) {
          // Update the quantity of the existing product

          updatedCart[productIndex].quantity += productData.quantity;
          updatedCart[productIndex].total += productData.total;

        } else {
          // Add the new product to the cart
          updatedCart.push(productData);
        }
      
        // Update the cart state with the updated cart
        setCart(updatedCart);

        ApplicationStore().setStorage('cart',updatedCart);
      };   

      const removeToCart = (productData) => {
        // Assuming cart is an array; make sure it's initialized as an array before using this function
        if (!Array.isArray(cart)) {
          console.error('cart is not an array');
          return;
        }
      
        // Create a copy of the cart array
        let updatedCart = [...cart];
      
        // Check if the product is already in the cart
        const productIndex = updatedCart.findIndex((element) => element.id === productData.id);
      
        if (productIndex !== -1) {
          // Remove the product from the cart
          updatedCart.splice(productIndex, 1);
        } else {
          // Add the new product to the cart
          updatedCart.push(productData);
        }
      
        // Update the cart state with the updated cart
        setCart(updatedCart);
      
        // Update the cart in the application store
        ApplicationStore().setStorage('cart', updatedCart);
      };


      
      
      
      

    const getCart = () => {
        console.log(cart);
    }

    const Login = userData => {
        ApplicationStore().setStorage('token',userData.userToken);
        ApplicationStore().setStorage('userRole',userData.userRole);
        // ApplicationStore().setStorage('userCompany',userData.companyCode);
        ApplicationStore().setStorage('empid',userData.empid);
        ApplicationStore().setStorage('email',userData.email);
        ApplicationStore().setStorage('empDetails',userData.empDetails);
        setUser(userData.empDetails.username);
        // setEmail(userData.empDetails.email);
        setEmpId(userData.empid);
        setEmail(userData.email);
        setLoggedIn(true);
    }

    const Logout = async () => {

        const data = {email:user};          

        const response = await axios.post(LOGOUT_URL,data,
          {
            headers: {'Content-Type':'application/json' }                    
          }
       );       
       const dataResponse = response.data;     
       if(dataResponse.success === 1){
            console.log("loggd out");
            ApplicationStore().removeStorage('token');
            ApplicationStore().removeStorage('userRole');
            // ApplicationStore().removeStorage('userCompany');
            ApplicationStore().removeStorage('empid');
            ApplicationStore().removeStorage('empDetails');
            ApplicationStore().removeStorage('email');
            setUser(null);
            setUserRole(null);        
            // setCompanyCode(null);
            setEmail(null);
            setLoggedIn(false);
            navigate("/login");
       }
    }

    return  (
        <AuthContext.Provider value={{ user, Login,email, userRole, loggedIn, Logout,trackgeneration,trackNo,AddToCart,getCart,removeToCart,url,trackId,empId}}>
            {children} 
        </AuthContext.Provider>
    )
    
}

export function useAuthContext(){
    const {user, Login,email, userRole,loggedIn, Logout,trackgeneration,trackNo,cart,AddToCart,getCart,removeToCart,url,trackId,empId} =  useContext(AuthContext);
    return {user, Login,email, userRole, loggedIn, Logout,trackgeneration,trackNo,cart,AddToCart,getCart,removeToCart,url,trackId,empId};
}










