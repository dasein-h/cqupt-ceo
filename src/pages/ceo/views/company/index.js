import React, {useState, useEffect, useReducer, memo} from 'react'
import Lists from '../../components/Lists'
import {Card, PageHeader, Button, Modal, Input, Radio, Divider, message, List} from "antd";
import {
  setPosition as requestSetPos,
  getMember,
  showAllCompany,
  voteForCompany,
  createCompany as createCompanyImpl
} from "../../../../until/api/ceo";
import MyTable from "../../components/MyTable";
import WithModal from "../../components/WithModal";
import MyCompany from "./components/MyCompany";
import CompanyItem from "./components/CompanyItem";

import './style/position.scss'

const positions = [
  'ceo',
  '副总裁',
  '总裁'
]

const companyTypes = [
  '贸易公司',
  '制造企业',
  '物流企业',
  '银行',
  '会计事务所',
  '新闻机构',
  '工商局',
  '税务局'
]

let cancel = () => {
}

const validateVote = (myType, target) => {
  myType = myType << 0
  target = target << 0
  if (!myType) return true
  return (myType < 3 && target >= 3) || (myType >= 3 && target < 3)
}

const reducer = (state, action) => {
  const {payload, type} = action
  switch (type) {
    case 'SET_COMPANY_STATE':
      return {
        ...state,
        companies: payload.object,
        companyTotal: payload.totalNumber,
        companyCurrentPage: payload.currentPage,
        pageSize: payload.pageSize
      }
    case 'SET_MEMBER_STATE':
      return {
        ...state,
        members: payload
      }
    case 'CHANGE_COMPANY_PAGE':
      return {
        ...state,
        companyCurrentPage: payload.currentPage
      }
    case 'SET_COMPANY_NAME':
      return {
        ...state,
        companyName: payload
      }
    default:
      alert('违规操作!')
      return {...state}
  }
}


function Company(props) {
  const {userId} = props

  const [state, dispatch] = useReducer(reducer, {
    companies: null,
    companyCurrentPage: 0,
    companyTotal: 0,
    members: null
  })

  const [posValue, setPosValue] = useState(null)
  const [stuId, setStuId] = useState(null)

  useEffect(() => {
    getMember(userId).then(
      // res => setMembers(res.data)
      res => {
        if (!res.data) {
          message.info(res.msg || res.message)
          return
        }
        dispatch({
          type: 'SET_COMPANY_NAME',
          payload: res.data?.[0]?.companyName
        })
        dispatch({
          type: 'SET_MEMBER_STATE',
          payload: res.data
          // payload: mockMembers
        })
      }
    )
    showAllCompany(userId, 0).then(
      res => {
        if (!res.flag) return
        dispatch({
          type: 'SET_COMPANY_STATE',
          payload: res.data
        })
      }
    )
  }, [])

  const [visible, setVisible] = useState(false)

  const updateMember = async () => {
    const res = await getMember(userId)
    if (res.flag) {
      dispatch({
        type: 'SET_MEMBER_STATE',
        payload: res.data
      })
    } else {
      message.warn(res.message)
    }
  }
  const openPosition = id => {
    setVisible(true)
    setStuId(id)
  }
  const setPosition = async () => {/* 选了职位之后刷新成员 */
    try {
      const res = await requestSetPos(userId, stuId, posValue)
      message.info(res.message)
      if (res.flag) {
        setVisible(false)
        updateMember(userId)
      }
    } catch (e) {
      message.warning(e)
    }
  }
  const vote = async (targetTypeCode, ceo) => {
    const typeCode = localStorage.getItem('typeCode')
    if (!validateVote(typeCode, targetTypeCode)) {
      message.info("普通公司和其他机构不能给自己一方公司投票")
    }
    const res = await voteForCompany(userId, ceo)
    if (!res.flag) {
      message.info(res.message || "网络异常")
    }
  }

  const companyColumns = [
    {
      title: '公司名',
      dataIndex: 'companyName'
    }, {
      title: '公司类别',
      dataIndex: 'type'
    }, {
      title: "机构类型",
      dataIndex: 'typeCode',
      render(text, {typeCode}) {
        return (typeCode < 3 ? <div>普通公司</div> : <div>其他机构</div>)
      }
    }, {
      title: 'ceo',
      dataIndex: 'ceoName'
    }, {
      title: 'ceo学号',
      dataIndex: 'ceo'
    },
    {
      title: '班级号',
      dataIndex: 'teachclass'
    }, {
      title: '创建时间',
      dataIndex: 'creatTime'
    }, {
      title: '操作',
      render(text, {ceo, typeCode}) {
        return (
          <>
            <Button
              disabled={!validateVote(localStorage.getItem('typeCode'), typeCode)}
              onClick={vote.bind(null, typeCode, ceo)}>投票</Button>

            <WithModal
              render={props => (
                <Button
                  disabled={!validateVote(localStorage.getItem('typeCode'), typeCode)}
                  {...props}
                >
                  打分
                </Button>
              )}
            >
              div
            </WithModal>
          </>
        )
      }
    }
  ]

  /* UI组件 */
  const Member = ({member}) => {
    return (
      <Card
        key={member.id}
        hoverable={true}
      >
        <div style={{fontSize: '16px'}}>{member.userName}</div>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          margin: '15px 0', alignItems: 'flex-end', fontSize: '16px'
        }}>
          <div>
            <div className="row">
              <span className="dscr">专业</span>{member.academy}</div>
            <div className="row">
              <span className="dscr">学号</span>{member.studentId}</div>
          </div>
          <div>
            <div className="row">
              <span className="dscr">职位</span>{member.position || "无职位"}</div>
            <div className="row">
              <span className="dscr">分数</span>{member.personalScore}</div>
          </div>
        </div>
        <footer style={{
          display: 'flex', justifyContent: 'space-between'
        }}>
          <Button
            type={"primary"}
            shape="round"
            onClick={openPosition.bind(null, member.id)}
          >设置职位</Button>
          <Button
            type="primary"
            shape="round"
          >为他投票</Button>
        </footer>

      </Card>
    )
  }

  return (
    <div>
      <PageHeader title="我的公司"/>
      <Card
        hoverable={true}
        style={{margin: '15px'}}>
        <MyCompany/>
      </Card>

      <PageHeader title="成员"/>
      <Lists
        column={3}
        dataSource={state.members}
        render={item => <Member member={item}/>}
      />

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
        >
          确 认
        </Button>
      </Modal>

      <PageHeader title="所有公司"/>
      <MyTable
        columns={companyColumns}
        dataSource={state.companies}
      />

    </div>
  )
}

export default memo(Company)
