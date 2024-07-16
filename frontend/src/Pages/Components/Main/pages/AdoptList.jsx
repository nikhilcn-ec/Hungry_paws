import React, { useEffect, useState } from 'react';
import axios from "../../../../api/axios";
import ApplicationStore from '../../../../utils/localStorageUtil';
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

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

const URL = "./adopt/";

const AdoptList = () => {
  const [dataList, setDataList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const empid= ApplicationStore().getStorage("empid");
  const navigate=useNavigate();

  
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

  const handleCategoryClick = (booking) => {
    setSelectedCategory(booking);
    console.log(booking.id);
    navigate("/AdoptDetails", { state: { id: booking.id } })
    // Do any other logic if needed
  };
  return (
    // <Container>
    //   <Navbar />
    //   <Announcement />
    //   <div className="flat-booking">
    //     <h2>OUR Gallery</h2>
    //     {dataList.length === 0 ? (
    //       <p>No post available</p>
    //     ) : (
    //       <BookingContainer>
    //         {dataList.map((booking) => (
    //           <BookingCard key={booking.id} onClick={() => handleCategoryClick(booking)}>
    //             <img src={"http://localhost:3006" + booking.image} alt="Flat Image" />
    //             <p> Name:{booking.animal_name}</p>
    //             <p> Breed:{booking.breed_name}</p>
    //             <p> City:{booking.city}</p>
                
    //           </BookingCard>
    //         ))}
    //       </BookingContainer>
    //     )}
    //   </div>
    //   <Newsletter />
    //   <Footer />
    // </Container>
    <section className="ftco-section bg-light">
    <div className="container">
      <div className="row">
        {dataList.map(staff => (
          <div key={staff.id} className="col-md-6 col-lg-3 ">
            <div className="staff">
              <div className="img-wrap d-flex align-items-stretch">
                <div className="img align-self-stretch" style={{ backgroundImage: `url(http://localhost:3006${staff.image})` }} />
              </div>
              <div className="text pt-3 px-3 pb-4 text-center">
                <h3>{staff.animal_name}</h3>
                <span className="position mb-2">{staff.breed_name}</span>
                <div className="faded">
                  <p>{staff.city}</p>
                  {/* <ul className="ftco-social text-center">
                    <li className="ftco-animate"><a href={staff.twitter} className="d-flex align-items-center justify-content-center"><span className="fa fa-twitter" /></a></li>
                    <li className="ftco-animate"><a href={staff.facebook} className="d-flex align-items-center justify-content-center"><span className="fa fa-facebook" /></a></li>
                    <li className="ftco-animate"><a href={staff.google} className="d-flex align-items-center justify-content-center"><span className="fa fa-google" /></a></li>
                    <li className="ftco-animate"><a href={staff.instagram} className="d-flex align-items-center justify-content-center"><span className="fa fa-instagram" /></a></li>
                  </ul> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default AdoptList;
