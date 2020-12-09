import React from 'react'
import {InputNumber} from 'antd'
class SetCompany extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                 <div className="item">
                    <span className="name">老师给普通企业打分占比:</span>
                    <InputNumber min={0} max={10} step={0.1} />
                </div>
                <div className="item">
                    <span className="name">新闻机构打分占比:</span>
                    <InputNumber min={0} max={10} step={0.1} />
                </div>
                <div className="item">
                    <span className="name">银行打分占比:</span>
                    <InputNumber min={0} max={10} step={0.1} />
                </div>
                <div className="item">
                    <span className="name">会计事务所打分占比:</span>
                    <InputNumber min={0} max={10} step={0.1} />
                </div>
                <div className="item">
                    <span className="name">工商局打分占比:</span>
                    <InputNumber min={0} max={10} step={0.1} />
                </div>
                <div className="item">
                    <span className="name">税务局打分占比:</span>
                    <InputNumber min={0} max={10} step={0.1} />
                </div>
                <div className="item">
                    <span className="name">老师给机构打分占比:</span>
                    <InputNumber min={0} max={10} step={0.1} />
                </div>
                <div className="item">
                    <span className="name">企业互评给机构打分占比:</span>
                    <InputNumber min={0} max={10} step={0.1} />
                </div>
                
            </div>
        )
    }
}
export default SetCompany