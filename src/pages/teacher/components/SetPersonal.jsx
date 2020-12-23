import React from 'react'
import { InputNumber, Button, notification, Spin } from 'antd'
import '../../../static/style/teacherStyle.scss'
import { showConfig, updateConfigMember } from '../../../until/api/teacherApi'
class SetPersonal extends React.Component {
    constructor(props) {
        super(props)
        console.log(props);
        this.state = {
            loading:true,
            ceoScore: "",
            memberScore: "",
            signScore: "",
            teachclass: localStorage.getItem("teachclass")
        }
    }
    render() {
        return (
            <Spin spinning={this.state.loading}>
                <div className="setChild">
                    <div className="item">
                        <span className="name">CEO打分占比:</span>
                        <InputNumber min={0} max={10} step={0.1} value={this.state.ceoScore} onChange={(number) => this.change(number, "ceoScore")} />
                    </div>
                    <div className="item">
                        <span className="name">成员互评打分占比:</span>
                        <InputNumber min={0} max={10} step={0.1} value={this.state.memberScore} onChange={(number) => this.change(number, "memberScore")} />
                    </div>
                    <div className="item">
                        <span className="name">签到打分占比:</span>
                        <InputNumber min={0} max={10} step={0.1} value={this.state.signScore} onChange={(number) => this.change(number, "signScore")} />
                    </div>
                    <Button className="submit" onClick={() => this.submit()}>修改</Button>
                    <div className="notice">注意:每一列占比和要为1!</div>
                </div>
            </Spin>
        )
    }
    componentDidMount() {
        showConfig(this.state.teachclass).then(rs => {
            console.log(rs);
            if (rs.data.flag === true) {
                let res = rs.data.data
                this.setState({
                    ceoScore: res.ceoScore,
                    memberScore: res.memberScore,
                    signScore: res.signScore,
                    loading:false
                })
            } else {
                notification.open({
                    message: '警告',
                    placement: "bottomRight",
                    description:
                        '请求超时或服务器异常,请检查网络或联系管理员!',
                });
            }

        })
    }
    change = (value, key) => {
        let data = {}
        data[key] = value
        console.log(key + ":" + value);
        console.log(data);
        this.setState(data)
    }
    submit = () => {
        console.log(this.state.memberScore);
        updateConfigMember(this.state.ceoScore, this.state.memberScore, this.state.signScore, this.state.teachclass).then(rs => {
            if (rs.data.flag === true) {
                notification.open({
                    message: '提示',
                    placement: "bottomRight",
                    description:
                        '修改成功!',
                });

            } else if (rs.data.flag === false) {
                notification.open({
                    message: '提示',
                    placement: "bottomRight",
                    description:
                        '修改失败（占比总和不为1）！',
                });
            }
        })
    }
}
export default SetPersonal