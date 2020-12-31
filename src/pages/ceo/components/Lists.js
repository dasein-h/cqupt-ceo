import {PAGE_SIZE} from "../views/application/consts/constants";
import {List} from "antd";
import React from "react";
import defaultPagination from "../config/defaultPagination";

let pagination = defaultPagination

export default props => {
  const {
    dataSource,
    column = 4,
    gutter = 15,
    render
  } = props

  return (
    <List
      style={{margin: '15px'}}
      grid={{
        column: column,
        gutter: gutter
      }}
      dataSource={dataSource || []}
      loading={!dataSource}
      pagination={pagination}
      renderItem={item => (
        <List.Item>
          {render(item)}
        </List.Item>
      )}
    />
  )
}
