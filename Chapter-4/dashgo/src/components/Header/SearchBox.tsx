import React, { useRef, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { Icon, Flex, Input} from "@chakra-ui/react";



export function SearchBox() {
  //Debounce
  // const [search, setSearch] = useState("");

  // Uncontrolled components
  const searchRef = useRef<HTMLInputElement>(null);
  // console.log(searchRef.current.focus())

  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxWidth={400}
      alignSelf="center"
      color="gray.200"
      position="relative"
      bg="gray.800"
      borderRadius="full"
    >
      <Input
        color="gray.50"
        variant="unstyled"
        px="4"
        mr="4"
        placeholder="Buscar Na Plataforma"
        _placeholder={{ color: "gray.400"}}
        ref={searchRef}

        // value={search}
        // onChange={e => setSearch(e.target.value)}
      />
      <Icon as={RiSearch2Line} fontSize="20"/>
    </Flex>
  )
}