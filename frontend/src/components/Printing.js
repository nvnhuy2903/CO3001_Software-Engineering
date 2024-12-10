import React, { useState, useEffect } from 'react'
import MainLayout from './MainLayout'
import { FaSearch, FaUpload } from 'react-icons/fa'
import PrinterConfig from './PrinterConfig'
import './Printing.css'
import axios from 'axios'
import * as pdfjsLib from 'pdfjs-dist/webpack'

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`

const STUDENT_ID = localStorage.getItem('id')
const TOKEN = localStorage.getItem('token')
const PrintingRequestPage = () => {
  const [accountPages, setAccountBalancePages] = useState(0)
  useEffect(() => {
    const fetchAccountBalancePage = async () => {
      try {
        const response = await axios.get(`/student/getStudent/${STUDENT_ID}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            'Access-Control-Allow-Origin': '*',
          },
        })
        if (response.data.code === 1000) {
          setAccountBalancePages(parseInt(response.data.result.pages))
        }
      } catch (error) {
        console.error('Failed to fetch printing history:', error)
      }
    }

    fetchAccountBalancePage()
  }, [])

  const [printerId, setPrinterId] = useState('')

  const [uploadedFile, setUploadedFile] = useState(null)
  const [originalTotalPages, setOriginalTotalPages] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [buyPages, setBuyPages] = useState(0)
  const [amount, setAmount] = useState('')

  const [configuration, setConfiguration] = useState({
    color: true,
    layout: 'Portrait',
    copies: 1,
    range: 'all',
    customRange: '',
    evenOdd: 'all',
    reverse: false,
    paperSize: 'A4',
    pagesPerSheet: '1',
  })

  const [preview, setPreview] = useState(null)

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    const allowedTypes = [
      'application/pdf',
      'image/png',
      'image/jpeg',
      'application/msword',
    ]
    if (file && !allowedTypes.includes(file.type)) {
      alert(
        'Unsupported file type. Please upload a PDF, PNG, JPEG, or DOC file.'
      )
      return
    }
    setUploadedFile(file)
    setPreview(`Preview of ${file.name}`)
  }

  const calculateTotalPages = async (f) => {
    if (!f) return 0
    if (f.type === 'application/pdf') {
      try {
        const arrayBuffer = await f.arrayBuffer()
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
        return pdf.numPages
      } catch (error) {
        console.error('Error counting PDF pages:', error)
        return 0
      }
    }
    // For image fs (single page)
    if (f.type.startsWith('image/')) {
      return 1
    }
    return 0
  }

  const updateTotalPages = () => {
    let pages = originalTotalPages
    const { pagesPerSheet, range, customRange, evenOdd } = configuration

    // 1. Handle 'range' changes
    if (range === 'current') {
      pages = totalPages > 0 ? 1 : 0
    } else if (range === 'custom' && customRange) {
      const customPageCount = calculateCustomRangePages(
        customRange,
        originalTotalPages
      )
      pages = customPageCount
    }

    // 2. Handle 'pagesPerSheet' changes
    if (pages !== 0 && !isNaN(pages)) {
      pages = Math.ceil(pages / parseInt(pagesPerSheet))
    }

    // 3. Handle 'evenOdd' changes
    if (pages !== 0 && !isNaN(pages)) {
      if (evenOdd === 'even' || evenOdd === 'odd') {
        pages = Math.ceil(pages / parseInt(2))
      }
    }

    setTotalPages(pages)
  }

  const calculateCustomRangePages = (range, maxPages) => {
    if (!range) return 0
    const parts = range.split(',')
    let count = 0
    parts.forEach((part) => {
      const [start, end] = part.split('-').map(Number)
      if (end) {
        count += Math.max(0, Math.min(end, maxPages) - Math.max(1, start) + 1)
      } else if (start) {
        count += start <= maxPages ? 1 : 0
      }
    })
    return count
  }

  useEffect(() => {
    let isMounted = true // Flag to prevent state update after component unmount
    const fetchPageCount = async () => {
      const pages = await calculateTotalPages(uploadedFile)
      if (isMounted) {
        setOriginalTotalPages(pages)
        setTotalPages(pages)
      }
    }
    if (uploadedFile) fetchPageCount()
    return () => {
      isMounted = false
    }
  }, [uploadedFile])

  useEffect(() => {
    updateTotalPages()
  }, [configuration, originalTotalPages])

  const handleConfigurationChange = (key, value) => {
    setConfiguration((prev) => ({ ...prev, [key]: value }))
  }

  const handlePrinterSearch = () => {
    window.location.href = '/service'
  }

  const handleBuyPages = async () => {
    if (!amount || parseInt(amount) <= 0) {
      alert('Vui lòng nhập số lượng trang hợp lệ.')
      return
    }

    try {
      const response = await axios.post(
        `/transactions/pluspage/${STUDENT_ID}`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      )
      if (response.data.code === 1000) {
        // Update student data or show success message
        alert(`Mua thêm ${amount} trang thành công !`)
        setAmount('')
      } else {
        alert('Không thể mua thêm trang.')
      }
    } catch (err) {
      console.error(err)
      alert('Đã xảy ra lỗi khi mua thêm trang.')
    }
  }

  const handleSubmitRequest = async () => {
    // Send print request to SPSO management system
    if (!printerId || !uploadedFile) {
      alert('Please fill in all mandatory fields!')
      return
    }

    // Create FormData object for multipart/form-data request
    const formData = new FormData()
    formData.append('file', uploadedFile)
    formData.append('typePaper', configuration.paperSize || 'A4') // Default to A4
    formData.append('copies', configuration.copies || 1)
    formData.append('somat', totalPages || 1) // Total pages to be printed
    console.log(formData)
    try {
      const url = `/printingRequest/create/${STUDENT_ID}/${printerId}`

      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
        },
      })

      if (response.status === 200) {
        alert('Print Request Submitted Successfully!')
        // console.log('Response:', response.data)
      } else {
        alert('Failed to submit print request.')
        // console.error('Error Response:', response.data)
      }
    } catch (error) {
      alert('An error occurred while submitting the print request.')
      console.error('Error:', error)
    }
  }

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
          <div
            style={{
              margin: 'auto',
              height: '90%',
              overflow: 'auto',
              backgroundColor: 'rgba(25, 136, 216, 0.25)',
              width: '80%',
              border: '1px solid #030391',
              borderRadius: '10px',
            }}
          >
            <div className="formInput">
              <h1
                style={{
                  textAlign: 'center',
                  color: '#030391',
                  padding: '10px',
                  fontFamily: 'Coiny',
                  fontSize: '28px',
                }}
              >
                Tạo yêu cầu in
              </h1>
              <div className="inputPrinter">
                <label>Máy in:</label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <input
                    type="text"
                    value={printerId}
                    onChange={(e) => setPrinterId(e.target.value)}
                    placeholder="Nhập ID của máy in *"
                  />
                  <button onClick={handlePrinterSearch}>
                    <FaSearch />
                  </button>
                </div>
              </div>
              <div className="inputFile">
                <label>File:</label>
                <div>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    placeholder="Đăng tải file cần in *"
                  />
                  {uploadedFile && (
                    <p style={{ fontSize: '18px' }}>
                      Kích thước: {(uploadedFile.size / 1024).toFixed(2)} KB
                    </p>
                  )}
                </div>
              </div>
              <p
                style={{
                  color: '#030391',
                  marginTop: '10px',
                  fontSize: '18px',
                }}
              >
                (*) là các trường bắt buộc nhập thông tin
              </p>

              {/* Configuration Settings */}
              <div className="configuration" style={{ marginBottom: '40px' }}>
                <h2>Cấu hình in:</h2>
                <PrinterConfig
                  config={configuration}
                  onConfigChange={handleConfigurationChange}
                  totalPages={totalPages}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="rightSection"
          style={{
            width: '50%',
            display: 'flex',
            backgroundColor: 'rgba(25, 136, 216, 0.10)',
            fontFamily: 'VT323',
            fontSize: '18px',
          }}
        >
          <div
            style={{
              margin: 'auto',
              height: '90%',
              backgroundColor: 'rgba(25, 136, 216, 0.25)',
              width: '80%',
              border: '1px solid #030391',
              borderRadius: '10px',
              overflow: 'auto',
              margin: 'auto',
            }}
          >
            <div
              style={{
                margin: 'auto',
                width: '90%',
                display: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <h1
                style={{
                  textAlign: 'center',
                  color: '#030391',
                  padding: '10px',
                  fontFamily: 'Coiny',
                  fontSize: '28px',
                }}
              >
                Xem trước
              </h1>
              <div
                style={{
                  marginBottom: '20px',
                  height: '500px',
                  overflow: 'auto',
                }}
              >
                {preview ? (
                  <div style={{ height: '100%' }}>
                    {uploadedFile?.type.startsWith('image/') && (
                      <img
                        src={URL.createObjectURL(uploadedFile)}
                        alt="Preview"
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                      />
                    )}
                    {uploadedFile?.type === 'application/pdf' && (
                      <embed
                        src={URL.createObjectURL(uploadedFile)}
                        width="100%"
                        height="100%"
                      />
                    )}
                  </div>
                ) : (
                  <p
                    style={{
                      color: '#666',
                      fontSize: '32px',
                      textAlign: 'center',
                    }}
                  >
                    Chưa đăng tải file
                  </p>
                )}
              </div>
              <div className="submitPreview">
                <div>
                  <p style={{ color: '#030391' }}>
                    Tổng số trang: {totalPages}
                  </p>
                  <p style={{ color: '#030391' }}>
                    Số dư trang: {accountPages}
                  </p>
                </div>
                <div>
                  <p style={{ color: '#030391' }}> Mua thêm: </p>
                  <div>
                    <input
                      type="number"
                      min={
                        totalPages - accountPages > 0
                          ? totalPages - accountPages
                          : 0
                      }
                      value={amount}
                      onChange={(e) =>
                        setAmount(e.target.value < 0 ? 0 : e.target.value)
                      }
                      placeholder="0"
                      style={{
                        backgroundColor: '#fff',
                        color: '#030391',
                        padding: '4px',
                        width: '60px',
                        marginRight: '10px',
                        border: '1px solid #030391',
                        borderRadius: '32px',
                        textAlign: 'center',
                      }}
                    />
                    <button
                      onClick={() => handleBuyPages(amount)}
                      style={{
                        backgroundColor: '#1488d8',
                        color: 'white',
                        padding: '10px',
                        borderRadius: '32px',
                      }}
                    >
                      Mua
                    </button>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <button
                  onClick={handleSubmitRequest}
                  style={{
                    backgroundColor: '#1488d8',
                    color: 'white',
                    padding: '8px',
                    borderRadius: '32px',
                  }}
                >
                  Gửi yêu cầu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default PrintingRequestPage
