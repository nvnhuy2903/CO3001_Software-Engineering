import React from "react"
import axios from 'axios'
import MainLayout from "./MainLayout";
import { Box, Text, VStack, HStack, Flex, Button } from '@chakra-ui/react';
import { Avatar, AvatarGroup } from "./ui/avatar";
import {useState, useEffect} from "react";
import { Link } from 'react-router-dom';


import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserInfo = () => {
    const [userData, setUserData] = useState(
        {
            /* name: "Nguyen Van A",
            id: "2211234",
            email: "a.nguyenvan@hcmut.edu.vn",
            department: "Khoa học và Kỹ thuật Máy tính",
            major: "Khoa học Máy tính",
            class: "MT22KHT" */
        }
    );
    const dataPrinting = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: [
          {
            label: 'Số lần in',
            data: [5, 10, 7, 15, 18, 9, 6, 8, 12, 10, 0, 0],
            backgroundColor: 'rgba(20, 136, 216, 1)',
          },
        ],
      };
      
      const dataTransactions = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: [
          {
            label: 'Số lần mua trang',
            data: [20, 32, 15, 18, 38, 14, 9, 11, 18, 12, 0, 0],
            backgroundColor: 'rgba(20, 136, 216, 1)',
          },
        ],
      };
// -------------------------------------- Fetch Data----------------------------------------------------------------
const studentid = 4;
const TOKEN = 
"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJodXkubmd1eWVuMjkwMzIwMDQiLCJleHAiOjE3MzM3MjM2MzYsImlhdCI6MTczMzcyMDAzNiwianRpIjoiMTE0ZDQxMGYtYjc5Zi00M2EwLTg5ZDQtNzdiYTY5YmFiN2YyIiwic2NvcGUiOiJTVFVERU5UIn0.Qz66jkrYWKExpvTMQX6EEIk_JeOS8kKjdGRirGL0QzY4gBM4bq6aUG1zo5nhF_6icr65OaWjkRWyva_SSG9K9g";
useEffect(() => {
    const fetchStudentData = async () => {
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
            const transformedData = {
                name: response.data.result.fullname,
                id: response.data.result.mssv,
                email: response.data.result.email,
                department: response.data.result.nganh,
                major: response.data.result.khoa,
                balance: response.data.result.pages
            };
          console.log("successfull fetching");
          setUserData(transformedData);
        }
      } catch (error) {
        console.error('Failed to fetch printing history:', error);
      }
    }

    fetchStudentData();
  }, [])
// -------------------------------------- End Fetch Data----------------------------------------------------------------

    return (
        <MainLayout>
            <Box p={6} bg="#f0f4f8">
                <Flex height="100%" width="100%" spacing={0} gap={2}>
                    {/* Profile Section */}
                    <Box
                    flex="1"
                    
                    borderRadius="lg"
                    p={6}
                    bg="white"
                    color="rgba(3, 3, 145, 1)"
                    fontFamily="VT323"
                    fontSize="2xl"
                    boxShadow="md"
                    >
                        <HStack spacing={4} align="center">
                            <Avatar size="2xl" name={userData.name} />
                            <VStack align="start" pl="10px">
                                <Text fontSize="2xl" fontWeight="bold">{userData.name}</Text>
                                <Text fontSize="2xl">{userData.id}</Text>
                            </VStack>
                        </HStack>

                        <VStack mt={6} spacing={4} align="start">
                            <HStack>
                            <Text fontWeight="bold">Email:</Text>
                            <Text>{userData.email}</Text>
                            </HStack>
                            <HStack>
                            <Text fontWeight="bold">Khoa:</Text>
                            <Text>{userData.department}</Text>
                            </HStack>
                            <HStack>
                            <Text fontWeight="bold">Ngành:</Text>
                            <Text>{userData.major}</Text>
                            </HStack>
                            <HStack>
                            <Text fontWeight="bold">Số dư: </Text>
                            <Text>{userData.balance}</Text>
                            </HStack>
                        </VStack>
                    </Box>

                    {/* Charts Section */}
                    <Box flex="1">
                        {/* First Chart */}
                        <Box bg="white" p={6} borderRadius="lg" boxShadow="md" mb={6}>
                            <Text fontSize="lg" mb={4} fontWeight="bold" color="black">Thống kê số lần in - Năm 2024</Text>
                            <Bar data={dataPrinting} />
                            <Button as={Link} to="/service/logPrinting" mt={4} colorScheme="teal">Xem lịch sử in</Button>
                        </Box>

                        {/* Second Chart */}
                        <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
                            <Text fontSize="lg" mb={4} fontWeight="bold" color="black">Thống kê số lần mua trang in - Năm 2024</Text>
                            <Bar data={dataTransactions} />
                            <Button as={Link} to="/transaction/logTrans" mt={4} colorScheme="teal">Xem lịch sử giao dịch</Button>
                        </Box>
                    </Box>
                </Flex>
            </Box>
            
        </MainLayout>
    );   
};

export default UserInfo;