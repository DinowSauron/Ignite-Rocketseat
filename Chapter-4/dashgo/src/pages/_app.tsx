import { AppProps } from "next/app"
import React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "../styles/theme"


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider
      //resetCSS Default true
      theme={theme}
    >
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
