import { Add, Remove } from "@material-ui/icons";
import dayjs from 'dayjs';
import styled from "styled-components";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Announcement from "../components/Announcement";
import {  FormControl, Input, InputLabel, MenuItem, Select } from '@mui/material';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../../../../responsive";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Newsletter from "../components/Newsletter";
import ApplicationStore from "../../../../utils/localStorageUtil";
import { useAuthContext } from "../../../../context/AuthContext";
import axios from "../../../../api/axios";



const URL = './booking';
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 70px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 0px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 30px;
  height: 45vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const empid = ApplicationStore().getStorage("empid");
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const applicationStore = ApplicationStore();
  const [subTotal, setSubTotal] = useState(0);
  const [rawTime, setRawTime] = React.useState(dayjs('2022-04-17T15:30'));
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [designation, setDesignation] = useState('');
  const [address, setAddress] = useState('');
  const [programDate, setProgramDate] = useState(""); 
  const [placeID, setPlaceID] = useState("");
  const [program, setProgram] = useState("");
  const [categorylist, setCategorylist] = useState([]);
  const [category_id, setCategory_id] = useState('');


  const { url } = useAuthContext();

  useEffect(() => {
    console.log("helo");
    loadData();
  }, []);

  const loadData = async () => {
    const cart = await applicationStore.getStorage('cart');
    console.log(cart);
    setCartData(cart);
    calculateSubTotal(cart);

    try {
      const response = await axios.get('auth/getUserById', {
        headers: { 'Content-Type': 'application/json', "empid": empid },

      });
      if (response.data.status == 401) {

      } else {
        setFirstName(response.data.data[0].first_name);
        setLastName(response.data.data[0].last_name);
        setUserName(response.data.data[0].username);
        setEmail(response.data.data[0].email);
        setContact(response.data.data[0].contact);
        setDesignation(response.data.data[0].designation);
        setAddress(response.data.data[0].address);

      }

    } catch (err) {
      if (!err?.response) {
        console.log("No server response");
      } else {
        console.log(err?.response.data);
      }
    }
    try {
      let URL = './place/';
      const response = await axios.get(URL);
      if (response.data.status == 401) {
        setCategorylist('');
      } else {
        setCategorylist(response.data.data);
      }
    } catch (err) {
      if (!err?.response) {
        console.log("No server response");
      } else {
        console.log(err?.response.data);
      }
    }
  }

  const calculateSubTotal = (cart) => {
    let total = 0;
    if (cart.length > 0) {
      cart.forEach(item => {
        total += item.total;
      });

    }
    setSubTotal(total);
  }

  // const removeProduct = (index) => {
  //   const updatedProduct = [...cartData];
  //   updatedProduct.splice(index, 1);
  //   setCartData(updatedProduct);
  //   applicationStore.setStorage('cart', updatedProduct);
  // };

  const updateProduct = (index, type) => {
    if (type == "add") {
      console.log(index + " add");
      const updatedCart = [...cartData];
      updatedCart[index].quantity = updatedCart[index].quantity + 1;
      updatedCart[index].total = updatedCart[index].quantity * updatedCart[index].price;
      setCartData(updatedCart);
      applicationStore.setStorage('cart', updatedCart);
      calculateSubTotal(updatedCart);

    } else {
      console.log(index + " sub");
      const updatedCart = [...cartData];
      updatedCart[index].quantity = updatedCart[index].quantity == 0 ? 0 : updatedCart[index].quantity - 1;
      updatedCart[index].total = updatedCart[index].quantity * updatedCart[index].price;
      setCartData(updatedCart);
      applicationStore.setStorage('cart', updatedCart);
      calculateSubTotal(updatedCart);
    }


  };


  const serviceMethod = async (mainURL, method, data, handleSuccess, handleException) => {

    try {
      const response = await axios.post(mainURL, data);
      return handleSuccess(response.data);
    }
    catch (err) {
      if (!err?.response) {
        console.log("No server response");
      } else {
        return handleException(err?.response.data);
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const cart = applicationStore.getStorage('cart');
    const method = "POST";
    try {
      // alert("successfully quote send");
      const data = { student_id: empid, serve: rawTime, placeID, programDate, program, cart_item: cart };
      console.log(data);
      const mainURL = URL + '/add';
      serviceMethod(mainURL, method, data, handleSuccess, handleException);
    }
    catch (e) {
      console.error(e);

    }
  };


  const handleSuccess = (data) => {

    console.log("data");
alert("successfully quote send");
    ApplicationStore().removeStorage('cart');
    navigate("/CustHome");
  }

  const handleException = (data) => {
    console.log(data);
  }

  const navigateTo = () => {
    navigate("/payment")
  }


  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          {/* <TopButton type="filled">CHECKOUT NOW {cartData.length}</TopButton> */}
        </Top>
        <Bottom>
          <Info>
            {
              cartData.length > 0 ? cartData.map((item, index) => (


                <Product key={item.id}>
                  <ProductDetail>
                    <Image src={url + item.img} style={{ height: 100, width: 100 }} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {item.name}
                      </ProductName>
                      
                    </Details>
                  </ProductDetail>
                  
                  <Summary>
                    
                    <SummaryItem>
                      <SummaryItemText>Quanity</SummaryItemText>
                      <SummaryItemPrice><ProductAmountContainer>
                        <Add onClick={() => { updateProduct(index, "add") }} />
                        <ProductAmount>{item.quantity}</ProductAmount>
                        <Remove onClick={() => { updateProduct(index, "sub") }} />
                      </ProductAmountContainer></SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                      <SummaryItemText>Price</SummaryItemText>
                      <SummaryItemPrice>$  {item.price}</SummaryItemPrice>
                    </SummaryItem>
                    
                    <SummaryItem type="total">
                      <SummaryItemText>Total</SummaryItemText>
                      <SummaryItemPrice>$ {item.total}</SummaryItemPrice>

                    </SummaryItem>

                  </Summary>
                </Product>

              )) : ""
            }
            
          </Info>
          <Summary>
            <SummaryTitle>Customer Information</SummaryTitle>
            <SummaryItem>
              <form>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  required
                  fullWidth
                  label="Phone Number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
                <TextField
                  required
                  fullWidth
                  label="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </form>
            </SummaryItem>
            

          </Summary>
          <Summary>
          <SummaryTitle>Program Information</SummaryTitle>
<SummaryItem>
  <form>
    <TextField
      required
      fullWidth
      label="Program Name"
      value={program}
      onChange={(e) => setProgram(e.target.value)}
    />
    <TextField
      required
      fullWidth
      label="Program Date"
      type="date"
      value={programDate}
      onChange={(e) => setProgramDate(e.target.value)}
    />
    <FormControl fullWidth>
      <InputLabel>Place Name</InputLabel>
      <Select
        value={placeID}
        onChange={(e) => setPlaceID(e.target.value)}
      >
        {categorylist.map(category => (
          <MenuItem key={category.place_id} value={category.place_id}>
            {category.place_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </form>
</SummaryItem>

            <SummaryItem>


              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {subTotal}</SummaryItemPrice>
            </SummaryItem>
            
            <Button onClick={handleSubmit}>Get Quote</Button>
          </Summary>

        </Bottom>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Cart;
