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

const URL = "./post/";

const Work = () => {
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
    //     <h2>OUR WORK</h2>
    //     {dataList.length === 0 ? (
    //       <p>No post available</p>
    //     ) : (
    //       <BookingContainer>
    //         {dataList.map((booking) => (
    //           <BookingCard key={booking.id}>
    //             <img src={"http://localhost:3006" + booking.image} alt="Flat Image" style={{ width: '300px', height: '200px' }}/>
    //             <p>Title {booking.title}</p>
    //             <p>Description {booking.description}</p>
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
    <>
    <Header/>
  
    <section className="ftco-section bg-light">
      <div className="container">
        <div className="row d-flex">
          {dataList.map(blog => (
            <div className="col-md-4 d-flex " key={blog.id}>
              <div className="blog-entry align-self-stretch">
                <a href={`blog-single.html/${blog.id}`} className="block-20 rounded" style={{ backgroundImage: `url(http://localhost:3006${blog.image})` }}
>
                </a>
                <div className="text p-4">
                  <div className="meta mb-2">
                    <div><a href="#">{blog.date}</a></div>
                    <div><a href="#">{blog.title}</a></div>
                    <div><a href="#" className="meta-chat"><span className="fa fa-comment" /> {blog.comments}</a></div>
                  </div>
                  <h3 className="heading"><a href="#">{blog.description}</a></h3>
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

export default Work;
