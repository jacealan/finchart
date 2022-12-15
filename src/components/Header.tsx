import React, { useState, useEffect } from "react"
import { useNavigate, useSearchParams, Link } from "react-router-dom"
import {
  Flex,
  Box,
  Spacer,
  HStack,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Text,
} from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"

export default ({ days, stocks }: any) => {
  const navigate = useNavigate()
  const [range, setRange] = useState(days)

  useEffect(() => {
    setRange(days)
  }, [days])

  return (
    <Box bg="black" position="fixed" w="100vw">
      <Flex alignItems="center" py={2} mx={{ base: 5, lg: 100 }}>
        <Box boxSize={10}>
          <Image src="/android-chrome-192x192.png" />
        </Box>
        <Spacer />
        <HStack>
          <Button
            size="sm"
            colorScheme={range === 1 ? "yellow" : "blackAlpha"}
            onClick={() => {
              navigate("?range=1")
            }}
          >
            1D
          </Button>
          <Button
            size="sm"
            colorScheme={range === 90 ? "yellow" : "blackAlpha"}
            onClick={() => {
              navigate("?range=90")
            }}
          >
            3M
          </Button>
          <Button
            size="sm"
            colorScheme={range === 365 ? "yellow" : "blackAlpha"}
            onClick={() => {
              navigate("?range=365")
            }}
          >
            1Y
          </Button>
          <Button
            size="sm"
            colorScheme={range === 1095 ? "yellow" : "blackAlpha"}
            onClick={() => {
              navigate("?range=1095")
            }}
          >
            5Y
          </Button>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              size="sm"
              colorScheme="whiteAlpha"
              variant="outline"
            />
            <MenuList>
              <MenuItem>
                <Link to="#K" reloadDocument>
                  코스피/코스닥
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="#W" reloadDocument>
                  해외지수
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="#I" reloadDocument>
                  시장지표
                </Link>
              </MenuItem>
              {stocks.map((group: any, index: number) => (
                <MenuItem key={index}>
                  <a href={`#${group?.groupTitle}`}>{group?.groupTitle}</a>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  )
}
