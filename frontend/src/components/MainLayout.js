import React from 'react'
import Header from './Header'
import SideBar from './SideBar'
import Footer from './Footer'
import { Flex, Box } from '@chakra-ui/react'

/* Layout contains header and footer AND sidebar */
const MainLayout = (props) => {
  return (
    <Flex direction="column" height="100vh">
      <Box as="footer">
        <Header />
      </Box>
      <Flex flex="1" bg="white">
        {/* SideBar */}
        <Box as="aside">
          <SideBar section={props.section} />
        </Box>
        {/* Main Content */}
        <Box as="main" flex="1">
          {props.children}
        </Box>
      </Flex>
      {/* Footer */}
      <Box as="footer">
        <Footer />
      </Box>
    </Flex>
  )
}

export default MainLayout
