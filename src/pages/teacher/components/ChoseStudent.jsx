import React, { Component, Fragment } from 'react'
import {
  Table, Button, message,Modal,InputNumber,Radio,Tag
} from 'antd';

import '../../teacher/style/ComInfo.css';
import { showAll } from '../../../until/api/teacherApi';
import { ShowNoComStu } from '../../../until/api/teacherApi';


class ChoseStudent extends Component { 
    constructor(props) { 
        super(props);
        this.state = {
            columns : [
                {
                  title: '学号',
                  dataIndex: 'sno',
                },
                {
                  title: '姓名',
                  dataIndex: 'sname',
                },
            ],
            data: [],
            pagination: {
                total:20,
                pageSize: 7,
                current:1,
                // onChange: this.onchange,
                showSizeChanger:false
            },
            loading: false,
            selectedRowKeys: "",
        }
    }

    // onchange = (page) => { 
    //     // console.log(e);
    //     console.log(page);
    //     let pa = this.state.pagination;
    //     pa.current = page;
    //     this.setState({
    //         pagination:pa
    //     })
    //     // console.log(this.state.pagination);
    //     this.setState({
    //         loading:true
    //     })
    //     // console.log(localStorage.teachclass);
    //     let res = showAll(localStorage.teachclass, page);
    //     res.then(
    //         (result) => { 
    //             let data = JSON.parse(result.data);
    //             if (data === undefined) { 
    //                 this.setState({
    //                     pagination: {
    //                         total: 0,
    //                         onChange: this.onchange,
    //                         pageSize: 7,
    //                         hideOnSinglePage: true,
    //                         current: page,
    //                         showSizeChanger:false
    //                     }
    //                 })
    //             }
    //             else if (data[0].page <= 7) {
                    
    //                 this.setState({
    //                     pagination: {
    //                         total: data[0].page,
    //                         onChange: this.onchange,
    //                         pageSize: 7,
    //                         hideOnSinglePage: true,
    //                         current: page,
    //                         showSizeChanger:false
    //                     }
    //                 })
    //             }
    //             else { 
    //                 this.setState({
    //                     pagination: {
    //                         total: data[0].page,
    //                         onChange: this.onchange,
    //                         pageSize: 7,
    //                         hideOnSinglePage: false,
    //                         current: page,
    //                         showSizeChanger:false
    //                     }
    //                 })
    //             }

    //             let newData = [];
    //             for (let i in data) { 
    //                 newData.push({
    //                     key: data[i].studentId,
    //                     "sno": data[i].studentId,
    //                     "sname":data[i].userName
    //                 })
    //             };
    //             this.setState({
    //                 data: newData,
    //                 loading:false
    //             });
    //         },
    //         (err) => { 
    //             console.log(err);
    //         }
    //     )
    //   }

    componentDidMount() { 
        this.props.onRef(this);
        this.setState({ loading: true });
        let res = ShowNoComStu(localStorage.teachclass);
        // let res = showAll(localStorage.teachclass, 1);
        let mydata = [];
        res.then(
            (result) => { 
                console.log(result);
                // let data = JSON.parse(result.data);
                // console.log(data[0].page);
                if (result === undefined) { 
                    this.setState({
                        pagination: {
                            total: 0,
                            // onChange: this.onchange,
                            pageSize: 7,
                            hideOnSinglePage: true,
                            // current: 1,
                            showSizeChanger:false
                        }
                    })
                }
                // data[0].page <= 7
                else if (result.data.data.length<=7) {
                    
                    this.setState({
                        pagination: {
                            total: result.data.data.length,
                            // onChange: this.onchange,
                            pageSize: 7,
                            hideOnSinglePage: true,
                            // current: 1,
                            showSizeChanger:false
                        }
                    })
                }
                else { 
                    this.setState({
                        pagination: {
                            total: result.data.data.length,
                            // onChange: this.onchange,
                            pageSize: 7,
                            hideOnSinglePage: false,
                            // current: 1,
                            showSizeChanger:false
                        }
                    })
                    console.log(this.state.pagination)
                }

                let newData = [];
                for (let i in result.data.data) { 
                    newData.push({
                        key: result.data.data[i].userId,
                        "sno": result.data.data[i].userId,
                        "sname":result.data.data[i].userName
                    })
                };
                this.setState({
                    data: newData,
                    loading:false
                });
            },
            (err) => { 
                console.log(err);
            }
        )
    }

    toParent = () => {
        // console.log(this.props.parent.getChildrenMsg.bind(this, this.state.msg))
        // console.log('I am the child');
        // console.log(this.state.selectedRowKeys[0]);

        // let studentId = this.state.selectedRowKeys[0];

        this.props.parent.getChildrenData(this, this.state.selectedRowKeys[0]);
    }

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
        
    };
    
    render() { 
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectChange,
          type:"radio"
        };
        // const hasSelected = selectedRowKeys.length > 0;
        return (
          <div>
            
                <Table
                    
                    rowSelection={rowSelection}
                    columns={this.state.columns}
                    dataSource={this.state.data}
                    loading={this.state.loading}
                    pagination={this.state.pagination}
                />
          </div>
        );
    }
}
export default ChoseStudent;