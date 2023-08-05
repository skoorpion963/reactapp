import React, { useEffect, useState } from 'react';

const TableV2 = () => {

  const [data, setData] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null); // Объявляем состояние hoveredRow
  const [key_enter, setKeyEnter] = useState(null);
  const [name_elem, setNameElem] = useState(null);
  const [data_info , setDataInfo] = useState(null)
  

  const handleMouseEnter = (index, dataInfo) => {
    const [value1, value2] = dataInfo.split(',').map(Number);
    console.log(index, value1, value2, 'enter');
    setKeyEnter(index); // Используем setKeyEnter для обновления значения key_enter
    setDataInfo([value1,value2]);
    if (value1 == 1){
      var elem = document.getElementById(`${index}.bids`);
      elem.innerHTML = `<td id="${index+".bids"}">${elem.textContent}
       <img src="/images/pngegg.png" className="img-fluid"  style="width: 25px; height: 25px;" /></td>`;
    }
    if (value2 == 1){
      var elem = document.getElementById(`${index}.asks`);
      elem.innerHTML = `<td id="${index+".asks"}">${elem.textContent}
       <img src="/images/pngegg.png" className="img-fluid"  style="width: 25px; height: 25px;" /></td>`;
    }
    // var elem = document.getElementById(index);
    // setNameElem(elem.textContent); // Используем setNameElem для обновления значения name_elem
    // elem.innerHTML = `<td id="${index}">
    // <img src="/images/pngegg.png" className="img-fluid"  style="width: 25px; height: 25px;" /></td>`;
    // setHoveredRow(index);
  };
  
  const handleMouseLeave = () => {
   
    const value1 = data_info[0]
    const value2 = data_info[1]
    const index = key_enter
    console.log(key_enter, value1,value2);
    if (value1 == 1){
      var elem = document.getElementById(`${index}.bids`);
      elem.innerHTML = `<td id="${index+".bids"}">${elem.textContent}</td>`;
    }
    if (value2 == 1){
      var elem = document.getElementById(`${index}.asks`);
      elem.innerHTML = `<td id="${index+".asks"}">${elem.textContent}</td>`;
    }



    // var elem = document.getElementById(key_enter);
    // elem.innerHTML = `<td id="${key_enter}">${name_elem}</td>`;
    // setKeyEnter(null); // Сбрасываем значение key_enter
    // setNameElem(null); // Сбрасываем значение name_elem
    // setHoveredRow(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/tableV2/');
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
  
    <div className="container">
      <div className='col-md-8 mx-auto text-center mb-10' >
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
              {data.map((item, index) => {
                if (item.asks !== " - " || item.bids !== " - ") {
                  var data = [0,0];
                  if (item.bids !== " - "){data[0] = 1};
                  if (item.asks !== " - "){data[1] = 1};
                  return (
                    <tr
                      data-info={data.join(',')} // Преобразуйте массив `data` в строку, разделяя значения запятой
                      className={'table-primary'}
                      onMouseEnter={(e) => handleMouseEnter(index, e.currentTarget.getAttribute('data-info'))} // Используйте `getAttribute` для получения значения атрибута
                      onMouseLeave={handleMouseLeave}
                    >
                      <td>{item.name}</td>
                      <td>{item.values}</td>
                      <td id={index + '.bids'}>{item.bids}</td>
                      <td>{item.timeb}</td>
                      <td>{item.rangeb}</td>
                      <td id={index + '.asks'}>{item.asks}</td>
                      <td>{item.timea}</td>
                      <td>{item.rangea}</td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })}
          </tbody>
        </table>
      </div>


    <div className="mb-5"><br /> </div>
    <div className="mb-5"><br /> </div>
    <div className="mb-5"><br /> </div>
    <div className="mb-5"><br /> </div>
    <div className="mb-5"><br /> </div>
    <div className="mb-5"><br /> </div>
    <div className="mb-5"><br /> </div>
    <div className="mb-5"><br /> </div>
    <div className="mb-5"><br /> </div>
    <div className="mb-5"><br /> </div>
    <div className="mb-5"><br /> </div>


  </div>
  );
};

export default TableV2;










