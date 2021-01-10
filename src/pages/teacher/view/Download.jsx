import React, { Component, Fragment } from 'react';
import { showFile,DeleteUpload,download,voteStatus,isRunSpeakVot } from '../../../until/api/teacherApi';
import { Table, message, Modal, Button } from 'antd';
import baseUrl from '../../../until/BaseUrl';



class DelPop extends React.Component { 
    constructor(props) { 
        super(props);
        this.showModal = this.showModal.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.state = {
            loading: false,
            visible: false,
        }        
    }

    showModal = () => { 
        this.setState({
            visible:true
        })
    }

    handleDelete = () => {
        const dataSource = [...this.props.parent.state.data];
        const key = this.props.record.key;
        const id = this.props.record.id;
        const page = this.props.parent.state.pagination.current;
        
        let res = DeleteUpload(id);
        this.setState({loading:true})
        res.then(
          (result) => { 
            
            if (result.data.flag == true) { 
                message.success(result.data.message);
                this.setState({ loading: false })
                this.setState({ visible: false });
                let remain = (this.props.parent.state.pagination.total - 1) % this.props.parent.state.pagination.pageSize;
                // console.log(remain);
                if (remain == 0) {
                    let page = this.props.parent.state.pagination.current;
                    // console.log(page);
                    if (page == 0) {
                        this.props.parent.onchange(page);
                    }
                    else { 
                        this.props.parent.onchange(page - 1);
                    }
                    

                }
                else { 
                    let page = this.props.parent.state.pagination.current;
                    this.props.parent.onchange(page);
                }
               
                
                }
            else {
                message.error('删除失败');
                this.setState({ loading: false });
                this.setState({ visible: false });
            }
            
          },
          (err) => { 
            
            message.warning('删除失败');
            this.setState({ loading: false });
            this.setState({ visible: false });
          }
        )
    
        

    };
    
    handleCancel = () => {
        this.setState({ visible: false });
    };

