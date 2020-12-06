import React, {useState, useEffect} from 'react'
import {Card, PageHeader, Button, Modal, Radio, Divider, message} from "antd";
import {setPosition as requestSetPos, getMember} from "../../../until/api/ceo";
import './position.scss'

const positions = [
  'ceo',
  '副总裁',
  '总裁'
]
const mockData = [
  {
    "id": 985,
    "ceoId": 0,
    "userName": "甘雅婷",
    "studentId": "2016211032",
    "companyName": "第一贸易企业",
    "position": "ceo",
    "teacherId": "1",
    "personalScore": 10,
    "academy": "信息管理与信息系统"
  }, {
    "id": 991,
    "ceoId": 0,
    "userName": "魏雨欣",
    "studentId": "2017210959",
    "companyName": "第一贸易企业",
    "position": null,
    "teacherId": "1",
    "personalScore": 10,
    "academy": "信息管理与信息系统"
  }
]

function Position(props) {
  const [posValue, setPosValue] = useState(null)
  const [stuId, setStuId] = useState(null)
  const [members, setMembers] = useState(null)

  useEffect(() => {
    getMember('a001').then(
      // res => setMembers(res.data)
      res => setMembers(mockData)
    )
  }, [])

  const [visible, setVisible] = useState(false)

  const updateMember = async () => {
    const res = await getMember('a001')
    if (res.flag) {
      setMembers(res.data)
    } else {
      message.warn(res.message)
    }
  }
  const openPosition = id => {
    setVisible(true)
    setStuId(id)
  }
  const setPosition = async () => {
    try {
      const res = await requestSetPos('a001', stuId, posValue)
      message.info(res.message)
      if (res.flag) {
        setVisible(false)
        updateMember()
      }
    } catch (e) {
      message.warning(e)
    }
  }

  return (
    <div>
      <PageHeader title="成员" subTitle="member"/>
      <div className="member">
        {
          members
            ? (
              members.length
                ? (members.map(member => (
                  <Card
                    key={member.id}
                    title={member.companyName}
                    hoverable={true}
                    className="card"
                  >
                    <ul style={{
                      listStyle: 'none',
                      padding: '0'
                    }}>
                      <li> {member.userName}</li>
                      <li> {member.studentId}</li>
                      <li>专业 {member.academy}</li>
                      <li> {member.position || "无职位"}</li>
                      <li>分数：{member.personalScore}</li>
                    </ul>
                    <Button
                      type={"primary"}
                      shape="round"
                      onClick={openPosition.bind(null, member.id)}
                    >设置</Button>
                  </Card>
                )))
                : (<h5 className="title">无 成 员</h5>)
            )
            : (
              <Card
                className="card"
                loading={true}
                title="请稍等..."
              />
            )
        }
      </div>
      <Modal
        visible={visible}
        onCancel={() => {
          setVisible(false)
        }}
        footer={false}
      >
        <Radio.Group onChange={({target: {value}}) => {
          setPosValue(value)
        }}>
          <PageHeader
            title="职位"
            subTitle="position"
            style={{padding: '16px 0'}}
          />
          {
            positions.map(position => (
              <Radio.Button
                buttonStyle="solid"
                key={position}
                value={position}
                onChange={e => {
                  setPosValue(e.target.value)
                }}
              >
                {position}
              </Radio.Button>
            ))
          }
        </Radio.Group>
        <Divider/>
        <Button
          type="primary"
          shape="round"
          onClick={setPosition}
          disabled={!posValue}
        > 确 认 </Button>
      </Modal>
    </div>
  )
}

export default Position
