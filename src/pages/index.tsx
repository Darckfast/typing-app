import React, { useEffect, useRef, useState } from 'react'
import { MainContainer, InputBox, ButtonsContainer } from '../styles/pages/Home'
import { RedoIcon } from '../styles/icons/redoIcon'
import { CogIcon } from '../styles/icons/cogIcon'
import Link from 'next/link'
import { Container } from '../styles/global'
import { Configuration } from '../utils/Configuration'
import { Words, WordsInterface } from '../utils/Words'
import { GithubIcon } from '../styles/icons/githubIcon'

const Home: React.FC = () => {
  const [allWordsToType, setAllWordToType] = useState([])
  const [inputWord, setInputWord] = useState('')
  const typingInput = useRef(null)

  const configuration = Configuration.getInstance()
  const restart = () => {
    setAllWordToType(() => new Words().getWords())
    resetFocus()
  }

  const registerKey = ({ key }: { key: string }) => {
    if (key.length === 1) {
      moveForwards(key, allWordsToType)
    } else if (key === 'Backspace') {
      moveBackwards(allWordsToType)
    }
  }

  const resetFocus = () => {
    typingInput.current.focus()
  }

  const moveForwards = (typed: string, words: WordsInterface[][]): void => {
    const [remaining] = Words.nextLetter(typed, words)

    const threshold = parseInt(configuration.get('wordsThreshold') as string)

    if (remaining - threshold <= threshold / 3) {
      console.log('loading more words')
      setAllWordToType(currentWords => [
        ...currentWords,
        ...new Words().getWords(false)
      ])
    }
  }

  const moveBackwards = (words: WordsInterface[][]) => {
    const [remaining, typedWords] = Words.previousLetter(words)
    console.log(remaining, typedWords)
  }

  const createElement = (word: WordsInterface, index: string) => {
    const { current, right, letter, typed } = word

    if (current) {
      return (
        <span key={index} className="current">
          {letter}
        </span>
      )
    }

    if (typed) {
      const typedElement = <span className="typed input">{typed}</span>
      const showTypedWords = configuration.get('showTypedWords') as boolean

      if (right) {
        return (
          <span key={index} className="typed">
            {letter}
            {showTypedWords ? typedElement : ''}
          </span>
        )
      }

      return (
        <s key={index} className="typed wrong">
          {letter}
          {showTypedWords ? typedElement : ''}
        </s>
      )
    }

    return <span key={index}>{letter}</span>
  }
  useEffect(() => {
    Configuration.getInstance().load()

    if (!Configuration.getInstance().get('wordsThreshold')) {
      Configuration.getInstance().add({
        wordsThreshold: 10,
        showTypedWords: false,
        smoothing: true
      })
    }

    if (!allWordsToType.length) {
      setAllWordToType(currentWords => [
        ...currentWords,
        ...new Words().getWords()
      ])
    }
  }, [])

  const isSmooth = (): boolean => {
    return Boolean(configuration.get('smoothing'))
  }

  return (
    <Container>
      <MainContainer onClick={resetFocus} smooth={isSmooth()}>
        <div>
          {allWordsToType.map((word, wordIndex) => {
            return (
              <span key={'w_' + wordIndex} className="word">
                {word.map((letter, letterIndex) =>
                  createElement(letter, 'l_' + letterIndex)
                )}
              </span>
            )
          })}
        </div>

        <InputBox
          type="text"
          ref={typingInput}
          value={inputWord}
          onChange={e => setInputWord(e.target.value)}
          onKeyDown={registerKey}
          autoFocus
          autoComplete="false"
        ></InputBox>

        <ButtonsContainer>
          <a
            tabIndex={0}
            onClick={restart}
            onKeyDown={e => (e.key === 'Enter' ? restart() : null)}
          >
            <RedoIcon className="icon"></RedoIcon>
          </a>
          <Link href="/configs">
            <a tabIndex={1}>
              <CogIcon className="icon"></CogIcon>
            </a>
          </Link>

          <a
            tabIndex={2}
            href="https://github.com/Darckfast/nextjs-typescript-template"
          >
            <GithubIcon className="icon no-rotate"></GithubIcon>
          </a>
        </ButtonsContainer>
      </MainContainer>
    </Container>
  )
}

export default Home
