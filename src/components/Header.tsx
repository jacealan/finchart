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
  Avatar,
} from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"
import { FaGoogle } from "react-icons/fa"

import { authService, dbService } from "../fbase"
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth"
import {
  useAuthState,
  useSignInWithGoogle,
  useSignOut,
} from "react-firebase-hooks/auth"
import {
  createUserWithEmailAndPassword,
  // signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth"

export default ({ days, stocks }: any) => {
  const navigate = useNavigate()
  const [range, setRange] = useState(days)
  useEffect(() => {
    setRange(days)
  }, [days])

  const [currentUser, setCurrentUser] = useState<any>(null)
  const [login, user, loading, error] = useSignInWithGoogle(authService)
  const logout = async () => {
    await signOut(authService)
  }
  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      await setCurrentUser(user)
    })
  }, [])

  return (
    <Box bg="black" position="fixed" w="100%">
      <Flex alignItems="center" py={2} px={{ base: 0, sm: 0, md: 5, lg: 5, xl: 100 }}>
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
          {currentUser ? (
            <Avatar
              name={currentUser.displayName}
              src={currentUser.photoURL}
              size="sm"
              onClick={logout}
            />
          ) : (
            // <Button size="sm" ><Image src="data:image/png;base64,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" /></Button>
            <Button
              size="sm"
              colorScheme={"whiteAlpha"}
              variant="outline"
              onClick={() => login()}
            >
              <FaGoogle />
            </Button>
            // <Avatar name="G" fontWeight={1000} size="sm" bg="gray" onClick={() => login()}/>
          )}
          {/* <Menu>
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
          </Menu> */}
        </HStack>
      </Flex>
    </Box>
  )
}
