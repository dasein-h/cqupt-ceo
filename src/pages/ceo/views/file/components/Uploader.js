import React, { useState, useRef } from 'react'
import { Button, message, Upload } from 'antd'
import { uploadPPT } from "../../../../../until/api/ceo";
import isPPT from "../../../../../until/api/isPPT";
import { UploadOutlined } from '@ant-design/icons';
import WithModal from '../../../components/WithModal'

let cancel = () => {
  /**后面会赋值 */
}

export default (props) => {
  let { userId, teachclass, reload } = props
  const fileRef = useRef(null)
  const [file, setFile] = useState(null)
  const handleUpload = async () => {
    let file
    if (!(file = fileRef.current?.files?.[0])) {
      message.info("请选择文件")
      return
    }
    if (!isPPT(file.name)) {
      message.info("请选择ppt文件")
      return
    }
    setFile(file)
  }
  const upload = async () => {
    if (!file || !isPPT(file.name)) {
      message.info("请选择ppt文件")
      return
    }
    const fd = new FormData()
    fd.append('file', file)
    if (!userId) userId = sessionStorage.getItem('userId')
    fd.append('studentId', userId)
    if (!teachclass) teachclass = sessionStorage.getItem('class')
    fd.append('teachclass', teachclass)

    const res = await uploadPPT(fd)
    if (!res) {
      message.warn('数据库异常')
      return
    }
    if (res.flag) {
      message.success('上传成功')
      cancel()
      reload()
    } else {
      message.warn(res.message || "数据库异常")
    }
  }
  return (
    <div style={{ margin: '15px' }}>
      <div style={{
        height: '100%'
      }}>
        <WithModal
          render={
            (props, onCancel) => {
              cancel = onCancel
              return <Button {...props} icon={<UploadOutlined />}>上传文件</Button>
            }
          }
        >
          <label className="upload-btn">
            {file?.name ? file?.name : '选择文件'}
            <input
              ref={fileRef}
              style={{
                visibility: 'hidden',
                width: '0'
              }}
              type="file"
              onChange={handleUpload}
            />
          </label>
          <Button style={{
            margin: '0 auto',
            display: 'block'
          }} type="primary" onClick={upload}>上传</Button>
        </WithModal>
      </div>
    </div>
  )
}
