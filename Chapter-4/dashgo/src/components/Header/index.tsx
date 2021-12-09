import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react"
import React from "react"
import { RiMenuLine } from "react-icons/ri"
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext"
import { Logo } from "./Logo"
import { NotificationNav } from "./NotificationsNav"
import { Profile } from "./Profile"
import { SearchBox } from "./SearchBox"


export function Header() {
  const { onOpen } = useSidebarDrawer();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1400}
      minWidth="100vw"
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isWideVersion && (
       <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine}/>}
          fontSize="24"
          mr="2"
          display="flex"
          align="center"
          justifyContent="center"
          variant="unstyled"
          onClick={onOpen}
        >
          
        </IconButton>
      )}
      <Logo />

      {isWideVersion && <SearchBox />}

      
    <Flex
      align="center"
      ml="auto"
    >
        <NotificationNav />
        <Profile showProfileData={isWideVersion}/>
      </Flex>
    </Flex>
  )
}