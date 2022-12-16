import React, { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
import {
  Flex,
  Spacer,
  Box,
  VStack,
  HStack,
  Center,
  Button,
  Image,
  Text,
  Badge,
} from "@chakra-ui/react"

export default ({ stock, days, sid, id }: any) => {
  return (
    <Box w="100%" bg="white" borderRadius={10} p={1} id={id}>
      <a
        href={`https://finance.naver.com/sise/sise_index.naver?code=${stock.code}`}
        target="_blank"
      >
        <VStack>
          <Center>
            <HStack>
              <Text>{stock.title}</Text>
              <Badge colorScheme="pink" fontSize="xs">
                개인
              </Badge>
              <Badge colorScheme="orange" fontSize="xs">
                외국인
              </Badge>
              <Badge colorScheme="cyan" fontSize="xs">
                기관
              </Badge>
            </HStack>
          </Center>
          <Image
            src={`https://ssl.pstatic.net/imgfinance/chart/sise/siseMain${stock.code}.png?sid=${sid}`}
            alt={stock.title}
          />
          <Flex bg="white">
            <Box m="1px">
              <Image
                src={`https://ssl.pstatic.net/imgstock/chart3/day1095/${stock.code}.png?sid=${sid}`}
                alt={stock.title}
              />
            </Box>
            <Spacer />
            <Box m="1px">
              <Image
                src={`https://ssl.pstatic.net/imgstock/chart3/day365/${stock.code}.png?sid=${sid}`}
                alt={stock.title}
              />
            </Box>
            <Spacer />
            <Box m="1px">
              <Image
                src={`https://ssl.pstatic.net/imgstock/chart3/day90/${stock.code}.png?sid=${sid}`}
                alt={stock.title}
              />
            </Box>
            <Spacer />
            <Box m="1px">
              <Image
                src={`https://ssl.pstatic.net/imgstock/chart3/day/${stock.code}.png?sid=${sid}`}
                alt={stock.title}
              />
            </Box>
          </Flex>
        </VStack>
      </a>
    </Box>
  )
}
