import React, { useState } from 'react'
import './Printing.css'

const PrinterConfig = ({ config, onConfigChange, totalPages }) => {
  const validateCustomRange = (range) => {
    const regex = /^[0-9]+(-[0-9]+)?(,[0-9]+(-[0-9]+)?)*$/
    return true
  }

  const handleInputChange = (key, value) => {
    if (key === 'customRange' && !validateCustomRange(value)) {
      alert('Invalid range format. Use numbers and ranges like 1,2-5.')
      return
    }
    onConfigChange(key, value)
  }
  const resetConfig = () => {
    onConfigChange('reset', {
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
  }

  return (
    <div style={{ fontFamily: 'VT323' }}>
      {/* Basic Settings */}
      <fieldset>
        <legend>Cơ bản</legend>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <label style={{ width: '40%' }}>
            <p style={{ width: '100%' }}>Màu sắc:</p>
            <input
              type="checkbox"
              checked={config.color}
              onChange={(e) => handleInputChange('color', e.target.checked)}
            />
            <p style={{ width: '100%' }}>đơn sắc</p>
          </label>
          <label>
            <p>Layout:</p>
            <select
              value={config.layout}
              onChange={(e) => handleInputChange('layout', e.target.value)}
            >
              <option value="Portrait">Dọc</option>
              <option value="Landscape">Ngang</option>
            </select>
          </label>
        </div>
        <label>
          Bản sao:
          <input
            className="inputNumber"
            type="number"
            min="1"
            style={{
              width: 'fit-content',
            }}
            value={config.copies}
            onChange={(e) =>
              handleInputChange('copies', parseInt(e.target.value))
            }
          />
        </label>
      </fieldset>

      {/* Range Settings */}
      <fieldset style={{ marginBottom: '20px' }} className="selectPages">
        <legend>Phạm vi</legend>
        <label>
          <input
            type="radio"
            name="range"
            value="current"
            checked={config.range === 'current'}
            onChange={(e) => handleInputChange('range', e.target.value)}
          />
          <p style={{ width: '90%' }}>Trang hiện tại </p>
        </label>
        <label>
          <input
            type="radio"
            name="range"
            value="all"
            checked={config.range === 'all'}
            onChange={(e) => handleInputChange('range', e.target.value)}
          />
          Tất cả trang
        </label>
        <label>
          <input
            type="radio"
            name="range"
            value="custom"
            checked={config.range === 'custom'}
            onChange={(e) => handleInputChange('range', e.target.value)}
          />
          Chọn trang:
          <input
            className="inputNumber"
            type="text"
            placeholder={`1-${totalPages ? totalPages : 20}`}
            value={config.customRange}
            onChange={(e) => handleInputChange('customRange', e.target.value)}
            disabled={config.range !== 'custom'}
          />
        </label>
        <label>
          Trang chẵn/lẻ:
          <select
            value={config.evenOdd}
            onChange={(e) => handleInputChange('evenOdd', e.target.value)}
          >
            <option value="all">Tất cả</option>
            <option value="even">Trang chẵn</option>
            <option value="odd">Trang lẻ</option>
          </select>
        </label>
      </fieldset>

      {/* Page Setup */}
      <fieldset style={{ marginBottom: '20px' }} className="pageSetup">
        <legend>Thiết lập trang</legend>
        <label>
          <p>Kích thước giấy:</p>
          <select
            value={config.paperSize}
            onChange={(e) => handleInputChange('paperSize', e.target.value)}
          >
            <option value="A2">A2</option>
            <option value="A3">A3</option>
            <option value="A4">A4</option>
          </select>
        </label>
        <label>
          <p>Số trang trên một mặt:</p>
          <select
            value={config.pagesPerSheet}
            onChange={(e) => handleInputChange('pagesPerSheet', e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
          </select>
        </label>
      </fieldset>

      {/* Actions */}
      {/* <div className="actions">
        <button onClick={resetConfig}>Reset</button>
      </div> */}
    </div>
  )
}

export default PrinterConfig
