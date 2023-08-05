class DoublyLinkedListNode {
    constructor(value, next = null, previous = null) {
      this.value = value;
      this.next = next;
      this.previous = previous;
      this.key = null; 
      
    }

    //изменение значения )
    update(newValue) {
        this.value = newValue;
        }
}

class DoublyLinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
      this.nodeMap = {}; // Словарь для хранения узлов по их значениям
    }
  
  
    toString(callback) {
      return callback ? callback(this.value) : `${this.value}`;
    }


    prepend(value, key) {
        // Создаём новый узел, который будет новым head,
        // при создании передаём второй аргумент, который указывает
        // что его "next" будет текущий head,
        // так как новый узел будет стоять перед текущем head.
        const newNode = new DoublyLinkedListNode(value, this.head);
      
        // Если есть head, то он больше не будет head.
        // Поэтому, его ссылку на предыдущий узел (previous) меняем на новый узел.
        if (this.head) {
          this.head.previous = newNode;
        }
      
        // Переназначаем head на новый узел
        this.head = newNode;
      
        // Если ещё нет tail, делаем новый узел tail.
        if (!this.tail) {
          this.tail = newNode;
        }
      
        
        this.nodeMap[key] = newNode; // Добавляем узел в словарь
        newNode.key = key
      }


    append(value, key) {
        // Создаём новый узел.
        const newNode = new DoublyLinkedListNode(value);
      
        if (this.tail) {
          // Присоединяем новый узел к концу связного списка.
          this.tail.next = newNode;
        }
      
        // В новом узле указываем ссылку на предыдущий (previous) элемент на this.tail,
        // так как новый узел будет теперь последним.
        newNode.previous = this.tail;
      
        // Переназначаем tail на новый узел.
        this.tail = newNode;
      
        // Если ещё нет head, делаем новый узел head.
        if (!this.head) {
          this.head = newNode;
        }
      
        this.nodeMap[key] = newNode; // Добавляем узел в словарь
        newNode.key = key
      }


      // Удаление элемента из начала списка (головы)
    removeHead() {
        if (!this.head) {
          // Если список пустой, возвращаем null
          return null;
        }
    
        const removedHead = this.head;
    
        if (this.head === this.tail) {
          // Если в списке только один элемент, обнуляем head и tail
          this.head = null;
          this.tail = null;
        } else {
          // Иначе, переназначаем head на следующий элемент и удаляем связь с предыдущим элементом
          this.head = this.head.next;
          this.head.previous = null;
        }
    
        // Удаляем значение из словаря
        delete this.nodeMap[removedHead.key];
    
      }


    // Удаление элемента из конца списка (хвоста)
    removeTail() {
        if (!this.tail) {
        // Если список пустой, возвращаем null
        return null;
        }

        const removedTail = this.tail;

        if (this.head === this.tail) {
        // Если в списке только один элемент, обнуляем head и tail
        this.head = null;
        this.tail = null;
        } else {
        // Иначе, переназначаем tail на предыдущий элемент и удаляем связь с следующим элементом
        this.tail = this.tail.previous;
        this.tail.next = null;
        }

        // Удаляем значение из словаря
        delete this.nodeMap[removedTail.key];
        
    }


    // поиск по ключу 
    findNodeByValue(key) {
        return this.nodeMap[key] || null; // Возвращает узел по его значению из словаря
      }
    
    // рендерит ноды 
    renderNodes = (node) => {
        return (
            <div>
            {node.value}
            {node.next && this.renderNodes(node.next)}
            </div>
        )
    }
    // запускает рендеринг нод
    render() {
        // Проверка на наличие головного узла
        if (!this.head) {
          return null;
        }
    
        // Вызов метода renderNodes с передачей головного узла в качестве параметра
        return this.renderNodes(this.head);
      }
}

export default DoublyLinkedList;



