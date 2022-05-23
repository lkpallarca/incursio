import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import createId from '../Utils/createId';
import PlayerSection from './PlayerSection';
import { getEncounter, setHp, getHp, setSelectedCards, getIsEncounter, setIsEncounter, getSelectedCards, quitGame, } from '../Utils/localStorage';
import '../Css/index.css';

export default function GamePage() {
  const navigate = useNavigate();
  const encounter = getEncounter();
  const currentHp = getHp();
  const [playerHealth, setPlayerHealth] = useState(currentHp);
  const [enemyHealth, setEnemyHealth] = useState(1)
  const [playerTotal, setPlayerTotal] = useState(0);
  const [enemyTotal, setEnemyTotal] = useState(0);
  const [choiceInstance, setChoiceInstance] = useState(0);
  const hpBarStyle = {
    height: 5,
    width: (enemyHealth * 5),
    backgroundColor: 'red',
    color: 'white',
    marginTop: 10
  }

  const randomize = () => {
    return Math.floor((Math.random() * 6) + 1);
  }

  useEffect(() => {
    if(encounter[0].id === 15 && enemyHealth <= 0) {
      alert('You have slain the boss!! Congratulations! Play again?');
      quitGame();
      navigate('/');
    }
    if(enemyHealth <= 0) {
      alert('The enemy is slain! You may now continue on your journey.');
      navigate('/event');
      setSelectedCards([0]);
    } else if(playerHealth <= 0) {
      alert('You perished. You may proceed to start a new journey.');
      quitGame();
      navigate('/');
    }
  }, [enemyHealth, playerHealth])

  useEffect(() => {
    if(getIsEncounter() === false) {
      setSelectedCards([0]);
    }
    setEnemyHealth(encounter[0].hp);
    setEnemyTotal(randomize());
    setIsEncounter(true)
  }, [])

  const handleEndTurn = () => {
    if(playerTotal > enemyTotal) {
      setEnemyHealth(enemyHealth - ((playerTotal - enemyTotal)));
      setEnemyTotal(randomize());
      setPlayerTotal(0);
    } else if(playerTotal < enemyTotal) {
      setPlayerHealth(currentHp - ((enemyTotal - playerTotal) + encounter[0].damage));
      setHp(currentHp - ((enemyTotal - playerTotal) + encounter[0].damage));
      setEnemyTotal(randomize());
      setPlayerTotal(0);
    } else {
      setEnemyTotal(randomize());
      setPlayerTotal(0);
    }
    if(getSelectedCards().length === 7) {
      setSelectedCards([0]);
    }
    setChoiceInstance(0);
  }

  return (
    <section className='gamepage'>
      <div className='eventPortrait'>
      {encounter.map(each => {
          return (
            <div key={createId()} className='eventBox'>
              <img className='eventImage' src={each.image}/>
            </div>
          )
        })}
      </div>
      <div style={hpBarStyle}></div>
      <p>Enemy HP: {enemyHealth}</p>
      {encounter[0].event === 'Enemy' ? 
        <>
          <section className='mainscreen'>
            <div className='enemyNumber'>{enemyTotal}</div>
            <div className='playerNumber'>{playerTotal}</div>
          </section> 
          <button className='endTurn' onClick={() => handleEndTurn()}>End turn</button>
        </>
        :
        <div className='healScreen'>
          <h1>Heal your playerHealth points for {encounter[0].hp} hp</h1>
          <button 
            onClick={() => {
              alert('You recovered your health points');
              setPlayerHealth(currentHp + encounter[0].hp);
              setHp(currentHp + encounter[0].hp);
              navigate('/event');
            }
          }>
            Heal
          </button>
        </div>
      }
      <PlayerSection 
        page={'gamePage'}
        hp={playerHealth}
        playerTotal={playerTotal}
        setPlayerTotal={setPlayerTotal}
        choiceInstance={choiceInstance}
        setChoiceInstance={setChoiceInstance}
      />
    </section>
  )
}
