import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import {
  Box,
  Grid,
  Stack,
  HStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Center,
  Flex,
  Badge,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Divider,
  Card,
  CardBody,
} from "@chakra-ui/react"
import { EditIcon, WarningIcon } from "@chakra-ui/icons"

import { authService, dbService } from "./fbase"
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth"
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"
import {
  useAuthState,
  useSignInWithGoogle,
  useSignOut,
} from "react-firebase-hooks/auth"

import krxStock from "./krxStock"
import krxETF from "./krxETF"
import krxETN from "./krxETN"
import stocksInit from "./stocksInit"

import Header from "./components/Header"
import Footer from "./components/Footer"
import KoreaIndex from "./components/KoreaIndex"
import WorldIndex from "./components/WorldIndex"
import MarketIndex from "./components/MarketIndex"
import Stock from "./components/Stock"

const now: Date = new Date()
const sid: number = now.getTime()
const codes: any[] = [
  ...krxStock.OutBlock_1,
  ...krxETF.output,
  ...krxETN.output,
]
const colorShemes = [
  "gray.300",
  "red.200",
  "orange.200",
  "green.100",
  "blue.100",
  "purple.200",
]
// "yellow.200", "cyan.200", "pink.200"

function App() {
  const [searchParams, setSearchParams] = useSearchParams()
  const param = searchParams.get("range")
  const days = parseInt(param ? param : "90")

  const [loadtime, setLoadtime] = useState<Date>(now)

  const [currentUser, setCurrentUser] = useState<any>(null)

  // 코스피, 코스닥 지수
  const korea: { title: string; code: string }[] = [
    { title: "코스피", code: "KOSPI" },
    { title: "코스닥", code: "KOSDAQ" },
  ]

  // 해외 주식 지수
  const world: { title: string; code: string }[] = [
    { title: "다우산업 Dow Jones", code: "DJI@DJI" },
    { title: "나스닥종합 NASDAQ", code: "NAS@IXIC" },
    { title: "S&P 500", code: "SPI@SPX" },
    { title: "상해종합", code: "SHS@000001" },
    { title: "항셍", code: "HSI@HSI" },
    { title: "유로스톡스 50", code: "STX@SX5E" },
    { title: "인도 SENSEX", code: "INI@BSE30" },
  ]

  // 시장 지표
  const marketindex: { title: string; code: string; link: string }[] = [
    {
      title: "WTI(서부텍사스유, 달러/배럴)",
      code: "OIL_CL",
      link: "https://finance.naver.com/marketindex/worldOilDetail.naver?marketindexCd=OIL_CL&fdtc=2",
    },
    {
      title: "달러인덱스",
      code: "FX_USDX",
      link: "https://finance.naver.com/marketindex/worldExchangeDetail.naver?marketindexCd=FX_USDX",
    },
    {
      title: "환율 KRW/USD",
      code: "FX_USDKRW",
      link: "https://finance.naver.com/marketindex/exchangeDetail.naver?marketindexCd=FX_USDKRW",
    },
    // {
    //   title: "국제 금",
    //   code: "CMDT_GC",
    //   link: "https://finance.naver.com/marketindex/worldGoldDetail.naver?marketindexCd=CMDT_GC&fdtc=2",
    // },
    {
      title: "CD금리(91일)",
      code: "IRR_CD91",
      link: "https://finance.naver.com/marketindex/interestDetail.naver?marketindexCd=IRR_CD91",
    },
    // {
    //   title: "구리(달러/톤)",
    //   code: "MCDT_CDY",
    //   link: "https://finance.naver.com/marketindex/interestDetail.naver?marketindexCd=IRR_CD91",
    // },
    // {
    //   title: "옥수수(센트/부셀)",
    //   code: "CMDT_C",
    //   link: "https://finance.naver.com/marketindex/materialDetail.naver?marketindexCd=CMDT_C",
    // },
    // {
    //   title: "오렌지주스(센트/파운드)",
    //   code: "CMDT_OJ",
    //   link: "https://finance.naver.com/marketindex/materialDetail.naver?marketindexCd=CMDT_OJ",
    // },
  ]

  // 그룹/종목
  const [stocks, setStocks] = useState(stocksInit)
  const codeChange = (event: React.FormEvent<HTMLInputElement>) => {
    const newStocks = [...stocks]
    const {
      currentTarget: { name, value },
    } = event
    const stockName = findStock(value)?.ISU_ABBRV

    if (name.length === 2) {
      const groupOrder = parseInt(name[1])
      newStocks[groupOrder].groupTitle = value
      setStocks([...newStocks])
    }
    if (name.length > 2) {
      const groupOrder = parseInt(name[1])
      const stockOrder = parseInt(name.slice(3))
      newStocks[groupOrder].codes[stockOrder] = {
        title: stockName ? stockName : "",
        code: value,
      }
      setStocks([...newStocks])
    }
  }

  const findStock = (code: string) =>
    codes.find((stock) => stock.ISU_SRT_CD === code)
  const findStockName = (grp: number, idx: number) =>
    findStock(stocks[grp]?.codes[idx]?.code)?.ISU_ABBRV

  const { isOpen, onOpen, onClose } = useDisclosure()

  // data from localstorage
  const getFromStorage = () => {
    const stocksFromStorage = window.localStorage.getItem("stocks")
    if (stocksFromStorage) {
      setStocks([...JSON.parse(stocksFromStorage)])
    } else {
      window.localStorage.setItem("stocks", JSON.stringify(stocks))
    }
  }
  useEffect(() => {
    getFromStorage()

    authService.onAuthStateChanged(async (user) => {
      await setCurrentUser(user)
      if (user) {
        const docSnap = await getDoc(doc(dbService, "fins", user.uid))
        const stocksFromFirebase = docSnap.data()
        if (stocksFromFirebase) {
          setStocks([...stocksFromFirebase?.watchlist])
        } else {
          const now: Date = new Date()
          await setDoc(doc(dbService, "fins", user.uid), {
            author: user.uid,
            watchlist: stocks,
            createdAt: now,
            updatedAt: now,
          })
        }
      } else {
        getFromStorage()
      }
      console.log(user, currentUser)
    })
  }, [])

  return (
    <Box>
      <Header days={days} stocks={stocks} />
      <Grid
        py="60px"
        templateColumns={{
          base: "1fr",
          md: "repeat(auto-fill, minmax(360px, 1fr))",
        }}
        gap="5px"
        bg="black"
        px={{ base: 0, sm: 0, md: 5, lg: 5, xl: 100 }}
      >
        {korea.map((stock, index) => (
          <KoreaIndex
            stock={stock}
            days={days}
            sid={sid}
            key={stock.code}
            id={index === 0 ? "K" : ""}
          />
        ))}

        {world.map((stock, index) => (
          <WorldIndex
            stock={stock}
            days={days}
            sid={sid}
            key={stock.code}
            id={index === 0 ? "W" : ""}
          />
        ))}

        {marketindex.map((stock, index) => (
          <MarketIndex
            stock={stock}
            days={days}
            sid={sid}
            key={stock.code}
            id={index === 0 ? "I" : ""}
          />
        ))}

        {stocks.map((group, groupIndex) =>
          group.codes.map((stock, stockIndex) => {
            if (findStock(stock?.code)?.ISU_ABBRV)
              return (
                <Stock
                  groupTitle={group.groupTitle}
                  groupColor={colorShemes[groupIndex]}
                  stock={stock}
                  days={days}
                  sid={sid}
                  key={`g${groupIndex}s${stockIndex}`}
                  id={stocks[groupIndex]?.groupTitle}
                  // id={stockIndex === 0 ? stocks[groupIndex]?.groupTitle : ""}
                />
              )
          })
        )}
      </Grid>

      <Center bg="black">
        <HStack spacing={4}>
          <Button leftIcon={<EditIcon />} onClick={onOpen} fontSize="xs">
            그룹/종목 수정
          </Button>
          {currentUser ? null : (
            <Button
              leftIcon={<WarningIcon />}
              onClick={() => {
                setStocks(stocksInit)
                window.localStorage.setItem(
                  "stocks",
                  JSON.stringify(stocksInit)
                )
              }}
              fontSize="xs"
            >
              그룹/종목 초기화
            </Button>
          )}
        </HStack>
      </Center>

      <Footer />

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>그룹/종목 수정</ModalHeader>
          <ModalCloseButton
            onClick={() => {
              const FromStorage = window.localStorage.getItem("stocks")
              setStocks([...JSON.parse(FromStorage ? FromStorage : "")])
              onClose()
            }}
          />
          <ModalBody pb={6}>
            {/* <Text fontSize="xs" align="right">
              다른 곳에서 수정된 목록은, 로그인때 적용됩니다
            </Text> */}
            {[0, 1, 2, 3, 4, 5].map((groupIdx, index) => (
              <Box my={4} key={index}>
                <InputGroup size="sm">
                  <FormLabel htmlFor={`g${groupIdx}`} m={0}>
                    <InputLeftAddon w="80px" bg="gray.300">
                      <Text w="100%" textAlign="center">
                        그룹 {groupIdx + 1}
                      </Text>
                    </InputLeftAddon>
                  </FormLabel>

                  <Input
                    w="calc(100% - 80px)"
                    id={`g${groupIdx}`}
                    name={`g${groupIdx}`}
                    placeholder="그룹이름"
                    value={stocks[groupIdx]?.groupTitle}
                    onChange={codeChange}
                  />
                </InputGroup>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
                  (stockIdx, index) => (
                    <InputGroup size="sm" key={index}>
                      <Input
                        w="80px"
                        id={`g${groupIdx}s${stockIdx}`}
                        name={`g${groupIdx}s${stockIdx}`}
                        placeholder="종목코드"
                        value={stocks[groupIdx]?.codes[stockIdx]?.code}
                        onChange={codeChange}
                      />
                      <FormLabel
                        htmlFor={`g${groupIdx}s${stockIdx}`}
                        w="calc(100% - 80px)"
                        m={0}
                      >
                        <InputRightAddon
                          children={
                            findStockName(groupIdx, stockIdx)
                              ? findStockName(groupIdx, stockIdx)
                              : null
                          }
                        />
                      </FormLabel>
                    </InputGroup>
                  )
                )}
              </Box>
            ))}
            <Text fontSize="xs" align="right">
              신규 종목은 최소 1주일 후 등록가능합니다
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={async () => {
                currentUser
                  ? await updateDoc(doc(dbService, "fins", currentUser.uid), {
                      // author: currentUser.uid,
                      watchlist: stocks,
                      updatedAt: new Date(),
                    })
                  : window.localStorage.setItem(
                      "stocks",
                      JSON.stringify(stocks)
                    )
                onClose()
              }}
            >
              저장
            </Button>
            <Button
              onClick={() => {
                const FromStorage = window.localStorage.getItem("stocks")
                setStocks([...JSON.parse(FromStorage ? FromStorage : "")])
                onClose()
              }}
            >
              취소
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default App
