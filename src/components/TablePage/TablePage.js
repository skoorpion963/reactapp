import React from 'react';
import Navbar from '../Navbar/Navbar';
import Table from '../Table/Table';
import Footer from '../Footer/Footer';
import Layout from '../Footer/Layout';

const TablePage = () => {
    return (
      <div>
        <Navbar />
        <div className="mb-5"></div>
        <div className="mb-5"></div>
        <div className="mb-5"></div>
        <Table/>
        <Footer/>
      </div>
    );
  };

export default TablePage;