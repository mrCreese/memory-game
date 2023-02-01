import React, { useEffect, useState } from 'react';
import SingleCard from '../singleCard/SingleCard';
import './Cards.css';

const playCards = [
    { src: './img/apple.png', matches: false },
    { src: './img/bird.png', matches: false },
    { src: './img/dino.png', matches: false },
    { src: './img/fish.png', matches: false },
    { src: './img/flower.png', matches: false },
    { src: './img/juice.png', matches: false },
    { src: './img/notes.png', matches: false },
    { src: './img/pizza.png', matches: false },
    { src: './img/puppy.png', matches: false },
    { src: './img/turttle.png', matches: false },
];

const Cards = () => {
    const [cardsArray, setCardsArray] = useState([]);
    const [firstChoise, setFirstChoise] = useState(null);
    const [secondChoise, setSecondChoise] = useState(null);
    const [disable, setDisable] = useState(false);

    const shuffle = () => {
        const pairOfCards = [...playCards, ...playCards]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }));

        setFirstChoise(null);
        setSecondChoise(null);
        setCardsArray(pairOfCards);
    };

    const resetTurn = () => {
        setFirstChoise(null);
        setSecondChoise(null);
        setDisable(false);
    };

    useEffect(() => {
        shuffle();
    }, []);

    useEffect(() => {
        if (firstChoise && secondChoise) {
            setDisable(true);
            if (firstChoise.src === secondChoise.src) {
                setCardsArray((prevArray) => {
                    return prevArray.map((card) => {
                        if (card.src === firstChoise.src) {
                            return { ...card, matches: true };
                        } else {
                            return card;
                        }
                    });
                });
                resetTurn();
            } else {
                setTimeout(() => resetTurn(), 1000);
            }
        }
    }, [firstChoise, secondChoise]);

    const handleChoise = (card) => {
        firstChoise ? setSecondChoise(card) : setFirstChoise(card);
    };

    return (
        <div className='cards'>
            {cardsArray.map((card, index) => (
                <SingleCard
                    handleChoise={handleChoise}
                    key={index}
                    card={card}
                    fliped={
                        card === firstChoise ||
                        card === secondChoise ||
                        card.matches
                    }
                    disable={disable}
                />
            ))}
        </div>
    );
};

export default Cards;
