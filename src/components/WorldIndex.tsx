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

export default ({ stock, days, sid }: any) => {
  const [range, setRange] = useState(days)
  const [src, setSrc] = useState(
    `https://ssl.pstatic.net/imgfinance/chart/world/continent/${stock.code}.png?${sid}`
  )
  const [candle, setCandle] = useState("")

  useEffect(() => {
    setRange(days)
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
    <VStack bg="white">
      <a
        href={`https://finance.naver.com/world/sise.naver?symbol=${stock.code}`}
        target="_blank"
      >
        <Center>
          <HStack>
            <Badge colorScheme="green" fontSize="10px">
              해외지수
            </Badge>
            <Text>&nbsp;{stock.title}&nbsp;</Text>
            <Badge variant="outline" colorScheme="blackAlpha" fontSize="10px">
              {candle}
            </Badge>
          </HStack>
        </Center>
        <Image
          src={src}
          onError={(e) => {
            e.currentTarget.src = `https://ssl.pstatic.net/imgfinance/chart/world/candle/day/${stock.code}.png?${sid}`
          }}
        />
      </a>
    </VStack>
  )
}