    render(){ 
        const { visible, loading } = this.state;
        return (
            <>
            <a onClick={ this.showModal}>删除</a>
            <Modal
            width="15vw"
            visible={visible}
            title=""
            onOk={this.handleDelete}
            onCancel={this.handleCancel}
            footer={[
                <Button key="back" onClick={this.handleCancel}>
                取消
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={this.handleDelete}>
                确定
                </Button>,
            ]}
            >
                    <p style={{textAlign:'center'}}>确认删除？</p>
            </Modal>
        </>
            );
    }
}


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
                    title: '教学班号',
                    dataIndex: 'teachclass',
                    key: 'teachclass',
                    },
                
                  {
                    title: '文件名',
                    dataIndex: 'filename',
                    key: 'filename',
                      render: (text, record) => { 
                          let userId = sessionStorage.userId;
                        //   let userId = localStorage.userId;
                          let url = baseUrl + "/upload/download?id=" + record.id+"&userId="+userId;
                          return (
                              <a href={url}>{ text}</a>
                        )
                      }
                },
                
                {
                    title: '删除',
                    dataIndex: 'delete',
                    key: 'delete',
                    render: (text, record) =>
                    
                    this.state.data.length >= 1 ? (
                        <DelPop record={record} data={this.state.data} parent={ this}/>
                      ) : null,
                  },
            ],
            data: [],
            voteValue: '开启宣讲投票',
            isvot:'',
            loading: false,
            
            pagination: {
                total:7,
                onChange: this.onchange,
                pageSize: 7,
                hideOnSinglePage: false,
                current:1
            }
            
        }
    }

    getChildrenData = (result,msg) => { 
        this.setState({
            data:msg
        })
    }

    onchange=(page)=> { 
        // console.log(page);
        if (page == 0) page = 1;
        let pa = this.state.pagination;
        pa.current = page;
        this.setState({
            pagination:pa
        })
        // console.log(this.state.pagination);
        this.setState({
            loading:true
        })
        // console.log(localStorage.teachclass);
        let res = showFile(sessionStorage.teachclass,page);
        res.then(
            (result) => { 
                // console.log(result);
                // let data = result.data;
                let data = JSON.parse(result.data);
                // console.log(data);
                if (data == '' || data.length==0 ||data===undefined || data==null)  { 
                    this.setState({
                        pagination: {
                            total: 0,
                            // onChange: this.onchange,
                            pageSize: 7,
                            hideOnSinglePage: true,
                            current:page
                        }
                    })
                }
                else if (data[0].filePath <= 7) {
                    
                    this.setState({
                        pagination: {
                            total: data[0].filePath,
                            onChange: this.onchange,
                            pageSize: 7,
                            hideOnSinglePage: true,
                            current:page
                        }
                    })
                }
                else { 
                    this.setState({
                        pagination: {
                            total: data[0].filePath,
                            onChange: this.onchange,
                            pageSize: 7,
                            hideOnSinglePage: false,
                            current:page
                        }
                    })
                }


                
                    let newData = [];
                    for (let i in data) { 
                        newData.push({
                            key: i,
                            "id":data[i].id,
                            "stuid": data[i].studentId,
                            "teachclass":data[i].teachclass,
                            "filename":data[i].fileName
                        })
                    };
                    this.setState({
                        data: newData,
                        loading:false
                    });
                
                    // console.log(this.state.loading);
                
                
                
            },
            (err) => { 
                message.warning('跳转失败');
                // console.log(err);
            }
        )
    }
    componentDidMount() { 
        this.setState({
            loading:true
        })
        // let res = showFile(sessionStorage.teachclass,1);
        let res = showFile(sessionStorage.teachclass,1);
        res.then(
            (result) => { 
                let data = JSON.parse(result.data);
                // console.log(data);
                if (data == '') { 
                    this.setState({
                        pagination: {
                            total: 0,
                            onChange: this.onchange,
                            pageSize: 7,
                            hideOnSinglePage: true,
                            current:1
                        }
                    })
                }
                else if (data[0].filePath <= 7) {
                    
                    this.setState({
                        pagination: {
                            total: data[0].filePath,
                            onChange: this.onchange,
                            pageSize: 7,
                            hideOnSinglePage: true,
                            current:1
                        }
                    })
                }
                else { 
                    this.setState({
                        pagination: {
                            total: data[0].filePath,
                            onChange: this.onchange,
                            pageSize: 7,
                            hideOnSinglePage: false,
                            current:1
                        }
                    })
                }
                
                let newData = [];
                for (let i in data) { 
                    newData.push({
                        key: i,
                        "stuid": data[i].studentId,
                        "filename": data[i].fileName,
                        "id": data[i].id,
                        "teachclass":data[i].teachclass
                    })
                };
                // console.log(newData);
                this.setState({
                    data: newData,
                    loading:false
                });
                
                
            },
            (err) => { 
                // console.log(err);
            }
        )

        res = isRunSpeakVot(sessionStorage.teachclass,sessionStorage.userId);
        // res = isRunSpeakVot(localStorage.teachclass,localStorage.userId);
        res.then(
            (result) => { 
                // console.log(result);
                if (result.data.flag == true) {
                    this.setState({
                        voteValue: '关闭宣讲投票'
                    })
                }
                else if (result.data.flag == false) { 
                    this.setState({
                        voteValue:'开启宣讲投票'
                    })
                }
            },
            (err) => { 
                message.error(err.data.message);
            }
        )


    }

    handleVot = () => { 
        if (this.state.voteValue == '开启宣讲投票') {
            // console.log('开启');
            let res = voteStatus(1, sessionStorage.userId, sessionStorage.teachclass);
            // let res = voteStatus(1, localStorage.userId, localStorage.teachclass);
            res.then(
                (result) => { 
                    if (result.data.flag == true) {
                        message.success(result.data.message);
                        // 可能有问题
                        this.setState({
                            voteValue:'关闭宣讲投票'
                        })
                    }
                    else { 
                        message.error(result.data.message);
                    }
                },
                (err) => { 
                    message.error('开启失败')
                })

        }
        else if(this.state.voteValue=='关闭宣讲投票'){ 
            // console.log('关闭');
            let res = voteStatus(0, sessionStorage.userId, sessionStorage.teachclass);
            // let res = voteStatus(0, localStorage.userId, localStorage.teachclass);
            res.then(
                (result) => { 
                    if (result.data.flag == true) {
                        message.success(result.data.message);
                        // 可能有问题
                        this.setState({
                            voteValue:'开启宣讲投票'
                        })
                    }
                    else { 
                        message.error(result.data.message);
                    }
                },
                (err) => { 
                    message.error('关闭失败')
                })

        }
    }
    render() { 
        return (
            <Fragment >
                <div style={{ display: 'flex',justifyContent:'space-between',marginBottom:'1.5%'}}>
                    <span className='title'>宣讲文件</span>
                    <Button
                    onClick={this.handleVot}
                    type="primary"
                    style={{position:'relative',right:'2vw'}}
                    >
                    { this.state.voteValue}
                    </Button>
                </div>
                
                <Table
                    style={{height:'90vh'}}
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