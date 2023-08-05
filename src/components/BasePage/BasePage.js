import React from 'react';
import Navbar from '../Navbar/Navbar';
import MainPageContent from '../MainPageContent/MainPageContent';
import Footer from '../Footer/Footer';
// import DoublyLinkedList from '../DeepBookWiew/DoublyLinkedList';


const BasePage = () => {
    return (
      <div>
        <Navbar />
        {/* <DoublyLinkedList/> */}
        <MainPageContent />
        <Footer />
      </div>
    );
  };

export default BasePage;