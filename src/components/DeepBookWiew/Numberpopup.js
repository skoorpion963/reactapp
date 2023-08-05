import React, { useState, useEffect, useRef } from 'react';
import { Modal, ProgressBar , Row , Col} from 'react-bootstrap';
import axios from 'axios';
import './style.css'
import DoublyLinkedList from './DoublyLinkedList';

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

const generateList = (listNode) => {
  let currentNode = listNode.head; // Начинаем с головного узла
  const progressList = [];

  while (currentNode) {
    // Ваш код для обработки текущего узла, например, вывод его значения
    const values = currentNode.value
    progressList.push(
    <div key={values[0].uniqueId} className="progress-item">
    <TextProgressBar
      price={values[0]}
      quantity={values[1]}
      now={values[2]}
      variant={values[3]}
    />
  </div>
    )

    // Перемещаемся к следующему узлу
    currentNode = currentNode.next;
  }

}


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
    
      let maxAll = apdateMaxAll(bids,asks ,0)

      const bidsListwork = bids;
      const asksListwork = asks;

      const progressBarBids = new DoublyLinkedList();
      const progressBarAsks = new DoublyLinkedList();

      for (let i = 0; i < 500; i++) {
        progressBarBids.append(
        <div key={bidsListwork[i][0].uniqueId} className="progress-item">
        <TextProgressBar
          price={bidsListwork[i][0]}
          quantity={bidsListwork[i][1]}
          now={(bidsListwork[i][1] / maxAll) * 100}
          variant="success"
        />
        </div>
        , bidsListwork[i][0]
        );
      }

      for (let i = 0; i < 500; i++) {
        progressBarAsks.append(
          <div key={asksListwork[i][0].uniqueId} className="progress-item">
          <TextProgressBar
            price={asksListwork[i][0]}
            quantity={asksListwork[i][1]}
            now={(asksListwork[i][1] / maxAll) * 100}
            variant="danger"
          />
          </div> 
          , asksListwork[i][0]
        );
      }

        const result = { progressBarAsks, progressBarBids};
      setState((prevState) => ({ ...prevState, data: result }));
      
  
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

    // нахождение максимального числа 
    const apdateMaxAll = (bids ,asks , maxAll) => {

      for (let i = 0; i< bids.length; i ++){
        if (maxAll < bids[i][1]){
          maxAll = bids[i][1]
        }
      }
      for (let i=0; i < asks.length; i++){
        if (maxAll < asks[i][1]){
          maxAll = asks[i][1]
        }
      }
      
      return maxAll
    }

    // изменяет списки с элементами 
    const apdateList = (bids , asks, progressBarBids, progressBarAsks , maxAll) => {

      maxAll = apdateMaxAll(bids, asks ,maxAll)

      for (let i = 0; i < bids.length; i++) {
        if (progressBarBids.findNodeByValue(bids[i][0]) != null)
        {
          console.log('изменил ноду бидс')
          const node = progressBarBids.findNodeByValue(bids[i][0])
          node.update(      
          <div key={bids[i][0].uniqueId} className="progress-item">
          <TextProgressBar
            price={bids[i][0]}
            quantity={bids[i][1]}
            now={(bids[i][1] / maxAll) * 100}
            variant="success"
          />
        </div>)
        };
      };

      for (let i = 0; i < asks.length; i++) {
        if(progressBarAsks.findNodeByValue(asks[i][0]) != null)
        {
          console.log('изменил ноду аскс')
          const node = progressBarAsks.findNodeByValue(asks[i][0])
          node.update(
            <div key={asks[i][0].uniqueId} className="progress-item">
            <TextProgressBar
              price={asks[i][0]}
              quantity={asks[i][1]}
              now={(asks[i][1] / maxAll) * 100}
              variant="danger"
            />
          </div>
          )
        };
      };
      const result = { progressBarAsks, progressBarBids};
      setState((prevState) => ({ ...prevState, data: result }));
      setUppdate(prevUppdate => prevUppdate + 1);

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
            const {progressBarAsks, progressBarBids} = state.data;
            
            apdateList(bids , asks,  progressBarAsks, progressBarBids,);
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

    // прокрутка в середину 
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

    // запуск вебсокета 
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

    // обновление информации на странице 
    useEffect(() =>{
      console.log('UPPDATE!!!!!!!')
      console.log(uppdate)
    },[uppdate]);
    

    if (!state.data) {
      return <div>Loading...</div>; // Показываем загрузочное сообщение, пока данные загружаются
    }
    
    // закрытие окна 
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
        {progressBarAsks.render()}
        <div className="central-element">------</div>
        {progressBarBids.render()}
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
