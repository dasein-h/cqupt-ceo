import React from 'react'
import { InputNumber, Button, notification, Spin,message } from 'antd'
import '../../../static/style/teacherStyle.scss'
import { showConfig, updateConfigMember } from '../../../until/api/teacherApi'
class SetPersonal extends React.Component {
    constructor(props) {
        localStorage.setItem("setKey", JSON.stringify({ key: 1, route: '/Teacher/Set/Person' }))
        super(props)
        this.state = {
            btnLoad:false,
            title: [{ "title": "CEO打分", "name": "ceoScore", "value": "" }, { "title": "成员互评", "name": "memberScore", "value": "" }, { "title": "签到打分", "name": "signScore", "value": "" }],
            loading: true,
            teachclass: localStorage.getItem("teachclass")
        }
    }
    render() {
        let list = this.state.title.map((item, index) => {
            return (<div className="item" key={index}>
                <span className="name">{item.title}打分占比:</span>
                <InputNumber min={0} max={1} step={0.1} value={item.value} onChange={(number) => this.change(number, index)} />
            </div>)
        })
        return (
            <Spin spinning={this.state.loading}>
                <div className="setChild">
                    {list}
                    <div className="bottom">
                        <Button ghost type="primary" loading={this.state.btnLoad} className="submit" onClick={() => this.submit()}>修改</Button>
                        <div className="notice">注意:每一列占比和要为1!</div>
                    </div>
                </div>
            </Spin>
        )
    }
    componentDidMount() {
        showConfig(this.state.teachclass).then(rs => {
            if (rs.data.flag === true) {
                let res = rs.data.data
                let title = [...this.state.title];
                title[0].value = res.ceoScore;
                title[1].value = res.memberScore;
                title[2].value = res.signScore;
                this.setState({
                    title,
                    loading: false
                })
            } else {
                notification.warning({
                    message: '警告',
                    placement: "bottomRight",
                    description:
                      '请求超时或服务器异常,请检查网络或联系管理员!',
                  });
    
            }

        }).catch(err => {
            this.setState({ loading: false })
            notification.warning({
              message: '警告',
              placement: "bottomRight",
              description:
                '请求超时或服务器异常,请检查网络或联系管理员!',
            });
          })
    }
    change = (value, index) => {
        let title = [...this.state.title]
        title[index].value = value
        this.setState({
            title
        })
    }
    submit = () => {
        this.setState({
            btnLoad:true
        })
        updateConfigMember(this.state.title[0].value, this.state.title[1].value, this.state.title[2].value, this.state.teachclass).then(rs => {
            this.setState({
                btnLoad:false
            })
            if (rs.data.flag === true) {
                message.success('修改成功')
            } else if (rs.data.flag === false) {
                message.error(`修改失败(${rs.data.message})!`)
            }
        }).catch(err => {
            this.setState({ loading: false })
            notification.warning({
              message: '警告',
              placement: "bottomRight",
              description:
                '请求超时或服务器异常,请检查网络或联系管理员!',
            });
          })
    }
}
export default SetPersonal