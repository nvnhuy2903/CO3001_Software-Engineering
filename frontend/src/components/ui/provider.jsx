'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ColorModeProvider } from './color-mode';
import axios from 'axios';

// Tạo Context
const AuthContext = createContext();

// Hook để sử dụng AuthContext
export const useAuth = () => useContext(AuthContext);

// Provider Component
export function Provider({ children }) {
  const [authState, setAuthState] = useState(() => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    return { token: token || null, id: id || null };
  });

  // Cập nhật tiêu đề Authorization của axios khi token thay đổi
  useEffect(() => {
    if (authState.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${authState.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [authState.token]);

  // Hàm xử lý đăng nhập
  const login = async (username, password) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const response = await axios.post('/auth/check', formData);
    if (response.data.result.token) {
      const token = response.data.result.token;
      const id = response.data.result.id;

      localStorage.setItem('token', token);
      localStorage.setItem('id', id);

      // Cập nhật authState
      setAuthState({ token, id });
    } else {
      throw new Error('Đăng nhập thất bại');
    }
  };

  // Hàm xử lý đăng xuất
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    setAuthState({ token: null, id: null });
  };

  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider>
        <AuthContext.Provider value={{ authState, login, logout }}>
          {children}
        </AuthContext.Provider>
      </ColorModeProvider>
    </ChakraProvider>
  );
}