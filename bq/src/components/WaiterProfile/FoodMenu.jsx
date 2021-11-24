import React from 'react';

export const FoodMenu = ({el , addToOrder}) => {
     let { name , image} = el; 

    //  const addToOrder=(key)=>{
    //     console.log('id  '+ key);
        
    //     return key;//creo que debe ser todo el objeto
    //  }

    return (
        
        <div  onClick={()=>{addToOrder(el)}}  className= "content-menu">
            <picture className="content__img">
                <img className="imag-menu" src={image} alt="proof" />
            </picture>
            <p className= "title__food">{name}</p>
        </div>   
     
    )
}

