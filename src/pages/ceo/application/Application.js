import React, {memo, useEffect, useReducer, useState} from 'react'

import {showApplication, agreeApplication, downloadFile, fetchFileList} from "../../../until/api/ceo";
import {Card, PageHeader, Button, List, message} from "antd";
import {PAGE_SIZE, SET_PAGE, INIT_PAGE, SET_CURR_PAGE, LOADING} from "./consts/consts";
import './application.scss'

const reducer = (state, {type, payload}) => {
  switch (type) {
    case LOADING:
      return {...state, loading: true}
    case SET_PAGE:
      return {
        ...state,
        loading: false,
        data: payload.data
      }
    case SET_CURR_PAGE:
      return {...state, currentPage: payload, loading: false}
    case INIT_PAGE:
      return {
        ...state,
        total: payload.totalNumber,
        loading: false,
        data: payload.object,
        pageSize: payload.pageSize
      }
  }
}

const fileReducer = (state, action) => {
  switch (action.type) {
    case 'INIT_FILE':
      return {...state, loading: true}
    case 'FETCH_OK':
      return {...state, loading: false, list: action.payload}
    case 'FETCH_FAIL':
      return {...state, loading: false}
    default:
      return state
  }
}
/*可下载列表*/
const FileList = () => {
  const teacherClass = localStorage.getItem('class')

  const [fileId, setFileId] = useState(null)
  const [currentPage, setPage] = useState(1)

  const [state, dispatch] = useReducer(fileReducer, {
    loading: false,
    list: []
  })

  useEffect(() => {
    if (teacherClass) {
      fetchFileList(teacherClass, currentPage)
        .then(list => {
          if (list.length) {
            dispatch({
              type: 'FETCH_OK',
              payload: list
            })
          }
        }, e=>{
          message.warn(e)
        })
    }
  }, [currentPage])

  const handleDownload = async (id) => {
    try {
      const res = await downloadFile(id)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <List
        size="small"
        style={{padding: '15px'}}
        dataSource={state.list}
        loading={state.loading}
        pagination={{
          onChange(pos) {
            setPage(pos)
          }
        }}
        renderItem={({fileName, id}, i) => {
          return (
            <li key={i} style={{padding: '15px'}}>
              <span>{fileName}</span>
              <Button type="primary" onClick={handleDownload.bind(null, id)}>下载</Button>
            </li>
          )
        }}
      />
    </>
  )
}

function Application(props) {
  const {userId} = props
  const [state, dispatch] = useReducer(reducer, {
    currentPage: 0,
    loading: true,
    data: null,
    pageSize: 0,
    fileList: []
  })

  useEffect(() => {
    showApplication(0, userId).then(
      res => {
        dispatch({
          type: INIT_PAGE,
          payload: res.data
        })
      }
    )
  }, [])

  const handleAgree = (studentId, companyName) => {
    agreeApplication(userId, studentId, companyName)
  }
  return (
    <div>
      <PageHeader title="所有申请" subTitle="all application"/>
      <List
        dataSource={state.data || []}
        grid={{column: 4}}
        loading={state.loading}
        pagination={{
          pageSize: state.pageSize,
          total: state.total,
        }}
        renderItem={item => (
          <Card
            hoverable
            style={{margin: '10px'}}
            title={item.companyName || '无名'}
          >
            <List.Item>
              <ul style={{
                listStyle: 'none',
                padding: '0'
              }}>
                <li> {item.studentName}</li>
                <li> {item.studentId}</li>
                <li>专业 {item.academy}</li>
                <li> {item.position || "无职位"}</li>
                <li>状态：{item.state}</li>
                <li>班级id：{item.teachclass}</li>
              </ul>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                {
                  item.state === '等待中'
                    ? (
                      <>
                        <Button
                          type="primary" shape="round"
                          onClick={handleAgree.bind(null, item.studentId, item.companyName)}
                        >同意</Button>
                        {/*<Button*/}
                        {/*  type="primary" danger={true}*/}
                        {/*  shape="round"*/}
                        {/*  onClick={handleReject.bind(null, item.studentId)}*/}
                        {/*>拒绝</Button>*/}
                      </>
                    )
                    : <div className="status pass">已同意</div>
                }
              </div>
            </List.Item>
          </Card>
        )}
      >
      </List>

      <PageHeader title="文件"/>
      <FileList list={state.fileList}/>
    </div>
  )
}

export default memo(Application)
