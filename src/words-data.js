import words from "../data/vocabulary.json";
const DATA = {
    words: words, 
    targetLetters: [],
    userLetters: [],
    rndLetters: [],
    isGuessed: false,
    isGameOver: false,
    isConfetti: false,
    isFade: false,
    targetWordId: 0,
    targetWordIndex: 0,
    maxCountWords: 50, //word count - 1
    viewportWidth: 0,
    viewportHeight: 0
}

export default DATA;
