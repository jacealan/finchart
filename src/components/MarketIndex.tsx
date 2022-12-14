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
  // const [range, setRange] = useState(days)
  const [src, setSrc] = useState(
    `https://ssl.pstatic.net/imgfinance/chart/marketindex/area/month/${stock.code}.png?sidcode=`
  )
  const [candle, setCandle] = useState("")

  useEffect(() => {
    // setRange(days)
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
      <a
        href={`https://finance.naver.com/marketindex/exchangeDetail.naver?marketindexCd=${stock.code}`}
        target="_blank"
      >
        <Center>
          <HStack>
            <Badge colorScheme="purple" fontSize="10px">
              시장지표
            </Badge>
            <Text>&nbsp;{stock.title}&nbsp;</Text>
            {/* <Badge variant="outline" colorScheme="blackAlpha" fontSize="10px">
              {candle}
            </Badge> */}
          </HStack>
        </Center>
        <Image src={src}   />
      </a>
    </VStack>
  )
}
