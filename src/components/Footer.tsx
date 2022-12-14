import React, { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
import {
  Center,
  Text,
  Flex,
  VStack,
  Box,
  Spacer,
  HStack,
  Button,
  Image,
} from "@chakra-ui/react"
import { RepeatIcon } from "@chakra-ui/icons"

const now: Date = new Date()

export default ({ days }: any) => {
  const [loadtime, setLoadtime] = useState(now)

  return (
    <Center bg="black" pb={10}>
      <VStack>
        <Flex alignItems="center">
          <button>
            <RepeatIcon
              boxSize={3}
              color="gray"
              onClick={() => window.location.reload()}
            />
            &nbsp;
          </button>
          <Text color="gray" fontSize={10}>
            loaded at {loadtime.toLocaleDateString("ko-KR")}
            {loadtime.toLocaleTimeString("ko-KR")}
          </Text>
        </Flex>
        <Text color="gray" fontSize={16}>
          &copy; Jace
        </Text>
      </VStack>
    </Center>
  )
}
