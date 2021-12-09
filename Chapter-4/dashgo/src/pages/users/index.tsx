import { Box, Button, Flex, Text, Heading, Icon, Table, Th, Thead, Tr, Tbody, Checkbox, Td, useBreakpointValue } from "@chakra-ui/react"
import React from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import Sidebar from "../../components/Sidebar";
import Link from "next/link";


export default function UserList() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
    <Box w="100vw">
       <Header/>

       <Flex w="100%" my="6" px="6" mx="auto" maxWidth={1400}>
        <Sidebar />
        
        <Box w={!isWideVersion ? "100%" : ""} flex="1" borderRadius="8" bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">Usuários</Heading>

            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="blue"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </Link>
          </Flex>

          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px={[ "4","4", "6"]}  color="gray.300" w="8">
                  <Checkbox colorScheme="blue"/>
                </Th>
                <Th>Usuário</Th>
                {isWideVersion && <Th>Data de cadastro</Th>}
                <Th w="8"></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td px={[ "4","4", "6"]} >
                  <Checkbox colorScheme="blue"/>
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Dinow Sauron</Text>
                    {isWideVersion && <Text fontSize="sm" color="gray.300">luizclaudiocardoso@yahoo.com</Text>}
                  </Box>
                </Td>
                {isWideVersion && <Td>04 de Abril, 2020</Td>}
                <Td> 
                  <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    colorScheme="teal"
                    leftIcon={<Icon as={RiPencilLine} mr="-2" fontSize="20" />}
                  >
                    {isWideVersion ? "Editar" : ""}
                  </Button>
                </Td>
              </Tr>


              <Tr>
                <Td px={[ "4","4", "6"]} >
                  <Checkbox colorScheme="blue"/>
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Dinow Sauron</Text>
                    {isWideVersion && <Text fontSize="sm" color="gray.300">luizclaudiocardoso@yahoo.com</Text>}
                  </Box>
                </Td>
                {isWideVersion && <Td>04 de Abril, 2020</Td>}
                <Td> 
                  <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    colorScheme="teal"
                    leftIcon={<Icon as={RiPencilLine} mr="-2" fontSize="20" />}
                  >
                    {isWideVersion ? "Editar" : ""}
                  </Button>
                </Td>
              </Tr>


              <Tr>
                <Td px={[ "4","4", "6"]} >
                  <Checkbox colorScheme="blue"/>
                </Td>
                <Td>
                  <Box>
                    <Text fontWeight="bold">Dinow Sauron</Text>
                    {isWideVersion && <Text fontSize="sm" color="gray.300">luizclaudiocardoso@yahoo.com</Text>}
                  </Box>
                </Td>
                {isWideVersion && <Td>04 de Abril, 2020</Td>}
                <Td> 
                  <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    colorScheme="teal"
                    leftIcon={<Icon as={RiPencilLine} mr="-2" fontSize="20" />}
                  >
                    {isWideVersion ? "Editar" : ""}
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>

          <Pagination />
        </Box>
      </Flex>
    </Box>
  );
}