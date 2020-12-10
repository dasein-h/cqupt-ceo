import React from 'react'
import { Table, Button, notification,Space } from "antd"
import { noSign,setNosign } from '../../../until/api/teacherApi'
const columns = [
    // {
    //     title: '名字',
    //     dataIndex: 'name',

    // },
    {
        title: '学号',
        dataIndex: 'id',

    },
    // {
    //     title:'班级',
    //     dataIndex:'class'
    // },
    {
        title: '时间',
        dataIndex: 'time'
    },
    {
        title: '操作',
        dataIndex: 'agree',
        render: (text, record, index) => (
            <Button>设置为到勤</Button>
        )
    }
];
let data = [{
    name: 'lovia',
    id: '1',
    class: '1',
    time: '1'
}, {
    name: 'lovia',
    id: '2',
    class: '1',
    time: '1'
}]
class UnsignCom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            teachclass: localStorage.getItem("teachclass"),
            loading: true,
            data: [],
            pagination: {
                showSizeChanger: false,
                pageSize: 6,
                current: 1,
                total: "",
                hideOnSinglePage: true,
                onChange: (page, pageSize) => {
                    //   this.changePage(page);
                    this.state.pagination.current = page
                    console.log(this.state.pagination.current);
                }
            },
            columns: [
                // {
                //     title: '名字',
                //     dataIndex: 'name',

                // },
                {
                    title: '学号',
                    dataIndex: 'id',

                },
                {
                    title: '状态',
                    dataIndex: 'sign'
                },
                {
                    title: '时间',
                    dataIndex: 'time'
                },
                {
                    title: '操作',
                    dataIndex: 'agree',
                    render: (text, record, index) => {
                        let sign;
                        if(record.sign === "迟到"){
                            sign = "旷课"
                        }else if(record.sign === "旷课"){
                            sign = "迟到"
                        }
                        return (
                            <Space>
                                <Button size="small" type="primary" ghost onClick={() => { this.setOn(record) }}>到勤</Button>
                                <Button size="small" type="primary" ghost onClick={() => { this.setOther(record) }}>{sign}</Button>
                            </Space>
                        )
                    }
                }
            ]
        }
    }
    componentDidMount() {
        this.changePage();
    }
    changePage = (page) => {
        let lists = [];
        noSign(this.state.teachclass,).then((res) => {
            this.setState({ loading: false });
            //   console.log(res.data.data);
            let rs = res.data.data;
            console.log(rs);
            if (rs.length === 0) {
                this.setState({
                    data: []
                })
            } else {
                for (let i = 0; i < rs.length; i++) {
                    let sign;
                    if (rs[i].sign === 1) {
                        sign = "迟到"
                    } else if (rs[i].sign === 2) {
                        sign = "旷课"
                    }
                    lists.push({
                        "id": rs[i].studentId,
                        "time": rs[i].addtime,
                        "index": i,
                        "sign": sign
                    })
                }
                let pagination = { ...this.state.pagination };
                pagination.total = rs.length;
                console.log(this.state.pagination.total);
                this.setState({ data: lists, pagination: pagination });
                //   console.log(this.state.pagination.total);
            }
        }).catch(err => {
            this.setState({ loading: false })
            notification.open({
                message: '警告',
                placement: "bottomRight",
                description:
                    '请求超时或服务器异常,请检查网络或联系管理员!',
            });
        })

    }
    render() {
        return (
            <div>
                <Table
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    columns={this.state.columns}
                    dataSource={this.state.data}
                    rowKey={record => record.index}
                ></Table>
            </div>
        )
    }
    setOn = (record) => {
        setNosign(record.id,this.state.teachclass,1,0).then( rs => {
            console.log(rs);
        })
    }
    setOther = (record) => {
        let type;
        if(record.sign === "迟到"){
            type = 2
        }else if(record.sign === "旷课"){
            type = 1;
        }
        setNosign(record.id,this.state.teachclass,1,type).then( rs => {
            console.log(rs);
        })
    }
}
export default UnsignCom