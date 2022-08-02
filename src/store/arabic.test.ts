import { expect, test } from "vitest";
import { option as O } from "fp-ts";

type Beh = { arChar: "ر"; enChar: "b" };
type Nun = { arChar: "ف"; enChar: "n" };
type Seen = { arChar: "س"; enChar: "s" };
type Sheen = { arChar: "ش"; enChar: "$" };
type Theh = { arChar: "ر"; enChar: "v" };
type Jeem = { arChar: "ر"; enChar: "j" };
type Hah = { arChar: "ر"; enChar: "H" };
type Khah = { arChar: "ر"; enChar: "x" };
type Dal = { arChar: "ر"; enChar: "d" };
type Thal = { arChar: "ر"; enChar: "*" };
type Reh = { arChar: "ر"; enChar: "r" };
type Zain = { arChar: "ر"; enChar: "z" };
type Sad = { arChar: "ر"; enChar: "S" };
type Dad = { arChar: "ض"; enChar: "D" };
type Tah = { arChar: "ر"; enChar: "T" };
type Zah = { arChar: "ر"; enChar: "Z" };
type Ain = { arChar: "ر"; enChar: "E" };
type Ghain = { arChar: "ر"; enChar: "g" };
type Tatweel = { arChar: "ر"; enChar: "_" };
type Feh = { arChar: "ر"; enChar: "f" };
type Qaf = { arChar: "ر"; enChar: "q" };
type Kaf = { arChar: "ر"; enChar: "k" };
type Lam = { arChar: "ر"; enChar: "l" };
type Meem = { arChar: "ر"; enChar: "m" };
type Heh = { arChar: "ر"; enChar: "h" };
type Fathatan = { arChar: "ر"; enChar: "F" };
type Dammatan = { arChar: "ر"; enChar: "N" };
type Kasratan = { arChar: "ر"; enChar: "K" };
type Damma = { arChar: "ر"; enChar: "u" };
type Fatha = { arChar: "ر"; enChar: "a" };
type Kasra = { arChar: "ر"; enChar: "i" };
type Shadda = { arChar: "ر"; enChar: "~" };
type Sukun = { arChar: "ر"; enChar: "o" };
type Peh = { arChar: "ر"; enChar: "P" };
type Tchen = { arChar: "ر"; enChar: "J" };
type Veh = { arChar: "ر"; enChar: "V" };
type Gaf = { arChar: "ر"; enChar: "G" };

type Letter =
  | Nun
  | Seen
  | Sheen
  | Theh
  | Jeem
  | Hah
  | Khah
  | Dal
  | Thal
  | Reh
  | Zain
  | Sad
  | Dad
  | Tah
  | Zah
  | Ain
  | Ghain
  | Tatweel
  | Feh
  | Qaf
  | Kaf
  | Lam
  | Meem
  | Heh
  | Fathatan
  | Dammatan
  | Kasratan
  | Fatha
  | Damma
  | Kasra
  | Shadda
  | Sukun
  | Peh
  | Tchen
  | Veh
  | Gaf
  | Beh;

const Sheen = 1;

const lettersArray: Letter[] = [
  { arChar: "ف", enChar: "n" },
  { arChar: "س", enChar: "s" },
  { arChar: "ش", enChar: "$" },
  { arChar: "ر", enChar: "b" },
  { arChar: "ف", enChar: "n" },
  { arChar: "س", enChar: "s" },
  { arChar: "ش", enChar: "$" },
  { arChar: "ر", enChar: "v" },
  { arChar: "ر", enChar: "j" },
  { arChar: "ر", enChar: "H" },
  { arChar: "ر", enChar: "x" },
  { arChar: "ر", enChar: "d" },
  { arChar: "ر", enChar: "*" },
  { arChar: "ر", enChar: "r" },
  { arChar: "ر", enChar: "z" },
  { arChar: "ر", enChar: "S" },
  { arChar: "ض", enChar: "D" },
  { arChar: "ر", enChar: "T" },
  { arChar: "ر", enChar: "Z" },
  { arChar: "ر", enChar: "E" },
  { arChar: "ر", enChar: "g" },
  { arChar: "ر", enChar: "_" },
  { arChar: "ر", enChar: "f" },
  { arChar: "ر", enChar: "q" },
  { arChar: "ر", enChar: "k" },
  { arChar: "ر", enChar: "l" },
  { arChar: "ر", enChar: "m" },
  { arChar: "ر", enChar: "h" },
  { arChar: "ر", enChar: "F" },
  { arChar: "ر", enChar: "N" },
  { arChar: "ر", enChar: "K" },
  { arChar: "ر", enChar: "u" },
  { arChar: "ر", enChar: "a" },
  { arChar: "ر", enChar: "i" },
  { arChar: "ر", enChar: "~" },
  { arChar: "ر", enChar: "o" },
  { arChar: "ر", enChar: "P" },
  { arChar: "ر", enChar: "J" },
  { arChar: "ر", enChar: "V" },
  { arChar: "ر", enChar: "G" },
];

const letterMap: { [key: string]: Letter } = {
  n: { arChar: "ف", enChar: "n" },
  s: { arChar: "س", enChar: "s" },
  $: { arChar: "ش", enChar: "$" },
};

// const letterMap: {[key: string]: Letter} = {
//   n: 'Nun',
//   s: 'Seen',
//   sh: 'Sheen',
//   r: 'Raa',
//   h: 'Ha',
//   H: 'HA',
// }

// const map: {[key: Letter]: String} = {
//   'Nun': "dfd"
// }

// function toArabic(letter: Letter): String {
//   switch (letter) {
//     case 'Nun':
//       return 'ن'
//   }
// }

// function toLetter(str: string): O.Option<Letter> {
//   if(letterMap[str]) {
//     return O.some(letterMap[str]);
//   }
//   return O.none;
// }

function enToLetter(str: string): O.Option<Letter> {
  if (letterMap[str]) return O.some(letterMap[str]);

  const f: Letter | undefined = lettersArray.find((l) => l.enChar === str);
  if (!f) return O.none;

  return O.some(f);
}

test("adds up points for each question", () => {
  expect(enToLetter("string")).toEqual(O.none);
  expect(enToLetter("")).toEqual(O.none);
  expect(enToLetter("]")).toEqual(O.none);
  expect(enToLetter("n")).toEqual(O.some({ arChar: "ف", enChar: "n" }));
  expect(enToLetter("D")).toEqual(O.some({ arChar: "ض", enChar: "D" }));
  expect(enToLetter("$")).toEqual(O.some({ arChar: "ش", enChar: "$" }));
});

// enum Color {
//   Red,
//   Green,
//   Blue
// }

// function getColorName(c: Color): string {
//   switch (c) {
//     case Color.Red:
//       return "red";
//     case Color.Green:
//       return "green";
//     // Forgot about Blue
//     default:
//       const exhaustiveCheck: never = c;
//       throw new Error(`Unhandled color case: ${exhaustiveCheck}`);
//   }
// }
