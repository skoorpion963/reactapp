import React from 'react';

const MainPageContent = () => {
  return (

    
    

    <div className="container">
      <div className="container">
        <div className="mb-5"></div>
        <div className="mb-5"></div>
        <div className="mb-5"></div>

        <h2 className="text-primary">Добро пожаловать на криптовалютный скринер </h2>
        
    </div>
    

    <div className="container">
        <div className="mb-5"></div>
        <div className="mb-5"></div>
        <div className="mb-5"></div>
        <div className="row">
            
            <div className="col-md-7">
                Данный скринер собирает инфорамцию о сделках, лимитных завках  и объемах торгов по фьючерсам .
                На основе этих данных создается две таблицы , первая хранит в себе самые крупные заявки , вторая ищет 
                заявки ,от которых , как я пологаю можно торговать отскок или пробитие. Ниже вы можете видеть примеры заявок 
                из этих 2 таблиц.
            </div>
            
        </div>
    </div>

    
    <div className="container">
        <div className="mb-3"></div>
        <div className="mb-3"></div>
        <div className="mb-3"></div>
        <div className="row">
            
            <div className="col-md-4">
                    
                <img src="/images/bad_primer.png" alt="Image1" className="img-thumbnail"></img>
                <p className="text-info"> Скринер</p>
            </div>
            <div className="col-md-4">
                    
                <img src="/images/tableV1.png" alt="Image2" className="img-thumbnail"></img>
                <p className="text-info"> СкринерV2</p>
            </div>
                    
        </div>
        <div className="mb-3"></div>
        <div className="row">
            <div className="col-md-7">
            <p className="text-success">*Красным цветом указанны заявки которые будут показаны в таблицах </p>
                
            </div>
            
        </div>
    </div>

    <div className="container">
        <div className="mb-5"></div>
        <div className="mb-5"></div>
        <div className="mb-5"></div>
        <div className="row">

            <div className="col-md-7">
            	<strong>Описание полей таблицы</strong>  
            </div>

        </div>
        <div className="mb-2"></div>
        <div className="row">

            <div className="col-md-7">
                <strong>Название</strong> - название монеты                              
            </div>
	
	</div>
        <div className="mb-2"></div>
        <div className="row">

            <div className="col-md-7">
                <strong>Объем/мин</strong> - сумма всех купленных и проданных монет за прошедшую минуту
            </div>

        </div>
        <div className="mb-2"></div>
        <div className="row">

            <div className="col-md-7">
                <strong>fshort/flong</strong> - где монета находится заявка (f обозначает фьючерс, можно сделать и для спота)
            </div>

        </div>
        <div className="mb-2"></div>
        <div className="row">

            <div className="col-md-7">
                <strong>Время</strong> - это то время которое понадобится рынку разъесть заявку при текущем объеме 
            </div>
        </div>
    	</div>
    

      <div className="container">
        <div className="mb-5"></div>
        <div className="mb-5"></div>
        <div className="mb-5"></div>
        <div className="mb-5"></div>
        <div className="mb-5"></div>
        <div className="mb-5"></div>
        <div className="mb-5"></div>
        <div className="mb-5"></div>
        <div className="mb-5"></div>
        <div className="mb-5"></div>
        <div className="mb-5"></div>
        <div className="mb-5"></div>

        <div className="row">
            
         
            
        </div>
        <div className="mb-2"></div>
        <div className="row">

            <div className="col-md-7">
            <p className="text-success">Поддержка проекта  </p>
              
            </div>

        </div>

        <div className="mb-2"></div>
        <div className="row">
            
            <div className="col-md-7">
              Binance ID : 355482457 / Nickname : Shellnameilya
            </div>
            
        </div>
        
    </div>
    </div>
    );
    };

    export default MainPageContent;