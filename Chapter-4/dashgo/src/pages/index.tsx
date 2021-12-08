import { Flex, Button, Stack } from "@chakra-ui/react"
import React from "react"
import { Input } from "../components/Form/Input"

export default function SignIn() {
  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <Stack spacing="4">
          <Input name="email" type="email" label="E-mail" ></Input>
          <Input name="password" type="password" label="Senha" ></Input>
        </Stack>

        <Button
          size="lg"
          type="submit"
          colorScheme="blue"
          mt={6}
        >Entrar</Button>
      </Flex>
    </Flex>
  )
}