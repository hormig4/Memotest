import React from 'react'
import '../css/Info.css'
import linkedin from '../img/linkedin.png'



function Info(props) {
 
 
   
     return (
    <div className='popup'>
   <div className='info-contenido'>
    <button className='botonCerrar' onClick={props.onClose}>X</button>
    <h2>Autor: Juan Martin Riva</h2>
    <p>Marzo de 2023</p>
    <p>Gracias por tu visita ❤️</p>
    <a href="https://www.linkedin.com/in/juanriva" target="_blank" rel="noreferrer"><img src={linkedin} alt="linkedin"/></a>
     </div>
     </div>
  )
}

export default Info