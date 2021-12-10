import { AppProps } from "next/app"
import React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "../styles/theme"
import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContext"
import { makeServer } from "../services/mirage"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"


const isDevelopment = process.env.NODE_ENV === "development"

if(isDevelopment) {
  makeServer();
}
const queryClient = new QueryClient();

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
