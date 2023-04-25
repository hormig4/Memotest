import React, { useState, useEffect } from 'react'
import ReactCardFlip from 'react-card-flip';
import backface from '../portal.png' 
import '../css/Card.css'


const Card = ({name, number, frontFace, flipCard, unflippedCards, disabledCards}) =>  {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasEvent, setHasEvent] = useState(true);

  useEffect( ()=>{
    if (unflippedCards.includes(number)){
      setTimeout( () => setIsFlipped(false), 700);
    }
  }, [unflippedCards] );

  useEffect(()=>{
    if(disabledCards.includes(number)){
      setHasEvent(false);
    }
  }, [disabledCards] ) 


  const handleClick = () => {
    const value = flipCard(name, number);
    if (value !== 0 ){
      setIsFlipped(!isFlipped);
    }
  
  }

  return (
    <div className='card'>
      <ReactCardFlip isFlipped={isFlipped}>
         <img loading='lazy' className='card-image' src={backface} alt='black-face' onClick={hasEvent ? handleClick : null}/>
        <img loading='lazy' className='card-image' src={frontFace} alt='front-face' onClick={hasEvent ? handleClick : null}/>
      </ReactCardFlip>
    </div>
  )
}

export default Card;