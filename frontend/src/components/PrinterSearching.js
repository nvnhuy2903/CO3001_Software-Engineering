import { React, useState, useEffect } from 'react'
import axios from 'axios'
import MainLayout from './MainLayout'
import {
  HStack,
  Heading,
  Stack,
  Table,
  Input,
  Button,
  Icon,
} from '@chakra-ui/react'
import { InputGroup } from './ui/input-group'
import { Link } from 'react-router-dom'

import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from './ui/pagination'
import { IoIosSearch } from 'react-icons/io'
import { HiMiniMapPin } from 'react-icons/hi2'

const PrinterSearching = () => {
  // --------------------------------------Sample Data------------------------------------------------------------
  const [printerData, setPrinterData] = useState([])
  const [filteredData, setfilteredData] = useState(printerData)
  // --------------------------------------End Sample Data------------------------------------------------------------

  // -------------------------------------- Fetch Data----------------------------------------------------------------
  const TOKEN = localStorage.getItem('token')
  useEffect(() => {
    const fetchPrintingHistory = async () => {
      try {
        const response = await axios.get(`/printers/getAll`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            'Access-Control-Allow-Origin': '*',
          },
        })
        if (response.data.code === 1000) {
          const transformedPrinters = response.data.result.map((printer) => {
            return {
              id: printer.id,
              name: `${printer.brand} ${printer.model}`, // You can adjust this as per your requirements
              brand: printer.brand,
              model: printer.model,
              building: printer.location.building, // Extracting building from location
              room: printer.location.room, // Extracting room from location
              status: printer.isAvailable ? 'Hoạt động' : 'Không hoạt động', // Using the availability status to set "Hoạt động" or "Không hoạt động"
            }
          })
          console.log('successfull fetching')
          setPrinterData(transformedPrinters)
          setfilteredData(transformedPrinters)
        }
      } catch (error) {
        console.error('Failed to fetch printing history:', error)
      }
    }

    fetchPrintingHistory()
  }, [])
  // -------------------------------------- End Fetch Data----------------------------------------------------------------

  //---------------------------------------- Handle Search ----------------------------------------------
  const [searchName, setSearchName] = useState('')
  const [searchBuilding, setsearchBuilding] = useState('All')
  const [searchStatus, setSearchStatus] = useState('All')

  const handleSearch = () => {
    const filteredResult = printerData.filter((row) => {
      const checkName =
        row.name.toLowerCase().includes(searchName.toLowerCase()) ||
        searchName === ''

      const checkBuilding =
        row.building.toLowerCase().includes(searchBuilding.toLowerCase()) ||
        searchBuilding === '' ||
        searchBuilding === 'All'

      const checkStatus =
        row.status.toLowerCase().includes(searchStatus.toLowerCase()) ||
        searchStatus === '' ||
        searchStatus === 'All'

      return checkName && checkBuilding && checkStatus
    })
    setfilteredData(filteredResult)
  }
  //---------------------------------------- End Handle Search ----------------------------------------------

  //---------------------------------------- Handle Pagination ----------------------------------------------
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10 // Number of printers per page
  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  // Slice the printer data to show only the items for the current page
  const currentPageData = filteredData.slice(startIndex, endIndex)
  // Handle page change (next and previous)
  const handleNextPage = () => {
    if (currentPage * pageSize < printerData.length) {
      setCurrentPage(currentPage + 1)
    }
  }
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  //---------------------------------------- End Handle Pagination ----------------------------------------------

  return (
    <MainLayout section="Service">
      <Stack
        width="Full"
        gap="5"
        color="rgba(3, 3, 145, 1)"
        fontFamily="VT323"
        mx={20}
      >
        <HStack mt="25px" justify="center" align="center">
          <Heading
            textAlign="center"
            size="xl"
            fontFamily="Coiny"
            color="rgba(20, 136, 216, 1)"
            fontSize="2xl"
          >
            Tìm kiếm máy in phù hợp tại đây
          </Heading>
          <Icon fontSize="2xl" color="rgba(20, 136, 216, 1)" pb="4px">
            <HiMiniMapPin />
          </Icon>
        </HStack>
        <HStack spacing={4} mb={4} fontSize="2xl">
          <InputGroup flex="1" startElement={<IoIosSearch />}>
            <Input
              placeholder="Tìm kiếm tên máy in"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              borderRadius="30px"
              borderColor="rgba(20, 136, 216, 1)"
              borderWidth="2px"
              fontSize="xl"
            />
          </InputGroup>
          <select
            placeholder="Tòa"
            style={{
              backgroundColor: 'rgba(20, 136, 216, 1)',
              color: 'white',
              height: '40px',
              borderRadius: '13px',
              width: '85px',
              textAlign: 'center',
            }}
            onChange={(e) => setsearchBuilding(e.target.value)}
          >
            <option value="All">All</option>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="A3">A3</option>
            <option value="A4">A4</option>
            <option value="A5">A5</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="B3">B3</option>
            <option value="B4">B4</option>
            <option value="B5">B5</option>
            <option value="B6">B6</option>
            <option value="B7">B7</option>
            <option value="B8">B8</option>
            <option value="B9">B9</option>
            <option value="B10">B10</option>
            <option value="C1">C1</option>
            <option value="C2">C2</option>
            <option value="C3">C3</option>
            <option value="C4">C4</option>
            <option value="C5">C5</option>
            <option value="C6">C6</option>
            <option value="H1">H1</option>
            <option value="H2">H2</option>
            <option value="H3">H3</option>
            <option value="H6">H6</option>
          </select>

          <select
            placeholder="Trạng thái"
            style={{
              backgroundColor: 'rgba(20, 136, 216, 1)',
              color: 'white',
              height: '40px',
              borderRadius: '13px',
              textAlign: 'center',
            }}
            onChange={(e) => setSearchStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Hoạt động">Hoạt động</option>
            <option value="Ngừng">Ngừng</option>
          </select>

          <Button
            onClick={handleSearch}
            bg="rgba(20, 136, 216, 1)"
            color="white"
            borderRadius="13px"
            fontSize="2xl"
          >
            Search
          </Button>
        </HStack>
        <Table.Root size="sm" variant="outline" showColumnBorder>
          <Table.Header bg="rgba(20, 136, 216, 0.5)" fontSize="2xl">
            <Table.Row>
              <Table.ColumnHeader color="rgba(3, 3, 145, 1)" padding="4">
                ID
              </Table.ColumnHeader>
              <Table.ColumnHeader color="rgba(3, 3, 145, 1)">
                Tên
              </Table.ColumnHeader>
              <Table.ColumnHeader color="rgba(3, 3, 145, 1)">
                Thương hiệu
              </Table.ColumnHeader>
              <Table.ColumnHeader color="rgba(3, 3, 145, 1)">
                Mẫu
              </Table.ColumnHeader>
              <Table.ColumnHeader color="rgba(3, 3, 145, 1)">
                Tòa
              </Table.ColumnHeader>
              <Table.ColumnHeader color="rgba(3, 3, 145, 1)">
                Phòng
              </Table.ColumnHeader>
              <Table.ColumnHeader color="rgba(3, 3, 145, 1)">
                Trạng thái
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {currentPageData.map((item) => (
              <Table.Row
                key={item.id}
                fontSize="2xl"
                _hover={{ bg: 'rgba(20, 136, 216, 0.5)', color: 'white' }}
                cursor="pointer"
              >
                <Table.Cell>{item.id}</Table.Cell>
                <Table.Cell>
                  <Link to={`/print?printerId=${item.id}`}>{item.name}</Link>
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/print?printerId=${item.id}`}>{item.brand}</Link>
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/print?printerId=${item.id}`}>{item.model}</Link>
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/print?printerId=${item.id}`}>
                    {item.building}
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/print?printerId=${item.id}`}>{item.room}</Link>
                </Table.Cell>
                <Table.Cell
                  color={item.status === 'Ngừng' ? 'red.500' : 'green.500'}
                >
                  <Link to={`/print?printerId=${item.id}`}>{item.status}</Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        <PaginationRoot
          count={printerData.length}
          pageSize={pageSize}
          page={currentPage}
        >
          <HStack wrap="wrap">
            <PaginationPrevTrigger
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              color="rgba(3, 3, 145, 1)"
            />
            <PaginationItems color="rgba(3, 3, 145, 1)" fontSize="xl" />
            <PaginationNextTrigger
              onClick={handleNextPage}
              disabled={currentPage * pageSize >= printerData.length}
              color="rgba(3, 3, 145, 1)"
            />
          </HStack>
        </PaginationRoot>
      </Stack>
    </MainLayout>
  )
}

export default PrinterSearching
