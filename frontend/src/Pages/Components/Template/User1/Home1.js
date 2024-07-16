import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Main1/Navbar";
import Footer from "../Main1/Footer";
import Header from "../Main1/Header";


export default function Home1() {
    return (
        <>
        <Navbar/>
        {/* <Header/> */}
        <Outlet />
        <Footer/>
            
        </>
    )
}