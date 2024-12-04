import React from 'react'
import MainLayout from './MainLayout'
import { FaPrint } from 'react-icons/fa'
const LogPrinting = () => {
  return (
    <MainLayout>
      <div>
        <div
          class="Title"
          style={{
            color: '#1488D8',
            fontSize: '24px',
            fontFamily: 'coiny',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            margin: 'auto',
            marginTop: '10px',
            marginBottom: '10px',
          }}
        >
          <h1>Chi tiết về lịch sử in của bạn</h1>
          <FaPrint
            style={{
              marginLeft: '10px',
            }}
          />
        </div>
      </div>
    </MainLayout>
  )
}

export default LogPrinting
