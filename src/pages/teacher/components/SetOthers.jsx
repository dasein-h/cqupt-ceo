import React from 'react'
import { InputNumber, Button, notification, Spin } from 'antd'
import { showConfig, updateConfigOther } from '../../../until/api/teacherApi'
class SetOthers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            teachclass: localStorage.getItem("teachclass"),
            late: "",
            absence: "",
            sameClassMember: "",
            companyNum: "",
            loading: true
        }
    }
    render() {
        return (
            <Spin spinning={this.state.loading}>
                <div className="setChild">
                    <div className="item3">
                        <span className="name">迟到一次扣分:</span>
                        <InputNumber min={0} max={100} step={1} value={this.state.late} onChange={(value) => this.change(value, "late")} />
                    </div>
                    <div className="item3">
                        <span className="name">旷到一次扣分:</span>
                        <InputNumber min={0} max={100} step={1} value={this.state.absence} onChange={(value) => this.change(value, "absence")} />
                    </div>
                    <div className="item3">
                        <span className="name">公司最多允许人数:</span>
                        <InputNumber min={0} step={1} value={this.state.sameClassMember} onChange={(value) => this.change(value, "sameClassMember")} />
                    </div>
                    <div className="item3">
                        <span className="name">一个企业允许同一个班级的同学个数:</span>
                        <InputNumber min={0} step={1} value={this.state.companyNum} onChange={(value) => this.change(value, "companyNum")} />
                    </div>
                    <Button className="submit" onClick={() => this.submit()}>修改</Button>
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
                    late: res.late,
                    absence: res.absence,
                    sameClassMember: res.sameClassMember,
                    companyNum: res.companyNum,
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
        updateConfigOther(this.state.late, this.state.absence, this.state.sameClassMember, this.state.companyNum, this.state.teachclass).then(rs => {
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
export default SetOthers