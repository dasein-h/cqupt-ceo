import React, {useEffect, useReducer, useState, memo, useCallback} from "react";
import {downloadFile, fetchFileList, deleteFile} from "../../../../../until/api/ceo";
import {message} from "antd";
import MyTable from "../../../components/MyTable";
import Confirm from '../../../../ceo/components/Comfirm'

/*可下载列表*/
const FileList = props => {
  const { userId, currentPage, state, fetchFile, setPage, handleDelete} = props

  useEffect(() => {
    fetchFile()
  }, [currentPage])

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
      <MyTable
        dataSource={state?.list}
        total={state.list?.[0]?.filePath || 0}
        columns={columns}
        onChange={setPage}
        currentPage={currentPage}
      />
    </>
  )
}

export default memo(FileList)
