import {List} from "antd";
import React from "react";
import defaultPagination from "../config/defaultPagination";

export default props => {
  let pagination = defaultPagination
  const {
    dataSource,
    column = 4,
    gutter = 15,
    render,
    loading
  } = props

  return (
    <List
      style={{margin: '15px'}}
      grid={{
        column: column,
        gutter: gutter
      }}
      dataSource={dataSource || []}
      loading={loading ? loading : !dataSource}
      pagination={pagination}
      renderItem={item => (
        <List.Item>
          {render(item)}
        </List.Item>
      )}
    />
  )
}
