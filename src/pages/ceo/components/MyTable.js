import React, {memo} from 'react'
import {Table} from "antd";
import defaultPagination from "../config/defaultPagination";

let pagination = defaultPagination

const MyTable = props => {
  const {
    columns,
    dataSource,
    currentPage,
    total,
    pageSize,
    onChange
  } = props

  if (currentPage) {
    pagination = {...pagination, currentPage, total, pageSize, onChange}
  }
  dataSource?.forEach((item, i) => {
    if (!item.key)
      item.key = i
  })
  columns?.forEach((item, i) => {
    if (!item.key)
      item.key = i
  })
  return (
    <Table
      style={{
        margin: '15px'
      }}
      pagination={pagination}
      loading={!dataSource}
      dataSource={dataSource}
      columns={columns}
    />
  )
}

export default memo(MyTable)
