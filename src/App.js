import React  from 'react';
import { useState, useEffect, useRef, location} from 'react';
import './App.css';
import MemoCards from './components/MemoCards';
import Card from './components/Card';
import Home from './components/Home';
import Header from './components/Header';
import Win from './components/Win'
import Info from './components/Info';
import { imagenes } from './import';





function App() {

  
  
  
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState({});
  const [secondCard, setSecondCard] = useState({});

  const [unflippedCards, setUnflippedCard] = useState([])
  const [disabledCards, setDisableCard] = useState([]);

  let [matchedCards, setMatchedCards] = useState(0);

  //usestate que cambia la pantalla del juego cuando se gana 
  let [gameOver, setGameOver] = useState(false);

  const [mostrarHome, setMostrarHome] = useState(true);
  const [mostrarJuego, setMostrarJuego] = useState(true);
 


 
//FUNCIONALIDAD DE LAS CARDS :


  // Ubicacion de las cards de manera aleatoria
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--){
      let j = Math.floor(Math.random() * (i + 1) );
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  } 
};



  useEffect(() => {
    shuffleArray(imagenes);
    setCards(imagenes);
  }, [])
 // chequea si hay match o no
  
 useEffect( () => {
      matchTrue();
  }, [secondCard]);


  //voltea la carta
  const flipCard = (name, number) => {
    if (firstCard.name === name && firstCard.number === number){
      return 0;

    }
      //estoy volteando la misma carta
      if (!firstCard.name){
        setFirstCard({name, number});
        aumentarContador()
        console.log(aumentarContador)
      }
      else if (!secondCard.name){
        setSecondCard({name, number });
      }
    return 1; 
  };


  const disableCards = () =>  {
    setDisableCard([firstCard.number, secondCard.number]);
    resetCards();
  };
 
 
const unFlipCards = () => {
    setUnflippedCard([firstCard.number, secondCard.number]);
    resetCards();
  };


 // condicional para que se muestre GANASTE una vez que completo el juego

  const [matchContador, setMatchContador] = useState(0)

  const matchTrue = () => {
    if (firstCard.name && secondCard.name) {
      const match = firstCard.name === secondCard.name;
      match ?  disableCards() :  unFlipCards();
      match ? setMatchContador( matchContador => matchContador + 1 ) : unFlipCards();
      match ? setMatchedCards(matchedCards => matchedCards + 1) : unFlipCards()
       console.log(matchContador)
       }

   
 }



 //Utilizo useRef para guardar la referencia de gameOver como true una vez ganado el juego
 const gameOverRef = useRef(gameOver)

 useEffect(() => {
  gameOverRef.current = gameOver;
}, [gameOver]);


// si las cartas no coinciden, resetea el movimiento
 const resetCards = () => {
    setFirstCard({});
    setSecondCard({});
    
  }

 
  
// CUENTA REGRESIVA

  const Ref = useRef(null);
  
  // The state for our timer
const [timeLeft, setTimeLeft] = useState('00:40');
  
  const getTimeRemaining = (endTime) => {
    const total = Date.parse(endTime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
 //   const hours = Math.floor(total / (1000 * 60 * 60) % 24);
    return {
      total,
    //  hours,
      minutes,
      seconds,
    };
  };
  
 const startTimer = (endTime) => {
  
  const intervalId = setInterval(() => {
    const { total, hours, minutes, seconds } = getTimeRemaining(endTime);

    if (total >= 0) {
      
      setTimeLeft(
        //  (hours > 9 ? hours : '0' + hours) + ':' +
        (minutes > 9 ? minutes : '0' + minutes) + ':' +
        (seconds > 9 ? seconds : '0' + seconds)
      );
   
      //Si el jugador no ganó el juego:
      const timerex = document.getElementById('timer') 
     if (timerex){
      if (seconds <= 10) {
        document.getElementById('timer').classList.add('timerRed');
        document.getElementById('timer').classList.add('timerAnimado');
      }
    }
   
     // si el tiempo llega a 0 y el jugador no gana el juego, se dispara el alert
      if ( !gameOverRef.current && total === 0  && seconds <= 0 ) {
       

        clearInterval(intervalId);
        console.log("Time's up!");
        if (!gameOverRef.current){
        setTimeout(() => {
         alert("Se te terminó el tiempo, proba de nuevo!");
         window.location.reload();
        }, 1000, [gameOver]);
      }
      } 
      
    
    } ; 

 }, 1000);
   
    Ref.current = intervalId;
 };

 // Cuando las cartas estan emparejadas actualiza el estado de gameOver a true.
 
 useEffect(() => {
    if (matchedCards === 6) {
      console.log("Ganaste!");
      setGameOver(true);
      setMostrarJuego(false);
      console.log("gameover: ", gameOver)
    }
  }, [matchedCards, gameOver],); 
    
  
  const clearTimer = (endTime) => {
    // Clear any existing timer intervals
    clearInterval(Ref.current );
  
    // Set the initial time left
    setTimeLeft("00:40");
  
    // Start the new timer interval
    startTimer(endTime);
  };
  

  // Boton jugar:

  const handleJugar = () => {
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 40);
    startTimer(deadline);
    setMostrarHome(false);
  }
  

//CONTADOR DE INTENTOS

const [contadorI, setContadorI ] = useState(0);

const aumentarContador = () => {
  setContadorI(contadorI + 1)
}

 
 
   
    return (
   
    <div className="App">
      <Header></Header>
    
    <div className="main"></div>

      { gameOver ? (
      
      <Win numeroIntentos={contadorI} handleJugar={handleJugar} />
        ) : (
   
    <div id='container' className="container">
      
      {
        cards.map((card, index) =>(
          <Card 
          key={index}
          name={card.nombre} 
          number={index} 
          frontFace={card.img} 
          flipCard={flipCard} 
          unflippedCards={unflippedCards}
          disabledCards={disabledCards}
          matchedCards={matchedCards}/>
        ))
      }
    
    
     </div>
     )}
   { mostrarJuego && (
    <>
   <h2 className='timer' id='timer'> { timeLeft } </h2>
   <div className="contadorIntentos intentos" id='contadorIntentos'>  <h3>Intentos</h3><span id='spanIntentos' className='spanIntentos'>{ contadorI }</span> </div> 
   </>
   )}
    {mostrarHome && <Home handleJugar={handleJugar} />}
  </div>
  
  



 
  
  

  );
}

export default App;
