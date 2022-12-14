import React, { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
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
  const [range, setRange] = useState(days)

  useEffect(() => {
    setRange(days)
  }, [days])

  return (
    <Box bg="black" position="fixed" w="100vw">
      <Flex mx={{ base: 5, md: 100 }} py={2} alignItems="center">
        <Box boxSize={10}>
          <Image src="/android-chrome-192x192.png" />
        </Box>
        <Spacer />
        <HStack>
          <Link to="?range=1">
            <Button
              size="sm"
              colorScheme={range === 1 ? "yellow" : "blackAlpha"}
            >
              1D
            </Button>
          </Link>
          <Link to="?range=90">
            <Button
              size="sm"
              colorScheme={range === 90 ? "yellow" : "blackAlpha"}
            >
              3M
            </Button>
          </Link>
          <Link to="?range=365">
            <Button
              size="sm"
              colorScheme={range === 365 ? "yellow" : "blackAlpha"}
            >
              1Y
            </Button>
          </Link>
          <Link to="?range=1095">
            <Button
              size="sm"
              colorScheme={range === 1095 ? "yellow" : "blackAlpha"}
            >
              5Y
            </Button>
          </Link>
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
                <a href="#K">코스피/코스닥</a>
              </MenuItem>
              <MenuItem>
                <a href="#W">해외지수</a>
              </MenuItem>
              <MenuItem>
                <a href="#I">시장지표</a>
              </MenuItem>
              {stocks.map((group: any, index: number) => (
                <MenuItem>
                  <Flex>
                    <a href={`#${group?.groupTitle}`}>{group?.groupTitle}</a>
                  </Flex>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  )
}
