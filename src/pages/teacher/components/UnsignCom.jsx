import React from 'react'
import { Table, Button,notification } from "antd"
import { showAll} from '../../../until/api/teacherApi'
const columns = [
    {
        title: '名字',
        dataIndex: 'name',

    },
    {
        title: '学号',
        dataIndex: 'id',

    },
    {
        title:'班级',
        dataIndex:'class'
    },
    {
        title:'时间',
        dataIndex:'time'
    },
    {
        title:'操作',
        dataIndex:'agree',
        render:(text,record,index)=>(
            <Button>设置为已签到</Button>
        )
    }
];
let data = [{
    name:'lovia',
    id:'1',
    class:'1',
    time:'1'
},{
    name:'lovia',
    id:'2',
    class:'1',
    time:'1'
}]
class UnsignCom extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){

    }
    render(){
        return(
            <div>
                <Table
                columns={columns}
                dataSource={data}
                rowKey={record => record.id}
                ></Table>
            </div>
        )
    }
}
export default UnsignCom