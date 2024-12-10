import React from "react"
import {useState, useEffect} from "react"
import axios from 'axios'
import {Link } from "react-router-dom"
import {Box, HStack, Heading} from "@chakra-ui/react"
import { Avatar, AvatarGroup } from "./ui/avatar"
import '../App.css';

const Header = () => {
    const [userName, setUserName] = useState('');
    const studentid = 4;
    const TOKEN = 
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJodXkubmd1eWVuMjkwMzIwMDQiLCJleHAiOjE3MzM3MjM2MzYsImlhdCI6MTczMzcyMDAzNiwianRpIjoiMTE0ZDQxMGYtYjc5Zi00M2EwLTg5ZDQtNzdiYTY5YmFiN2YyIiwic2NvcGUiOiJTVFVERU5UIn0.Qz66jkrYWKExpvTMQX6EEIk_JeOS8kKjdGRirGL0QzY4gBM4bq6aUG1zo5nhF_6icr65OaWjkRWyva_SSG9K9g";
    useEffect(() => {
        const fetchStudentName = async () => {
        try {
        const response = await axios.get(
          `/student/getStudent/${studentid}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              'Access-Control-Allow-Origin': '*',
            },
          }
        )
        if (response.data.code === 1000) {
            const fetchedName = response.data.result.fullname;
            setUserName(fetchedName);
            console.log(userName);
            console.log("successfull fetching");
        }
      } catch (error) {
        console.error('Failed to fetch printing history:', error);
      }
    }

    fetchStudentName();
  }, [])
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
                        <Avatar variant='solid' name={userName} />
                    </AvatarGroup>
                </HStack>
            </HStack>
        </Box>
    );
};

export default Header;