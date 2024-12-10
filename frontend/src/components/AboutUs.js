import React, { useState, useEffect } from 'react'
import SecondLayout from './SecondLayout'
import projectDescription from '../docs/ProjectSpecification.pdf'

import sanbong from '../components/slides/sanbong.jpeg'
import slbk from '../components/slides/slbk.jpg'
import slbktv from '../components/slides/slbktv.jpg'

const AboutUs = () => {
  // Array of images for the slideshow
  const slides = [sanbong, slbk, slbktv]
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }, 5000)

    // Cleanup interval on component unmount
    return () => clearInterval(slideInterval)
  }, [])

  return (
    <SecondLayout>
      <div
        style={{
          fontFamily: 'Coiny',
          padding: '30px',
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          boxShadow: '0 4px 8px',
          margin: '20px',
        }}
      >
        {/* Slideshow */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '300px',
            overflow: 'hidden',
            borderRadius: '8px',
          }}
        >
          <img
            src={slides[currentSlideIndex]}
            alt="Slideshow"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'opacity 1s ease-in-out',
            }}
          />
        </div>
        <h1
          style={{
            textAlign: 'center',
            fontSize: '48px',
            color: '#030391',
            marginTop: '20px',
          }}
        >
          Thông tin về hệ thống
        </h1>
        <div
          style={{
            marginTop: '30px',
            border: '2px solid #2c3e50',
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: ' rgba(20, 136, 216, 0.25)',
          }}
        >
          <div
            style={{
              marginBottom: '20px',
              padding: '15px',
              backgroundColor: '#ffffff',
              border: '2px solid #2c3e50',
              borderRadius: '5px',
            }}
          >
            <h2 style={{ fontSize: '32px', color: '#030391' }}>
              Hệ thống Dịch vụ In thông minh HCMUT (HCMUT_SSPS)
            </h2>
            <p
              style={{
                fontSize: '22px',
                fontWeight: 'lighter',
                color: '#000',
              }}
            >
              Hệ thống Dịch vụ In thông minh HCMUT (HCMUT_SSPS) được phát triển
              để phục vụ nhu cầu in ấn của sinh viên tại các cơ sở của Trường
              Đại học Bách Khoa TP.HCM (HCMUT). Với mục tiêu mang đến một trải
              nghiệm in ấn tiện lợi, hiệu quả và dễ dàng, hệ thống cho phép sinh
              viên in tài liệu ngay trên nền tảng web, từ bất kỳ đâu trong khuôn
              viên trường.
            </p>
            <p
              style={{
                marginTop: '20px',
                marginBottom: '20px',
                fontSize: '22px',
                fontWeight: 'lighter',
                color: '#000',
              }}
            >
              Mô tả dự án của chúng tôi:{' '}
              <a
                // href="../../public/docs/ProjectSpecification.pdf"
                href={projectDescription}
                download="MoTaDuAn_HCMUT_SSPS.pdf"
                style={{
                  color: '#1488d8',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Tải xuống mô tả dự án
              </a>
            </p>
          </div>

          <div
            style={{
              marginTop: '30px',
              padding: '15px',
              backgroundColor: '#ffffff',
              border: '2px solid #2c3e50',
              borderRadius: '5px',
            }}
          >
            <h3 style={{ fontSize: '32px', color: '#030391' }}>
              Web được phát triển bởi:
            </h3>
            <ul
              style={{
                paddingLeft: '20px',
                fontSize: '22px',
                color: '#000',
              }}
            >
              <li>Nguyễn Trương Thái Bảo – 2210251</li>
              <li>Nguyễn Truyền Tuấn – 2213795</li>
              <li>Nguyễn Tuấn Huy – 2211253</li>
              <li>Nguyễn Văn Nhật Huy – 2211254</li>
              <li>Phạm Bá Nhật Khang – 2211460</li>
            </ul>
          </div>
        </div>
      </div>
    </SecondLayout>
  )
}

export default AboutUs
