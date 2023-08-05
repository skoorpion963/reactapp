import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WebSocketComponent = () => {
    const symbol = "btcusdt";
    const serverAddress = 'wss://stream.binance.com/ws/'+symbol+'@aggTrade';
    const [socket, setSocket] = useState(null);
  
    const connectToWebSocket = (serverAddress) => {
      const newSocket = new WebSocket(serverAddress);
      newSocket.onopen = () => {
        console.log('WebSocket connection is open.');
      };
      newSocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Received message:', data);
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
    const newSocket = connectToWebSocket(serverAddress);
    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, []); // Подключение выполняется только при монтировании

};

export default WebSocketComponent;
