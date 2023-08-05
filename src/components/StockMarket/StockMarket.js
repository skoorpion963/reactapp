import React, { useEffect, useState } from 'react';

const StockMarket = () => {

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://fapi.binance.com/fapi/v1/depth?symbol=BTCUSDT&limit=1000');
            const jsonData = await response.json();
            console.log(jsonData)
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

};