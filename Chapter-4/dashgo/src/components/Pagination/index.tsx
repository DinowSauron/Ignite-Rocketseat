import { Box, Text, Stack } from "@chakra-ui/react";
import React from "react";
import { PaginationButton } from "./PaginationButton";

interface PaginationProps {
  totalCountOfRegisters: number;
  registerPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)].map((_, index) => {
    return from + index + 1;
  })
  .filter(page => page > 0)
}

export function Pagination({
  totalCountOfRegisters,
  registerPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / registerPerPage);

  const previousPages = currentPage > 1 
    ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
    : []
  
  const nextPages = currentPage < lastPage 
    ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
    : []


  return (
    <Stack
      direction={["column", "row"]}
      mt="8"
      justify="space-between"
      align="center"
      spacing={["2", "6"]}
    >
      <Box>
        <strong> {(currentPage - 1) * 10 + 1}</strong> - 
        <strong> {currentPage * 10 < totalCountOfRegisters ? currentPage * 10 : totalCountOfRegisters}</strong> de 
        <strong> {totalCountOfRegisters}</strong>
      </Box>
      <Stack direction="row" spacing="2">

        {currentPage > (1 + siblingsCount) && (
          <>
            <PaginationButton onPageChange={onPageChange}  page={1}/>
            { currentPage > (2 + siblingsCount) && (
              <Text color="gray.300" w="6" textAlign="center">...</Text>
            )}
          </>
        )}


        {previousPages.map(page => (
         <PaginationButton onPageChange={onPageChange}  key={page} page={page}/>
        ))}
        <PaginationButton onPageChange={onPageChange}  isCurrent page={currentPage}/>
        {nextPages.map(page => (
         <PaginationButton onPageChange={onPageChange}  key={page} page={page}/>
        ))}


        {(currentPage + siblingsCount) < lastPage && (
          <>
            { currentPage + 1 + siblingsCount < lastPage && (
              <Text color="gray.300" w="6" textAlign="center">...</Text>
            )}
            <PaginationButton onPageChange={onPageChange}  page={lastPage}/>
         </>
        )}

      </Stack>
    </Stack>
  )
}