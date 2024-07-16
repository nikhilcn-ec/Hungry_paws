import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../../../../responsive";
import { Link, Outlet, NavLink } from "react-router-dom"; 
import TextField from '@mui/material/TextField';
import { useAuthContext } from "../../../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import axios from "../../../../api/axios";
import Announcement from "./Announcement";
const URL = './products/search';



const Container = styled.div`
  height: 90px;
  background-color: #F8CFFF;`
  ;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.0px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  margin-top: -10px;  
  padding-bottom: 0px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const { user, Logout } = useAuthContext();
  const navigate = useNavigate();
  const [searchedData, setSearchedData] = useState('');

  const getData = async () => {
    console.log(searchedData);
    const data = {searchedData};  
      try{
        const response = await axios.post( URL,data,
          {
             headers: {'Content-Type':'application/json' }                    
          }); 
          if(response.data.status == 401){
              // setDataList('');      
          }else{
              //setDataList(response.data.data);
              navigate('/ProductList', { state: { searchedData:response.data.data }});
              
              //console.log(response.data.data);

          }
        
    }catch(err){    
      if(!err?.response){
          console.log("No server response");
      }else{
            console.log(err?.response.data);
      }
  } 
  };

 

  return (
    <>
    
    <Container>
      <Wrapper>
        <Left>
          {/* <Language>EN</Language>
          <SearchContainer>
            <TextField
              margin="normal"
              fullWidth
              size="small"
              id="email"
              label="Search"
              name="email"
              autoComplete="email"
              
              value={searchedData}
              onChange={(e) => {
                setSearchedData(e.target.value);
              }}
              required
              className="custom-textfield" // Apply your CSS class here
            />
            <Search onClick={getData} style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer> */}
        </Left>
        <Center>
          <Logo>HUNGRY_PAWS</Logo>
        </Center>
        <Right>
          
              <MenuItem onClick={() => navigate('/CustHome')}>Home</MenuItem>
              <MenuItem onClick={() => navigate('/Work')}>Our_Work</MenuItem>
              <MenuItem onClick={() => navigate('/Gallery')}>Gallery</MenuItem>
              <MenuItem onClick={() => navigate('/DonateUs')}>Donate_Us</MenuItem>
              <MenuItem onClick={() => navigate('/VeterinaryUser')}>Veterinary</MenuItem>
              <MenuItem onClick={() => navigate('/VaccineUser')}>Vaccination</MenuItem>
              <MenuItem onClick={() => navigate('/RescueUser')}>Rescue_Request</MenuItem>
              <MenuItem onClick={() => navigate('/Volunteer')}>Volunteer</MenuItem>
              <MenuItem onClick={() => navigate('/AdoptList')}>Adopt_Pet</MenuItem>
              <MenuItem onClick={() => navigate('/Service')}>About_Us</MenuItem>
              <MenuItem onClick={() => navigate('/Service')}>Contact_us</MenuItem>
               
              <MenuItem onClick={Logout}>Logout</MenuItem>
          
        </Right>
      </Wrapper>
    </Container>
    
    </>
  );
};

export default Navbar;
