import React from 'react'
import cover from '../../../public/img/cover.png'
import './styles.css'

const Card = ({card, handleChoice, flipped, disabled}) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
  }
  return (
        <div className='card' key={card.id}>
          <div className={flipped ? "flipped" :  ""}>
            <img className='front-card' src={card.src} alt='front of the card with icons' />
            <img 
              className='back' 
              src={cover} 
              alt="back of the card with cover" 
              onClick={handleClick}
            />
          </div>
        </div>
  )
}

export default Card