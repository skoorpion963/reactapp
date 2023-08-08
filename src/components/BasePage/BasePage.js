import React from 'react';
import Navbar from '../Navbar/Navbar';
import MainPageContent from '../MainPageContent/MainPageContent';
import Footer from '../Footer/Footer';
import Layout from '../Footer/Layout';


const BasePage = () => {
    return (
      <div>
        <Navbar />
        {/* <DoublyLinkedList/> */}
        <MainPageContent />
        <Footer/>
      </div>
    );
  };

export default BasePage;