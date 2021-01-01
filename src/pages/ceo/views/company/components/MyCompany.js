import React, {useState, memo, useEffect} from "react";
import {Button, Card, Input, message, Radio} from "antd";
import {changeCompanyName, createCompany as createCompanyImpl, createCompany} from '../../../../../until/api/ceo';
import WithModal from "../../../components/WithModal";
import {companyInfo} from "../../../../../until/api/ceo";
import {connect} from 'react-redux'

let cancel = () => {
}
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

const MyCompany = (props) => {
  const {hasCompany, setHasCompany} = props
  const userId = localStorage.getItem('userId')
  const [info, setInfo] = useState(null)
  const [name, setName] = useState('')


  useEffect(() => {
      companyInfo(userId)
        .then(
          res => {
            if (!res.flag) {
              message.info(res.message || '数据库异常')
              return
            }
            if (!res.data) {
              setHasCompany(false)
              return
            }
            setHasCompany(true)
            const {typeCode} = res.data
            localStorage.setItem('typeCode', typeCode)
            setInfo(res.data)
          }
        )
    }, []
  )
  const changeName = async () => {
    if (name.length > 10) {
      message.info("公司名字最长不超过10个汉字")
      return
    }
    const res = await changeCompanyName(userId, name.trim()).catch(e => {
      console.log('网络异常')
    })
    cancel()
    if (!res) {
      return
    }
    if (res.data.flag) {
      message.success('申请成功')

    } else {
      message.info('遇到错误' + res.message || '')
    }
  }

  const CreateCompany = (props) => {
    const [companyType, setCompanyType] = useState('')
    const [companyName, setCompanyName] = useState('')
    const createCompany = async (userId) => {
      if (!companyName) {
        message.info("请输入公司名")
        return
      }
      const res = await createCompanyImpl(userId, companyName, companyType)
      if (!res) return
      if (res.flag) {
        message.success('创建公司成功')
        cancel()
      } else {
        message.warn(res.message || '数据库异常')
      }
    }

    return (
      <WithModal
        render={
          (props, onCancel) => {
            cancel = onCancel
            return (
              <Button
                style={{width: '100%', height: '100%'}}
                {...props}
              >创建公司</Button>
            )
          }
        }
      >
        <Input placeholder="公司名" onChange={e => setCompanyName(e.target.value)}/>
        <Radio.Group
          defaultValue='贸易公司'
          onChange={({target: {value}}) => {
            setCompanyType(value)
          }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {
            companyTypes.map(type => (
              <Radio.Button
                style={{
                  margin: '5px'
                }}
                buttonStyle="solid"
                key={type}
                value={type}
              >
                {type}
              </Radio.Button>
            ))
          }
        </Radio.Group>
        <br/>
        <Button
          style={{
            display: 'block',
            margin: '0 auto'
          }}
          onClick={createCompany.bind(null, userId)}
          type="primary"> 创 建 </Button>
      </WithModal>
    )
  }
  return (
    <div>
      <div className="my-company">
        {
          info
            ? (
              <div className="flex_grid">
                <div>
                  <div className="item">
                    <span className="dscr">
                      公司名
                    </span>{info.companyName}</div>
                  <div className="item">
                    <span className="dscr">创建于</span>
                    {info.creatTime}</div>
                  <div className="item">
                    <span className="dscr">老师打分</span>
                    {info.scoreTeacher}</div>
                  <div className="item">
                    <span className="dscr">公司得分</span>
                    {info.companyScore}</div>
                </div>
                <div>
                  <div className="item">
                    <span className="dscr">
                      成员数
                    </span>{info.studentNum}
                  </div>
                  <div className="item">
                    <span className="dscr">
                      机构
                    </span>{(info.typeCode || localStorage.getItem('typeCode')) < 3 ? '普通公司' : '其他机构'}
                  </div>
                  <div className="item">
                    <span className="dscr">ceo打分</span>
                    {info.scoreCeo}</div>
                </div>
                <WithModal
                  render={
                    (props, _cancel) => {
                      cancel = _cancel
                      return (
                        hasCompany ? <Button {...props} type="primary">申请改名</Button> : <></>
                      )
                    }
                  }
                >
                  <div className="flex column">
                    <div style={{textAlign: 'center'}}>输入公司名</div>
                    <Input
                      style={{margin: '10px 0'}}
                      defaultValue={info.companyName}
                      onChange={e => setName(e.target.value)}
                    />
                    <Button
                      onClick={changeName}
                      type="primary"
                      style={{marginLeft: '0'}}>确认</Button>
                  </div>
                </WithModal>
              </div>
            ) : <CreateCompany/>
        }
      </div>
    </div>
  )
}

export default connect(
  state => ({hasCompany: state.hasCompany}),
  dispatch => ({
    setHasCompany(bool) {
      dispatch({
        type: 'SET_HAS_COMPANY',
        payload: bool
      })
    }
  })
)(MyCompany)
