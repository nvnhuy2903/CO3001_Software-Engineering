import React, { useState, useMemo, useEffect } from 'react'
import axios from 'axios'
import MainLayout from './MainLayout'
import { FaPrint } from 'react-icons/fa'
import { Pie } from 'react-chartjs-2'
import 'chart.js/auto' // Required for Chart.js
import { FaSearch } from 'react-icons/fa'
import { FaSort } from 'react-icons/fa6'
import { FaSortUp } from 'react-icons/fa6'
import { FaSortDown } from 'react-icons/fa6'
import { FaFilePdf, FaFileImage } from 'react-icons/fa'
import { IoIosDocument } from 'react-icons/io'
import './LogPrinting.css'

var mockData = {
  printingHistory: [],
  printingStats: {
    successfulPrints: 0,
    totalPages: 0,
    lastPrintTime: '2000-00-00T00:00:00',
    fileTypeBreakdown: {
      doc: 0,
      pdf: 0,
      img: 0,
    },
  },
}

const BASE_URL = ''
const STUDENT_ID = localStorage.getItem('id')
const TOKEN = localStorage.getItem('token')

const LogPrinting = () => {
  const [history, setHistory] = useState(mockData.printingHistory)
  const [statistics, setStats] = useState(mockData.printingStats)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState('startTime')
  const [sortDirection, setSortDirection] = useState('desc')
  const [filterMonth, setFilterMonth] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const rowsPerPage = 10

  useEffect(() => {
    const fetchPrintingHistory = async () => {
      try {
        const response = await axios.get(
          `/student/getallrequest/${STUDENT_ID}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              'Access-Control-Allow-Origin': '*',
            },
          }
        )
        if (response.data.code === 1000) {
          mockData['printingHistory'] = response.data.result
          var updatedHistory = response.data.result.map((row) => {
            let createdAtDate = new Date(row.createdAt) // Parse createdAt to Date object
            row.startTime = createdAtDate.toLocaleString()

            row.updateAtDate = new Date(createdAtDate.getTime() + 30000) // Add 30 seconds

            // Compare endTime with the current time
            if (row.updateAtDate < new Date()) {
              row.status = 'Thành công'
              row.endTime = row.updateAtDate.toLocaleString()
              mockData.printingStats.successfulPrints += 1
              mockData.printingStats.totalPages +=
                row.copies *
                row.pages *
                (row.typePaper == 'A4' ? 1 : row.typePaper == 'A3' ? 2 : 3)
              // File extension checks using includes()
              if (
                row.fileName.includes('.docx') ||
                row.fileName.includes('.doc')
              ) {
                mockData.printingStats.fileTypeBreakdown['doc'] += 1
              } else if (row.fileName.includes('.pdf')) {
                mockData.printingStats.fileTypeBreakdown['pdf'] += 1
              } else if (
                row.fileName.includes('.jpg') ||
                row.fileName.includes('.jpeg') ||
                row.fileName.includes('.png')
              ) {
                mockData.printingStats.fileTypeBreakdown['img'] += 1
              }
            } else {
              row.status = 'Đang xử lý'
              row.endTime = '/'
            }
            return row
          })

          mockData.printingStats.lastPrintTime =
            updatedHistory[updatedHistory.length - 1].startTime

          setHistory(updatedHistory)
          setStats(mockData.printingStats)
        }
      } catch (error) {
        console.error('Failed to fetch printing history:', error)
      }
    }

    fetchPrintingHistory()
  }, [])

  // Pagination logic
  const startIndex = (currentPage - 1) * rowsPerPage
  const filteredSortedRows = useMemo(() => {
    return history
      .filter((row) => {
        const rowMonth = new Date(row.createdAt).getMonth()
        if (!row.status) {
          row.status = 'Thành công'
        }
        return (
          (!searchTerm ||
            row.fileName.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (filterMonth === '' || rowMonth === parseInt(filterMonth)) &&
          (!filterStatus || row.status === filterStatus)
        )
      })
      .sort((a, b) => {
        if (sortField === 'startTime' || sortField === 'endTime') {
          const dateA = new Date(a[sortField])
          const dateB = new Date(b[sortField])

          // Convert to a format that can be compared (milliseconds since the epoch)
          const aTime = dateA.getTime()
          const bTime = dateB.getTime()

          // Perform sorting based on the order: year -> month -> date -> AM/PM -> hours -> minutes -> seconds
          if (aTime < bTime) return sortDirection === 'asc' ? -1 : 1
          if (aTime > bTime) return sortDirection === 'asc' ? 1 : -1

          return 0
        }
        if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1
        if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1
        return 0
      })
  }, [history, searchTerm, filterMonth, filterStatus, sortField, sortDirection])

  const currentRows = useMemo(() => {
    return filteredSortedRows.slice(startIndex, startIndex + rowsPerPage)
  }, [filteredSortedRows, startIndex, rowsPerPage])

  const handlePageChange = (page) => setCurrentPage(page)
  const handleSearch = (event) => setSearchTerm(event.target.value)
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }
  const handleFilter = (field, value) => {
    if (field === 'month') {
      setFilterMonth(value)
    } else if (field === 'status') {
      setFilterStatus(value)
    }
  }

  const getSortIndicator = (field) => {
    if (sortField === field) {
      return sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />
    }
    return <FaSort />
  }

  // Pie chart data
  const pieData = {
    labels: Object.keys(mockData.printingStats.fileTypeBreakdown),
    datasets: [
      {
        label: 'File Types',
        data: Object.values(mockData.printingStats.fileTypeBreakdown),
        backgroundColor: ['#2F88FF', '#FF3B30', '#FF9500'],
        hoverOffset: 2,
      },
    ],
  }

  // Function to truncate file name
  const truncateFileName = (fileName, maxLength = 30) => {
    console.log(fileName.length)
    if (fileName.length <= maxLength) return fileName
    const extensionIndex = fileName.lastIndexOf('.')
    const extension = fileName.slice(extensionIndex) // Get file extension
    const nameWithoutExtension = fileName.slice(0, extensionIndex) // Get file name without extension

    // Show first 6 chars and last 6 chars of the name (can be adjusted)
    const start = nameWithoutExtension.slice(0, 15)
    const end = nameWithoutExtension.slice(-(12 - extension.length)) //

    return `${start}...${end}${extension}`
  }

  // Function to select the appropriate file icon
  const getFileIcon = (fileName) => {
    if (fileName.includes('.pdf'))
      return <FaFilePdf style={{ marginRight: '8px' }} />
    if (
      fileName.includes('.jpg') ||
      fileName.includes('.jpeg') ||
      fileName.includes('.png')
    )
      return <FaFileImage style={{ marginRight: '8px' }} />
    return <IoIosDocument style={{ marginRight: '8px' }} />
  }

  return (
    <MainLayout>
      <div className="log-printing">
        {/* Title Section */}
        <div className="Title">
          <h1>Chi tiết về lịch sử in của bạn</h1>
          <FaPrint style={{ marginLeft: '10px' }} />
        </div>

        {/* Statistics Section */}
        <div className="statistics">
          <div className="stats-general">
            <div className="info-div">
              <p style={{ width: '40%' }}>Số file in thành công:</p>
              <span> {mockData.printingStats.successfulPrints}</span>
              <p style={{ width: '30%' }}>(gồm các loại tệp)</p>
            </div>
            <div className="info-div">
              <p style={{ width: '40%' }}>Số trang in thành công:</p>
              <span> {mockData.printingStats.totalPages} </span>
              <p style={{ width: '30%' }}> (quy đổi ra A4)</p>
            </div>
            <div style={{ display: 'flex' }}>
              <p style={{ width: '40%' }}>Lệnh in gần nhất:</p>
              <span style={{ width: '40%' }}>
                {mockData.printingStats.lastPrintTime}
              </span>
            </div>
          </div>
          <div className="chart-statistics">
            <Pie data={pieData} className="pie-chart" />
            <table className="pie-table">
              <thead>
                <tr>
                  <th>Loại tệp</th>
                  <th>Số lượng</th>
                  <th>%</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(mockData.printingStats.fileTypeBreakdown).map(
                  ([fileType, count]) => (
                    <tr key={fileType}>
                      <td>{fileType}</td>
                      <td>{count}</td>
                      <td>
                        {(
                          (count / mockData.printingStats.successfulPrints) *
                          100
                        ).toFixed(2)}
                        %
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table Section */}
        <div className="table-controls">
          <div className="search-bar">
            <FaSearch />
            <input
              type="text"
              placeholder="Tìm kiếm tên file..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="sorting">
            <select
              value={filterMonth}
              onChange={(e) => handleFilter('month', e.target.value)}
            >
              <option value="">Tất cả tháng</option>
              {[...Array(12).keys()].map((i) => (
                <option key={i} value={i}>
                  Tháng {i + 1}/2024
                </option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => handleFilter('status', e.target.value)}
            >
              <option value="">Trạng thái </option>
              <option value="Thành công">Thành công</option>
              <option value="Thất bại">Thất bại</option>
              <option value="Đang xử lý">Đang xử lý</option>
            </select>
            <button
              onClick={() => {
                setFilterMonth('')
                setFilterStatus('')
                setSearchTerm('')
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>
        <table className="printing-table">
          <thead>
            <tr>
              <th
                onClick={() => handleSort('fileName')}
                style={{ width: '20%' }}
              >
                <p> Tên file {getSortIndicator('fileName')} </p>
              </th>
              <th onClick={() => handleSort('fileSize')}>
                <p>Kích thước {getSortIndicator('fileSize')}</p>
              </th>
              <th onClick={() => handleSort('startTime')}>
                <p>Bắt đầu in {getSortIndicator('startTime')}</p>
              </th>
              <th onClick={() => handleSort('endTime')}>
                <p>Kết thúc {getSortIndicator('endTime')}</p>
              </th>
              <th onClick={() => handleSort('pages')}>
                <p> Trang/Bản {getSortIndicator('pages')}</p>
              </th>
              <th onClick={() => handleSort('copies')}>
                <p> Số bản {getSortIndicator('copies')}</p>
              </th>
              <th onClick={() => handleSort('typePaper')}>
                <p>Loại {getSortIndicator('typePaper')}</p>
              </th>
              <th onClick={() => handleSort('status')}>
                <p> Trạng thái {getSortIndicator('status')}</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRows.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  style={{
                    textAlign: 'center',
                    padding: '20px',
                    color: 'red',
                    fontSize: '22px',
                    fontWeight: 'lighter',
                  }}
                >
                  Không tìm thấy file phù hợp
                </td>
              </tr>
            ) : (
              currentRows.map((row, index) => (
                <tr key={index}>
                  {/* <td>{row.id}</td> */}
                  <td>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}
                    >
                      {getFileIcon(row.fileName)}
                      {truncateFileName(row.fileName)}
                    </div>
                  </td>

                  <td style={{ textAlign: 'center' }}>
                    {(row.fileSize / 1024 ** 2).toFixed(2)}MB
                  </td>
                  <td>{row.startTime}</td>
                  <td>{row.endTime || '/'}</td>
                  <td style={{ textAlign: 'center' }}>{row.pages}</td>
                  <td style={{ textAlign: 'center' }}>{row.copies}</td>
                  <td style={{ textAlign: 'center' }}>{row.typePaper}</td>
                  <td
                    className={`status ${
                      row.status === 'Thành công'
                        ? 'success'
                        : row.status === 'Thất bại'
                        ? 'fail'
                        : 'processing'
                    }`}
                  >
                    {row.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {currentRows.length !== 0 && (
          <div className="pagination">
            {[...Array(Math.ceil(history.length / rowsPerPage)).keys()].map(
              (i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={currentPage === i + 1 ? 'active' : ''}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default LogPrinting
