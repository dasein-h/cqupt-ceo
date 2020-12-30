import React, {memo} from 'react'
import {Table} from "antd";

const MyTable = props => {
  const {columns, dataSource} = props
  dataSource?.forEach((item, i) => {
    if (!item.key)
      item.key = i
  })
  return (
    <Table
      style={{
        margin: '15px'
      }}
      pagination={{
        hideOnSinglePage: true
      }}
      loading={!dataSource}
      dataSource={dataSource}
      columns={columns}
    />
  )
}

export default MyTable
