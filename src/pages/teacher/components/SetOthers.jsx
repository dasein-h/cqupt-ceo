import React from 'react'
import { InputNumber, Button, notification, Spin,message } from 'antd'
import { showConfig, updateConfigOther } from '../../../until/api/teacherApi'
class SetOthers extends React.Component {
    constructor(props) {
        super(props)
        sessionStorage.setItem("setKey",JSON.stringify({key:3,route:'/Teacher/Set/Other'}))
        this.state = {
            btnLoad:false,
            title: [{ "title": "迟到一次扣分:", "name": "late", "value": "" }, { "title": "旷到一次扣分:", "name": "absence", "value": "" }, { "title": "公司最多允许人数:", "name": "sameClassMember", "value": "" }, { "title": "一个企业允许同一个班级的同学个数", "name": "companyNum", "value": "" }],
            teachclass: sessionStorage.getItem("teachclass"),
            loading: true
        }
    }
    render() {
        let list = this.state.title.map((item, index) => {
            return (
                <div className="item3"  key = {index}>
                    <span className="name">{item.title}</span>
                    <InputNumber min={0} max={100} step={1} value={item.value} onChange={(value) => this.change(value, index)} />
                </div>)
        })
        return (
            <Spin spinning={this.state.loading}>
                <div className="setChild">
                    {list}
                    <Button ghost type="primary"  loading={this.state.btnLoad} className="submit" onClick={() => this.submit()}>修改</Button>
                </div>
            </Spin>
        )
    }
    componentDidMount() {
        showConfig(this.state.teachclass).then(rs => {
            if (rs.data.flag === true) {
                let res = rs.data.data
                let title = [...this.state.title];
                title[0].value = res.late;
                title[1].value = res.absence;
                title[2].value = res.sameClassMember;
                title[3].value = res.companyNum
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
        updateConfigOther(this.state.title[0].value, this.state.title[1].value, this.state.title[2].value, this.state.title[3].value,this.state.teachclass).then(rs => {
            this.setState({
                btnLoad:false
            })
            if (rs.data.flag === true) {
                message.success("修改成功")

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
export default SetOthers