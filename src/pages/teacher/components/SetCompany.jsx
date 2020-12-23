import React from 'react'
import { InputNumber, Button, notification, Spin } from 'antd'
import '../../../static/style/teacherStyle.scss'
import { showConfig, updateConfigCompany } from '../../../until/api/teacherApi'
class SetCompany extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            teachclass: localStorage.getItem("teachclass"),
            loading:true,
            companyScore: "",
            newsScore: "",
            bankScore: "",
            accountScore: "",
            tradeScore: "",
            revenueScore: "",
            agencyScore: "",
            fromCompanyScore: ""
        }
    }
    render() {
        return (
            <Spin spinning={this.state.loading}>
                <div className="setChild">

                    <div className="setCompany">
                        <div>
                            <div className="item">
                                <span className="name">老师给普通企业打分占比:</span>
                                <InputNumber min={0} max={10} step={0.1} value={this.state.companyScore} onChange={(number) => this.change(number, "companyScore")} />
                            </div>
                            <div className="item">
                                <span className="name">新闻机构打分占比:</span>
                                <InputNumber min={0} max={10} step={0.1} value={this.state.newsScore} onChange={(number) => this.change(number, "newsScore")} />
                            </div>
                            <div className="item">
                                <span className="name">银行打分占比:</span>
                                <InputNumber min={0} max={10} step={0.1} value={this.state.bankScore} onChange={(number) => this.change(number, "bankScore")} />
                            </div>
                            <div className="item">
                                <span className="name">会计事务所打分占比:</span>
                                <InputNumber min={0} max={10} step={0.1} value={this.state.accountScore} onChange={(number) => this.change(number, "accountScore")} />
                            </div>
                            <div className="item">
                                <span className="name">工商局打分占比:</span>
                                <InputNumber min={0} max={10} step={0.1} value={this.state.tradeScore} onChange={(number) => this.change(number, "tradeScore")} />
                            </div>
                            <div className="item">
                                <span className="name">税务局打分占比:</span>
                                <InputNumber min={0} max={10} step={0.1} value={this.state.revenueScore} onChange={(number) => this.change(number, "revenueScore")} />
                            </div>
                        </div>
                        <div>
                            <div className="item">
                                <span className="name">老师给机构打分占比:</span>
                                <InputNumber min={0} max={10} step={0.1} value={this.state.agencyScore} onChange={(number) => this.change(number, "agencyScore")} />
                            </div>
                            <div className="item">
                                <span className="name">企业互评给机构打分占比:</span>
                                <InputNumber min={0} max={10} step={0.1} value={this.state.fromCompanyScore} onChange={(number) => this.change(number, "fromCompanyScore")} />
                            </div>
                        </div>

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
                    companyScore: res.companyScore,
                    newsScore: res.newsScore,
                    bankScore: res.bankScore,
                    accountScore: res.accountScore,
                    tradeScore: res.tradeScore,
                    revenueScore: res.revenueScore,
                    agencyScore: res.agencyScore,
                    fromCompanyScore: res.fromCompanyScore,
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
        updateConfigCompany(this.state.companyScore, this.state.newsScore, this.state.bankScore, this.state.accountScore, this.state.tradeScore, this.state.revenueScore, this.state.agencyScore, this.state.fromCompanyScore, this.state.teachclass).then(rs => {
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
export default SetCompany