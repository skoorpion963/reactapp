import React from 'react';
import BasePage from '../BasePage/BasePage';
import TablePage from '../TablePage/TablePage';
import TablePageV2 from '../TableV2Page/TableV2Page';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



const App = () => {
    return (
      <Router>
        <Routes>
        <Route path="/" element={<BasePage />} />
        <Route path="/table" element={<TablePage />} />
        <Route path="/tableV2" element={<TablePageV2 />} />
        </Routes>
      </Router>
    );
  };

export default App;

// import React from 'react';
// import ReactDOM from 'react-dom';
// import BasePage from '../BasePage/BasePage';


// ReactDOM.render(<BasePage />, document.getElementById('root'));
// export default App;