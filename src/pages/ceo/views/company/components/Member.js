import React, {memo, useState, useMemo} from "react";
import {Button, Card, message, Radio, InputNumber} from "antd";
import WithModal from '../../../components/WithModal'
import {setPosition, studentScore} from "../../../../../until/api/ceo";
import {Tooltip} from 'antd';

let cancel = () => {
  /* 占位 */
}
let cancelPos = () => {
  /* 占位 */
}
const validateScore = score => {
  score = score << 0
  if (score > 100) return 100
  if (score < 70) return 70
  return score
}
const positions = [
  'ceo',
  '副总裁',
  '总裁'
]

const Member = (props) => {
  const {member, ceoId, reload, scoredList} = props
  const scoreMap = useMemo(() => {
    const map = new Map()
    for (let i = 0; i < scoredList.length; i++) {
      const {studentId, scoreCeo} = scoredList[i]
      map.set(studentId, scoreCeo)
    }
    return map
  }, [scoredList])

  const {studentId, userName, id, academy, position, personalScore} = member
  const [posValue, setPosValue] = useState('ceo')
  const [score, setScore] = useState(0)
  const handleSetPosition = async () => {
    const res = await setPosition(ceoId, studentId, posValue)
    if (!res) {
      return
    }
    if (res.flag) {
      message.success('设置成功')
      cancelPos()
      reload()
    } else {
      message.info(res.message || '网络错误')
    }
  }
  const handleScore = async () => {
    const res = await studentScore(score, studentId, ceoId)
    if (!res) return
    if (!res.flag) {
      message.info(res.message || '网络错误')
      return
    }
    message.success('评分成功')
    cancel()
    reload()
  }

  return (
    <Card
      key={id}
      hoverable={true}
    >
      <div style={{fontSize: '16px'}}>{userName}</div>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        margin: '15px 0', alignItems: 'flex-end', fontSize: '16px'
      }}>
        <div>
          <div className="row">
            <span className="dscr">专业</span>{academy}</div>
          <div className="row">
            <span className="dscr">学号</span>{studentId}</div>
        </div>
        <div>
          <div className="row">
            <span className="dscr">职位</span>{position || "无职位"}</div>
          <div className="row">
            <span className="dscr">分数</span>{personalScore}</div>
        </div>
      </div>

      <footer style={{
        display: 'flex', justifyContent: 'space-between'
      }}>
        <WithModal
          render={
            (props, onCancel) => {
              cancelPos = onCancel
              return (
                <Button
                  type="primary"
                  shape="round"
                  {...props}
                  disabled={studentId === ceoId}
                >设置职位</Button>
              )
            }
          }
        >
          <div style={{textAlign: 'center', fontSize: '18px'}}>职位</div>
          <Radio.Group
            style={{margin: '15px'}}
            className="flex"
            defaultValue={posValue}
            onChange={({target: {value}}) => {
              setPosValue(value)
            }}
          >
            <div className="flex-around">
              {
                positions.map(position => (
                  <Radio.Button
                    buttonStyle="solid"
                    key={position}
                    value={position}
                  >
                    {position}
                  </Radio.Button>
                ))
              }
            </div>
          </Radio.Group>
          <Button
            style={{
              display: 'block',
              margin: '0 auto'
            }}
            type="primary"
            shape="round"
            onClick={handleSetPosition.bind(null)}
            disabled={!posValue}
          >确 认</Button>
        </WithModal>
        <WithModal
          render={
            (props, onCancel) => {
              cancel = onCancel
              const score = scoreMap.get(studentId)
              return <Button
                type="primary"
                shape="round"
                {...props}
                disabled={studentId === ceoId || score}
              >
                {score ? '已评分：' + score : '学生互评'}
              </Button>
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
              <br/>
              <span style={{
                color: '#a0a0a0',
                fontSize: '14px'
              }}>(70 - 100)</span>
            </div>
            <Tooltip
              title="上下键可以快速调整分数"
            >
              <InputNumber
                defaultValue={100}
                autoFocus
                onChange={score => {
                  setScore(score >> 0)
                }}
                value={validateScore(score)}
                max={100}
                min={70}
              />
            </Tooltip>
            <Button type="primary" onClick={handleScore.bind(null)}>评分</Button>
          </div>
        </WithModal>
      </footer>
    </Card>
  )
}
export default memo(Member)
