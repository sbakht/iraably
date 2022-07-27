import { getRandomChoices, getRandomElem } from './random';

export const ar = [
  {
    id: 1,
    text: 'هُو',
  },
  {
    id: 2,
    text: 'هُمَا',
  },
  {
    id: 3,
    text: 'هُمْ',
  },
  {
    id: 4,
    text: 'هِي',
  },
  {
    id: 5,
    text: 'هُنَّ'
  },
  {
    id: 6,
    text: 'اَنْتَ'
  },
  {
    id: 7,
    text: 'اَنْتُمَا'
  },
  {
    id: 8,
    text: 'اَنْتُمْ'
  },
  {
    id: 9,
    text: 'اَنْتِ'
  },
  {
    id: 10,
    text: 'اَنْتُنَّ'
  },
  {
    id: 11,
    text: 'أنَا'
  },
  {
    id: 12,
    text: 'نَحْنُ'
  },
]

export const en = [
  {
    id: 1,
    text: 'he'
  },
  {
    id: 2,
    text: 'both of them'
  },
  {
    id: 3,
    text: 'them'
  },
  {
    id: 4,
    text: 'her'
  },
  {
    id: 5,
    text: 'both of them (f)'
  },
  {
    id: 6,
    text: 'them (f)'
  },
]

export const allChoicesEn = [
  {
    id: 1,
    text: 'he'
  },
  {
    id: 2,
    text: 'both of them (m/f)'
  },
  {
    id: 3,
    text: 'them'
  },
  {
    id: 4,
    text: 'her'
  },
  {
    id: 5,
    text: 'them (f)'
  },
  {
    id: 6,
    text: 'you'
  },
  {
    id: 7,
    text: 'both of you (m/f)'
  },
  {
    id: 8,
    text: 'you all'
  },
  {
    id: 9,
    text: 'you (f)'
  },
  {
    id: 10,
    text: 'you all (f)'
  },
  {
    id: 11,
    text: 'I'
  },
  {
    id: 12,
    text: 'We'
  },
]

function preventConsecutiveDuplicate(lastQuestion, genFn) {
  while (true) {
    const question = genFn();
    if (!lastQuestion || question.question.id !== lastQuestion.question.id) {
      return question;
    }
  }
}

function last(arr) {
  if (arr.length === 0) {
    return null;
  }
  return arr[arr.length - 1];
}

/**
 * Copied from other repo, using transform to make it into the new format im using
 */
function transform(data) {
  const transformChoice = choice => {
    return {
      id: choice.id,
      title: choice.text
    }
  }

  return data.map(entry => {
    return {
      id: entry.question.id,
      title: entry.question.text,
      answers: entry.choices.map(transformChoice),
      correct: [entry.answer]
    }
  })
}

export const generateArToEn = ({ count, numChoices = 'ALL' }) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(preventConsecutiveDuplicate(last(result), () => {
      const question = getRandomElem(ar);
      const answer = question.id;
      return {
        question,
        answer,
        choices: numChoices === 'ALL' ? allChoicesEn : getRandomChoices({ choices: allChoicesEn, count: numChoices, answer })
      }
    }));
  }
  return transform(result);
}