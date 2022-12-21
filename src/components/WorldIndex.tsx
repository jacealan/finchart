import React, { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
import {
  Grid,
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
  calc,
  Skeleton,
} from "@chakra-ui/react"

export default ({ stock, days, sid, id, lazyingSecond }: any) => {
  const [isLoaded, setIsLoaded] = useState(false)
  // useEffect(() => {
  //   setTimeout(() => setIsLoaded(true), lazyingSecond)
  // }, [])

  const [src, setSrc] = useState(
    `https://ssl.pstatic.net/imgfinance/chart/world/continent/${stock.code}.png?${sid}`
  )
  const [candle, setCandle] = useState("")

  useEffect(() => {
    if (days === 1) {
      setSrc(
        `https://ssl.pstatic.net/imgfinance/chart/world/continent/${stock.code}.png?${sid}`
      )
      setCandle("")
    }
    if (days === 90) {
      setSrc(
        `https://ssl.pstatic.net/imgfinance/chart/world/candle/day/${stock.code}.png?${sid}`
      )
      setCandle("일봉·")
    }
    if (days === 365) {
      setSrc(
        `https://ssl.pstatic.net/imgfinance/chart/world/candle/week/${stock.code}.png?${sid}`
      )
      setCandle("주봉:")
    }
    if (days === 1095) {
      setSrc(
        `https://ssl.pstatic.net/imgfinance/chart/world/candle/month/${stock.code}.png?${sid}`
      )
      setCandle("월봉⋮")
    }
  }, [days])

  return (
    <VStack bg="white" borderRadius={10} p={1} id={id}>
      <Box w="100%">
        <a
          href={`https://finance.naver.com/world/sise.naver?symbol=${stock.code}`}
          target="_blank"
        >
          <Flex justifyContent="space-between" alignItems="center" mx={2} mb={2}>
            <Badge colorScheme="green" fontSize="xs">
              해외지수
            </Badge>
            <Text>{stock.title}</Text>
            {candle ? (
              <Badge variant="outline" colorScheme="blackAlpha" fontSize="xs">
                {candle}
              </Badge>
            ) : (
              <Box>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Box>
            )}
          </Flex>
          <Skeleton w="100%" h="100%" isLoaded={isLoaded}>
            <Image
              onLoad={() => {
                setIsLoaded(true)
              }}
              w="100%"
              src={src}
              alt={stock.title}
              onError={(e) => {
                e.currentTarget.src = `https://ssl.pstatic.net/imgfinance/chart/world/candle/day/${stock.code}.png?${sid}`
              }}
            />
          </Skeleton>
        </a>
      </Box>
    </VStack>
  )
}
