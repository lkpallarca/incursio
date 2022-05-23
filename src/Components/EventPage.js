import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import createId from '../Utils/createId';
import enemyInfo from '../Utils/enemyInfo';
import healArray from '../Utils/healArray';
import { getEventTurn, getHp, getJourney, quitGame, setEncounter, setEventTurn, setIsEncounter, setJourney } from '../Utils/localStorage';
import PlayerSection from './PlayerSection';

export default function EventPage() {
  const navigate = useNavigate();
  const playerJourney = getJourney();
  const currentHp = getHp();
  const [leftEvent, setLeftEvent] = useState([]);
  const [middleEvent, setMiddleEvent] = useState([]);
  const [rightEvent, setRightEvent] = useState([]);
  const [eventInfo, setEventInfo] = useState([]);

  const encounter = (encounter) => {
    setEncounter(encounter);
    const updateJourney = playerJourney.filter(each => each.id !== encounter.id);
    setJourney(updateJourney);
  }

  useEffect(() => {
    switch (playerJourney.length) {
      case 1:
        setMiddleEvent([playerJourney[0]]);
        break;
      case 2:
        setMiddleEvent([playerJourney[0]]);
        setLeftEvent([playerJourney[1]]);
        break;
      default:
        setMiddleEvent([playerJourney[0]]);
        setLeftEvent([playerJourney[1]]);
        setRightEvent([playerJourney[2]]);
        break;
    }
  }, [])

  return (
    <section className='events'>
      <button 
        className='quit' 
        onClick={() => {
          quitGame();
          navigate('/');
        }}>
        Quit Game
      </button>
      <div className='eventWrapper'>
        {leftEvent?.map(each => {
          return (
            <div onClick={() => setEventInfo([each])} key={createId()} className='eventBox'>
              <img className='eventImage' src={each?.image}/>
            </div>
          )
        })}
        {middleEvent?.map(each => {
          return (
            <div onClick={() => setEventInfo([each])} key={createId()} className='eventBox'>
              <img className='eventImage' src={each?.image}/>
            </div>
          )
        })}
        {rightEvent?.map(each => {
          return (
            <div onClick={() => setEventInfo([each])} key={createId()} className='eventBox'>
              <img className='eventImage' src={each?.image}/>
            </div>
          )
        })}
      </div>
      <div className='eventInfo'>
        {eventInfo?.map(each => {
          return(
            <div key={createId()}>
              <h1>{each?.name}</h1>
              {each?.event === 'Enemy' ? 
                <>
                  <p>HP: {each?.hp}</p>
                  <p>Damage: {each?.damage}</p>
                  <button onClick={() => {
                    encounter(each);
                    navigate('/game');
                    }} 
                    className='startEvent'
                  >
                    Fight
                  </button>
                </> :
                <>
                  <p>Heal for: {each?.hp} hp</p>
                  <button onClick={() => {
                    encounter(each);
                    navigate('/game');
                    }} 
                    className='startEvent'
                  >
                    Use
                  </button>
                </>
              }
            </div>
          )
        })}
      </div>
      <PlayerSection 
        page={'eventPage'}
        hp={currentHp}
      />
    </section>  
  )
}
