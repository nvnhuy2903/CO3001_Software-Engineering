import React from "react";
import { 
  Box, 
  Flex, 
  Text, 
  Button, 
  Input, 
  Grid, 
  Image 
} from "@chakra-ui/react";
import MainLayout from "./MainLayout";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./ui/provider";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


// Define all styles in a separate object
const styles = {
  container: {
    bg: "#1488D81A",
    minHeight: "100vh",
    p: 4,
  },
  leftColumnBox: {
    bg: "white",
    p: 5,
  },
  userInfoFlex: {
    direction: "row",
    alignItems: "center",
    justifyContent: "left",
    mb: 1,
    pl: 5,
    pr: 5,
  },
  avatarBox: {
    bg: "gray.200",
    borderRadius: "full",
    width: "80px",
    height: "80px",
    mr: 4,
    overflow: "hidden",
  },
  userName: {
    fontWeight: "bold",
    fontSize: "28px",
    color: "#030391",
    fontFamily: "VT323",
    mb: 1,
  },
  userId: {
    fontSize: "28px",
    color: "#030391",
    fontFamily: "VT323",
  },
  infoBox: {
    pl: 5,
    pr: 5,
  },
  infoRow: {
    justifyContent: "space-between",
    alignItems: "center",
    mb: 0,
  },
  infoText: {
    color: "#030391",
    fontFamily: "VT323",
    fontSize: "24px",
  },
  selectStyle: {
    appearance: "none",
    border: "1px solid #030391",
    borderRadius: "12px",
    backgroundColor: "lightblue",
    cursor: "pointer",
    width: "180px",
    height: "24px",
    color: "#030391",
    fontFamily: "VT323",
    fontSize: "24px",
    paddingLeft: "10px",
    lineHeight: "24px",
    backgroundImage:
      "url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2710%27 height=%277%27 viewBox=%270 0 10 7%27%3E%3Cpath fill=%27%23030391%27 d=%27M0 0l5 7 5-7z%27/%3E%3C/svg%3E')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px center",
    backgroundSize: "10px",
    boxSizing: "border-box",
  },
  inputStyle: {
    width: "60px",
    mr: 2,
    bg: "blue.50",
    borderColor: "blue.300",
    borderRadius: "md",
    pt: 1,
    pb: 1,
    color: "#030391",
    fontFamily: "VT323",
    fontSize: "24px",
    textAlign: "center",
    height: "24px",
  },
  buyButton: {
    color: "white",
    fontFamily: "VT323",
    backgroundColor: "#1488D8",
    borderRadius: "2xl",
    pt: 1,
    pb: 1,
    fontSize: "24px",
    height: "24px",
    mt: -2,
    _hover: {
      backgroundColor: "#126bb3",
    },
  },
  statisticsBox: {
    pl: 5,
    pr: 5,
    border: "3px solid #030391",
    borderRadius: "md",
    width: "100%",
    mt: 0,
    p: 2,
  },
  statisticsHeader: {
    justifyContent: "space-between",
    alignItems: "center",
    mb: 0,
  },
  chartContainer: {
    width: "100%",
    height: "200px",
  },
  rightColumnBox: {
    pl: 5,
    pr: 5,
    pt: 0,
  },
  transactionHistoryBox: {
    bg: "white",
    pb: 0,
    mb: 4,
    borderRadius: "md",
    boxShadow: "md",
  },
  transactionText: {
    color: "#030391",
    fontFamily: "VT323",
    fontSize: "sm",
  },
  transactionSubText: {
    fontSize: "xs",
    color: "#030391",
    fontFamily: "VT323",
  },
  printHistoryBox: {
    bg: "white", 
    p: 4,
    borderRadius: "md",
    boxShadow: "md",
  },
  printHistoryButton: {
    width: "full",
    colorScheme: "blue",
    mb: 4,
    color: "#030391",
    fontFamily: "VT323",
    _hover: {
      bg: "blue.600",
    },
  },
  printHistoryText: {
    fontSize: "sm",
    color: "#030391",
    fontFamily: "VT323",
  },
  printHistorySubText: {
    fontSize: "xs",
    color: "#030391",
    fontFamily: "VT323",
  },
  transactionHistoryContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bg: "#1488D880",
    mt: 3,
    pl: 20,
    pr: 20,
    pt: 1,
    pb: 1,
    width: "80%",
    mx: "auto",
    borderRadius: "12px",
  },
  transactionButton: {
    bg: "white",
    color: "#030391",
    border: "2px solid #030391",
    borderRadius: "24px",
    fontFamily: "VT323",
    fontSize: "24px",
    padding: "0 15px",
    height: "auto",
    lineHeight: "1.5",
    _hover: { bg: "#f0f0f0" },
    _active: { bg: "#e0e0e0" },
    boxShadow: "md",
  },
  scrollableContainer: {
    height: "33vh", 
    overflowY: "auto", // Cuộn theo chiều dọc
    bg: "white",
    border: "2px solid #030391",
    borderRadius: "8px",
    p: 4,
    mb: 6,
    width: "80%",
    margin: "0 auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
};

