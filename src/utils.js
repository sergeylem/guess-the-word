export const getRndNumber = (min, max) => {
  return (Math.floor(Math.random() * (max - min + 1)) + min);
}

export const getRndNumbers = (max) => {
  let rndNumbers = []
  while (rndNumbers.length < max) {
    let rnd = Math.floor(Math.random() * max);
    if (rndNumbers.indexOf(rnd) === -1) rndNumbers.push(rnd);
  }
  return rndNumbers;
}

export const getRndLetter = () => {
  const alphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
  const alphabetLetters = [...alphabet];
  let rndLetter = '';
  const index = getRndNumber(0, alphabet.length - 1)
  rndLetter = alphabetLetters[index];
  return rndLetter;
}

export const putUnderscores = (counts) => {
  const letters = [];
  for (let i = 0; i < counts; i++) {
    letters.push(' ');
  }
  return letters;
}

export const getRndLetters = (targetLetters, countLettersToAdd) => {
  let rndLetters = targetLetters;
  for (let i = 0; i < countLettersToAdd; i++) {
    rndLetters.push(getRndLetter()); //добавить случайные буквы в количестве countLettersToAdd
  }
  const quantityOfLetters = targetLetters.length;
  let indexes = getRndNumbers(quantityOfLetters); //Получить массив случайных индексов
  let sortedLetters = []; //Очистка массива

 // debugger;
  for (let i = 0; i < quantityOfLetters; i++) {
    sortedLetters.push(rndLetters[indexes[i]]);
    if ((i === quantityOfLetters - 1) &&
      (JSON.stringify(sortedLetters) === JSON.stringify(targetLetters))) {
      indexes = getRndNumbers(quantityOfLetters);
      sortedLetters = [];
      i = -1; //so it'll be new iteration i++
    }
  }

  return sortedLetters;
}