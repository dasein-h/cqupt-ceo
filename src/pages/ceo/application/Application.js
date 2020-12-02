import React, {useState, useReducer} from 'react'

import {Card, PageHeader, Button, Modal, Radio, List, message, Pagination} from "antd";

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
  },
  {
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
  }
]

const reducer = (state, {type, payload}) => {
  switch (type) {
    case 'SET_PAGE':
      return {...state, page: payload}
    case 'SET_CURR_PAGE':
      return {...state, currentPage: payload}
  }
}

export default function Application() {
  const [state, dispatch] = useReducer(reducer, {
    
  })

  const total = 12 * page
  const LoadingMore = () => (
    <div style={{
      textAlign: 'center',
      marginTop: 12,
      height: 32,
      lineHeight: '32px',
    }}>
      <Button type="primary">加载更多</Button>
    </div>
  )

  return (
    <div>
      <PageHeader title="所有申请" subTitle="all application"/>
      <List
        dataSource={mockData}
        grid={{column: 4}}
        loadMore={<LoadingMore/>}
        renderItem={item => (
          <Card
            hoverable
            style={{margin: '10px'}}
          >
            <List.Item>
              <ul style={{
                listStyle: 'none',
                padding: '0'
              }}>
                <li> {item.companyName}</li>
                <li> {item.studentName}</li>
                <li> {item.studentId}</li>
                <li>专业 {item.academy}</li>
                <li> {item.position || "无职位"}</li>
                <li>状态：{item.state}</li>
                <li>班级id：{item.teachclass}</li>
              </ul>
            </List.Item>
          </Card>
        )}
      >
        <Pagination
          style={{
            width: '100%',
            margin: '10px'
          }}
          current={currentPage}
          pageSize={12}
          total={total}
        />
      </List>
    </div>
  )
}
