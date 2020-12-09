import React from 'react'
import { InputNumber } from 'antd'
class SetOthers extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <div className="item3">
                    <span className="name">迟到一次扣分:</span>
                    <InputNumber min={0} max={100} step={1} />
                </div>
                <div className="item3">
                    <span className="name">旷到一次扣分:</span>
                    <InputNumber min={0} max={100} step={1} />
                </div>
                <div className="item3">
                    <span className="name">公司最多允许人数:</span>
                    <InputNumber min={0} step={1} />
                </div>
                <div className="item3">
                    <span className="name">一个企业允许同一个班级的同学个数:</span>
                    <InputNumber min={0} step={1} />
                </div>
                
            </div>
        )
    }
}
export default SetOthers