import styled from "styled-components";
import  {popularProducts, productList } from "../../../../data";
import Product from "./Product";
import React, { useEffect, useState } from "react";
import axios from "../../../../api/axios";
import { Link, Outlet, useLocation, useNavigate} from "react-router-dom";
const URL = './products';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = () => {

  const [dataList, setDataList] = useState([]);

  const [refreshData, setRefreshData] = useState(false);
  const {state} = useLocation();

  const searchedData = state ? state.barcode_number : null;

  useEffect(() => {
    if(searchedData){
      setDataList(searchedData);
  }else{
    loadData();   
  }   
},[refreshData,searchedData]);

const loadData = async () => {  
    // console.log(searchedData.searchedData);
 
    
        try{
              const response = await axios.get( URL ); 
                if(response.data.status == 401){
                    setDataList('');      
                }else{
                    setDataList(response.data.data);
                    console.log(response.data.data);
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
    <Container>
      {dataList.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Products;
