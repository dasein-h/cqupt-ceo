import React from 'react'
import { Tabs} from "antd"
import SignedCom from "../components/SignedCom"
import UnsignCom from "../components/UnsignCom"
const { TabPane } = Tabs;

class Sign extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <div>
                    <Tabs defaultActiveKey="1" size="middle" style={{marginTop:-15}}>
                        <TabPane tab="选择未签到学生" key="1">
                            <SignedCom></SignedCom>
                        </TabPane>
                        <TabPane tab="未签到学生情况" key="2">
                            <UnsignCom></UnsignCom>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}
export default Sign;
