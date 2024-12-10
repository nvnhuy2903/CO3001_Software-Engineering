import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useAuth } from "./ui/provider";
import axios from "axios";
import { FaFilePdf, FaFileWord, FaFilePowerpoint, FaFileAlt, FaFileImage } from 'react-icons/fa';


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
  // dateGroup: {
  //   mb: 6,
  // },
  dateHeader: {
    position: "absolute",
    top: "-12px",
    left: "16px",
    background: "#030391",
    color: "white",
    fontFamily: "VT323",
    fontSize: "16px",
    borderRadius: "4px",
    padding: "0 8px", // Tạo khoảng cách hai bên
  },
};

// Helper function to determine status color
const getStatusColor = (type) => {
  switch(type) {
    case "buyPage":
      return "green";
    case "minusPage":
      return "red";
    default:
      return "gray";
  }
};

const getFileIcon = (fileType) => {
  switch (fileType) {
    case 'application/pdf':
      return <FaFilePdf color="red" />;
    case 'application/word':
    case 'application/document':
      return <FaFileWord color="blue" />;
    case 'application/pptx':
    case 'application/presentation':
      return <FaFilePowerpoint color="orange" />;
    case 'png':
        return <FaFileImage color="green" />;
    default:
      return <FaFileAlt color="gray" />;
  }
};

// Helper function to group items by date
const groupByDate = (items, dateKey) => {
  return items.reduce((groups, item) => {
    const date = new Date((item[dateKey])).toLocaleDateString('en-GB');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});
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
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`/student/getStudent/${authState.id}`, {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        });
        if (response.data.code === 1000) {
          setStudentData(response.data.result);
          setLoading(false);
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

    if (authState.token && authState.id) {
      fetchStudentData();
    } else {
      setError("Không tìm thấy token hoặc student ID.");
      setLoading(false);
      navigate("/login");
    }
  }, [authState.token, authState.id, navigate]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) { // Only allow positive numbers
      setAmount(value);
    }
  };

  const handleBuyPages = async () => {
    if (!amount || parseInt(amount) <= 0) {
      setError("Vui lòng nhập số lượng trang hợp lệ.");
      return;
    }

    try {
      const response = await axios.post(`/transactions/pluspage/${authState.id}`, { amount }, {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      });
      if (response.data.code === 1000) {
        // Update student data or show success message
        setStudentData(response.data.result);
        setAmount("");
      } else {
        setError("Không thể mua thêm trang.");
      }
    } catch (err) {
      console.error(err);
      setError("Đã xảy ra lỗi khi mua thêm trang.");
    }
  };

  if (loading) {
    return <></>;
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  if (!studentData || !studentData.account) {
    window.location.reload();
  }

  const transactions = studentData.account.transactions ;
  const printingRequests = studentData.printingRequests ;

  const groupedTransactions = groupByDate(transactions, 'date');
  const groupedPrintingRequests = groupByDate(printingRequests, 'createdAt');

  const sortedTransactionDates = Object.keys(groupedTransactions).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  const sortedPrintingDates = Object.keys(groupedPrintingRequests).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <MainLayout>
      {error && <Text color="red.500">{error}</Text>}
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
                  {studentData.pages} trang
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
                  {transactions
                    .filter(t => t.type === "buyPage")
                    .reduce((sum, t) => sum + t.amount, 0)} trang
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
                    value={amount}
                    onChange={handleInputChange}
                    style={{
                      width: "60px",
                      marginRight: "8px",
                      backgroundColor: "blue.50",
                      borderColor: "blue.300",
                      borderRadius: "6px",
                      paddingTop: "4px",
                      paddingBottom: "4px",
                      color: "#030391",
                      fontFamily: "VT323",
                      fontSize: "24px",
                      textAlign: "center",
                      height: "24px",
                    }}
                  />
                  <Button 
                    onClick={handleBuyPages}
                    disabled={!amount || parseInt(amount) <= 0}
                    style={{
                      color: "white",
                      fontFamily: "VT323",
                      backgroundColor: "#1488D8",
                      borderRadius: "24px",
                      paddingTop: "4px",
                      paddingBottom: "4px",
                      fontSize: "24px",
                      height: "24px",
                      marginTop: "-8px",
                      _hover: {
                        backgroundColor: "#126bb3",
                      },
                    }}
                  >
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
          <RightColumn
            groupedTransactions={groupedTransactions}
            sortedTransactionDates={sortedTransactionDates}
            groupedPrintingRequests={groupedPrintingRequests}
            sortedPrintingDates={sortedPrintingDates}
          />
        </Box>
      </Grid>
    </MainLayout>
  );
};

