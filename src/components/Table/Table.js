import React, { useEffect, useState } from 'react';

const Table = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/table/');
        const jsonData = await response.json();
        setData(jsonData.data);
      } catch (error) {
        console.error('Ошибка при получении данных из API:', error);
      }
    };

    const interval = setInterval(fetchData, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    
    <div className='col-md-8 mx-auto text-center'>
      <table className="table table-striped table-bordered table-responsive">
        <thead>
          <tr className="table-secondary sticky-top">
            <th>Название</th>
            <th>Объем/мин</th>
            <th>fshort</th>
            <th>Время</th>
            <th>Цена</th>
            <th>flong</th>
            <th>Время</th>
            <th>Цена</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="table-primary">
              <td>{item.name}</td>
              <td>{item.values}</td>
              <td>{item.bids}</td>
              <td>{item.timeb}</td>
              <td>{item.rangeb}</td>
              <td>{item.asks}</td>
              <td>{item.timea}</td>
              <td>{item.rangea}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
