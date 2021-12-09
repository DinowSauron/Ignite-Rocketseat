import { Flex, Box, Avatar, Text } from "@chakra-ui/react";
import React from "react";

interface ProfileProps {
  showProfileData: boolean
}

export function Profile({ showProfileData }: ProfileProps) {

  return (
    <Flex
      align="center"
    >
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Dinow Sauron</Text>
          <Text color="gray.300" fontSize="small">
            luizclaudiocardoso@yahoo.com
          </Text>
        </Box>
      )}
      <Avatar
        size="md"
        borderColor="blue.500"
        name="Dinow Sauron"
        src="https://github.com/DinowSauron.png"
      />
    </Flex>

  )
}