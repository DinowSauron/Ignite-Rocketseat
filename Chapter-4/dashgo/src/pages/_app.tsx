import { AppProps } from "next/app"
import React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "../styles/theme"
import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContext"
import { makeServer } from "../services/mirage"
import { QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { queryClient } from "../services/queryClient"


const isDevelopment = process.env.NODE_ENV === "development"

if(isDevelopment) {
  makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider
        //resetCSS Default true
        theme={theme}
      >
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>
      {isDevelopment && <ReactQueryDevtools /> } {/* Visualizador do react-query */}
    </QueryClientProvider>

  )
}

export default MyApp
