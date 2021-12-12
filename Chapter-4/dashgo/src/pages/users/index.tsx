import { Box, Button, Flex, Text, Heading, Icon, Table, Th, Thead, Link as ChakraLink, Tr, Tbody, Checkbox, Td, useBreakpointValue, Spinner } from "@chakra-ui/react"
import React, { useEffect, useState } from "react";
import Link from "next/link"
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import Sidebar from "../../components/Sidebar";
import { api } from "../../services/api";
import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";
import { GetServerSideProps, GetStaticProps } from "next";

type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
}
type UserListProps = {
}


export default function UserList() {

  const [page, setPage] = useState(1);
  // refetch > criar um botão de recarregar...

  const { data, isLoading, isFetching, refetch, error } = useUsers(page);
  /* utilize a chave do react-query para utilizar o cache tbm!
  useEffect(() => {refetch()}, [page])*/


  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  async function handlePrefetchUser(userId: String) {
    await queryClient.prefetchQuery(["user", userId], async () => {
      const resp = await api.get(`users/${userId}`);

      return resp.data;
    }, {
      staleTime: 1000 * 60 * 10 // 10 minutos
    })
  }

  return (
    <Box w="100vw">
       <Header/>

       <Flex w="100%" my="6" px="6" mx="auto" maxWidth={1400}>
        <Sidebar />
        
        <Box w={!isWideVersion ? "100%" : ""} flex="1" borderRadius="8" bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4"/>}
            </Heading>

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

                  {data.users.map((user) => (
                    <Tr key={user.id}>
                      <Td px={[ "4","4", "6"]} >
                        <Checkbox colorScheme="blue"/>
                      </Td>
                      <Td>
                        <Box>
                          <ChakraLink color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                            <Text fontWeight="bold">{user.name}</Text>
                          </ChakraLink>
                          
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

              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                registerPerPage={10}
                onPageChange={setPage} 
              />
            </>
          )}

        </Box>
      </Flex>
    </Box>
  );
}



export const getStaticProps: GetStaticProps = async () => {

  return {
    props: {}
  }
}
