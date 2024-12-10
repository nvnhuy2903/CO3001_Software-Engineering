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
const STUDENT_ID = 4
const TOKEN =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0dWFuLm5ndXllbmtobXRrMjIiLCJleHAiOjE3MzM2ODE0MjUsImlhdCI6MTczMzY3NzgyNSwianRpIjoiZTc1ZmUyZDYtNDhhOC00MmJjLTljNDAtY2JlYWQ0YjMwNWIxIiwic2NvcGUiOiJTVFVERU5UIn0.iUNbYLO6Jvx25qmXohvPwmyMKwU8QmHvGV_AnrhM8zD8C3iPpoApWdV2ZnCl4brPsRZXSmMG56sKM_5aKJXi9Q'
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

            row.updateAtDate = new Date(createdAtDate.getTime() + 10000) // Add 10 seconds

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
              <th onClick={() => handleSort('fileName')}>
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
                    fontSize: '32px',
                  }}
                >
                  No files found
                </td>
              </tr>
            ) : (
              currentRows.map((row, index) => (
                <tr key={index}>
                  {/* <td>{row.id}</td> */}
                  <td>{row.fileName} </td>
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
