import React, { useState, useEffect } from 'react';
import Button from './components/button/button';
import './App.scss';
import { getRndNumber, putUnderscores, getRndLetters } from './utils';
import data from './data/words-data';

import Confetti from './components/confetti/confetti';
import PlaySound from './components/play-sound';

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

    // this.setState({
    //   targetWordId, targetWordIndex: index, targetLetters: [...words[index].word],
    //   userLetters, rndLetters, viewportWidth, viewportHeight
    // });
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

    console.log("_userLetters: " + _userLetters);
    console.log('_isGuessed1 from addLetter ' + _isGuessed);

    setUserLetters(_userLetters);
    setRndLetters(_rndLetters);

    console.log("userLetters: " + userLetters);
    console.log('_isGuessed2 from addLetter ' + _isGuessed);

    if (_isGuessed) {
      setConfetti(true);
      setTimeout(() => { setGuessed(_isGuessed); setGameOver(_isGameOver); setConfetti(false); setFade(true); }, 3000);
    } else
      setGuessed(_isGuessed);
  }

  const delLetter = (letter, index) => {
    for (let i = 0; i < rndLetters.length; i++) {
      if (rndLetters[i] === ' ') {
        rndLetters[i] = letter;
        userLetters[index] = ' ';
        i = rndLetters.length; //остановка цикла
      }
    }
    setUserLetters(userLetters);
    setRndLetters(rndLetters);
  }

  const removeItemFromWords = () => {
    //    console.log('words ');
    //    console.log(words);

    const removedId = targetWordId;
    let tmpArray = words;  //words записываю во временный массив 
    const removedIndex = tmpArray.findIndex(idWord => idWord.id === removedId);

    tmpArray.splice(removedIndex, 1);  //Удаляю word из words

    //    const maxCountWords = maxCountWords - 1;
    setMaxCountWords(maxCountWords - 1);
    if (maxCountWords >= 0) {
      const newIndex = getRndNumber(0, maxCountWords);
      const newTargetLetters = [...tmpArray[newIndex].word];
      const newWordId = tmpArray[newIndex].id;

      // const userLetters = putUnderscores(newTargetLetters.length);
      const userLetters = putUnderscores(newTargetLetters.length);
      const countLettersToAdd = 0; //Math.floor(newTargetLetters.length / 3);

      const targetLetters = [...newTargetLetters]; //it's must be, as targetLetters will be changed
      const rndLetters = getRndLetters(targetLetters, countLettersToAdd)
      //      console.log('rndLetters: ' + rndLetters);


      setWords(tmpArray);
      setTargetLetters(newTargetLetters);
      setTargetWordId(newWordId);
      setTargetWordIndex(newIndex);
      setUserLetters(userLetters);
      setRndLetters(rndLetters);
      setMaxCountWords(maxCountWords);
      setGuessed(false);
      setFade(true);

      // this.setState({
      //   words: tmpArray,
      //   targetLetters: newTargetLetters, targetWordId: newWordId, targetWordIndex: newIndex,
      //   userLetters, rndLetters, maxCountWords, isGuessed: false, isFade: true
      // });
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
