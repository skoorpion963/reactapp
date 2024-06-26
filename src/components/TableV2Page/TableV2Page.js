import React from 'react';
import Navbar from '../Navbar/Navbar';
import TableV2 from '../Tablev2/Tablev2';
import Footer from '../Footer/Footer';
import DeepBookWiew from '../DeepBookWiew/DeepBookWiew';
import NumberPopup from '../DeepBookWiew/Numberpopup';
import WebSocket from '../DeepBookWiew/Websocket';

const TablePageV2 = () => {
    return (
      <div>
        <Navbar />
        <NumberPopup />
        {/* <WebSocket/> */}
        <div className="mb-5"></div>
        <div className="mb-5"></div>
        <div className="mb-5"></div>
        
        <TableV2/>
        <Footer />
      </div>
    );
  };

export default TablePageV2;