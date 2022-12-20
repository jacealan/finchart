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
  Skeleton,
} from "@chakra-ui/react"

export default ({
  groupTitle,
  groupColor,
  stock,
  days,
  sid,
  id,
  lazyingSecond,
}: any) => {
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), lazyingSecond)
  }, [])

  const [src, setSrc] = useState(
    `https://ssl.pstatic.net/imgfinance/chart/item/area/week/${stock.code}.png?sidcode=${sid}`
  )
  const [candle, setCandle] = useState("")

  useEffect(() => {
    if (days === 1) {
      setSrc(
        `https://ssl.pstatic.net/imgfinance/chart/item/area/week/${stock.code}.png?sidcode=${sid}`
      )
      setCandle("")
    }
    if (days === 90) {
      setSrc(
        `https://ssl.pstatic.net/imgfinance/chart/item/candle/day/${stock.code}.png?sidcode=${sid}`
      )
      setCandle("일봉·")
    }
    if (days === 365) {
      setSrc(
        `https://ssl.pstatic.net/imgfinance/chart/item/candle/week/${stock.code}.png?sidcode=${sid}`
      )
      setCandle("주봉:")
    }
    if (days === 1095) {
      setSrc(
        `https://ssl.pstatic.net/imgfinance/chart/item/candle/month/${stock.code}.png?sidcode=${sid}`
      )
      setCandle("월봉⋮")
    }
  }, [days])

  return (
    <VStack bg="white" borderRadius={10} p={1} id={id}>
      <Box w="100%">
        <a
          href={`https://finance.naver.com/item/main.naver?code=${stock.code}`}
          target="_blank"
        >
          <Flex justifyContent="space-between" alignItems="center" mx={2}>
            <Badge bg={groupColor} fontSize="xs">
              {groupTitle ? groupTitle : <span>&nbsp;</span>}
            </Badge>
            <Text noOfLines={1}>{stock.title}</Text>
            {candle ? (
              <Badge variant="outline" colorScheme="blackAlpha" fontSize="xs">
                {candle}
              </Badge>
            ) : (
              <Box>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Box>
            )}
          </Flex>
          <Skeleton w="100%" h="100%" isLoaded={isLoaded}>
            <Image src={src} alt={stock.title} />
          </Skeleton>
        </a>
      </Box>
    </VStack>
  )
}
