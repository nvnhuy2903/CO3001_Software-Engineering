import React, { useState, useMemo } from 'react'
import MainLayout from './MainLayout'
import { FaPrint } from 'react-icons/fa'
import { Pie } from 'react-chartjs-2'
import 'chart.js/auto' // Required for Chart.js
import { FaSearch } from 'react-icons/fa'
import { FaSort } from 'react-icons/fa6'
import { FaSortUp } from 'react-icons/fa6'
import { FaSortDown } from 'react-icons/fa6'
import './LogPrinting.css'

const mockData = {
  printingHistory: [
    {
      fileName: 'filename.docx',
      printerId: 1,
      startTime: '2024-10-07T15:20:34',
      endTime: null,
      pages: 28,
      size: 'A4',
      status: 'Đang xử lý',
    },
    {
      fileName: 'filename.docx',
      printerId: 2,
      startTime: '2024-10-07T13:56:28',
      endTime: '2024-10-07T14:15:38',
      pages: 32,
      size: 'A3',
      status: 'Thành công',
    },
    {
      fileName: 'filename.docx',
      printerId: 5,
      startTime: '2024-10-07T10:45:07',
      endTime: '2024-10-07T11:02:32',
      pages: 128,
      size: 'A4',
      status: 'Thất bại',
    },
    {
      fileName: 'filename.docx',
      printerId: 3,
      startTime: '2024-10-07T07:32:46',
      endTime: '2024-10-07T07:35:11',
      pages: 5,
      size: 'A4',
      status: 'Thành công',
    },
    {
      fileName: 'filename.docx',
      printerId: 9,
      startTime: '2024-10-06T16:49:32',
      endTime: '2024-10-06T17:01:47',
      pages: 44,
      size: 'A4',
      status: 'Thành công',
    },
    {
      fileName: 'filename.docx',
      printerId: 7,
      startTime: '2024-10-06T16:32:14',
      endTime: '2024-10-06T16:58:21',
      pages: 98,
      size: 'A4',
      status: 'Thất bại',
    },
    {
      fileName: 'filename.docx',
      printerId: 2,
      startTime: '2024-10-06T13:02:39',
      endTime: '2024-10-06T13:05:42',
      pages: 102,
      size: 'A3',
      status: 'Thành công',
    },
    {
      fileName: 'filename.docx',
      printerId: 4,
      startTime: '2024-10-06T09:31:18',
      endTime: '2024-10-06T09:40:27',
      pages: 68,
      size: 'A4',
      status: 'Thành công',
    },
    {
      fileName: 'filename.docx',
      printerId: 2,
      startTime: '2024-10-06T08:19:17',
      endTime: '2024-10-06T08:27:54',
      pages: 77,
      size: 'A4',
      status: 'Thành công',
    },
    {
      fileName: 'filename.docx',
      printerId: 10,
      startTime: '2024-10-05T14:38:43',
      endTime: '2024-10-05T14:47:29',
      pages: 118,
      size: 'A4',
      status: 'Thành công',
    },
    {
      fileName: 'filename.docx',
      printerId: 1,
      startTime: '2024-10-07T15:20:34',
      endTime: null,
      pages: 28,
      size: 'A4',
      status: 'Đang xử lý',
    },
    {
      fileName: 'filename.docx',
      printerId: 2,
      startTime: '2024-10-07T13:56:28',
      endTime: '2024-10-07T14:15:38',
      pages: 32,
      size: 'A3',
      status: 'Thành công',
    },
    {
      fileName: 'filename.docx',
      printerId: 5,
      startTime: '2024-10-07T10:45:07',
      endTime: '2024-10-07T11:02:32',
      pages: 128,
      size: 'A4',
      status: 'Thất bại',
    },
    {
      fileName: 'filename.docx',
      printerId: 3,
      startTime: '2024-10-07T07:32:46',
      endTime: '2024-10-07T07:35:11',
      pages: 5,
      size: 'A4',
      status: 'Thành công',
    },
    {
      fileName: 'filename.docx',
      printerId: 9,
      startTime: '2024-10-06T16:49:32',
      endTime: '2024-10-06T17:01:47',
      pages: 44,
      size: 'A4',
      status: 'Thành công',
    },
    {
      fileName: 'filename.docx',
      printerId: 7,
      startTime: '2024-10-06T16:32:14',
      endTime: '2024-10-06T16:58:21',
      pages: 98,
      size: 'A4',
      status: 'Thất bại',
    },
    {
      fileName: 'filename.docx',
      printerId: 2,
      startTime: '2024-10-06T13:02:39',
      endTime: '2024-10-06T13:05:42',
      pages: 102,
      size: 'A3',
      status: 'Thành công',
    },
    {
      fileName: 'filename.docx',
      printerId: 4,
      startTime: '2024-10-06T09:31:18',
      endTime: '2024-10-06T09:40:27',
      pages: 68,
      size: 'A4',
      status: 'Thành công',
    },
    {
      fileName: 'filename.docx',
      printerId: 2,
      startTime: '2024-10-06T08:19:17',
      endTime: '2024-10-06T08:27:54',
      pages: 77,
      size: 'A4',
      status: 'Thành công',
    },
    {
      fileName: 'filename.docx',
      printerId: 10,
      startTime: '2024-10-05T14:38:43',
      endTime: '2024-10-05T14:47:29',
      pages: 118,
      size: 'A4',
      status: 'Thành công',
    },
    {
      fileName: 'filename.docx',
      printerId: 1,
      startTime: '2024-10-07T15:20:34',
      endTime: null,
      pages: 28,
      size: 'A4',
      status: 'Đang xử lý',
    },
    {
      fileName: 'filename.docx',
      printerId: 2,
      startTime: '2024-10-07T13:56:28',
      endTime: '2024-10-07T14:15:38',
      pages: 32,
      size: 'A3',
      status: 'Thành công',
    },
    {
      fileName: 'filename.docx',
      printerId: 5,
      startTime: '2024-10-07T10:45:07',
      endTime: '2024-10-07T11:02:32',
      pages: 128,
      size: 'A4',
      status: 'Thất bại',
    },
    {
      fileName: 'filename.docx',
      printerId: 3,
      startTime: '2024-10-07T07:32:46',
      endTime: '2024-10-07T07:35:11',
      pages: 5,
      size: 'A4',
      status: 'Thành công',
    },
    {
      fileName: 'filename.docx',
      printerId: 9,
      startTime: '2024-10-06T16:49:32',
      endTime: '2024-10-06T17:01:47',
      pages: 44,
      size: 'A4',
      status: 'Thành công',
    },
    {
      fileName: 'filename.docx',
      printerId: 7,
      startTime: '2024-10-06T16:32:14',
      endTime: '2024-10-06T16:58:21',
      pages: 98,
      size: 'A4',
      status: 'Thất bại',
    },
    {
      fileName: 'filename.docx',
      printerId: 2,
      startTime: '2024-10-06T13:02:39',
      endTime: '2024-10-06T13:05:42',
      pages: 102,
      size: 'A3',
      status: 'Thành công',
    },
    {
      fileName: 'filename.docx',
      printerId: 4,
      startTime: '2024-10-06T09:31:18',
      endTime: '2024-10-06T09:40:27',
      pages: 68,
      size: 'A4',
      status: 'Thành công',
    },
    {
      fileName: 'filename.docx',
      printerId: 2,
      startTime: '2024-10-06T08:19:17',
      endTime: '2024-10-06T08:27:54',
      pages: 77,
      size: 'A4',
      status: 'Thành công',
    },
    {
      fileName: 'filename.docx',
      printerId: 10,
      startTime: '2024-10-05T14:38:43',
      endTime: '2024-10-05T14:47:29',
      pages: 118,
      size: 'A4',
      status: 'Thành công',
    },
  ],
  printingStats: {
    successfulPrints: 48,
    totalPages: 580,
    lastPrintTime: '2024-10-07T15:20:34',
    fileTypeBreakdown: {
      '.doc': 12,
      '.pptx': 6,
      '.xlsx': 4,
      '.pdf': 26,
    },
  },
  printingStats: {
    successfulPrints: 48,
    totalPages: 580,
    lastPrintTime: '2024-10-07T15:20:34',
    fileTypeBreakdown: {
      '.doc': 12,
      '.pptx': 6,
      '.xlsx': 4,
      '.pdf': 26,
    },
  },
}

