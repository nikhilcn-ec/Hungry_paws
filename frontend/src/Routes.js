import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Components/Dashboard/Dashboard';
import SuperUserDashboard from './Pages/Components/Dashboard/SuperUserDashboard';
import ProtectedRoutes from './protectedRoutes';
import ProtectedCustomerRoutes from './protectedCustomerRoutes';
import Login from './Pages/Components/Login/Login';

import RegisterForm from './Pages/Components/RegisterForm';
import ChangePassword from './Pages/Components/Login/ChangePassword';
import ForgotPassword from './Pages/Components/Login/ForgotPassword';
import Profile from './Pages/Components/Employee/Profile/Profile';
import Home from './Pages/Components/homepage/Home';
import Cart from './Pages/Components/Main/pages/Cart';
import LoginCust from './Pages/Components/Main/pages/Login';
import Feedback from './Pages/Components/Main/pages/Feedback';
import ProductList from './Pages/Components/Main/pages/ProductList';
import ProductInfo from './Pages/Components/Main/pages/ProductInfo';
import Register from './Pages/Components/Main/pages/Register';
import Service from './Pages/Components/Main/pages/Service';

import Checkout from './Pages/Components/Main/pages/Checkout';
import Payment from './Pages/Components/Main/pages/Payment';
import ManageOrder from './Pages/Components/Payment/ManageOrders';
import ViewOrder from './Pages/Components/Payment/ViewOrder';
import UserProfile from './Pages/Components/Main/pages/UserProfile';
import Change from './Pages/Components/Main/pages/Change';

import ViewWork from './Pages/Components/Admin/Work/ViewWork';
import ViewVol from './Pages/Components/Admin/Volunteer/ViewVol';
import ViewRescue from './Pages/Components/Admin/Rescue/ViewRescue';
import ViewGallery from './Pages/Components/Admin/Gallery/ViewGallery';
import ViewDonation from './Pages/Components/Admin/Donation/ViewDonation';
import ViewPet from './Pages/Components/Admin/Pet/ViewPet';
import ViewPetRequest from './Pages/Components/Admin/PetRequest/ViewPetRequest';
import ViewVaccine from './Pages/Components/Admin/Vaccination/ViewVaccine';
import ViewVeternity from './Pages/Components/Admin/Veternity/ViewVeternity';
import Volunteer from './Pages/Components/Main/pages/Volunteer';
import Work from './Pages/Components/Main/pages/Work';
import Gallery from './Pages/Components/Main/pages/Gallery';
import DonateUs from './Pages/Components/Main/pages/DonateUs';
import VeterinaryUser from './Pages/Components/Main/pages/VeterinaryUser';
import VaccineUser from './Pages/Components/Main/pages/VaccineUser';
import RescueUser from './Pages/Components/Main/pages/RescueUser';
import AdoptList from './Pages/Components/Main/pages/AdoptList';
import AdoptDetails from './Pages/Components/Main/pages/AdoptDetails';
import Home1 from './Pages/Components/Template/User1/Home1';
import HomeUser1 from './Pages/Components/Template/User1/HomeUser1';



const MainRoutes = () => {
    return (
        <Routes>
          <Route path="/login" element={ <Login />} />    
          <Route path="/RegisterForm" element={<RegisterForm/>}/>
          <Route path="/ForgotPassword" element={<ForgotPassword />}/>
          <Route path="/LoginCust" element={<LoginCust />} />
          <Route path="/RegisterCust" element={<Register />} /> 
              <Route element={<ProtectedCustomerRoutes />}>
                  <Route path="/"  element={<Home1 />} >
                  <Route path="/CustHome" element={<HomeUser1 />} />
                  <Route path="/Cart" element={<Cart />} />
                  <Route path="/Product" element={<ProductInfo />} />
                  <Route path="/UserProfile" element={<UserProfile />} />
                  <Route path="/ProductList" element={<ProductList />} />
                  <Route path="/Feedback" element={<Feedback />} />
                  <Route path="/Payment" element={<Payment />} />
                  <Route path="/Service" element={<Service/>}/>
                  <Route path="/Checkout" element={<Checkout/>}/>
                  <Route path="/CustManageOrder" element={<ManageOrder />}/>
                  <Route path="/CustViewOrder" element={<ViewOrder />} />
                  <Route path="/Change" element={<Change />} />
                  <Route path="/Volunteer" element={<Volunteer />} />
                  <Route path="/Work" element={<Work />} />
                  <Route path="/Gallery" element={<Gallery />} />
                  <Route path="/DonateUs" element={<DonateUs />} />
                  <Route path="/VeterinaryUser" element={<VeterinaryUser/>} />
                  <Route path="/VaccineUser" element={<VaccineUser/>} />
                  <Route path="/RescueUser" element={<RescueUser/>} />
                  <Route path="/AdoptList" element={<AdoptList/>} />
                  <Route path="/AdoptDetails" element={<AdoptDetails/>} />
</Route>

              </Route>        
              <Route element={<ProtectedRoutes />}>         
                <Route path="/" element={<Home />} >
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/SuperUserDashboard" element={<SuperUserDashboard/>} />
                <Route path="/ViewWork" element={<ViewWork/>}/>
                <Route path="/ViewGallery" element={<ViewGallery/>}/>
                <Route path="/ViewVol" element={<ViewVol/>}/>
                <Route path="/ViewRescue" element={<ViewRescue/>}/>
                <Route path="/ViewDonation" element={<ViewDonation/>}/>
                <Route path="/ViewPet" element={<ViewPet/>}/>
                <Route path="/ViewPetRequest" element={<ViewPetRequest/>}/>
                <Route path="/ViewVaccine" element={<ViewVaccine/>}/>
                <Route path="/ViewVeternity" element={<ViewVeternity/>}/>
                <Route path="/ChangePassword" element = {<ChangePassword />} />
                <Route path="/Profile" element={<Profile/>}/>

              </Route>
            </Route>                      
         </Routes>//ZJu8nG!&j
    );
}
export default MainRoutes;







