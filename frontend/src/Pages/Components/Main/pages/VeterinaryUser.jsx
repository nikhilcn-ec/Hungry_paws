import React, { useEffect, useState } from 'react';
import axios from "../../../../api/axios";
import ApplicationStore from '../../../../utils/localStorageUtil';
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import styled from "styled-components";
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import Header from '../../Template/Main1/Header';

const Container = styled.div``;

const BookingContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const BookingCard = styled.div`
  margin: 10px;
  padding: 20px;
  border: 1px solid #ddd;
  text-align: center;
`;

const URL = "./veterinary/";

const VeterinaryUser = () => {
  const [dataList, setDataList] = useState([]);
  const empid= ApplicationStore().getStorage("empid");
  
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await axios.get(URL);
      if (response.data.status === 401) {
        setDataList([]);
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
    // <Container>
    //   <Navbar />
    //   <Announcement />
    //   <div className="flat-booking">
    //     <h2>Veterinary</h2>
    //     {dataList.length === 0 ? (
    //       <p>No post available</p>
    //     ) : (
    //       <BookingContainer>
    //         {dataList.map((booking) => (
    //           <BookingCard key={booking.id}>
    //             <p> <PersonIcon /> Name: {booking.name}</p>
    //             <p> <LocationOnIcon /> Address: {booking.address}</p>
    //             <p> <PhoneIcon /> Contact: {booking.contact}</p>
                
    //           </BookingCard>
    //         ))}
    //       </BookingContainer>
    //     )}
    //   </div>
    //   <Newsletter />
    //   <Footer />
    // </Container>
    <>
    <Header/>
    <section className="ftco-section bg-light">
    <div className="container" >
      <div className="row mb-5 pb-5" >
        {dataList.map(service => (
          <div className="col-md-4 d-flex align-self-stretch px-4 " key={service.id} style={{marginBottom:"20px"}}>
            <div className="d-block services text-center">
              <div className=" d-flex align-items-center justify-content-center">
              {/* <span className="flaticon-dog-eating" /> */}
              </div>
              <div className="media-body p-4">
                <h3 className="heading">{service.name}</h3>
                <p>{service.address}</p>
                <a href={service.contact} className=" d-flex align-items-center justify-content-center">
                  {/* <span className="fa fa-chevron-right" /> */}
                  {/* <i className="sr-only">Read more</i> */}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  </>
  );
};

export default VeterinaryUser;
