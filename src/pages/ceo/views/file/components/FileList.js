import React, { useEffect, memo } from "react";
import { downloadFile } from "../../../../../until/api/ceo";
import MyTable from "../../../components/MyTable";
import { Modal } from 'antd'

const { confirm } = Modal

/*可下载列表*/
const FileList = props => {
  const { userId, currentPage, state, fetchFile, setPage, handleDelete } = props

  useEffect(() => {
    fetchFile()
  }, [currentPage])

  const deleteConfirm = id => {
    confirm({
      title: '删除后不可找回，是否继续',
      okText: '确定',
      cancelText: '取消',
      onOk: handleDelete.bind(null, id)
    });
  }
  const columns = [
    {
      title: '文件',
      dataIndex: 'fileName',
      render(text, { fileName, id }) {
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
      render(_, { studentId, id }) {
        return (
          <div>
            {
              studentId === userId
                ? <>
                  <a onClick={deleteConfirm.bind(null, id)}>删除</a>
                </>
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
