import { Box, Button, Stack } from "@chakra-ui/react";
import React from "react";
import { PaginationButton } from "./PaginationButton";


export function Pagination() {

  return (
    <Stack
      direction={["column", "row"]}
      mt="8"
      justify="space-between"
      align="center"
      spacing={["2", "6"]}
    >
      <Box>
        <strong> 0</strong> - 
        <strong> 10</strong> de 
        <strong> 100</strong>
      </Box>
      <Stack direction="row" spacing="2">
        <PaginationButton isCurrent page="1"/>
        <PaginationButton page="2"/>
        <PaginationButton page="3"/>
        <PaginationButton page="4"/>
        <PaginationButton page="5"/>
        <PaginationButton page="6"/>
      </Stack>
    </Stack>
  )
}