import React, { useReducer, memo, useState } from 'react'
import { PageHeader, message } from "antd";
import FileList from "./components/FileList";
import Uploader from "./components/Uploader";
import { fetchFileList, deleteFile } from '../../../../until/api/ceo'

const reducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case 'INIT_FILE':
      return { ...state, loading: true }
    case 'FETCH_OK':
      const list = payload
      list.forEach((item, i) => item.key = i)
      return { ...state, loading: false, list }
    case 'FETCH_FAIL':
      return { ...state, loading: false }
    case 'DELETE_AT':
      const newList = state.list.slice()
      return { ...state, list: newList.filter(item => item.id != payload) }
    default:
      return state
  }
}

const File = props => {
  const [state, dispatch] = useReducer(reducer, {})
  const teachclass = sessionStorage.getItem('class')
  const [currentPage, setPage] = useState(1)

  const dispatchActions = {
    fetchFile: async () => {
      try {
        const res = await fetchFileList(teachclass, currentPage)
        if (res) {
           dispatch({
          type: 'FETCH_OK',
          payload: res
        })
        }
      } catch (e) {
        message.warn("获取文件失败")
      }
    },
    handleDelete: async (id) => {
      const res = await deleteFile(id)
      if (!res) {
        return
      }
      if (res.flag) {
        message.success("删除成功")
        dispatch({
          type: 'DELETE_AT',
          payload: id
        })
      }
    },
    setPage
  }

  return (
    <>
      <PageHeader
        title="文件"
        extra={[
          <Uploader {...props} reload={dispatchActions.fetchFile} />
        ]}
      />
      <FileList state={state} {...props} {...dispatchActions} currentPage={currentPage} />
    </>
  )
}

export default memo(File)
