import React from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeJourney, setImage } from '../Utils/localStorage';
import '../Css/index.css';

export default function HomePage() {
  const navigate = useNavigate();

  const getInput = (e) => {
    setImage(e.target.value);
  }

  return (
    <section className='homepage'>
      <div>
        This is a very simple game. The goal is to defeat the final boss.
      </div>
      <div>In battle, the enemy will generate a random number, while you have to select two numbers from 1 to 6.</div>
      <div>If the total of your selected numbers is greater than the enemy's, you will deal damage to them equal to the excess.</div>
      <div>However, if your number is less than the enemy's, then they will deal damage to you eqaul to the difference between the totals plus their own damage.</div>
      <p>You can paste an IMAGE LINK below to customize your character's image.</p>
      <p>(It defaults to a cute cat)</p>
      <input type='text' onChange={getInput}></input>

      <div>Good luck, and press start to begin your journey!</div>
      <button onClick={() => {
        initializeJourney();
        navigate('/event');
      }}>
        Start!
      </button>
    </section>
  )
}
