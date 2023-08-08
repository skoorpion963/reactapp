import React from 'react';
import Navbar from '../Navbar/Navbar';
import TableV2 from '../Tablev2/Tablev2';
import Footer from '../Footer/Footer';
import Layout from '../Footer/Layout';

const TablePageV2 = () => {
    return (
      <div>
        <Navbar />
        <div className="mb-5"></div>
        <div className="mb-5"></div>
        <div className="mb-5"></div>
        
        <TableV2/>
        <Layout/>
        {/* <Footer /> */}
      </div>
    );
  };

export default TablePageV2;