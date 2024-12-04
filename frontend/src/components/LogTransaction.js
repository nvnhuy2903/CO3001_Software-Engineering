import {React, useState} from "react"
import MainLayout from "./MainLayout";
import { HStack, Heading, Stack, Table, Input, Button, Icon } from "@chakra-ui/react"
import { InputGroup } from "./ui/input-group"

import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "./ui/pagination"
  import { IoIosSearch } from "react-icons/io";
  import { HiMiniMapPin } from "react-icons/hi2";



const LogTransaction = () => {
    // --------------------------------------Sample Data------------------------------------------------------------
    const [transactions, setTransactions] = useState([
        { id: "123456789", date: "07/10/2024", time: "15:20:34", quantity: 28, balance: 78 },
        { id: "123456789", date: "07/10/2024", time: "15:20:34", quantity: -20, balance: 50 },
        { id: "123456789", date: "07/10/2024", time: "15:20:34", quantity: 50, balance: 70 },
        { id: "123456789", date: "07/10/2024", time: "15:20:34", quantity: -40, balance: 20 },
        { id: "123456789", date: "07/10/2024", time: "15:20:34", quantity: 12, balance: 60 },
        { id: "123456789", date: "07/10/2024", time: "15:20:34", quantity: 22, balance: 48 },
        { id: "123456789", date: "07/10/2024", time: "15:20:34", quantity: -35, balance: 26 },
        { id: "123456789", date: "07/10/2024", time: "15:20:34", quantity: -12, balance: 14 },
        { id: "123456789", date: "07/10/2024", time: "15:20:34", quantity: 2, balance: 2 },
        { id: "123456789", date: "07/10/2024", time: "15:20:34", quantity: -10, balance: 0 },
      ]);
    const [filteredData, setfilteredData] = useState(transactions);
    // --------------------------------------End Sample Data------------------------------------------------------------
    
    //---------------------------------------- Handle Search ----------------------------------------------
    const[searchName, setSearchName] = useState('');
    const [searchBuilding, setsearchBuilding] = useState('');
    const [searchStatus, setSearchStatus] = useState('');

    const handleSearch= () => {
        const filteredResult = transactions.filter((row) => {
            const checkName = row.name.toLowerCase()
            .includes(searchName.toLowerCase()) || searchName === '';

            const checkBuilding = row.building.toLowerCase()
            .includes(searchBuilding.toLowerCase()) || searchBuilding === '' || searchBuilding === 'All';
            
            const checkStatus = row.status.toLowerCase()
            .includes(searchStatus.toLowerCase()) || searchStatus === '' || searchStatus === 'All';
            
            return checkName && checkBuilding && checkStatus;
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
                        <HiMiniMapPin />
                    </Icon>
                </HStack>
                <HStack spacing={4} mb={4}>
                    <InputGroup flex="1" startElement={<IoIosSearch />}>
                        <Input 
                            placeholder="Tìm kiếm tên máy in"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            borderRadius="30px"
                            borderColor ="rgba(20, 136, 216, 1)"
                            borderWidth="2px"
                        />
                    </InputGroup>
                    <select placeholder="Tòa" 
                    style={{ backgroundColor: 'rgba(20, 136, 216, 1)', color: 'white',  
                        height: '40px', borderRadius: '13px', width: '85px', textAlign: 'center'}} 
                    onChange={(e) => setsearchBuilding(e.target.value)}>
                        <option value="All">All</option>
                        <option value="A1">A1</option>
                        <option value="B4">B4</option>
                    </select>

                    <select placeholder="Trạng thái" 
                    style={{ backgroundColor: 'rgba(20, 136, 216, 1)', color: 'white', 
                        height: '40px', borderRadius: '13px', textAlign: 'center'}}
                    onChange={(e) => setSearchStatus(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Hoạt động">Hoạt động</option>
                        <option value="Ngừng">Ngừng</option>
                    </select>
                    
                    <Button onClick={handleSearch} bg="rgba(20, 136, 216, 1)" color= 'white' borderRadius="13px">Search</Button>
            </HStack>
                <Table.Root size="sm" variant="outline" showColumnBorder>
                    <Table.Header bg="rgba(20, 136, 216, 0.5)" >
                        <Table.Row >
                            <Table.ColumnHeader color="rgba(3, 3, 145, 1)">ID</Table.ColumnHeader>
                            <Table.ColumnHeader color="rgba(3, 3, 145, 1)">Tên</Table.ColumnHeader>
                            <Table.ColumnHeader color="rgba(3, 3, 145, 1)">Thương hiệu</Table.ColumnHeader>
                            <Table.ColumnHeader color="rgba(3, 3, 145, 1)">Mẫu</Table.ColumnHeader>
                            <Table.ColumnHeader color="rgba(3, 3, 145, 1)">Tòa</Table.ColumnHeader>
                            <Table.ColumnHeader color="rgba(3, 3, 145, 1)">Phòng</Table.ColumnHeader>
                            <Table.ColumnHeader color="rgba(3, 3, 145, 1)">Trạng thái</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {currentPageData.map((item) => (
                        <Table.Row key={item.id}>
                            <Table.Cell>{item.id}</Table.Cell>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{item.brand}</Table.Cell>
                            <Table.Cell>{item.model}</Table.Cell>
                            <Table.Cell>{item.building}</Table.Cell>
                            <Table.Cell>{item.room}</Table.Cell>
                            <Table.Cell>{item.status}</Table.Cell>
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