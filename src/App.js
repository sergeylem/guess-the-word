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
    //    console.log(this.state.words);

    const index = getRndNumber(0, maxCountWords); //index of random array of words
    const targetLetters = [...words[index].word];
    const targetWordId = words[index].id;
    const userLetters = putUnderscores(targetLetters.length);
    const countLettersToAdd = 0; //Math.floor(targetLetters.length / 3);
    const rndLetters = getRndLetters(targetLetters, countLettersToAdd);

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    setTargetWordId(targetWordId);
    setTargetWordIndex(index);
    setTargetLetters([...words[index].word]);
    setUserLetters(userLetters);
    setRndLetters(rndLetters);
    setViewportWidth(viewportWidth);
    setViewportHeight(viewportHeight);

    // this.setState({
    //   targetWordId, targetWordIndex: index, targetLetters: [...words[index].word],
    //   userLetters, rndLetters, viewportWidth, viewportHeight
    // });
  }

  const addLetter = (newLetter, userLetters, rndLetters, index) => {
    const underscore = ' ';
    for (let i = 0; i < userLetters.length; i++) {
      if (userLetters[i] === underscore) {
        userLetters[i] = newLetter;
        rndLetters[index] = ' ';
        i = userLetters.length; //остановка цикла
      }
    }
    const isGuessed = isTheWordGuessed(userLetters);
    let isGameOver = data.isGameOver;
    if (data.words.length === 1) {
      isGameOver = true;
    }

    //    console.log(userLetters);
    //    console.log('isGuessed from addLetter ' + isGuessed);

    if (isGuessed) {
      this.setState({ isConfetti: true });
      setTimeout(() => this.setState({ isGuessed, isGameOver, isConfetti: false, isFade: true }), 3000);
    } else
      this.setState({ isGuessed });
  }

  return (<div>TEST</div>);

  // const delLetter = (letter, userLetters, rndLetters, index) => {
  //   for (let i = 0; i < rndLetters.length; i++) {
  //     if (rndLetters[i] === ' ') {
  //       rndLetters[i] = letter;
  //       userLetters[index] = ' ';
  //       i = rndLetters.length; //остановка цикла
  //     }
  //   }
  //   this.setState({ userLetters, rndLetters });
  // }

  // const isTheWordGuessed = (userLetters) => {
  //   for (let i = 0; i < data.targetLetters.length; i++) {
  //     if (userLetters[i] !== data.targetLetters[i]) {
  //       return false;
  //     }
  //   }
  //   return true; //The word has been guessed!
  // }

  // const removeItemFromWords = () => {
  //   //    console.log('words ');
  //   //    console.log(this.state.words);

  //   const removedId = data.targetWordId;
  //   let tmpArray = data.words;  //words записываю во временный массив 
  //   const removedIndex = tmpArray.findIndex(idWord => idWord.id === removedId);

  //   tmpArray.splice(removedIndex, 1);  //Удаляю word из words

  //   const maxCountWords = data.maxCountWords - 1;
  //   if (maxCountWords >= 0) {
  //     const newIndex = getRndNumber(0, maxCountWords);
  //     const newTargetLetters = [...tmpArray[newIndex].word];
  //     const newWordId = tmpArray[newIndex].id;

  //     const userLetters = putUnderscores(newTargetLetters.length);
  //     const countLettersToAdd = 0; //Math.floor(newTargetLetters.length / 3);

  //     const targetLetters = [...newTargetLetters]; //it's must be, as targetLetters will be changed
  //     const rndLetters = getRndLetters(targetLetters, countLettersToAdd)
  //     //      console.log('rndLetters: ' + rndLetters);

  //     this.setState({
  //       words: tmpArray,
  //       targetLetters: newTargetLetters, targetWordId: newWordId, targetWordIndex: newIndex,
  //       userLetters, rndLetters, maxCountWords, isGuessed: false, isFade: true
  //     });
  //   }
  // }


  // const isFade = data.isFade
  // return (
  //   <div className={isFade ? 'form-fade-animation' : 'form'}
  //   >

  //     <div className='title'>
  //       {!data.isGameOver ?
  //         "Guess the word!" :
  //         "Well done! Congratulations!"
  //       }
  //     </div>

  //     <img className='image'
  //       src={data.words[data.targetWordIndex].img} alt='' />

  //     {!data.isGuessed ?
  //       <div>
  //         <div className='words'>
  //           {data.userLetters.map((item, index) => (
  //             <Button letter={item} key={index}
  //               click={delLetter.bind(
  //                 this, item, data.userLetters, data.rndLetters, index)} />
  //           ))}
  //         </div>

  //         <div className='words'>
  //           {data.rndLetters.map((item, index) => (
  //             <Button letter={item} key={index}
  //               click={addLetter.bind(
  //                 this, item, data.userLetters, data.rndLetters, index)} />
  //           ))}
  //         </div>
  //         {data.isConfetti ?
  //           <div>
  //             <Confetti viewportWidth={data.viewportWidth}
  //               viewportHeight={data.viewportHeight}
  //               numberOfPieces={'100'} />
  //             <PlaySound urlStr={require('./assets/sounds/s2.mp3')} />
  //           </div> :
  //           null
  //         }
  //       </div> :
  //       <div>
  //         <div className='word'>{data.targetLetters}</div>
  //         {!data.isGameOver
  //           ? <img
  //             className={'arrow-next'}
  //             src={require('./assets/icons/arrow-next.png')} alt=''
  //             onClick={removeItemFromWords.bind(this)}
  //           />
  //           :
  //           <PlaySound urlStr={require('./assets/sounds/victory.mp3')} />
  //         }
  //       </div>
  //     }
  //   </div>
  // );
}

export default App;
