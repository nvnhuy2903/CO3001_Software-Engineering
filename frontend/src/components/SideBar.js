import React from 'react'
import { Link } from 'react-router-dom'
import { Heading, Icon, Stack, VStack, Text } from '@chakra-ui/react'
import '../App.css';
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from './ui/accordion'
import { FiPrinter } from 'react-icons/fi'
import { VscAccount } from 'react-icons/vsc'
import { LuCreditCard } from 'react-icons/lu'

const SideBar = (props) => {
  return (
    <Stack
      width="full"
      maxW="250px"
      bg="rgba(20, 136, 216, 0.25)"
      fontFamily="VT323"
      fontSize="16px"
      height="100%"
    >
      <AccordionRoot
        multiple
        defaultValue={[/* props.section */ 'Account', 'Service', 'Transaction']}
      >
        <AccordionItem key={1} value="Account">
          <AccordionItemTrigger bg="#030391" borderRadius="0" px={8}>
            <Icon fontSize="2xl">
              <VscAccount />
            </Icon>
            <Heading size="2xl" fontFamily="VT323">
              Tài khoản
            </Heading>
          </AccordionItemTrigger>
          <AccordionItemContent color="#030391">
            <VStack>
              <Link to="/homepage" className="nav-item hover-sideBar">
                Thông tin
              </Link>
              <Link to="/homepage/report" className="nav-item hover-sideBar">
                Báo cáo
              </Link>
              <Link to="/homepage/logout" className="nav-item hover-sideBar">
                Đăng xuất
              </Link>
            </VStack>
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem key={2} value="Service">
          <AccordionItemTrigger bg="#030391" borderRadius="0" px={8}>
            <Icon fontSize="2xl">
              <FiPrinter />
            </Icon>
            <Heading size="2xl" fontFamily="VT323">
              Dịch vụ
            </Heading>
          </AccordionItemTrigger>
          <AccordionItemContent color="#030391">
            <VStack>
              <Link to="/service" className="nav-item hover-sideBar">
                Tìm kiếm máy
              </Link>
              <Link to="/print" className="nav-item hover-sideBar">
                Yêu cầu in
              </Link>
              <Link to="/service/logPrinting" className="nav-item hover-sideBar">
                Lịch sử in
              </Link>
            </VStack>
          </AccordionItemContent>
        </AccordionItem>
        <AccordionItem key={3} value="Transaction">
          <AccordionItemTrigger bg="#030391" borderRadius="0" px={8}>
            <Icon fontSize="2xl">
              <LuCreditCard />
            </Icon>
            <Heading size="2xl" fontFamily="VT323">
              Giao dịch
            </Heading>
          </AccordionItemTrigger>
          <AccordionItemContent color="#030391">
            <VStack>
              <Link to="/transaction" className="nav-item hover-sideBar">
                Số dư tài khoản
              </Link>
              <Link to="/transaction/logTrans" className="nav-item hover-sideBar">
                Lịch sử mua
              </Link>
            </VStack>
          </AccordionItemContent>
        </AccordionItem>
      </AccordionRoot>
    </Stack>
  )
}

export default SideBar