const RightColumn = ({
  groupedTransactions,
  sortedTransactionDates,
  groupedPrintingRequests,
  sortedPrintingDates,
}) => {
  const navigate = useNavigate();

  return (
    <Box>
      {/* Transaction History */}
      <Box {...styles.transactionHistoryContainer}>
        <Button
          {...styles.transactionButton}
          onClick={() => navigate("/transaction/logTrans")}
        >
          Xem lịch sử giao dịch
        </Button>
      </Box>

      <Box {...styles.scrollableContainer}>
        {sortedTransactionDates.map((date) => (
          <Box key={date} color="blue" border="2px solid #030391" borderRadius="8px" position="relative" mb={6}>
            {/* Date Header */}
            <Text {...styles.dateHeader}>Ngày {date}</Text>

            {/* Grouped Transactions */}
            <Box {...styles.groupContainer} p={3}>
              {groupedTransactions[date]
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((transaction) => (
                  <TransactionItem key={transaction.id} data={transaction} />
                ))}
            </Box>
          </Box>
        ))}
      </Box>


      {/* Print History */}
      <Box {...styles.transactionHistoryContainer}>
        <Button
          {...styles.transactionButton}
          onClick={() => navigate("/service/logPrinting")}
        >
          Xem lịch sử in
        </Button>
      </Box>

      <Box {...styles.scrollableContainer}>
        {sortedPrintingDates.map((date) => (
          <Box key={date} color="blue" border="2px solid #030391" borderRadius="8px" position="relative" mb={6}>
            {/* Date Header */}
            <Text {...styles.dateHeader}>Ngày {date}</Text>

            {/* Grouped Transactions */}
            <Box {...styles.groupContainer} p={3}>
              {groupedPrintingRequests[date]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((request) => (
                  <PrintItem key={request.id} data={request} />
                ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};



// Transaction Item Component
const TransactionItem = ({ data }) => (
  <Box
    pl={3}
    pr={3}
  >
    <Flex justifyContent="space-between" fontFamily="VT323" fontSize="26px" lineHeight="1.2">
      <Text color={getStatusColor(data.type)}>
      {data.type === "buyPage" ? `+${data.amount}` : data.type === "minusPage" ? `-${data.amount}` : "Unknown"} trang
      </Text>
      <Text color="#030391">Vào lúc</Text>
      {new Date(data.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </Flex>
    <Flex justifyContent="space-between" fontSize="22px" fontFamily="VT323" color="#666666" mt={-1}>
      <Text>Số trang dư:</Text>
      <Text textAlign="right">{data.balanceAfter} trang</Text>
    </Flex>
  </Box>
);


// Print Item Component
const PrintItem = ({ data }) => (
  <Box pl={3} pr={3}>
    <Flex justifyContent="space-between" alignItems="center" fontFamily="VT323" fontSize="26px" lineHeight="1.2">
      <Flex alignItems="center">
        {getFileIcon(data.fileType)}
        <Text color="#030391" ml={2}>
          {data.fileName}
        </Text>
      </Flex>
      <Text color="#030391">
        {new Date(data.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </Text>
    </Flex>
    <Flex justifyContent="space-between" fontSize="22px" fontFamily="VT323" color="#666666" mt={-1}>
      <Text>Trạng thái:</Text>
      <Text color="green">Thành công</Text>
    </Flex>
  </Box>
);


export default AccountBalance;