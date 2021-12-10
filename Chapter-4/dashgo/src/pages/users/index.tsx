import { Box, Button, Flex, Text, Heading, Icon, Table, Th, Thead, Tr, Tbody, Checkbox, Td, useBreakpointValue, Spinner } from "@chakra-ui/react"
import React, { useEffect } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import Sidebar from "../../components/Sidebar";
import Link from "next/link";
import { useQuery } from "react-query"
import { Console } from "console";


type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export default function UserList() {

  const { data, isLoading, error } = useQuery("users", async () => {
    const res = await fetch("http://localhost:3000/api/users");
    const data = await res.json();

    const users = data.users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: new Date(user.created_at).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric"
        }),
      }
    })

    return users;
  }, {
    staleTime: 1000 * 5 // 5sec sem recarregar
  });

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

          { isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao carregar dados dos usuários</Text>
            </Flex>
          ) : (
            <>
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

                  {data.map((user: User) => (
                    <Tr key={user.id}>
                      <Td px={[ "4","4", "6"]} >
                        <Checkbox colorScheme="blue"/>
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight="bold">{user.name}</Text>
                          {isWideVersion && <Text fontSize="sm" color="gray.300">{user.email}</Text>}
                        </Box>
                      </Td>
                      {isWideVersion && <Td>{user.created_at}</Td>}
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
                  ))}



                </Tbody>
              </Table>

              <Pagination />
            </>
          )}

        </Box>
      </Flex>
    </Box>
  );
}