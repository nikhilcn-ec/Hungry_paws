import React, { useEffect, useState } from 'react';
import axios from "../../../../api/axios";
import ApplicationStore from '../../../../utils/localStorageUtil';
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import styled from "styled-components";
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

const URL = "./gallery/";

const Gallery = () => {
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
      
    //   <div className="flat-booking">
    //     <h2>OUR Gallery</h2>
    //     {dataList.length === 0 ? (
    //       <p>No post available</p>
    //     ) : (
    //       <BookingContainer>
    //         {dataList.map((booking) => (
    //           <BookingCard key={booking.id}>
    //             <img src={"http://localhost:3006" + booking.image} alt="Flat Image" style={{ width: '300px', height: '200px' }}/>
    //             <p>Title {booking.title}</p>
    //             {/* <p>Description {booking.description}</p> */}
    //             <p>Date {booking.date}</p>
    //             {/* <p>Booking Timing: {booking.date}</p>
    //             <p>From Date: {booking.from_date}</p>
    //             <p>To Date: {booking.to_date}</p> */}
    //           </BookingCard>
    //         ))}
    //       </BookingContainer>
    //     )}
    //   </div>
     
    // </Container>
    <><Header/>
    <section className="ftco-section">
    <div className="container">
      <div className="row">
        {dataList.map(item => (
          <div className="col-md-4 " key={item.id}>
            <div className="work mb-4 img d-flex align-items-end" style={{ backgroundImage: `url(http://localhost:3006${item.image})` }}>
              <a href={"http://localhost:3006"+item.image} className="icon image-popup d-flex justify-content-center align-items-center">
                <span className="fa fa-expand" />
              </a>
              <div className="desc w-100 px-4">
                <div className="text w-100 mb-3">
                  <span>{item.category}</span>
                  <h2><a href={`work-single.html/${item.id}`}>{item.title}</a></h2>
                </div>
              </div>
            </div>
          </div>
          
        ))}
      </div>
      <div className="row mt-5">
        <div className="col text-center">
          <div className="block-27">
            {/* Pagination or navigation UI here */}
          </div>
        </div>
      </div>
    </div>
  </section>
  </>
  );
};

export default Gallery;
