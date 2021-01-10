import React, {useState, memo, useEffect} from "react";
import {Button, Tooltip, Input, message, Radio} from "antd";
import {changeCompanyName, createCompany as createCompanyImpl, createCompany} from '../../../../../until/api/ceo';
import WithModal from "../../../components/WithModal";
import {companyInfo} from "../../../../../until/api/ceo";
import {EditFilled} from '@ant-design/icons'

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
  const userId = sessionStorage.getItem('userId')
  const [info, setInfo] = useState(null)
  const [name, setName] = useState('')

  const fetchCompanyInfo = () => {
    companyInfo(userId)
      .then(
        res => {
          if (!res.flag) {
            message.info(res.message || '数据库异常')
            return
          }
          if (!res.data) {
            return
          }
          const {typeCode} = res.data
          sessionStorage.setItem('typeCode', typeCode)
          setInfo(res.data)
        }
      )
  }
  useEffect(() => {
    fetchCompanyInfo()
  }, [])
  const changeName = async () => {
    if (name.length > 10) {
      message.info("公司名字最长不超过10个汉字")
      return
    }
    const res = await changeCompanyName(userId, name.trim()).catch(e => {
      message.info('网络异常')
    })
    cancel()
    if (!res) {
      return
    }
    if (res.data.flag) {
      message.success('申请成功')
      cancel()
    } else {
      message.info('遇到错误' + res.message || '')
    }
  }

  const CreateCompany = (props) => {
    const {reload} = props
    const [companyType, setCompanyType] = useState('贸易公司')
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
        reload()
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
    <div className="my-company">
      {
        info
          ? (
            <>
              <div className="flex_grid">
                <div>
                  <div className="item">
                      <span className="dscr">
                      公司名
                      </span>{info.companyName}
                    <WithModal
                      render={
                        (props, _cancel) => {
                          cancel = _cancel
                          return (
                            info ? <Tooltip title="申请改名">
                              <EditFilled {...props}/>
                            </Tooltip> : <></>
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
                  <div className="item">
                    <span className="dscr">创建于</span>
                    {info.creatTime}
                  </div>
                  <div className="item">
                    <span className="dscr">公司得分</span>
                    {info.companyScore}
                  </div>
                </div>
                <div>
                  <div className="item">
                    <span className="dscr">成员数</span>{info.studentNum}
                  </div>
                  <div className="item">
                    <span className="dscr">公司类型</span>
                    {
                      info.type
                    }
                  </div>
                  <div className="item">
                    <span className="dscr">老师打分</span>
                    {info.scoreTeacher}
                  </div>
                </div>
                <div>
                  <div className="item">
                    <span className="dscr">优秀数</span>{info.excellentNum}
                  </div>
                  <div className="item">
                    <span className="dscr">良好数</span>{info.goodNum}
                  </div>
                  <div className="item">
                    <span className="dscr">及格数</span>{info.mediumNum}
                  </div>
                </div>
              </div>
            </>
          )
          : <CreateCompany reload={fetchCompanyInfo}/>
      }
    </div>
  )
}

export default MyCompany
