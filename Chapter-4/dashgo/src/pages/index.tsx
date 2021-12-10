import { Flex, Button, Stack } from "@chakra-ui/react"
import {SubmitHandler, useForm} from "react-hook-form"
import React from "react"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import { Input } from "../components/Form/Input"



type SignInForamData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail Obrigatório").email("E-mail Inválido"),
  password: yup.string().required("Senha Obrigatória"),
})

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  });
  const errors = formState.errors;

  

  const handleSignin: SubmitHandler<SignInForamData> = async (values, event) => {
    event.preventDefault();
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(values)
  }

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
        onSubmit={handleSubmit(handleSignin)}
      >
        <Stack spacing="4">
          <Input
            name="email"
            type="email"
            label="E-mail"
            error={errors.email}
            {...register("email")}
          />
          <Input
            name="password"
            type="password"
            label="Senha"
            error={errors.password}
            {...register("password")}
          />
        </Stack>

        <Button
          size="lg"
          type="submit"
          colorScheme="blue"
          mt={6}
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
