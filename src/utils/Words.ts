import EnglishWords from '../../public/words/english.json'
import { Configuration } from './Configuration'

export interface WordsInterface {
  letter: string
  typed: string
  right: boolean
  current: boolean
}

export class Words {
  getWords(activate = true): WordsInterface[][] {
    const wordsToType = this.shuffleWords(EnglishWords.words)
      .slice(0, Configuration.getInstance().get('wordsThreshold') as number)
      .map(word => word.toLowerCase().concat(' '))
      .map(word =>
        word.split('').map(letter => {
          return { letter, typed: null, right: null, current: false }
        })
      )

    if (activate) {
      wordsToType[0][0].current = true
    }

    return wordsToType
  }

  private shuffleWords = (array: string[]): string[] => {
    let currentIndex = array.length
    let temporaryValue: string
    let randomIndex: number

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return array
  }

  public static getActiveLetterIndexes = (
    words: WordsInterface[][]
  ): number[] => {
    const wordIndex = words.findIndex(word =>
      word.find(letter => letter.current)
    )
    const letterIndex = words[wordIndex].findIndex(({ current }) => current)

    return [wordIndex, letterIndex]
  }

  public static nextLetter = (
    typed: string,
    words: WordsInterface[][]
  ): number[] => {
    const [wordIndex, letterIndex] = Words.getActiveLetterIndexes(words)
    const typedLetter = words[wordIndex][letterIndex]

    typedLetter.current = false
    typedLetter.right = typed === typedLetter.letter
    typedLetter.typed = typed

    if (!typedLetter.right && typed === ' ') {
      // move to next word

      words[wordIndex + 1][0].current = true
      return [words.length - (wordIndex + 1), wordIndex + 1]
    }

    const nextLetter =
      words[wordIndex].length === letterIndex + 1
        ? words[wordIndex + 1][0]
        : words[wordIndex][letterIndex + 1]

    nextLetter.current = true

    return [words.length - wordIndex, wordIndex]
  }

  public static previousLetter = (words: WordsInterface[][]): number[] => {
    const [wordIndex, letterIndex] = Words.getActiveLetterIndexes(words)

    if (wordIndex === 0 && letterIndex === 0) {
      return [0, 0]
    }

    const typedLetter = words[wordIndex][letterIndex]

    typedLetter.current = false

    const previousLetter =
      letterIndex === 0
        ? words[wordIndex - 1][words[wordIndex - 1].length - 1]
        : words[wordIndex][letterIndex - 1]

    previousLetter.current = true
    previousLetter.typed = null

    return [wordIndex - words.length, wordIndex]
  }
}
