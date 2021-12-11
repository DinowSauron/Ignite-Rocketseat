import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react"
import Link from "next/link";
import React from "react";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import {SubmitHandler, useForm} from "react-hook-form"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";



type CreateUserFormData = {
  email: string;
  password: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required("Nome Obrigatório"),
  email: yup.string().required("E-mail Obrigatório").email("E-mail Inválido"),
  password: yup.string().required("Senha Obrigatória").min(6, "A senha deve ter ao menos 6 caracteres"),
  password_confirmation: yup.string().oneOf([
    null, yup.ref("password")
  ], "As senhas precisam ser iguais")
})


export default function CreateUser() {
  const router = useRouter();

  const createUser = useMutation(async (user: CreateUserFormData) => { //useMutation é do react-query
    const resp = await api.post("users", {
      user: {
        ...user,
        created_at: new Date(),
      }
    });

    return resp.data.user;
  }, { // limpa o cache dos dados
    onSuccess: () => {
      queryClient.invalidateQueries("users")
    }
  });

  const { register, handleSubmit, formState} = useForm({
    resolver: yupResolver(createUserFormSchema)
  });
  const {errors} = formState;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values, event) => {
    // event.preventDefault(); ?
    await createUser.mutateAsync(values);
    router.push("/users")
  }

  return (
    <Box>
       <Header/>

       <Flex w="100%" my="6" px="6" mx="auto" maxWidth={1400}>
        <Sidebar />
        
        <Box
          as="form" // precisa ser um form
          flex="1"
          borderRadius="8"
          bg="gray.800"
          p={["6","8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">Criar usuário</Heading>

          <Divider mt="6" borderColor="gray.700"/>

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="name"
                label="Nome completo"
                {...register("name")}
                error={errors.name}
              />
              <Input
                name="email"
                type="email"
                label="E-mail"
                error={errors.email}
                {...register("email")}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="password"
                type="password"
                label="Senha"
                error={errors.password}
                {...register("password")}
              />
              <Input
                name="password_confirmation"
                type="password"
                label="Confirmação da senha"
                error={errors.password_confirmation}
                {...register("password_confirmation")}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={formState.isSubmitting}
              >
                  Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}