import { Stack } from "@chakra-ui/react";
import React from "react";
import { RiDashboard2Line, RiContactsLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";



export function SidebarNav() {

  return (
    <Stack spacing="12" align="flex-start">
          
      <NavSection title="GERAL">
        
        <NavLink href="/dashboard" icon={RiDashboard2Line}>
          Dashboard
        </NavLink>
        <NavLink href="/users" icon={RiContactsLine}>
          Usuários
        </NavLink>

      </NavSection>

      <NavSection title="AUTOMAÇÂO">

        <NavLink href="/forms" icon={RiGitMergeLine}>
          Formulários
        </NavLink>
        <NavLink href="/automation" icon={RiInputMethodLine}>
          Automação
        </NavLink>

      </NavSection>
    </Stack>
  )
}