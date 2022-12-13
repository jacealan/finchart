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

export default ({ groupTitle, stock, days, sid }: any) => {
  const [range, setRange] = useState(days)
  const [src, setSrc] = useState(
    `https://ssl.pstatic.net/imgfinance/chart/item/area/week/${stock.code}.png?sidcode=${sid}`
  )
  const [candle, setCandle] = useState("")
  const [group, setGroup] = useState(groupTitle)

  useEffect(() => {
    setRange(days)
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
    <VStack bg="white">
      <a
        href={`https://finance.naver.com/item/main.naver?code=${stock.code}`}
        target="_blank"
      >
        <Center>
          <HStack>
            <Badge colorScheme="purple" fontSize="10px">
              {group}
            </Badge>
            <Text>&nbsp;{stock.title}&nbsp;</Text>
            <Badge variant="outline" colorScheme="blackAlpha" fontSize="10px">
              {candle}
            </Badge>
          </HStack>
        </Center>
        <Image src={src} />
      </a>
    </VStack>
  )
}
