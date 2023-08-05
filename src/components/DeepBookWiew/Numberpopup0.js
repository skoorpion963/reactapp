import React, { useState, useEffect, useRef } from 'react';
import { Modal, ProgressBar , Row , Col} from 'react-bootstrap';
import axios from 'axios';
import './style.css'

const symbol = 'BTCUSDT'; // Замените на нужный символ

// кастомизация прогресс бара 
const TextProgressBar = ({ price, now, variant , quantity }) => {
    return (
      <div className="text-progress-bar">
        <Row>
          <Col xs="auto">
            <span>{price}</span>
          </Col>
          <Col>
            
            <ProgressBar now={now} variant={variant} label={quantity}/>
          </Col>
        </Row>
      </div>
    );
  };
  








// вывод стакана
const NumberPopup = () => {
    const [showModal, setShowModal] = useState(true);
   
    const symbol = "btcusdt";
    const serverAddress = 'wss://fstream.binance.com/ws/'+symbol+'@depth@500ms';
    
    const [loadData , setLoadData] = useState(false);
    const [state, setState] = useState({
      data: null,
      socket: null,
    });
    const [uppdate, setUppdate ] = useState(0)


    // получение снимка стакана и подготовка данных к выводу 
    const processDepthData = (bids , asks) => {
  // поиск макс числа 
  // можно оптимизировать путем нахождения maxAll в обновлениях для bids и asks
  const bidsList = bids.map(item => parseFloat(item[1]));
  const asksList = asks.map(item => parseFloat(item[1]));
  const maxBid = Math.max(...bidsList);
  const maxAsk = Math.max(...asksList);
  const maxAll = maxBid > maxAsk ? maxBid : maxAsk;

  const bidsListwork = bids;
  const asksListwork = asks;

  const progressBarAsksMap = {};
  const progressBarBidsMap = {};
  const progressBarBids = [];
  const progressBarAsks = [];


  // можно оптимизировать , вместо пересборки обновлять значения внутри "progressBarBids"
  // пересобирать если maxAll становится больше текущего на 20%
  for (let i = 0; i < 500; i++) {
    progressBarBids.push(
      <div key={bidsListwork[i][0].uniqueId} className="progress-item">
        <TextProgressBar
          price={bidsListwork[i][0]}
          quantity={bidsListwork[i][1]}
          now={(bidsListwork[i][1] / maxAll) * 100}
          variant="success"
        />
      </div>
    );
    progressBarBidsMap[bidsListwork[i][0]] = i;
  }
  

  for (let i = 0; i < 500; i++) {
    progressBarAsks.push(
      <div key={asksListwork[i][0].uniqueId} className="progress-item">
        <TextProgressBar
          price={asksListwork[i][0]}
          quantity={asksListwork[i][1]}
          now={(asksListwork[i][1] / maxAll) * 100}
          variant="danger"
        />
      </div>
    );
    progressBarAsksMap[asksListwork[i][0]] = i;
  }


  const result = { progressBarAsks, progressBarBids, progressBarAsksMap, progressBarBidsMap ,asksListwork, bidsListwork};
  setState((prevState) => ({ ...prevState, data: result }));
  setUppdate(uppdate+1);
  console.log(uppdate)
  
    };
    // получаю снимок 
    const fetchData = async (symbol) => {
  try {
    const response = await axios.get(`https://fapi.binance.com/fapi/v1/depth?symbol=${symbol}`);
    const data = response.data;
    

    return processDepthData(data.bids,data.asks.reverse());
  } catch (error) {
    console.error('Произошла ошибка:', error.message);
  }
    };



// изменяет списки с элементами 
    const apdateList = (bids , asks, bidsListwork, asksListwork,  progressBarBidsMap, progressBarAsksMap) => {

  
  for (let i = 0; i < bids.length; i++) {
    if (bids[i][0] in progressBarBidsMap)
    {
      bidsListwork[progressBarBidsMap[bids[i][0]]] = [bids[i][0] ,bids[i][1]];
    };
  };

  for (let i = 0; i < asks.length; i++) {
    if(asks[i][0] in progressBarAsksMap)
    {
      asksListwork[progressBarAsksMap[asks[i][0]]] = [asks[i][0],asks[i][1]];
    };
  };

  processDepthData(bidsListwork, asksListwork);

    };





// подключение к потоку
    const connectToWebSocket = (serverAddress,state) => {
      
      const newSocket = new WebSocket(serverAddress);
      newSocket.onopen = () => {
        console.log('WebSocket connection is open.');
      };
      newSocket.onmessage = (event) => {
        try {
          const data_js = JSON.parse(event.data);
          if (state.data) {
            
            const bids = data_js.b;
            const asks = data_js.a;
            const {progressBarBids, progressBarAsks, progressBarBidsMap,
               progressBarAsksMap, bidsListwork, asksListwork} = state.data;
            
            apdateList(bids , asks, bidsListwork, asksListwork,  progressBarBidsMap, progressBarAsksMap);
          }
          
          

        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };
      newSocket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
      newSocket.onclose = (event) => {
        console.log('WebSocket connection is closed:', event.code, event.reason);
      };
      return newSocket;
    };

    

    useEffect(() => {
      const fetchDataAsync = async () => {
        await fetchData(symbol); // Вызываем функцию и получаем результат
        
        
        setLoadData(true);
      };
  
      if (!state.data) {
        fetchDataAsync();
      }
    }, []);


    // эффект обновляющий значения на экране 
    useEffect(() => {


    },[uppdate]);
  
    const modalRef = useRef(null);

    useEffect(() => {
      const scrollIntoViewIfNeeded = () => {
          if (modalRef.current) {
              const centralElement = modalRef.current.querySelector('.central-element');
              console.log(centralElement);
              if (centralElement) {
                  centralElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  console.log('прокрутил ');
              }
          }
      };
  
      if (showModal) {
          scrollIntoViewIfNeeded();
      }
  }, [showModal, modalRef.current]);

    useEffect(() => {
      if (loadData) {
        console.log('вебсокет ЗАПУЩЕН!!!!!!!!');
        const newSocket = connectToWebSocket(serverAddress,state);
        setState((prevState) => ({ ...prevState, socket: newSocket }));
  
        return () => {
          if (newSocket) {
            newSocket.close();
          }
        };
      }
    }, [loadData]);


    useEffect(() =>{
      console.log('UPPDATE!!!!!!!')
    },[uppdate]);
    

    if (!state.data) {
      return <div>Loading...</div>; // Показываем загрузочное сообщение, пока данные загружаются
    }
    

    const handleClose = () => {
        setShowModal(false); // Установите состояние showModal в false для закрытия окна
      };


    // Далее вы можете использовать данные из объекта data, например:
    const {progressBarBids , progressBarAsks} = state.data;
    
 
    // Ссылка на элемент модального окна


  


  return (
    <Modal show={showModal} onHide={handleClose} scrollable>
      <Modal.Header closeButton>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body  ref={modalRef}>
        {progressBarAsks}
        <div className="central-element">------</div>
        {progressBarBids}
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-primary">
            <i className="bi bi-clipboard"></i> Copy Code
            </button>
      </Modal.Footer>
    </Modal>
  );
};

export default NumberPopup;