const LogPrinting = () => {
  const [history, setHistory] = useState(mockData.printingHistory)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState('startTime')
  const [sortDirection, setSortDirection] = useState('desc')
  const [filterMonth, setFilterMonth] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const rowsPerPage = 10

  // Pagination logic
  const startIndex = (currentPage - 1) * rowsPerPage
  const filteredSortedRows = useMemo(() => {
    return history
      .filter((row) => {
        const rowMonth = new Date(row.startTime).getMonth()
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
        backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e'],
        hoverOffset: 4,
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
              <th onClick={() => handleSort('printerId')}>
                <p> ID máy {getSortIndicator('printerId')}</p>
              </th>
              <th onClick={() => handleSort('startTime')}>
                <p>Bắt đầu in {getSortIndicator('startTime')}</p>
              </th>
              <th onClick={() => handleSort('endTime')}>
                <p>Kết thúc {getSortIndicator('endTime')}</p>
              </th>
              <th onClick={() => handleSort('pages')}>
                <p>Số trang {getSortIndicator('pages')}</p>
              </th>
              <th onClick={() => handleSort('size')}>
                <p>Kích thước {getSortIndicator('size')}</p>
              </th>
              <th onClick={() => handleSort('status')}>
                <p> Trạng thái {getSortIndicator('status')}</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, index) => (
              <tr key={index}>
                <td>{row.fileName} </td>
                <td>{row.printerId}</td>
                <td>{row.startTime}</td>
                <td>{row.endTime || '/'}</td>
                <td>{row.pages}</td>
                <td>{row.size}</td>
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
            ))}
          </tbody>
        </table>

        {/* Pagination */}
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
      </div>
    </MainLayout>
  )
}

export default LogPrinting
