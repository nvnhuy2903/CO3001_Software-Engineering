// frontend/src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./ui/provider.jsx"; 
import {
    Box,
    VStack,
    Input,
    Text,
    Button,
    Stack,
    Grid,
  } from "@chakra-ui/react";
import SecondLayout from "./SecondLayout";

  
const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(credentials.username, credentials.password);
            navigate("/homepage");
        } catch (err) {
            setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
        }
    };

    return (
        <SecondLayout>
            <Grid templateColumns="repeat(2, 1fr)"  gap={6} height="100%">
            <Box
                display="flex"
                flexDirection="row"
                bg="white"
                height="100%"
                width="100%"
                alignItems={"center"}
                justifyContent={"center"}
                
            >
                {/* Logo và thông điệp */}
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    bg="white"
                    textAlign="center"
                >
                    <Box as="img" src="/logoHCMUT_trim.png" alt="BK Logo" height="200px"/>
                    <Text fontSize="48px" color="#1488D8" fontFamily={"VT323"}>
                        Dịch vụ in tài liệu thông minh
                    </Text>
                </Box>
            </Box>
            <Box>
                {/* Form đăng nhập */}
                <Box
                    bg="#1488D84D"
                    p={6}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height = "100%"
                >
                    <form style={{width: '100%', maxWidth: '400px', backgroundColor: 'white', padding: '40px', borderRadius: '18px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'}} onSubmit={handleSubmit}>
<                       VStack spacing={4} align="stretch"> 
                            {/* Email */}
                            <Box>
                                <Text  fontSize="l" color="#030391" mb={1} fontFamily={"Coiny"}>
                                    Email (@hcmut.edu.vn)
                                </Text>
                                <Input
                                    type="text"
                                    name="username"
                                    value={credentials.username}
                                    onChange={handleChange}
                                    placeholder="a.nguyenvan"
                                    bg="white"
                                    borderColor="blue.200"
                                    focusBorderColor="blue.400"
                                    color={"blue.800"}
                                    required
                                />
                            </Box>

                            {/* Mật khẩu */}
                            <Box>
                                <Text  fontSize="l" color="#030391" mb={1} fontFamily={"Coiny"}>
                                    Mật khẩu
                                </Text>
                                <Input
                                    type="password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    placeholder="Nhập mật khẩu"
                                    bg="white"
                                    borderColor="blue.200"
                                    focusBorderColor="blue.400"
                                    color={"blue.800"}
                                    required
                                />
                            </Box>

                            {/* Chọn vai trò */}
                            <Box pb="10px" pt="10px">
                                <Stack direction="row" spacing={4} align="center" style={{fontSize:"16px", color:"#030391", fontFamily:"Coiny"}}>
                                    <label>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            style={{ 
                                                marginRight: "8px", 
                                                transform: "scale(1.2)", // Tăng kích thước radio button
                                                cursor: "pointer" // Thêm con trỏ để tương tác tốt hơn
                                            }}
                                            defaultChecked
                                        />
                                        Sinh viên
                                    </label>
                                    <label >
                                        <input
                                            type="radio"
                                            name="role"
                                            value="admin"
                                            style={{ 
                                                marginRight: "8px", 
                                                transform: "scale(1.2)", // Tăng kích thước radio button
                                                cursor: "pointer" // Thêm con trỏ để tương tác tốt hơn
                                            }}
                                        />
                                        Quản trị viên
                                    </label>
                                </Stack>
                            </Box>

                            {/* Thông báo lỗi */}
                            {error && (
                                <Text fontSize="sm" color="red.500" textAlign="center">
                                    {error}
                                </Text>
                            )}

                            {/* Nút đăng nhập */}
                            <Button type="submit" background={"#1488D8"} width="full" borderRadius='18px' onClick={handleSubmit}>
                                <Text fontSize="l" color="white" fontFamily={"Coiny"}>Đăng nhập</Text>
                            </Button>
                        </VStack>
                    </form>
                </Box>
            </Box>
            </Grid>
        </SecondLayout>
    );
};

export default Login;