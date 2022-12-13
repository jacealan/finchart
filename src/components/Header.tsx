import React, { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { Flex, Box, Spacer, HStack, Button, Image } from "@chakra-ui/react"

export default ({ days }: any) => {
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
        </HStack>
      </Flex>
    </Box>
  )
}
