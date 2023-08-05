import React, { useEffect, useState, useRef } from 'react';
import NumberPopup from './Numberpopup';

class QueueElem {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  
    setNext(next) {
      this.next = next;
    }
  
    getNext() {
      return this.next;
    }
  
    getValue() {
      return this.value;
    }
  }
  
  class Queue {
    constructor() {
      this.firstElem = null;
      this.lastElem = null;
    }
  
    add(value) {
      if (this.firstElem) {
        if (this.lastElem) {
          const newElem = new QueueElem(value);
          this.lastElem.setNext(newElem);
          this.lastElem = newElem;
        } else {
          this.lastElem = new QueueElem(value);
          this.firstElem.setNext(this.lastElem);
        }
      } else {
        this.firstElem = new QueueElem(value);
      }
    }
  
    get() {
      try {
        if (this.firstElem === this.lastElem && this.firstElem !== null) {
          const value = this.firstElem.getValue();
          this.firstElem = null;
          this.lastElem = null;
          return value;
        }
  
        if (this.firstElem) {
          const value = this.firstElem.getValue();
          this.firstElem = this.firstElem.getNext();
          return value;
        }
        
        throw new Error('Список пуст!');
      } catch (ex) {
        throw new QueueError('Список пуст!');
      }
    }
  }
  
  class QueueError extends Error {
    constructor(message) {
      super(message);
      this.name = 'QueueError';
    }
  }




  const DeepBookWiew = () => {
    const [queue, setQueue] = useState(new Queue());
    const [currentNumber, setCurrentNumber] = useState(null);
  
    const addToQueue = () => {
      for (let i = 1; i <= 7; i++) {
        queue.add(i);
      }
    };
  
    const showNextNumber = () => {
      try {
        const number = queue.get();
        setCurrentNumber(number);
      } catch (error) {
        setCurrentNumber(null);
      }
    };
  
    useEffect(() => {
      addToQueue();
      const interval = setInterval(showNextNumber, 1000);
  
      return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
    }, []); // Пустой массив зависимостей, чтобы useEffect выполнился только при монтировании
  
    return (
        <div>   
          <NumberPopup/>
        </div>
      );
    };
  
  export default DeepBookWiew;
  
