    import React from 'react'
    import {useState, useRef, useEffect} from 'react'
    import '../css/Home.css';
    import '../css/MemoCards.css'
    import portada from '../img/win4.png';


    //import { useState } from 'react';

    function Home(props) {
    
        const container = document.querySelector('.container')
        const jugar = document.getElementById ('jugar')
        const timer = document.getElementById('timer')
        const Intentos = document.querySelector('.contadorIntentos')
        
    
    const handleJugar = () => {
        
        container.style.display = "flex";
        jugar.style.display = "none";
        timer.style.display = "block";
        Intentos.style.display = "flex";
        
        props.handleJugar();

        

    //Animacion del boton jugar 

    





    }




        
    
    return (
        
        <div className='home'>
            
            <img className='portada' src={portada} alt="aa" />
            <button
            type='button'
            id='jugar'
            className='jugar botonAnimado'
            onClick={handleJugar}>Jugar
            </button>
        
        
        </div>

        
    
    )

    }
    export default Home