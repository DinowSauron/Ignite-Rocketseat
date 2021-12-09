import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/hooks";
import { useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect } from "react";



interface SidebarProviderProps {
  children: ReactNode;
}

type SidebarcontextData = UseDisclosureReturn;


const SidebarDrawerContext = createContext({} as SidebarcontextData);

export function SidebarDrawerProvider({children}: SidebarProviderProps) {

  const disclosure = useDisclosure();
  const router = useRouter()

  useEffect(() => {
    disclosure.onClose()
  }, [router.asPath])

  return (
    <SidebarDrawerContext.Provider value={
      disclosure
    }>
      {children}
    </SidebarDrawerContext.Provider>
  )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext)