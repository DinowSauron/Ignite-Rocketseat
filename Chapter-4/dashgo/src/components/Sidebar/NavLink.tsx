import { Icon, Link as ChakraLink, Text, LinkProps } from "@chakra-ui/react"
import React, { ElementType } from "react";
import { ActiveLink } from "../ActiveLink";


interface NavLinkProps extends LinkProps {
  children: string;
  href: string;
  icon: ElementType;
}

export function NavLink({children, icon, href, ...rest}: NavLinkProps) {

  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" align="center" py="1" {...rest}>
        <Icon as={icon} fontSize="20"/>
        <Text ml="4" fontWeight="medium">{children}</Text>
      </ChakraLink>
    </ActiveLink>
  )
}