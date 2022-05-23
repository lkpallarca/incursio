import React, { useState } from 'react';
import { getHp, getImage, getSelectedCards, setSelectedCards } from '../Utils/localStorage';

export default function PlayerSection({ page, hp, setPlayerTotal, playerTotal, setChoiceInstance, choiceInstance }) {
  const choices = [1,2,3,4,5,6];
  const currentHp = hp;
  const selectedCards = getSelectedCards();
  const hpBarStyle = {
    height: 5,
    width: (currentHp * 3),
    backgroundColor: 'red',
    color: 'white'
  }

  const handleSelectCard = (card) => {
    if(choiceInstance >= 2) {
      return
    }
    selectedCards.push(card);
    setSelectedCards(selectedCards);
    setPlayerTotal(playerTotal + card);
  }

  return (
    <section className='playerSection'>
      <div><img className='playerImage' src={getImage() ? getImage() : 'https://upload.wikimedia.org/wikipedia/commons/3/39/Grey_British_Shorthair_with_yellow_eyes.jpg'}></img></div>
      <div className='playerMiddleInfo'>
        <div className={page === 'gamePage' ? 'choiceWrapper' : 'choiceWrapper hide'}>
          {choices.map((each, index) => {
            return (
              <div 
                key={index} 
                className={selectedCards?.find(every => every === each) ? 'choices dim' : 'choices'}
                onClick={() => {
                  setChoiceInstance(choiceInstance + 1);
                  handleSelectCard(each);
                  
                }}
              >
                {each}
              </div>
            )
          })}
        </div>
        <div>
          <div style={hpBarStyle}></div>
          <p>Your HP: {hp}</p>
        </div>
      </div>
    </section>
  )
}
