import { RiDashboard2Line, RiContactsLine } from "react-icons/ri";
import React from "react";
import { Box, Stack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { ReactNode } from "toasted-notes/node_modules/@types/react";

interface SectionProps {
  title: string;
  children?: ReactNode;
}

export function NavSection({title, children}: SectionProps) {

  return(
    <Box>
      <Text fontWeight="bold" color="gray.400" fontSize="small">{title}</Text>
      <Stack spacing="4" mt="8" align="stretch">
        {children}
      </Stack>
    </Box>
  )
}