import enemyInfo from "./enemyInfo"
import healArray from "./healArray";

const events = [];

const distributeEnemies = () => {
  enemyInfo().forEach(enemy => {
    events.push(enemy);
  });
}

const distributeHeals = () => {
  healArray().forEach(heal => {
    const randomIndex = Math.floor(Math.random() * enemyInfo().length);
    events.splice(randomIndex, 0, heal);
  });
}

export function setJourney(array) {
  localStorage.setItem('journey', JSON.stringify(array));
}

export function setHp(hp) {
  localStorage.setItem('playerHp', JSON.stringify(hp));
}

export function setEncounter(encounter) {
  localStorage.setItem('encounter', JSON.stringify([encounter]));
}

export function setSelectedCards(array) {
  localStorage.setItem('selectedCards', JSON.stringify(array));
}

export function setIsEncounter(bool) {
  localStorage.setItem('startEncounter', JSON.stringify(bool));
}

export function setImage(link) {
  localStorage.setItem('userImage', JSON.stringify(link));
}

export function getImage() {
  return JSON.parse(localStorage.getItem('userImage'));
}

export function getIsEncounter() {
  return JSON.parse(localStorage.getItem('startEncounter'));
}

export function getSelectedCards() {
  return JSON.parse(localStorage.getItem('selectedCards'));
}

export function getEncounter() {
  return JSON.parse(localStorage.getItem('encounter'));
}

export function getJourney() {
  return JSON.parse(localStorage.getItem('journey'));
}

export function getHp() {
  return JSON.parse(localStorage.getItem('playerHp'));
}

export function initializeJourney() {
  distributeEnemies();
  distributeHeals();
  setJourney(events);
  setHp(50);
  setIsEncounter(false);
}

export function quitGame() {
  events.splice(0, events.length);
  localStorage.removeItem('journey');
  localStorage.removeItem('playerHp');
  localStorage.removeItem('encounter');
  localStorage.removeItem('startEncounter');
  localStorage.removeItem('selectedCards');
}