import React from 'react';
import './SingleCard.css';

const SingleCard = ({ card, handleChoise, fliped, disable }) => {
    const handleClick = () => {
        if (!disable) {
            handleChoise(card);
        }
    };

    return (
        <div className='card'>
            <div className={fliped ? 'fliped' : ''}>
                <img className='front' src={card.src} alt='front card' />
                <img
                    className='back'
                    onClick={handleClick}
                    src='./img/back.jpg'
                    alt='back card'
                />
            </div>
        </div>
    );
};

export default SingleCard;