const AccountBalance = () => {
  // Chart data
  const chartData = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    datasets: [
      {
        label: "Số lần mua trang in",
        data: [20, 30, 25, 35, 40, 15, 10, 30, 25, 20, 0, 0],
        backgroundColor: "#1488D8",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        labels: {
          font: {
            size: 18,
            family: "VT323",
            color: "#030391",
          },
        },
      },
      tooltip: {
        titleFont: {
          size: 18,
          family: "VT323",
          color: "#030391",
        },
        bodyFont: {
          size: 18,
          family: "VT323",
          color: "#030391",
        },
      },
    },
    scales: {
      x: {
        ticks: { 
          color: "blue",
          font: {
            size: 18,
            family: "VT323",
          },
        },
        grid: { display: false },
        barPercentage: 1.0,
        categoryPercentage: 1.0,
      },
      y: {
        ticks: { 
          color: "blue",
          font: {
            size: 18,
            family: "VT323",
          },
        },
        grid: { borderColor: "blue" },
      },
    },
  };

    const navigate = useNavigate();
    const { authState } = useAuth();
    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await axios.get(`/student/getStudent/${authState.id}`);
                console.log("response", response); // Debug
                if (response.data.code === 1000) {
                    setStudentData(response.data.result);
                } else {
                    setError("Không thể lấy thông tin sinh viên.");
                }
            } catch (err) {
                console.error(err);
                setError("Đã xảy ra lỗi khi lấy dữ liệu.");
            } finally {
                setLoading(false);
            }
        };

        if (authState.id) {
            fetchStudentData();
        } else {
            setError("Không tìm thấy student ID.");
            setLoading(false);
            navigate("/login");
        }
    }, [authState.id, navigate]);

    if (loading) {
        return <Text>Đang tải...</Text>;
    }

    if (error) {
        return <Text color="red.500">{error}</Text>;
    }

  return (
    <MainLayout>
      <Grid templateColumns="repeat(2, 1fr)" bg={styles.container.bg} gap={6}>
        {/* Left Column */}
        <Box {...styles.leftColumnBox}>
          <Flex {...styles.userInfoFlex}>
            <Box {...styles.avatarBox}>
              <Image
                src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg" 
                alt="User Avatar"
                borderRadius="full"
                width="80px"
                height="80px"
              />              
            </Box>
            <Flex direction="column">
              <Text {...styles.userName}>
                {studentData.fullname}
              </Text>
              <Text {...styles.userId}>
                {studentData.mssv}
              </Text>
            </Flex>
          </Flex>

          <Box {...styles.infoBox}>
            <Flex direction="column">
              {/* Học kì: */}
              <Flex {...styles.infoRow}>
                <Text {...styles.infoText}>
                  Học kì:
                </Text>
                <select style={styles.selectStyle}>
                  <option value="241">241</option>
                  <option value="232">232</option>
                  <option value="231">231</option>
                  <option value="222">222</option>
                </select>
              </Flex>

              {/* Số trang hiện có */}
              <Flex {...styles.infoRow}>
                <Text {...styles.infoText}>
                  Số trang hiện có:
                </Text>
                <Text {...styles.infoText}>
                  42 trang
                </Text>
              </Flex>

              {/* Số trang mặc định */}
              <Flex {...styles.infoRow}>
                <Text {...styles.infoText}>
                  Số trang mặc định:
                </Text>
                <Text {...styles.infoText}>
                  0/32 trang
                </Text>
              </Flex>

              {/* Số trang đã mua */}
              <Flex {...styles.infoRow}>
                <Text {...styles.infoText}>
                  Số trang đã mua:
                </Text>
                <Text {...styles.infoText}>
                  50 trang
                </Text>
              </Flex>

              {/* Giá hiện tại */}
              <Flex {...styles.infoRow}>
                <Text {...styles.infoText}>
                  Giá hiện tại:
                </Text>
                <Box border="1px solid #030391" borderRadius="md" pr="5px" pl="5px" lineHeight={"24px"}>
                  <Text {...styles.infoText}>
                    150đ/trang
                  </Text>
                </Box>
              </Flex>

              {/* Mua thêm */}
              <Flex {...styles.infoRow}>
                <Text {...styles.infoText}>
                  Mua thêm:
                </Text>
                <Box>
                  <Input
                    placeholder="5"
                    {...styles.inputStyle}
                  />
                  <Button {...styles.buyButton}>
                    Mua
                  </Button>
                </Box>
              </Flex>

              {/* Thống kê số lần mua trang in */}
              <Box {...styles.statisticsBox}>
                <Flex {...styles.statisticsHeader}>
                  <Text {...styles.infoText}>
                    Thống kê số lần mua trang in:
                  </Text>
                </Flex>
                <Box {...styles.chartContainer}>
                  <Bar data={chartData} options={chartOptions} />
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>

        {/* Right Column */}
        <Box {...styles.rightColumnBox}>
          <RightColumn />
        </Box>
      </Grid>
    </MainLayout>
  );
};



