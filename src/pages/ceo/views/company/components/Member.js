import React, {memo, useState, useMemo} from "react";
import { Button, Card, message, Radio, InputNumber, Input} from "antd";
import WithModal from '../../../components/WithModal'
import {setPosition, studentScore} from "../../../../../until/api/ceo";

let cancel = () => {
  /* 占位 */
}
let cancelPos = () => {
  /* 占位 */
}

const positions = [
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
  const [posValue, setPosValue] = useState(positions[0])
  const [scoreLevel, setScoreLevel] = useState(9)
  const [score, setScore] = useState(scoreLevel * 10)
  const handleSetPosition = async () => {
    if (!posValue.trim()) {
      message.info("职位不能为空")
    }
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
    if (!res) {
      return
    }
    if (!res.flag) {
      message.info(res.message + '\n每个公司的优秀，良好，及格，人数是有限的' || '网络错误')
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
          <Input
            value={position}
            onChange={
              e => {
                setPosValue(e.target.value)
              }
            }
          />
          <Button
            style={{
              display: 'block',
              width: '100%',
              margin: '10px auto'
            }}
            type="primary"
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
          <div>
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
            <Radio.Group style={{
              display: 'block',
              margin: '10px auto 0',
              width: 'fit-content'
            }} value={scoreLevel} onChange={e => setScoreLevel(e.target.value)}>
              <Radio value={9}>优秀 <span className="score-limit">(90-100)</span></Radio>
              <Radio value={8}>良好 <span className="score-limit">(80-89)</span></Radio>
              <Radio value={7}>及格 <span className="score-limit">(70-79)</span></Radio>
            </Radio.Group>
            <InputNumber
              defaultValue={score}
              onChange={score => {
                setScore(score >> 0)
              }}
              style={{
                margin: '10px auto',
                display: 'block',
                width: '100%'
              }}
              value={score}
              max={(scoreLevel + 1) * 10 - (scoreLevel === 9 ? 0 : 1)}
              min={scoreLevel * 10}
            />
            <Button style={{width: '100%'}} type="primary" onClick={handleScore.bind(null)}>评分</Button>
          </div>
        </WithModal>
      </footer>
    </Card>
  )
}
export default memo(Member)
