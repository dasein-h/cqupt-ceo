import React from 'react'
import { InputNumber,Button } from 'antd'
import '../../../static/style/teacherStyle.scss'
import { showConfig } from '../../../until/api/teacherApi'
class SetPersonal extends React.Component {
    constructor(props) {
        super(props)
        console.log(props);
        this.state = {
            teachclass:localStorage.getItem("teachclass")
        }
    }
    render() {
        return (
            <div>
                <div className="item">
                    <span className="name">CEO打分占比:</span>
                    <InputNumber min={0} max={10} step={0.1} />
                </div>
                <div className="item">
                    <span className="name">成员互评打分占比:</span>
                    <InputNumber min={0} max={10} step={0.1} />
                </div>
                <div className="item">
                    <span className="name">签到打分占比:</span>
                    <InputNumber min={0} max={10} step={0.1} />
                </div>
                <Button className="submit">提交</Button>
            </div>
        )
    }
    componentDidMount(){
        showConfig(this.state.teachclass).then(rs => {
            let res = rs.data.data
            console.log(res);
            this.setState = {
                 ceoScore:res.ceoScore,
                 memberScore:res.memberScore,
                 signScore:res.signScore
            }
         })
    }
}
export default SetPersonal