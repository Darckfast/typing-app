import React from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import Head from 'next/head'
import GlobalStyle from '../styles/global'
import theme from '../styles/theme'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Typing test</title>
      </Head>

      <Component {...pageProps} />

      <GlobalStyle />
    </ThemeProvider>
  )
}

export default MyApp
