import { Button, ButtonProps } from "@chakra-ui/react"

interface PaginationProps extends ButtonProps {
  page: string | number;
  isCurrent?: boolean;
}

export function PaginationButton({page, isCurrent = false}: PaginationProps) {

  if(isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="blue"
        disabled
        _disabled={{
          bg: "blue.500",
          cursor: "default"
        }}
      >
        {page}
      </Button>
    )
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bg="gray.700"
      _hover={{
        bg: "gray.500"
      }}
    >
      {page}
    </Button>
  )
}
