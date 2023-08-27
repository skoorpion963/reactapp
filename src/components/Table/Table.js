import React, { useEffect, useState } from 'react';
import NumberPopup from '../DeepBookWiew/Numberpopup0';


const Table = () => {
  const [isNumberPopupVisible, setIsNumberPopupVisible] = useState(false);
  const [data, setData] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null); // Объявляем состояние hoveredRow
  const [key_enter, setKeyEnter] = useState(null);
  const [name_elem, setNameElem] = useState(null);
  const [data_info , setDataInfo] = useState(null);
  const [numberPopupData, setNumberPopupData] = useState(null);

  
  const handleNumberPopupButtonClick = (symbol) => {
    console.log(symbol);
    setIsNumberPopupVisible(true); // Устанавливаем флаг видимости попапа
    setNumberPopupData({ symbol });
  };


  const handleCloseNumberPopup = () => {
    setIsNumberPopupVisible(false); // Закрыть модальное окно
  };

  const handleMouseEnter = (index,item, dataInfo) => {
    const [value1, value2] = dataInfo.split(',').map(Number);
    console.log(item.name, value1, value2, 'enter');
    setKeyEnter(index); // Используем setKeyEnter для обновления значения key_enter
    setDataInfo([value1,value2]);
    if (value1 == 1){
      var elem = document.getElementById(`${index}.bids`);
      elem.innerHTML = `
      <td id="${index}.bids">${elem.textContent}
          <button class="btn btn-primary">
              <img src="/images/pngegg.png" className="img-fluid" style="width: 25px; height: 25px;" />
          </button>
      </td>
    `;
      elem.onclick = () => handleNumberPopupButtonClick(item.name);
    }
    if (value2 == 1){
      var elem = document.getElementById(`${index}.asks`);
      elem.innerHTML = `<td id="${index+".asks"}">${elem.textContent}
      <button class="btn btn-primary">
       <img src="/images/pngegg.png" className="img-fluid"  style="width: 25px; height: 25px;" />
       </button>
       </td>`;
       elem.onclick = () =>  handleNumberPopupButtonClick(item.name)
    }

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
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.1.140:8000/api/v1/table/');
        console.log(response)
        const jsonData = await response.json();
        console.log(jsonData)
        setData(jsonData.data);
      } catch (error) {
        console.error('Ошибка при получении данных из API:', error);
      }
    };

    
    const now = new Date();
    const seconds = now.getSeconds();
    console.log(seconds)
    let interval = 0
    if (seconds == 0 || seconds <= 3){
      interval = setInterval(fetchData, (3000 - seconds*1000 +1000));
    }
    else{
      interval = setInterval(fetchData, 3000);
    };

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
  
    <div className="container">
      {isNumberPopupVisible && (
        <NumberPopup
        dataToPass={numberPopupData || { symbol: null }}
        onClose={handleCloseNumberPopup}
      />
      )}
      <div className='col-md-12 mx-auto text-center mb-10' >
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
                      data-info={data.join(',')} 
                      className={'table-primary'}
                      onMouseEnter={(e) => handleMouseEnter(index,item, e.currentTarget.getAttribute('data-info'))} // Используйте `getAttribute` для получения значения атрибута
                      onMouseLeave={handleMouseLeave}
                      key = {item.name}
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




  </div>
  );
};

export default Table;










