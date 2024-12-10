import React from 'react'
import MainLayout from './MainLayout'

const Report = () => {
  return (
    <MainLayout>
      <div
        style={{
          width: '100%',
          height: '100%',
          color: '#030391',
          margin: 'auto',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          fontFamily: 'VT323',
          fontSize: '28px',
        }}
      >
        <h1
          style={{ fontFamily: 'Coiny', fontSize: '50px', marginTop: '50px' }}
        >
          Báo cáo sự cố
        </h1>
        <p>
          Tính năng báo cáo sự cố đang trong giao đoạn phát triển và sẽ sớm hoàn
          thiện
        </p>
      </div>
    </MainLayout>
  )
}

export default Report