const RightColumn = () => {
  const navigate = useNavigate();
  return (
    <Box>
      {/* Transaction History */}
        <Box {...styles.transactionHistoryContainer}>
          {/* Inner white button */}
          <Button {...styles.transactionButton} onClick={() => navigate("/transaction/logTrans")}>
            Xem lịch sử giao dịch
          </Button>
        </Box>

        <Box {...styles.scrollableContainer}>
          <TransactionItem
            date="07/10/2024"
            transactions={[
              { pages: "+50", time: "10:32:45", remaining: "64" },
              { pages: "-30", time: "10:20:32", remaining: "14" },
              { pages: "+10", time: "07:57:13", remaining: "24" },
              { pages: "-56", time: "07:33:21", remaining: "34" },
            ]}
          />
          <TransactionItem
            date="06/10/2024"
            transactions={[
              { pages: "-25", time: "16:11:56", remaining: "90" },
            ]}
          />
        </Box>

      <Box>
      {/* Transaction History */}
      <Box {...styles.transactionHistoryContainer} onClick={() => navigate("/service/logPrinting")}>
        {/* Inner white button */}
        <Button {...styles.transactionButton}>
          Xem lịch sử in
        </Button>
      </Box>
    </Box>

      {/* Print History */}
      <Box {...styles.scrollableContainer}>
        <PrintItem
          date="07/10/2024" 
          prints={[
            { icon: "W", name: "filename.docx", time: "15:20:34", status: "Đang xử lý", statusColor: "orange" },
            { icon: "PDF", name: "filename.docx", time: "13:56:28", status: "Thành công", statusColor: "green" },
            { icon: "PDF", name: "filename.docx", time: "10:45:07", status: "Thất bại", statusColor: "red" },
            { icon: "X", name: "filename.xlsx", time: "07:32:46", status: "Thành công", statusColor: "green" },
          ]}
        />
        <PrintItem
          date="06/10/2024"
          prints={[
            { icon: "PPT", name: "filename.docx", time: "16:49:32", status: "Thành công", statusColor: "green" },
          ]}
        />
      </Box>

    </Box>
  );
};

// Transaction Item Component
const TransactionItem = ({ date, transactions }) => (
  <Box
    position="relative" // Bật chế độ định vị tương đối
    border="1px solid #030391"
    borderRadius="8px"
    p={3}
    mb={4}
    bg="#F5F9FF"
  >
    {/* Date Header */}
    <Box
      position="absolute" // Đặt tiêu đề chồng lên viền
      top="-12px"
      left="16px"
      bg="#030391"
      color="white"
      fontFamily="VT323"
      fontSize="16px"
      //p="2px 8px"
      borderRadius="4px"
    >
      Ngày {date}
    </Box>

    {/* Transactions */}
    {transactions.map((transaction, index) => (
      <Box
        key={index}
        borderBottom={index < transactions.length - 1 ? "1px dashed #030391" : "none"}
        pb={0} 
        mt={0.} 
      >
        <Flex justifyContent="space-between" fontFamily="VT323" fontSize="28px" lineHeight="1.2">
          <Text color={transaction.pages.startsWith("+") ? "green" : "red"}>
            {transaction.pages} trang
          </Text>
          <Text color="#030391">vào lúc</Text>
          <Text color="#030391">{transaction.time}</Text>
        </Flex>
        <Flex justifyContent="space-between" fontSize="22px" fontFamily="VT323" color="#666666" mt={-1}>
          <Text>Số trang dư:</Text>
          <Text textAlign="right">{transaction.remaining}</Text>
        </Flex>
      </Box>
    ))}

  </Box>
);




const PrintItem = ({ date, prints }) => (
  <Box
    position="relative" // Định vị tương đối để thêm tiêu đề
    border="1px solid #030391"
    borderRadius="8px"
    p={3}
    mb={4}
    bg="#EAF6FF"
  >
    {/* Date Header */}
    <Box
      position="absolute" // Đặt tiêu đề chồng lên viền
      top="-12px"
      left="16px"
      bg="#030391"
      color="white"
      fontFamily="VT323"
      fontSize="16px"
      borderRadius="4px"
    >
      Ngày {date}
    </Box>

    {/* Prints */}
    {prints.map((print, index) => (
      <Box
        key={index}
        borderBottom={index < prints.length - 1 ? "1px dashed #030391" : "none"}
        // pb={2}
        // mt={2}
      >
        <Flex justifyContent="space-between" fontFamily="VT323" fontSize="28px" lineHeight="1.2">
          <Text color="#030391">
            <span style={{ fontWeight: "bold" }}>{print.icon}</span> {print.name}
          </Text>
          <Text color="#030391">{print.time}</Text>
        </Flex>
        <Flex justifyContent="space-between" fontSize="22px" fontFamily="VT323" color="#666666" mt={-1}>
          <Text>Trạng thái:</Text>
          <Text color={print.statusColor} textAlign="right">
            {print.status}
          </Text>
        </Flex>
      </Box>
    ))}
  </Box>
);



export default AccountBalance;