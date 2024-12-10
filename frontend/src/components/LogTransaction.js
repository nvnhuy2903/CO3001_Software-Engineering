import {React, useState, useEffect} from "react"
import axios from 'axios'
import MainLayout from "./MainLayout";
import { HStack, Heading, Stack, Table, Input, Button, Icon, Box, Text, Badge } from "@chakra-ui/react"
import { InputGroup } from "./ui/input-group"
import { format } from 'date-fns'; 

import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "./ui/pagination"
  import { IoIosSearch } from "react-icons/io";
  import { HiMiniMapPin } from "react-icons/hi2";
  import { FaRegCreditCard } from "react-icons/fa";



const LogTransaction = () => {
    // --------------------------------------Sample Data------------------------------------------------------------
    const [transactions, setTransactions] = useState([
        /* { id: '000000001', time: "07/10/2024 - 15:20:34", amount: 28, balance: 78 },
        { id: '000000002', time: "07/10/2024 - 15:20:34", amount: -20, balance: 50 },
        { id: '000000004', time: "07/10/2024 - 15:20:34", amount: 50, balance: 70 },
        { id: '000000005', time: "07/10/2024 - 15:20:34", amount: -40, balance: 20 },
        { id: '000000007', time: "07/10/2024 - 15:20:34", amount: 12, balance: 60 },
        { id: '000000008', time: "07/10/2024 - 15:20:34", amount: 22, balance: 48 },
        { id: '000000009', time: "07/10/2024 - 15:20:34", amount: -35, balance: 26 },
        { id: '000000010', time: "07/10/2024 - 15:20:34", amount: -12, balance: 14 },
        { id: '000000011', time: "07/10/2024 - 15:20:34", amount: 2, balance: 2 },
        { id: '000000012', time: "07/10/2024 - 15:20:34", amount: -10, balance: 0 } */,
      ]);
    const [filteredData, setfilteredData] = useState(transactions);
    // --------------------------------------End Sample Data------------------------------------------------------------
    
    // --------------------------------------Fetch Data------------------------------------------------------------
    const studentid = 4;
    const TOKEN = 
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJodXkubmd1eWVuMjkwMzIwMDQiLCJleHAiOjE3MzM3MjM2MzYsImlhdCI6MTczMzcyMDAzNiwianRpIjoiMTE0ZDQxMGYtYjc5Zi00M2EwLTg5ZDQtNzdiYTY5YmFiN2YyIiwic2NvcGUiOiJTVFVERU5UIn0.Qz66jkrYWKExpvTMQX6EEIk_JeOS8kKjdGRirGL0QzY4gBM4bq6aUG1zo5nhF_6icr65OaWjkRWyva_SSG9K9g";
    useEffect(() => {
        const fetchTransData = async () => {
        try {
            const response = await axios.get(
            `/transactions/getalltransactions/${studentid}`,
            {
                withCredentials: true,
                headers: {
                Authorization: `Bearer ${TOKEN}`,
                'Access-Control-Allow-Origin': '*',
                },
            }
            )
            if (response.data.code === 1000) {
                const formattedData = response.data.result.map(transaction => ({
                    id: transaction.id.toString(), // Ensure the ID is 9 digits
                    time: format(new Date(transaction.date), 'MM/dd/yyyy - HH:mm:ss'), // Format date
                    amount: transaction.type === 'minusPage' ? -transaction.amount : transaction.amount,
                    balance: transaction.balanceAfter,
                  }));
            console.log("successfull fetching");
            setTransactions(formattedData);
            setfilteredData(formattedData);
            }
        } catch (error) {
            console.error('Failed to fetch printing history:', error);
        }
        }

        fetchTransData();
    }, [])
    // --------------------------------------End Fetch Data------------------------------------------------------------

    // Calculate totals
    const totalPurchased = transactions
    .filter((t) => t.amount > 0) // Only positive amounts
    .reduce((sum, t) => sum + t.amount, 0);
      
    const totalUsed = transactions
    .filter((t) => t.amount < 0) // Only negative amounts
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    //---------------------------------------- Handle Search ----------------------------------------------
    const[searchID, setSearchID] = useState('');
    const [searchStatus, setSearchStatus] = useState('All');
    const [searchSemester, setSearchSemester] = useState('All');

const lastPurchase = transactions[0]?.time || "No transactions available";

    const handleSearch= () => {
        const filteredResult = transactions.filter((row) => {
            console.log("Search ID:", searchID);
            console.log("Row ID:", row.id);
            console.log("Search Status:", searchStatus);
            console.log("Search semester:", searchSemester);
            const checkID = row.id.toLowerCase()
            .includes(searchID.toLowerCase()) || searchID === '';
            
            const checkStatus = (searchStatus === 'Mua vào' && row.amount > 0) 
            || (searchStatus === 'In ra' && row.amount <= 0) || searchStatus === 'All';
            console.log("checkSatus: ",checkStatus);
            return checkID && checkStatus;
        });
        setfilteredData(filteredResult);
    };
//---------------------------------------- End Handle Search ----------------------------------------------  

//---------------------------------------- Handle Pagination ----------------------------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;  // Number of printers per page
    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    // Slice the printer data to show only the items for the current page
    const currentPageData = filteredData.slice(startIndex, endIndex);
    // Handle page change (next and previous)
    const handleNextPage = () => {
        if (currentPage * pageSize < transactions.length) {
            setCurrentPage(currentPage + 1);
        }
    };
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    return (
        <MainLayout>
            <Stack width="Full" gap="5" color="rgba(3, 3, 145, 1)" 
            fontFamily="VT323" mx={20}>
                <HStack mt="25px" justify="center" align="center" >
                    <Heading textAlign="center" size="xl" fontFamily="Coiny" 
                    color="rgba(20, 136, 216, 1)">
                        Chi tiết về lịch sử giao dịch của bạn
                    </Heading>
                    <Icon fontSize="2xl" color="rgba(20, 136, 216, 1)" pb="4px">
                        <FaRegCreditCard />
                    </Icon>
                </HStack>
                <HStack spacing={4} mb={4}>
                    <InputGroup flex="1" startElement={<IoIosSearch />}>
                        <Input 
                            placeholder="Tìm kiếm mã giao dịch"
                            value={searchID}
                            onChange={(e) => setSearchID(e.target.value)}
                            borderRadius="30px"
                            borderColor ="rgba(20, 136, 216, 1)"
                            borderWidth="2px"
                        />
                    </InputGroup>

                    <select placeholder="Trạng thái" 
                    style={{ backgroundColor: 'rgba(20, 136, 216, 1)', color: 'white', 
                        height: '40px', borderRadius: '13px', textAlign: 'center'}}
                    onChange={(e) => setSearchStatus(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Mua vào">Mua vào</option>
                        <option value="In ra">In ra</option>
                    </select>
                    
                    <Button onClick={handleSearch} bg="rgba(20, 136, 216, 1)" color= 'white' borderRadius="13px">Search</Button>
            </HStack>
                <Box mb={5} textAlign="center">
                    <HStack justify="center">
                        Tổng số trang đã mua:{" "}
                        <Badge colorPalette="green">{totalPurchased}</Badge>
                        <Text>(Trang A4)</Text>
                    </HStack>
                    <HStack justify="center">
                        Tổng số trang đã dùng:{" "}
                        <Badge colorPalette="red">{totalUsed}</Badge>
                        <Text>(Trang A4)</Text>
                    </HStack>
                    <HStack justify="center">
                        Lần mua gần nhất: <Badge colorPalette="blue">{lastPurchase}</Badge>
                    </HStack>
                </Box>
                <Table.Root size="sm" variant="outline" showColumnBorder>
                    <Table.Header bg="rgba(20, 136, 216, 0.5)" >
                        <Table.Row >
                            <Table.ColumnHeader color="rgba(3, 3, 145, 1)">Mã giao dịch</Table.ColumnHeader>
                            <Table.ColumnHeader color="rgba(3, 3, 145, 1)">Thời gian</Table.ColumnHeader>
                            <Table.ColumnHeader color="rgba(3, 3, 145, 1)">Số lượng</Table.ColumnHeader>
                            <Table.ColumnHeader color="rgba(3, 3, 145, 1)">Số dư cuối</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {currentPageData.map((item) => (
                        <Table.Row key={item.id}>
                            <Table.Cell>{item.id}</Table.Cell>
                            <Table.Cell>{item.time}</Table.Cell>
                            <Table.Cell color={item.amount < 0 ? "red.500" : "green.500"} fontWeight="bold">
                                {item.amount > 0 ? `+${item.amount} trang` : `${item.amount} trang`}
                            </Table.Cell>
                            <Table.Cell>
                                {`${item.balance} trang`}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                    </Table.Body>
                </Table.Root>

                <PaginationRoot count={transactions.length} pageSize={pageSize} page={currentPage}>
                    <HStack wrap="wrap">
                        <PaginationPrevTrigger onClick={handlePrevPage} 
                        disabled={currentPage === 1} />
                        <PaginationItems />
                        <PaginationNextTrigger onClick={handleNextPage} 
                        disabled={currentPage * pageSize >= transactions.length} />
                    </HStack>
                </PaginationRoot>
            </Stack>
        </MainLayout>
    );   
};

export default LogTransaction;