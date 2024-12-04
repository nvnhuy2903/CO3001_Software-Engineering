import React from "react"
import MainLayout from "./MainLayout";
import { Box, Text, VStack, HStack } from '@chakra-ui/react';
import { Avatar, AvatarGroup } from "./ui/avatar";
import {useState} from "react";

const UserInfo = () => {
    const [userData, setUserData] = useState(
        {
            name: "Nguyen Van A",
            id: "2211234",
            email: "a.nguyenvan@hcmut.edu.vn",
            department: "Khoa học và Kỹ thuật Máy tính",
            major: "Khoa học Máy tính",
            class: "MT22KHT"
        }
    );
    return (
        <MainLayout>
            <Box 
                maxW="sm" 
                borderRadius="lg" 
                overflow="hidden" 
                p={6} 
                bg="white"
                color="rgba(3, 3, 145, 1)"
                fontFamily="VT323"
            >
                <HStack spacing={4} align="center">
                    <Avatar size="2xl" name={userData.name} />
                    <VStack align="start" ml="8">
                        <Text fontSize="xl">{userData.name}</Text>
                        <Text fontSize="md">2211234</Text>
                    </VStack>
                </HStack>

                <VStack mt={6} spacing={10} align="start" lineHeight="3">
                    <HStack>
                    <Text>Email:</Text>
                    <Text>{userData.email}</Text>
                    </HStack>
                    <HStack>
                    <Text>Khoa:</Text>
                    <Text>{userData.department}</Text>
                    </HStack>
                    <HStack>
                    <Text>Ngành:</Text>
                    <Text>{userData.major}</Text>
                    </HStack>
                    <HStack>
                    <Text>Lớp:</Text>
                    <Text>{userData.class}</Text>
                    </HStack>
                </VStack>
            </Box>
        </MainLayout>
    );   
};

export default UserInfo;