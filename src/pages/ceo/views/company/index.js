import React, { useState, useEffect, useReducer, memo } from 'react'
import Lists from '../../components/Lists'
import { Card, PageHeader, Button, message, InputNumber, Tooltip, Modal } from "antd";
import {
  getMember,
  showAllCompany,
  voteForCompany,
  companyScore,
  showScored
} from "../../../../until/api/ceo";
import MyTable from "../../components/MyTable";
import WithModal from "../../components/WithModal";
import MyCompany from "./components/MyCompany";
import Member from "./components/Member";
import Confirm from "../../components/Comfirm";

import './style/position.scss'

const { confirm } = Modal

const errorMsg = '只能对其它类型公司进行操作'

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
  /* 占位 */
}

const validateVote = (myType, target) => {
  if (!myType) {
    return false
  }
  // 转数字
  myType = parseInt(myType)
  target = parseInt(target)
  return (myType < 3 && target >= 3) || (myType >= 3 && target < 3)
}

const reducer = (state, action) => {
  const { payload, type } = action
  switch (type) {
    case 'SET_COMPANY_STATE':
      return {
        ...state,
        companies: payload.object,
        companyTotal: payload.totalNumber,
        pageSize: payload.pageSize
      }
    case 'SET_MEMBER_STATE':
      return {
        ...state,
        members: payload.members,
        scoredList: payload.scoredList
      }
    case 'SET_COMPANY_NAME':
      return {
        ...state,
        companyName: payload
      }
    default:
      alert('违规操作!')
      return { ...state }
  }
}

function Company(props) {
  const { userId } = props
  const [state, dispatch] = useReducer(reducer, {
    companies: null,
    companyTotal: 0,
    members: null
  })
  const [score, setScore] = useState(100)

  const handleScore = async (studentId) => {
    const res = await companyScore(userId, score, studentId)
    if (!res) return
    if (res.flag) {
      message.success("打分成功")
      cancel()
      fetchShowAllCompany(userId, 0)
    } else {
      message.info(res.message || "网络异常")
    }
  }
  const showConfirm = () => {
    confirm({
      title: '打分不能撤销，是否确定？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        handleScore.call(null, userId)
      }
    })
  }
  const fetchGetMember = async () => {
    const scored = await showScored(userId)
    const scoredList = scored.data
    const res = await getMember(userId)
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
      payload: {
        members: res.data,
        scoredList
      }
    })
  }
  const fetchShowAllCompany = async (userId) => {
    const res = await showAllCompany(userId, 0)
    if (!res.flag) return
    dispatch({
      type: 'SET_COMPANY_STATE',
      payload: res.data
    })
  }

  const vote = async (targetTypeCode, ceo) => {
    const typeCode = sessionStorage.getItem('typeCode')
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
      render(text, { typeCode }) {
        return (typeCode < 3 ? <div>普通公司</div> : <div>其他机构</div>)
      }
    }, {
      title: '分数',
      dataIndex: 'companyScore',
      render(_, { companyScore }) {
        return <span>{companyScore || '暂无'}</span>
      }
    }, {
      title: 'ceo',
      dataIndex: 'ceoName'
    }, {
      title: 'ceo学号',
      dataIndex: 'ceo'
    }, {
      title: '班级号',
      dataIndex: 'teachclass'
    }, {
      title: '创建时间',
      dataIndex: 'creatTime'
    }, {
      title: '操作',
      render(text, { ceo, typeCode }) {
        /*
        *   检查是不是可以操作的公司类型
        *   0-2普通公司
        *   >3 其它机构
        *   只能互相打分
        */
        const canOperate = validateVote(sessionStorage.getItem('typeCode'), typeCode)
        return canOperate ? (
          <>
            <Confirm
              text="每个人只能投一次票，是否确定"
              render={(open, onOk) => {
                onOk(vote.bind(null, typeCode, ceo))
                return <Button onClick={open}>投票</Button>
              }}
            />

            <WithModal
              render={(props, onCancel) => {
                cancel = onCancel
                return <Button
                  type="primary"
                  {...props}
                >
                  打分
                </Button>
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center'
              }}>
                <div style={{
                  textAlign: 'center'
                }}>
                  分数
                  <br />
                  <span style={{
                    color: '#a0a0a0',
                    fontSize: '14px'
                  }}>(0 - 100)</span>
                </div>
                <Tooltip
                  title="上下键可以快速调整分数"
                >
                  <InputNumber
                    defaultValue={100}
                    autoFocus
                    onChange={
                      val => {
                        setScore(Math.max(0, Math.min(100, val)))
                      }
                    }
                    max={100}
                    min={0}
                  />
                </Tooltip>

                <Button type="primary" onClick={showConfirm}>打分</Button>
              </div>
            </WithModal>
          </>
        ) : (
            <>
              <Tooltip title={errorMsg}>
                <Button
                  disabled={true}
                  onClick={vote.bind(null, typeCode, ceo)}>
                  投票
                </Button>
              </Tooltip>

              <WithModal
                render={
                  (props, onCancel) => {
                    cancel = onCancel
                    return <Tooltip title={errorMsg}>
                      <Button
                        disabled={true}
                        type="primary"
                        {...props}
                      >
                        打分
                      </Button>
                    </Tooltip>
                  }
                }
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  alignItems: 'center'
                }}>
                  <div style={{
                    textAlign: 'center'
                  }}>
                    分数
                  <br />
                    <span style={{
                      color: '#a0a0a0',
                      fontSize: '14px'
                    }}>(0 - 100)</span>
                  </div>
                </div>
              </WithModal>
            </>
          )
      }
    }
  ]
  companyColumns.forEach(item => item.align = 'center')
  useEffect(() => {
    fetchGetMember(userId)
    fetchShowAllCompany(userId, 1)
  }, [])
  return (
    <div>
      <PageHeader title="我的公司" />
      <Card
        hoverable={true}
        style={{ margin: '15px', width: '500px' }}>
        <MyCompany />
      </Card>

      <PageHeader title="成员" />
      <Lists
        column={3}
        dataSource={state.members}
        render={item => (
          <Member
            ceoId={userId}
            reload={fetchGetMember}
            member={item}
            scoredList={state.scoredList}
          />
        )}
      />

      <PageHeader title="所有公司" />
      <MyTable
        columns={companyColumns}
        dataSource={state.companies}
      />
    </div>
  )
}

export default memo(Company)
