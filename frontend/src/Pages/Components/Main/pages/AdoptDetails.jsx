// ProductDetails.js
import React from 'react';
import styled from 'styled-components';
import { useState,useEffect } from 'react';
import axios from '../../../../api/axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
// import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { Button } from '@mui/material';
import ApplicationStore from '../../../../utils/localStorageUtil';

const DetailsWrapper = styled.div`
  margin-bottom: 20px;
`;
const ProductItem = styled.li`
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    color: green; // Add your desired hover styles
  }
`;
const Container = styled.div``;

const BookingCard = styled.div`
  margin: 10px;
  padding: 20px;
  border: 1px solid #ddd;
  text-align: center;
`;


const URL1="./adopt/";
const URL2="./add";
const URL3="./adopt_request"
const AdoptDetails = ({ booking }) => {
    const location = useLocation();
  const id = location?.state?.id;
//   const image = location?.state?.image;
//   const name = location?.state?.name;
//   const price = location?.state?.price;
//   const id = location?.state?.id;



  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dataList, setDataList] = useState([]);
  const empid= ApplicationStore().getStorage("empid");

  const navigate=useNavigate();
  // Fetch or provide a list of products based on the selected category
  
  const handleCategoryClick = (booking) => {
    setSelectedCategory(booking);
    console.log(booking.id);
    // navigate("/ProductDetails")
    // Do any other logic if needed
  };
  // Check if the product is defined
  

  useEffect(() => {
    console.log("id:", id);
    console.log("booking:", booking);
  
    
  
    // console.log(`/${URL1}${id}${URL2}`);
    loadData();
  }, [id]);

const loadData = async () => {

    try{
      const response = await axios.get(`/${URL1}${id}${URL2}`);

      console.log(URL1);
      
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

const serviceMethod = async (mainURL,method,data,handleSuccess,handleException) => {
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

const handleSubmit=(e)=>{
    e.preventDefault();
    const method = "POST";
    const data = {user_id:empid,pet_id:id};
    const mainURL = URL3+'/add';
    serviceMethod(mainURL,method,data, handleSuccess, handleException);
    

}

const handleSuccess = (data) => {         
    alert("Your Request sent Successfully");
    navigate("/CustHome");
}

const handleException = (data) => {
    console.log(data);
}



  return (
    <Container>
      <Navbar />
      <Announcement />
      <div className="flat-booking">
        <h2>Adopt</h2>
        {dataList.length === 0 ? (
          <p>No post available</p>
        ) : (
    <DetailsWrapper>
      
      {dataList.map((booking) => (
          <BookingCard key={booking.id} onClick={() => handleCategoryClick(booking)}>
            <img src={booking.image} alt={booking.name} style={{ width: '300px', height: '200px' }}/>
            <p>Pet Name:{booking.animal_name}</p>
            <p>Breed:{booking.breed_name}</p>
            <p>Location{booking.city}</p>
            <p>Gender{booking.gender}</p>
            <p>Age{booking.age}</p>
            <p>Color{booking.color}</p>
            <p>Health Condition{booking.helth_condition}</p>
            <p>Description{booking.description}</p>
            <Button variant='contained' onClick={handleSubmit}>Adopt now</Button> 
          </BookingCard>
        ))}
        
    </DetailsWrapper>
     )}
     </div>
     <Newsletter />
     <Footer />
   </Container>
  );
};

export default AdoptDetails;
