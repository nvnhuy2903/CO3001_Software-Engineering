import React from 'react'
import { Text, Box } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="7vh"
      bg="#1488D8"
      fontFamily="Coiny"
    >
      <Text textAlign="center" fontSize="2xl">
        Sản phẩm thuộc về nhóm TN01 - 06
      </Text>
    </Box>
  )
}

export default Footer
