import React, { Component, Fragment } from 'react';
import { showFile } from '../../../until/api/teacherApi';
import {Table} from 'antd';

class Download extends Component { 
    constructor(props) { 
        super(props);
        this.onchange = this.onchange.bind(this);
        this.state = {
            columns: [
                  {
                    title: '学号',
                    dataIndex: 'stuid',
                    key: 'stuid',
                  },
                  {
                    title: '文件名',
                    dataIndex: 'filename',
                    key: 'filename',
                      render: (text, record) => { 
                          let url = `http://120.79.207.60:8089/upload/download?id=` + record.id;
                          return (
                              <a href={ url}>{ text}</a>
                        )
                      }
                  },
            ],
            data: [],
            loading: false,
            pagination: {
                onChange: this.onchange,
                pageSize:15,
            }
            
        }
    }

    onchange(page) { 
        this.setState({
            loading:true
        })
        let res = showFile(localStorage.class,page);
        res.then(
            (result) => { 
                let data = JSON.parse(result.data);
                let newData = [];
                for (let i in data) { 
                    newData.push({
                        key: i,
                        "stuid": data[i].studentId,
                        "filename":data[i].fileName
                    })
                };
                this.setState({
                    data: newData,
                    loading:false
                });
                console.log(this.state.loading);
                
            },
            (err) => { 
                console.log(err);
            }
        )
    }
    componentDidMount() { 
        this.setState({
            loading:true
        })
        let res = showFile(localStorage.class,0);
        res.then(
            (result) => { 
                let data = JSON.parse(result.data);
                let newData = [];
                for (let i in data) { 
                    newData.push({
                        key: i,
                        "stuid": data[i].studentId,
                        "filename":data[i].fileName
                    })
                };
                this.setState({
                    data: newData,
                    loading:false
                });
                console.log(this.state.loading);
                
            },
            (err) => { 
                console.log(err);
            }
        )


    }
    render() { 
        return (
            <Fragment>
                <Table
                    dataSource={this.state.data}
                    columns={this.state.columns}
                    loading={this.state.loading}
                    pagination={this.state.pagination}
                />

            </Fragment>
        )
    }
}
export default Download;