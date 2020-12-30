import React, {useEffect, useReducer, useState, memo} from "react";
import {downloadFile, fetchFileList, deleteFile} from "../../../../../until/api/ceo";
import {Button, List, message, Table} from "antd";
import MyTable from "../../../components/MyTable";
import Confirm from '../../../../ceo/components/Comfirm'

const fileReducer = (state, {type, payload}) => {
  switch (type) {
    case 'INIT_FILE':
      return {...state, loading: true}
    case 'FETCH_OK':
      const list = payload
      list.forEach((item, i) => item.key = i)
      return {...state, loading: false, list}
    case 'FETCH_FAIL':
      return {...state, loading: false}
    case 'DELETE_AT':
      const newList = state.list.splice()
      newList.filter(item => (
        item.id !== payload
      ))
      return {...state, list: newList}
    default:
      return state
  }
}
/*可下载列表*/
const FileList = props => {
  const {userId, teachclass} = props

  const [currentPage, setPage] = useState(1)

  const [state, dispatch] = useReducer(fileReducer, {
    loading: false,
    list: null
  })
  const fetchFile = async () => {
    try {
      const res = await fetchFileList(teachclass, currentPage)
      dispatch({
        type: 'FETCH_OK',
        payload: res
      })
    } catch (e) {
      message.warn("获取文件失败")
    }
  }
  useEffect(() => {
    if (teachclass) {
      fetchFile()
    }
  }, [currentPage])

  const handleDelete = async (id) => {
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
  }

  const columns = [
    {
      title: '文件',
      dataIndex: 'fileName',
      render(text, {fileName, id}) {
        return (
          <a onClick={downloadFile.bind(null, id, fileName)}>{fileName}</a>
        )
      }
    }, {
      title: '学号',
      dataIndex: 'studentId',
    }, {
      title: '班级号',
      dataIndex: 'teachclass',
    }, {
      title: '删除',
      dataIndex: 'download',
      render(_, {studentId, id}) {
        return (
          <div>
            {
              studentId === userId
                ? <Confirm
                  render={
                    (show, onOk) => {
                      onOk(handleDelete.bind(null, id))
                      return <a onClick={show}>删除</a>
                    }
                  }
                />
                : <span>无权限</span>
            }
          </div>
        )
      }
    }
  ]

  return (
    <>
      {/*<List*/}
      {/*  size="small"*/}
      {/*  style={{padding: '15px'}}*/}
      {/*  dataSource={state.list}*/}
      {/*  loading={state.loading}*/}
      {/*  pagination={{*/}
      {/*    onChange(pos) {*/}
      {/*      setPage(pos)*/}
      {/*    }*/}
      {/*  }}*/}
      {/*  renderItem={({fileName, id}, i) => {*/}
      {/*    return (*/}
      {/*      <li key={i} style={{padding: '15px'}}>*/}
      {/*        <span>{fileName}</span>*/}
      {/*        <Button type="primary" onClick={handleDownload.bind(null, id)}>下载</Button>*/}
      {/*      </li>*/}
      {/*    )*/}
      {/*  }}*/}
      {/*/>*/}

      <MyTable
        dataSource={state.list}
        columns={columns}
      />
    </>
  )
}

export default memo(FileList)
