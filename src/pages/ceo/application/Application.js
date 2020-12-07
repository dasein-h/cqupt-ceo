import React, {useEffect, useReducer} from 'react'

import {Card, PageHeader, Button, Modal, Radio, List, message, Pagination} from "antd";
import {PAGE_SIZE, SET_PAGE, INIT_PAGE, SET_CURR_PAGE, LOADING} from "./consts/consts";

const mockData = [
  {
    "id": 5,
    "studentId": "2017210960",
    "studentName": "任飞燕",
    "companyName": "第一家新闻机构",
    "level": 2,
    "creatTime": "2020-11-29T16:00:00.000+00:00",
    "teachclass": "SJ00201A2031780003",
    "ceoId": null,
    "teacherId": null,
    "academy": "信息管理与信息系统",
    "state": "等待中"
  }, {
    "id": 7,
    "studentId": "2017210966",
    "studentName": "杨练",
    "companyName": "第一家新闻机构",
    "level": 2,
    "creatTime": "2020-11-30T16:00:00.000+00:00",
    "teachclass": "SJ00201A2031780003",
    "ceoId": null,
    "teacherId": null,
    "academy": "信息管理与信息系统",
    "state": "等待中"
  }, {
    "id": 7,
    "studentId": "2017210966",
    "studentName": "杨练",
    "companyName": "第一家新闻机构",
    "level": 2,
    "creatTime": "2020-11-30T16:00:00.000+00:00",
    "teachclass": "SJ00201A2031780003",
    "ceoId": null,
    "teacherId": null,
    "academy": "信息管理与信息系统",
    "state": "等待中"
  }, {
    "id": 7,
    "studentId": "2017210966",
    "studentName": "杨练",
    "companyName": "第一家新闻机构",
    "level": 2,
    "creatTime": "2020-11-30T16:00:00.000+00:00",
    "teachclass": "SJ00201A2031780003",
    "ceoId": null,
    "teacherId": null,
    "academy": "信息管理与信息系统",
    "state": "等待中"
  }, {
    "id": 7,
    "studentId": "2017210966",
    "studentName": "杨练",
    "companyName": "第一家新闻机构",
    "level": 2,
    "creatTime": "2020-11-30T16:00:00.000+00:00",
    "teachclass": "SJ00201A2031780003",
    "ceoId": null,
    "teacherId": null,
    "academy": "信息管理与信息系统",
    "state": "等待中"
  }, {
    "id": 5,
    "studentId": "2017210960",
    "studentName": "任飞燕",
    "companyName": "第一家新闻机构",
    "level": 2,
    "creatTime": "2020-11-29T16:00:00.000+00:00",
    "teachclass": "SJ00201A2031780003",
    "ceoId": null,
    "teacherId": null,
    "academy": "信息管理与信息系统",
    "state": "等待中"
  }, {
    "id": 9,
    "studentId": "2017210960",
    "studentName": "XX",
    "companyName": "第一家新闻机构",
    "level": 2,
    "creatTime": "2020-11-29T16:00:00.000+00:00",
    "teachclass": "SJ00201A2031780003",
    "ceoId": null,
    "teacherId": null,
    "academy": "信息管理与信息系统",
    "state": "等待中"
  },
]

const reducer = (state, {type, payload}) => {
  switch (type) {
    case LOADING:
      return {...state, loading: true}
    case SET_PAGE:
      return {...state,
        currentPage: payload.currentPage,
        loading: false,
        data: payload.data
      }
    case SET_CURR_PAGE:
      return {...state, currentPage: payload, loading: false}
    case INIT_PAGE:
      return {
        ...state,
        currentPage: 0,
        total: payload.total,
        loading: false,
        data: payload.data
      }
  }
}

export default function Application() {
  const [state, dispatch] = useReducer(reducer, {
    currentPage: 0,
    loading: true,
    data: null
  })

  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: INIT_PAGE, payload: {
          total: 9,
          data: mockData
        }
      })
    }, 500)
  }, [])

  const handlePageChange = pos => {
    dispatch({type: LOADING})
    setTimeout(() => {
      dispatch({
        type: SET_PAGE,
        payload: {
          currentPage: pos,
          data: [
            {
              name: 'fy'
            }, {
              name: 'ly'
            }
          ]
        }
      })
    }, 500)
  }
  const handleAgree = id => {

  }
  const handleReject = id => {

  }
  return (
    <div>
      <PageHeader title="所有申请" subTitle="all application"/>
      <List
        dataSource={state.data || []}
        grid={{column: 4}}
        loading={state.loading}
        pagination={{
          current: state.currentPage,
          pageSize: PAGE_SIZE,
          total: state.total,
          onChange: handlePageChange
        }}
        renderItem={item => (
          <Card
            hoverable
            style={{margin: '10px'}}
            title={item.companyName}
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
                <Button
                  type="primary" shape="round"
                  onClick={handleAgree.bind(null, item.studentId)}
                >同意</Button>
                <Button
                  type="primary" danger={true}
                  shape="round"
                  onClick={handleReject.bind(null, item.studentId)}
                >拒绝</Button>
              </div>
            </List.Item>
          </Card>
        )}
      >
      </List>
    </div>
  )
}
