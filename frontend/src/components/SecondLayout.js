import React from "react"
import Header from "./Header"
import SideBar from "./SideBar"
import Footer from "./Footer"
import {Flex, Box } from "@chakra-ui/react"


/* Layout contains header and footer, NOT sidebar */
const SecondLayout = ({children}) => {
    return (
        <Flex direction="column" height="100vh">
            <Box as="footer">
                <Header/>
            </Box>
            <Box flex="1" as="main" bg="white">
                {children}
            </Box>
            {/* Footer */}
            <Box as="footer">
                <Footer/>
            </Box>
        </Flex>
        );
};

export default SecondLayout;