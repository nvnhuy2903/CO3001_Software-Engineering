import React from 'react'
import MainLayout from './MainLayout'
import { FaPrint } from 'react-icons/fa'

const Printing = () => {
  return (
    <MainLayout>
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignContent: 'center',
        }}
      >
        <div
          class="leftSection"
          style={{
            width: '50%',
            display: 'flex',
          }}
        >
          {' '}
          <div
            style={{
              margin: 'auto',
              height: '90%',
              backgroundColor: 'rgba(25, 136, 216, 0.25)',
              width: '80%',
              fontFamily: 'Coiny',
              fontSize: '28px',
              border: '1px solid #030391',
              borderRadius: '10px',
            }}
          >
            <h1
              style={{ textAlign: 'center', color: '#030391', padding: '10px' }}
            >
              Tạo yêu cầu in
            </h1>
          </div>
        </div>
        <div
          class="rightSection"
          style={{
            width: '50%',
            display: 'flex',
            backgroundColor: 'rgba(25, 136, 216, 0.10)',
          }}
        >
          <div
            style={{
              margin: 'auto',
              height: '90%',
              backgroundColor: 'rgba(25, 136, 216, 0.25)',
              width: '80%',
              fontFamily: 'Coiny',
              fontSize: '28px',
              border: '1px solid #030391',
              borderRadius: '10px',
            }}
          >
            <h1
              style={{ textAlign: 'center', color: '#030391', padding: '10px' }}
            >
              Xem trước
            </h1>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Printing
