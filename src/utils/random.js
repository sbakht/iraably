function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function getRandom({count = 1, duplicates = false, min = 0, max}) {
  const result = [];
  if(!duplicates && count > (max-min) + 1) {
    debugger;
    throw new Error(`Cannot make more random numbers`);
  }

  while(count > 0) {
    const random = getRandomIntInclusive(min, max);
    if(duplicates || result.indexOf(random) === -1) {
      result.push(random);
      count--;
    }
  }
  return result;
}

function isAlreadyInAnswers(answers, answer) {
  let item;
  if(typeof answer === 'object') {
    item = answers.find(ans => ans.id === answer.id);
  }else{
    item = answers.find(choice => choice.id === answer);
  }
  return !!item;
}

function replaceRandomIndex(items, item) {
  const i = getRandomIntInclusive(0, items.length - 1);
  items[i] = item;
}

function getAnswerObj(choices, answer) {
  if(typeof answer === 'object') {
    return choices.find(choice => choice.id === answer.id);
  }else{
    return choices.find(choice => choice.id === answer);
  }
}

function addAnswerToChoices(choices, result, answer) {
  if(typeof answer !== "undefined") {
    
    if(isAlreadyInAnswers(result, answer)) {
      return;
    }else{
      const answerObj = getAnswerObj(choices, answer);
      if(!answerObj) {
        throw new Error("Cannot find included choice");
      }

      replaceRandomIndex(result, answerObj);
    }
  }
}

export const getRandomElem = (elems) => {
  return getRandomChoices({choices: elems, count: 1})[0];
}

export const getRandomChoices = ({choices, count, answer}) => {
  const randoms = getRandom({count, max: choices.length - 1});
  const result =  randoms.map(random => {
    return choices[random]
  })

  addAnswerToChoices(choices, result, answer);
  return result;
}