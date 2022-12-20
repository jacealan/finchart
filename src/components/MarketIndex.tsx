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

export default ({ stock, days, sid, id, lazyingSecond }: any) => {
  const [isLoaded, setIsLoaded] = useState(false)
  // useEffect(() => {
  //   setTimeout(() => setIsLoaded(true), lazyingSecond)
  // }, [])

  const [src, setSrc] = useState(
    `https://ssl.pstatic.net/imgfinance/chart/marketindex/area/month/${stock.code}.png?sidcode=`
  )
  const [candle, setCandle] = useState("")

  useEffect(() => {
    if (days === 1) {
      setSrc(
        `https://ssl.pstatic.net/imgfinance/chart/marketindex/area/month/${stock.code}.png?sidcode=`
      )
      setCandle("")
    }
    if (days === 90) {
      setSrc(
        `https://ssl.pstatic.net/imgfinance/chart/marketindex/area/month3/${stock.code}.png?sidcode=`
      )
      setCandle("일봉·")
    }
    if (days === 365) {
      setSrc(
        `https://ssl.pstatic.net/imgfinance/chart/marketindex/area/year/${stock.code}.png?sidcode=`
      )
      setCandle("주봉:")
    }
    if (days === 1095) {
      setSrc(
        `https://ssl.pstatic.net/imgfinance/chart/marketindex/area/year5/${stock.code}.png?sidcode=`
      )
      setCandle("월봉⋮")
    }
  }, [days])

  return (
    <VStack bg="white" borderRadius={10} p={1} id={id}>
      <Box w="100%">
        <a
          href={`https://finance.naver.com/marketindex/exchangeDetail.naver?marketindexCd=${stock.code}`}
          target="_blank"
        >
          <Flex justifyContent="space-between" alignItems="center" mx={2}>
            <Badge colorScheme="purple" fontSize="xs">
              시장지표
            </Badge>
            <Text>{stock.title}</Text>
            <Box>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Box>
          </Flex>
          <Skeleton w="100%" h="100%" isLoaded={isLoaded}>
            <Image
              src={src}
              alt={stock.title}
              onLoad={() => {
                setIsLoaded(true)
              }}
            />
          </Skeleton>
        </a>
      </Box>
    </VStack>
  )
}
