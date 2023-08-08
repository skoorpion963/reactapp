import React, { useState, useEffect, useRef } from 'react';
import { Modal, ProgressBar , Row , Col} from 'react-bootstrap';
import axios from 'axios';
import './style.css'



// кастомизация прогресс бара 
const TextProgressBar = ({ price, now, variant , quantity }) => {
    return (
      <div className="text-progress-bar">
        <Row>
          <Col xs="auto">
            <span className={`text-${variant}`}><strong>{price}</strong></span>
          </Col>
          <Col>
            
            <ProgressBar now={now} variant={variant} label={quantity}/>
          </Col>
        </Row>
      </div>
    );
  };
  








// вывод стакана
const NumberPopup = ({ dataToPass = {}, onClose }) => {

    const [showModal, setShowModal] = useState(true);    
    const [loadData , setLoadData] = useState(false);
    const [state, setState] = useState({
      data: null,
      socket: null,
    });
    const [uppdate, setUppdate ] = useState(0)

    console.log(dataToPass)
    console.log(dataToPass.symbol)
    // обработка ответа вебсокета 
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

    const progressBar = [];
    const progressBarMap = {};


    for (let i = 0; i < 500; i++) {
      progressBar.push(

        [asksListwork[i][0],asksListwork[i][0],
        asksListwork[i][1],(asksListwork[i][1] / maxAll) * 100,"success"]
      );
      progressBarMap[asksListwork[i][0]] = i;
    }

    for (let i = 0; i < 500; i++) {
      progressBar.push(

        [bidsListwork[i][0],bidsListwork[i][0],
        bidsListwork[i][1],(bidsListwork[i][1] / maxAll) * 100,"danger"]
      );
      progressBarMap[bidsListwork[i][0]] = i+ 500;
    }

    const result = { progressBar, progressBarMap , maxAll};
    setState((prevState) => ({ ...prevState, data: result }));
    setUppdate(uppdate+1);
  
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
    const apdateList = (bids , asks, progressBar, progressBarMap , maxAll) => {

      for (let i = 0; i < bids.length; i++) {
        if (bids[i][0] in progressBarMap)
        {
          const value = bids[i][1] !== 0 ? (bids[i][1] / maxAll) * 100 : 0;
          const pB = progressBar[progressBarMap[bids[i][0]]]
          pB[2] = bids[i][1]
          pB[3] = value
          pB[4] = "danger"
        };
      };

      for (let i = 0; i < asks.length; i++) {
        if(asks[i][0] in progressBarMap)
        {
          const value = asks[i][1] !== 0 ? (asks[i][1] / maxAll) * 100 : 0;
          const pB = progressBar[progressBarMap[asks[i][0]]]
          pB[2] = asks[i][1]
          pB[3] = value
          pB[4] = "success"
        };
      };

      const result = { progressBar, progressBarMap, maxAll};
      setState((prevState) => ({ ...prevState, data: result }));
      setUppdate(uppdate+1);


    };


    // подключение к потоку
    const connectToWebSocket = (symbol,state) => {
      
      const serverAddress = 'wss://fstream.binance.com/ws/'+symbol+'@depth@500ms';
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
            const {progressBar, progressBarMap ,maxAll} = state.data;
            
            apdateList(bids , asks, progressBar, progressBarMap, maxAll);
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


    // получаю снимок стакана
    useEffect(() => {
      if (dataToPass && dataToPass.symbol !== null){ // Добавили проверку на наличие dataToPass.dataToPass
        const fetchDataAsync = async () => {
          const symbol = dataToPass.symbol;
          console.log(symbol)
          await fetchData(symbol);
          
          setLoadData(true);
        };

        if (!state.data) {
          fetchDataAsync();
        }
      }
    }, [dataToPass]);


    // эффект обновляющий значения на экране 
    useEffect(() => {


    },[uppdate]);
  
    const modalRef = useRef(null);

    // эффек прокрутки стакана к середине 
    useEffect(() => {
      const scrollIntoViewIfNeeded = () => {
          if (modalRef.current) {

              const centralElement = modalRef.current.querySelector('.progress-item[data-id="current-bar"]');
              console.log(centralElement);

              if (centralElement) {
                  centralElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

              }
          }
      };
  
      if (showModal) {

          scrollIntoViewIfNeeded();
      }
    }, [showModal, modalRef.current]);

    //вебсокет 
    useEffect(() => {
      if (dataToPass.symbol !== null){
        if (loadData) {
          console.log('вебсокет ЗАПУЩЕН!!!!!!!!');
          const symbol = dataToPass.symbol;
          const newSocket = connectToWebSocket(symbol,state);
          setState((prevState) => ({ ...prevState, socket: newSocket }));
    
          return () => {
            if (newSocket) {
              newSocket.close();
            }
          };
        }
      }
    }, [loadData]);


    useEffect(() =>{

    },[uppdate]); 
    
    if (dataToPass.symbol == null){
      return <div></div>
    }

    if (!state.data) {
  
        return <div>Loading...</div>;
      
    }
    

    // Обработчик закрытия модального окна
    const handleClose = () => {
      if (state.socket) {
          state.socket.close(); // Закрываем WebSocket соединение
      }
      setShowModal(false); // Устанавливаем состояние showModal в false для закрытия окна
      onClose(); // Вызываем переданную функцию для закрытия компонента
  };


    
    // Далее вы можете использовать данные из объекта data, например:
    const {progressBar} = state.data;
    const progressBarRender = [];
    for (let i=0; i < progressBar.length; i++){
      progressBarRender.push(
        <div key={progressBar[i][0]} className="progress-item" data-id = {`${i === 500 ? 'current-bar' : ''}`}>
          <TextProgressBar
            price={progressBar[i][1]}
            quantity={progressBar[i][2]}
            now={progressBar[i][3]}
            variant={progressBar[i][4]}
          />
        </div>
        );
    }
    console.log('render')
  
  
    
    return (
      <Modal show={showModal} onHide={handleClose} scrollable>
        <Modal.Header closeButton>
          <Modal.Title><p>{dataToPass.symbol}</p></Modal.Title>
        </Modal.Header>
        <Modal.Body  ref={modalRef}>
          {progressBarRender}
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    );
  

};

export default NumberPopup;
