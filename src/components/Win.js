import React from 'react';
import { useState } from 'react'
import Info from './Info';
import '../css/Win.css';
import imgwin from '../img/win3.png';
import repeat from '../img/repeat.png';
import info from '../img/info.png';

function Win(props) {

const reiniciar = () => {
  window.location.reload() 
}

const [mostrarInfo, setMostrarInfo] = useState(false);

const handlePopup = ()=>{
  setMostrarInfo(!mostrarInfo);
}

  return (
    
    <div className='win'>
       
        <img className='imagenwin' src={imgwin} alt="asa"/>
        <div className='botoncitos'>
        <button type="button" id="return" className='return'  onClick={reiniciar}><img src={repeat} alt="repeat"/></button>
        <button type="button" id="info" className='info' onClick={handlePopup}><img src={info} alt="info"/></button>
        {mostrarInfo && (
        <Info onClose={handlePopup} />
      )}
        </div>
        <div className='text'>
        <h1 className='Animado'>Felicitaciones!</h1>
        <h3>Superaste el juego en {props.numeroIntentos} intentos</h3>
        </div>
    </div>
  )
}

export default Win