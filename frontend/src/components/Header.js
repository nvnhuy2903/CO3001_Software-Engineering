import React from "react";
import {Link } from "react-router-dom";
import {Box, HStack, Heading} from "@chakra-ui/react"
import { Avatar, AvatarGroup } from "./ui/avatar"
import '../App.css';

const Header = () => {
    return (
        <Box bg="#1488D8">
            <HStack 
            height="70px"
            fontFamily="Coiny"
            fontSize="20px"
            px={16}
            py={8}
            align="center" 
            justifyContent="space-between">
                <HStack>
                    <Link to="/homepage" className="nav-item">
                        <Heading fontSize="20px" fontFamily="Coiny">HCMUT-SSPS</Heading>
                    </Link>
                </HStack>
                <HStack gap="16">
                    <nav>
                        <HStack gap="8" fontSize="20px">
                            <Link to="/homepage" className="nav-item hover-navbar">Trang Chủ</Link>
                            <Link to="/aboutUs" className="nav-item hover-navbar">Chúng tôi</Link>
                            <Link to="/service" className="nav-item hover-navbar">Dịch vụ in</Link>
                            <Link to="/transaction" className="nav-item hover-navbar">Giao dịch</Link>
                            <Link to="/print" className="nav-item hover-navbar">In ngay</Link>
                        </HStack>
                    </nav>
                    <AvatarGroup>
                            <Avatar variant="solid" name="SampleUser" />
                    </AvatarGroup>
                </HStack>
            </HStack>
        </Box>
    );
};

export default Header;