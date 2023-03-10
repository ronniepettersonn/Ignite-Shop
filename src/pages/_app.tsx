import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'

import { Container } from '../styles/pages/app'
import { BagShopContextProvider } from '../contexts/BagShopContext'

import { Header } from '../components/Header'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {

  return (
    <BagShopContextProvider>
      <Container>
        <Header />

        <Component {...pageProps} />
      </Container>
    </BagShopContextProvider>
  )
}
