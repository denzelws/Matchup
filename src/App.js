import React from 'react';
import { createRoot } from 'react-dom/client';
import { cardImages } from './cardImages';
import Card from './components/Card';
import './App.css'

function App() {
    const [cards, setCards] = React.useState([])
    const [turns, setTurns] = React.useState(0)
    const [choiceOne, setChoiceOne] = React.useState(null)
    const [choiceTwo, setChoiceTwo] = React.useState(null)
    const [disabled, setDisabled] = React.useState(false)

    React.useEffect(() => {
        if (choiceOne && choiceTwo) {
          setDisabled(true)
          handleMatch(choiceOne, choiceTwo)     
        }
    }, [choiceOne, choiceTwo])

    React.useEffect(() => {
        shuffleCards()
    }, [])

    React.useEffect(() => {
        checkWin()
    }, [cards])

    const handleMatch = (firstChoice, secondChoice) => {
            if (firstChoice.src === secondChoice.src){
                setCards(prevCards => {
                    return prevCards.map((card) => {
                        if (card.src === firstChoice.src) {
                            return {...card, matched: true}
                        } else {
                            return card
                        }
                    })
                })
                resetTurn()
            } else {
                setTimeout(() => resetTurn(), 500)
            }
    }

    const shuffleCards = () => {
        const shuffledCards = [...cardImages.concat(cardImages)]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random()}))
        
        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffledCards)
        setTurns(0)
    }

    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

    const checkWin = () => {
        const allMatched = cards.every(card => card.matched)
        if (allMatched) {
            alert("You won the game!")
            setTimeout(() => shuffleCards(), 500)
        }
    }
    
    return (
        <div className='app'>
            <h1>Match<strong className='title'>up!</strong></h1>
            <button onClick={shuffleCards}>New game</button>
            <div className='card-grid'>
                {cards.map((card) => (
                    <Card 
                        key={card.id}
                        card={card}
                        handleChoice={handleChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={disabled}
                    />
                ))}
            </div>
            <p>Turns: {turns}</p>
        </div>
    )
}

const root = document.getElementById('root')
createRoot(root).render(<App />)
