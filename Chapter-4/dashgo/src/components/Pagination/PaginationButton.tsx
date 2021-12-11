import { Button, ButtonProps } from "@chakra-ui/react"

interface PaginationProps extends ButtonProps {
  page: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationButton({page, isCurrent = false, onPageChange}: PaginationProps) {

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
      onClick={() => onPageChange(page)}
    >
      {page}
    </Button>
  )
}
