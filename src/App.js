import React, { useState, useEffect } from 'react';
import Button from './components/button/button';
import './App.scss';
import { getRndNumber, putUnderscores, getRndLetters } from './helpers/utils';
import data from './data/words-data';

import Confetti from './components/confetti/confetti';
import PlaySound from './components/play-sound/play-sound';

const App = () => {

  const [words, setWords] = useState(data.words);
  const [targetLetters, setTargetLetters] = useState(data.targetLetters);
  const [userLetters, setUserLetters] = useState(data.userLetters);
  const [rndLetters, setRndLetters] = useState(data.rndLetters);
  const [isGuessed, setGuessed] = useState(data.isGuessed);
  const [isGameOver, setGameOver] = useState(data.isGameOver);
  const [isConfetti, setConfetti] = useState(data.isConfetti);
  const [isFade, setFade] = useState(data.isFade);
  const [targetWordId, setTargetWordId] = useState(data.targetWordId);
  const [targetWordIndex, setTargetWordIndex] = useState(data.targetWordIndex);
  const [maxCountWords, setMaxCountWords] = useState(data.maxCountWords);
  const [viewportWidth, setViewportWidth] = useState(data.viewportWidth);
  const [viewportHeight, setViewportHeight] = useState(data.viewportHeight);

  useEffect(() => initialState(), []);

  const initialState = () => {
    //    console.log(words);
    const index = getRndNumber(0, maxCountWords); //index of random array of words
    const _targetLetters = [...words[index].word];
    const _targetWordId = words[index].id;
    const _userLetters = putUnderscores(_targetLetters.length);
    const countLettersToAdd = 0; //Math.floor(targetLetters.length / 3);
    const _rndLetters = getRndLetters(_targetLetters, countLettersToAdd);

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    setTargetWordIndex(index);
    setTargetWordId(_targetWordId);
    setTargetLetters(_targetLetters);
    setUserLetters(_userLetters);
    setRndLetters(_rndLetters);
    setViewportWidth(viewportWidth);
    setViewportHeight(viewportHeight);
  }

  const isTheWordGuessed = () => {
    for (let i = 0; i < targetLetters.length; i++) {
      if (userLetters[i] !== targetLetters[i]) {
        return false;
      }
    }
    return true; //The word has been guessed!
  }

  const addLetter = (newLetter, index) => {
    const underscore = ' ';
    const _userLetters = userLetters;
    const _rndLetters = rndLetters;
    
    for (let i = 0; i < _userLetters.length; i++) {
      if (_userLetters[i] === underscore) {
        _userLetters[i] = newLetter;
        _rndLetters[index] = ' ';
        i = _userLetters.length; //остановка цикла
      }
    }
    const _isGuessed = isTheWordGuessed(_userLetters);

    let _isGameOver = isGameOver;

    if (words.length === 1) {
      _isGameOver = true;
    }

    setUserLetters([..._userLetters]);
    setRndLetters([..._rndLetters]);

    if (_isGuessed) {
      setConfetti(true);
      setTimeout(() => { setGuessed(_isGuessed); setGameOver(_isGameOver); setConfetti(false); setFade(true); }, 3000);
    } else
      setGuessed(_isGuessed);
  }

  const delLetter = (letter, index) => {
    const _userLetters = userLetters;
    const _rndLetters = rndLetters;

    for (let i = 0; i < _rndLetters.length; i++) {
      if (_rndLetters[i] === ' ') {
        _rndLetters[i] = letter;
        _userLetters[index] = ' ';
        i = _rndLetters.length; //stop cycle
      }
    }

    setUserLetters([..._userLetters]);
    setRndLetters([..._rndLetters]);
  }

  const removeItemFromWords = () => {
    const removedId = targetWordId;
    let tmpArray = words;  //words записываю во временный массив 
    const removedIndex = tmpArray.findIndex(idWord => idWord.id === removedId);

    tmpArray.splice(removedIndex, 1);  //Удаляю word из words

    //    const maxCountWords = maxCountWords - 1;
    const _maxCountWords = maxCountWords - 1;
    if (_maxCountWords >= 0) {
      const newIndex = getRndNumber(0, _maxCountWords);
      const newTargetLetters = [...tmpArray[newIndex].word];
      const newWordId = tmpArray[newIndex].id;

      // const userLetters = putUnderscores(newTargetLetters.length);
      const _userLetters = putUnderscores(newTargetLetters.length);
      const countLettersToAdd = 0; //Math.floor(newTargetLetters.length / 3);

      const _targetLetters = [...newTargetLetters]; //it's must be, as targetLetters will be changed
      const _rndLetters = getRndLetters(_targetLetters, countLettersToAdd)

      setWords(tmpArray);
      setTargetLetters(newTargetLetters);
      setTargetWordId(newWordId);
      setTargetWordIndex(newIndex);
      setUserLetters(_userLetters);
      setRndLetters(_rndLetters);
      setMaxCountWords(_maxCountWords);
      setGuessed(false);
      setFade(true);
    }
  }

  return (
    <div className={isFade ? 'form-fade-animation' : 'form'}
    >
      <div className='title'>
        {!isGameOver ?
          "Guess the word!" :
          "Well done! Congratulations!"
        }
      </div>

      <img className='image'
        src={words[targetWordIndex].img} alt='' />

      {!isGuessed ?
        <div>
          <div className='words'>
            {userLetters.map((item, index) => (
              <Button letter={item} key={index}
                click={() => delLetter(item, index)} />
            ))}
          </div>

          <div className='words'>
            {rndLetters.map((item, index) => (
              <Button letter={item} key={index}
                click={() => addLetter(item, index)} />
            ))}
          </div>
          {isConfetti ?
            <div>
              <Confetti viewportWidth={viewportWidth}
                viewportHeight={viewportHeight}
                numberOfPieces={'100'} />
              <PlaySound urlStr={require('./assets/sounds/s2.mp3')} />
            </div> :
            null
          }
        </div> :
        <div>
          <div className='word'>{targetLetters}</div>
          {!isGameOver
            ? <img
              className={'arrow-next'}
              src={require('./assets/icons/arrow-next.png')} alt=''
              onClick={() => removeItemFromWords()}
            />
            :
            <PlaySound urlStr={require('./assets/sounds/victory.mp3')} />
          }
        </div>
      }
    </div>
  );
}

export default App;