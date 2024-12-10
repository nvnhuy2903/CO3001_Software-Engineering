import React from "react"
import SecondLayout from "./SecondLayout";
import { Box, Button, Heading, Text, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate('/login'); // Change to the path you want to navigate to
    }; 
    return (
        <SecondLayout>
            <Box textAlign="center" p={10}>
                <Box mb={0} textAlign="center" pr="6">
                    <Image
                    src="/logoHCMUT.png" // Replace with your logo URL
                    alt="BK TPHCM Logo"
                    mx="auto"
                    boxSize="150px"
                    />
                </Box>
                <Text fontFamily="VT323" fontSize="2xl" color="blue.500" mb={4}>
                    Dịch vụ in tài liệu thông minh
                </Text>
                <Heading textShadow="6px 5px 4px rgba(3, 3, 145, 0.2)" 
                fontFamily="Coiny" as="h1" size="3xl" color="rgba(3, 3, 145, 1)" mb={4}>
                    HCMUT SMART PRINTING SERVICE
                </Heading>
                <Button bg="rgba(20, 136, 216, 1)" 
                color="white" fontFamily="Coiny" borderRadius="xl" size="lg"
                 onClick={handleClick} >
                    Đăng nhập ngay
                </Button>
            </Box>
        </SecondLayout>
    );   
};

export default LandingPage;