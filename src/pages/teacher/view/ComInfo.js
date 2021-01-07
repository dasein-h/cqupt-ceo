import React, { Component, Fragment } from 'react'
import {
  Table, Button, message,Modal,InputNumber,Radio,Tag
} from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import '../../teacher/style/ComInfo.css';
import { ShowComInfo, putScore,deleteCompany,ShowComMember,ChoseCompany,ShowComLevel,ChangeComType } from '../../../until/api/teacherApi';
import baseUrl from '../../../until/BaseUrl';
import ChoseStudent from '../components/ChoseStudent';
import ShowScore from '../components/ShowScore';
// 父组件
class ComInfo extends Component { 
  constructor(props) { 
      super(props);
      this.expandedRowRender = this.expandedRowRender.bind(this);
      this.onExpand = this.onExpand.bind(this);
      this.ShowCompanyLevel = this.ShowCompanyLevel.bind(this);
      this.state = {
        columns : [
          {
            title: '公司名称',
            dataIndex: 'comName',
            key: 'comName',
            align: 'center',
          },
          {
            title: '公司类型',
            dataIndex: 'type',
            align: 'center',
            key: 'type',
            width:'20%',
            render: (text,record) => {
             
              return (
                <Fragment>
                  <table>
                    <tr>
                      <td style={{width:'50%'}}>
                        <span>{ text}</span>
                      </td>
                      <td style={{textAlign:'center'}}>
                          <ChangeType parent={this} record={ record}/>
                      </td>
                    </tr>
                    
                  </table>
                  
                  
                </Fragment>

              )
            },
          },
          {
            title: 'CEO学号',
            dataIndex: 'ceoID',
            key: 'ceoID',
            align: 'center',
          },
          {
            title: 'CEO姓名',
            dataIndex: 'ceoname',
            key: 'ceoname',
            align: 'center',
          },
          {
            title: '票数',
            dataIndex: 'count',
            key: 'count',
            align: 'center',
          },
          {
            title: '等级',
            dataIndex: 'level',
            key: 'level',
            align: 'center',
          },
          {

            title: '得分',
            align: 'center',
            dataIndex: 'ShowScore',
            render: (text, record) => { 
              return (
                <Fragment>
                  <ShowScore record={ record}/>
                </Fragment>
              )
            },
            // width: '7%'
          },
          {
            title: '老师打分',
            dataIndex: 'scoreTeacher',
            key: 'scoreTeacher',
            width: '10%',
            align: 'center',
            render: (text,record) => {
             
              return (
                <Fragment>
                  <table>
                    <tr>
                      <td style={{width:'50%'}}>
                        <span className='seeScore'>{ text}</span>
                      </td>
                      <td style={{textAlign:'center'}}>
                        <CustomTextInput parent={ this} ref={this.textInput} txt={text} record={ record}/>      
                      </td>
                    </tr>
                    
                  </table>
                  
                  
                </Fragment>

              )
            },
            // width:'6%'
          },
          {
            title: '添加学生',
            dataIndex: 'AddStudent',
            key: 'AddStudent',
            align: 'center',
            // width:'20%',
            render: (text,record) => {
             
              return (
                <Fragment>
                  <AddStudent parent={ this} ref={this.textInput} txt={text} record={ record}/>      
                </Fragment>

              )
            },
            // width:'6%'
          },
          {
            title: '操作',
            dataIndex: 'operation',
            align: 'center',
            render: (text, record) =>
              this.state.data.length >= 1 ? (
                <Fragment>
                  <div>
                    <DelPop record={record} data={this.state.data} parent={this} />
                  </div>
                  
                  <div>
                    
                  </div>
                  
                </Fragment>
              ) : null,
          },
        ],
        data: [
          
        ],
        pagination: {
          total:20,
          pageSize: 7,
          current:2,
          onChange:this.onchange,
        },
        expandedData: {},
        loading: false,
        disabled: true,
        expandedloading: {},
        // 是否能看公司等级
        ComLeLoading:false
      };

      

  }

  onchange = (e) => { 
    console.log(e);
    let newdata = this.state.pagination;
    newdata.current = e;
    this.setState({
      pagination:newdata
    })
  }

  IsPagination = (record) => { 
    if (this.state.expandedData[record.comName] > 10) {
      return true
    }
    else { 
      return false
    }
  }
  expandedRowRender = (record) => {


    const columns = [
      { title: '学号', dataIndex: 'studentId', key: 'studentId' },
      { title: '姓名', dataIndex: 'userName', key: 'userName' },
      {
        title: '公司名',key: 'companyName',dataIndex:'companyName'
      },
      { title: '职位', dataIndex: 'position', key: 'position' },
      { title:'专业',dataIndex:'academy',key:'academy' },
    ]; 
    
    
    
    return (
      <Fragment>
          <Table
          rowKey={record => record.studentId}
          columns={columns}
          dataSource={this.state.expandedData[record.comName]}
          loading={this.state.expandedloading[record.comName]}
          pagination={ this.IsPagination(record)}
        />

        
        
      </Fragment>
      
    )
  
  };
  onExpand = (expanded, record) => {
    // console.log(record);
    if (expanded == false) {
      // console.log('合并');
      this.setState({
        expandedData: {
          ...this.state.expandedData,
          [record.comName]: [],
        }
      });
    }
    else {
      // console.log("展开！");
      // this.setState({
      //   expandedloading: {
      //   ...this.state.expandedloading,
      //   [record.comName]:true
      // } });

      if (this.state.expandedloading[record.comName] == undefined) {
        this.setState({
          expandedloading: {
            ...this.state.expandedloading,
            [record.comName]: true
          }
        })
      }
      else { 
        let loading = this.state.expandedloading;
        loading[record.comName] = true;
        this.setState({
          expandedloading: loading
        })
      }
      let res = ShowComMember(record.ceoID);
      res.then(
        (result) => {
          let mydata = [];
          for (let i in result.data.data) {
            if (result.data.data[i].position == null || result.data.data[i].position === undefined ||
              result.data.data[i].position == 'null') { 
              result.data.data[i].position = '';
              
            }
            mydata.push({
              key: i,
              'studentId': result.data.data[i].studentId,
              'userName': result.data.data[i].userName,
              'companyName': result.data.data[i].companyName,
              'position': result.data.data[i].position,
              'academy': result.data.data[i].academy
            })
            
            // if (result.data.data[i].position == null || result.data.data[i].position === undefined) { 
            //   mydata.position = '';
            // }
          }
          
          this.setState({
            expandedData: {
              ...this.state.expandedData,
              [record.comName]: mydata,
            },
            
            
          });
          let loading = this.state.expandedloading;
          if (loading[record.comName] == true) {
            loading[record.comName] = false;
          }
          // else if (loading[record.comName] == null) { 
          //   loading
          // }

          this.setState({
            // expandedloading[record.comName]:false
          })
          // this.setState({expandedloading: false})
        },
        (err) => {
          message.warning("请求超时或服务器异常，请检查网络或联系管理员!");
          console.log(err);
        }
      )



    }
  }
  
  Refresh = (page) => { 
    this.setState({
        
      data: [],
      pagination: {
        total:20,
        pageSize: 7,
        hideOnSinglePage: false,
        onChange: this.onchange,
        current:1,
        },
      loading: true,
    })
    let res = ShowComInfo(localStorage.teachclass);
    let mydata=[];
    res.then(
      (result) => { 
        // console.log(result);
        if (result.data.data == undefined) {
          this.setState({
            data: [],
            
            loading: false,
            
          })
        }
        else { 
          let newData = [];
          for (let j = 0; j < result.data.data["totalNumber"];j++) { 
            newData.push(false);
          }
          for (let i in result.data.data["object"]) { 
            if (result.data.data["object"][i]["typeCode"] < 3) {
              mydata.push({
                key: i,
                // "companyID": result.data.data["object"][i]["companyID"],
                "comName": result.data.data["object"][i]["companyName"],
                "type": result.data.data["object"][i]["type"],
                "ceoID": result.data.data["object"][i]["ceo"],
                
                "ceoname": result.data.data["object"][i]["ceoName"],
                // "companyScore":result.data.data["object"][i]["companyScore"],
                "count": result.data.data["object"][i]["count"],
                "level": result.data.data["object"][i]["level"],
                // "ShowScore":result.data.data["object"][i]["scoreTeacher"],
                "scoreTeacher": result.data.data["object"][i]["scoreTeacher"],
                "typeCode": result.data.data["object"][i]["typeCode"],
                "scoreAccount": result.data.data["object"][i]["scoreAccount"],
                "scoreBank": result.data.data["object"][i]["scoreBank"],
                "scoreCeo": result.data.data["object"][i]["scoreCeo"],
                "scoreNews": result.data.data["object"][i]["scoreNews"],
                "scoreRevenue": result.data.data["object"][i]["scoreRevenue"],
                "scoreTeacher": result.data.data["object"][i]["scoreTeacher"],
                "scoreTrade": result.data.data["object"][i]["scoreTrade"],
              })
            }

            else { 
              mydata.push({
                key: i,
                // "companyID": result.data.data["object"][i]["companyID"],
                "comName": result.data.data["object"][i]["companyName"],
                "type": result.data.data["object"][i]["type"],
                "ceoID": result.data.data["object"][i]["ceo"],
                
                "ceoname": result.data.data["object"][i]["ceoName"],
                // "companyScore":result.data.data["object"][i]["companyScore"],
                "count": result.data.data["object"][i]["count"],
                "level": result.data.data["object"][i]["level"],
                // "ShowScore":result.data.data["object"][i]["scoreTeacher"],
                "scoreTeacher": result.data.data["object"][i]["scoreTeacher"],
                "typeCode": result.data.data["object"][i]["typeCode"],
                // "scoreAccount": result.data.data["object"][i]["scoreAccount"],
                // "scoreBank": result.data.data["object"][i]["scoreBank"],
                // "scoreCeo": result.data.data["object"][i]["scoreCeo"],
                // "scoreNews": result.data.data["object"][i]["scoreNews"],
                // "scoreRevenue": result.data.data["object"][i]["scoreRevenue"],
                "scoreTeacher": result.data.data["object"][i]["scoreTeacher"],
                // "scoreTrade": result.data.data["object"][i]["scoreTrade"],
              })
            }


          }
          // result.data.data["pageSize"]
          if (result.data.data["object"].length > 7) {
            this.setState({
              data: mydata,
              pagination: {
                total: result.data.data["totalNumber"],
                pageSize: 7,
                hideOnSinglePage: false,
                current: page,
                onChange: this.onchange,
       
              },
              loading: false,
              
            })
          }
          else { 
            this.setState({
              data: mydata,
              pagination: {
                total: result.data.data["totalNumber"],
                pageSize:7,
                // pageSize: result.data.data["pageSize"],
                hideOnSinglePage: true,
                current: page,
                onChange: this.onchange,
      
              },
              loading: false,
              
            })
          }
                
        }
        
        // console.log(this.state);
      },
      (err) => { 
        message.warning(err.result.message);
        console.log(err);
      }
  )
  }
  ShowCompanyLevel=()=> { 

    // console.log(localStorage.teachclass);
    let res = ShowComLevel(localStorage.teachclass);
    this.setState({
      ComLeLoading:true
    })
    res.then(
      (result) => { 

        if (result.data.flag == true) {
          message.success(result.data.message);
          this.Refresh(this.state.pagination.current);
        }
        else { 
          message.error(result.data.message);
        }
      },
      (err) => { 
        message.error('一键生成公司等级失败');
      }
    ).then(
      () => { 

        this.setState({
          ComLeLoading:false
        })
      }
    )

  }
    // 表格
  componentDidMount() {
    

      this.setState({
        loading:true
      })
      let res = ShowComInfo(localStorage.teachclass);
      let mydata=[];
      res.then(
        (result) => { 
          console.log(result);
          if (result.data.data == undefined) {
            this.setState({
              data: [],
              
              loading: false,
              
            })
          }
          else { 
            let newData = [];
            // for (let j = 0; j < result.data.data["totalNumber"];j++) { 
            //   newData.push(false);
            // }
            for (let i in result.data.data["object"]) { 

              if (result.data.data["object"][i]["typeCode"] < 3) {
                mydata.push({
                  key: i,
                  // "companyID": result.data.data["object"][i]["companyID"],
                  "comName": result.data.data["object"][i]["companyName"],
                  "type": result.data.data["object"][i]["type"],
                  "ceoID": result.data.data["object"][i]["ceo"],
                  
                  "ceoname": result.data.data["object"][i]["ceoName"],
                  // "companyScore":result.data.data["object"][i]["companyScore"],
                  "count": result.data.data["object"][i]["count"],
                  "level": result.data.data["object"][i]["level"],
                  // "ShowScore":result.data.data["object"][i]["scoreTeacher"],
                  "scoreTeacher": result.data.data["object"][i]["scoreTeacher"],
                  "typeCode": result.data.data["object"][i]["typeCode"],
                  "scoreAccount": result.data.data["object"][i]["scoreAccount"],
                  "scoreBank": result.data.data["object"][i]["scoreBank"],
                  "scoreCeo": result.data.data["object"][i]["scoreCeo"],
                  "scoreNews": result.data.data["object"][i]["scoreNews"],
                  "scoreRevenue": result.data.data["object"][i]["scoreRevenue"],
                  "scoreTeacher": result.data.data["object"][i]["scoreTeacher"],
                  "scoreTrade": result.data.data["object"][i]["scoreTrade"],
                })
              }

              else { 
                mydata.push({
                  key: i,
                  // "companyID": result.data.data["object"][i]["companyID"],
                  "comName": result.data.data["object"][i]["companyName"],
                  "type": result.data.data["object"][i]["type"],
                  "ceoID": result.data.data["object"][i]["ceo"],
                  
                  "ceoname": result.data.data["object"][i]["ceoName"],
                  "count": result.data.data["object"][i]["count"],
                  "level": result.data.data["object"][i]["level"],
                  "scoreTeacher": result.data.data["object"][i]["scoreTeacher"],
                  "typeCode": result.data.data["object"][i]["typeCode"],
                  "companyScore": result.data.data["object"][i]["companyScore"],
                  "fromCompanyScore": result.data.data["object"][i]["fromCompanyScore"],
                  "scoreTeacher": result.data.data["object"][i]["scoreTeacher"],
                })
              }
              
  
  
            }
            // result.data.data["pageSize"]
            if (result.data.data["object"].length > 7) {
              this.setState({
                data: mydata,
                pagination: {
                  total: result.data.data["totalNumber"],
                  pageSize: 7,
                  hideOnSinglePage: false,
                  // defaultCurrent:4
                  current: 1,
                  onChange:this.onchange,
                },
                loading: false,
                
              })
              console.log(this.state.pagination)
            }
            else { 
              this.setState({
                data: mydata,
                pagination: {
                  total: result.data.data["totalNumber"],
                  pageSize:7,
                  // pageSize: result.data.data["pageSize"],
                  hideOnSinglePage: true,
                  // defaultCurrent:4
                  current: 1,
                  onChange:this.onchange,
                },
                loading: false,
                
              })
            }
                  
          }
          
          // console.log(this.state);
        },
        (err) => { 
          message.warning("请求超时或服务器异常，请检查网络或联系管理员!");
          console.log(err);
        }
    )
    
      } 
    
  
    render() { 
        return (
            <Fragment>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'1.5%'}}>
              
             
                <span className='title'>公司信息</span>
                <Button
                icon={<DownloadOutlined />}
                disabled={this.state.IsShowlevel}
                type='primary'
                onClick={this.ShowCompanyLevel}
                loading={this.state.ComLeLoading}
                style={{position:'relative',right:'2vw'}}
                >
                  生成公司等级
                </Button>
                    {/* <span className='com-search'>
                        <Input placeholder="公司名称" className="input" />
                        <Button type="primary">搜索</Button>
                    </span> */}
                </div>

            <div>
              
              <Table
                style={{height:'100vh'}} 
                className="components-table-demo-nested"
                columns={this.state.columns}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
                expandedRowRender={record => this.expandedRowRender(record)}
                onExpand={(expanded,record)=>this.onExpand(expanded,record)}      
              />
             
              </div>
            </Fragment>
        );
    }
}


// 子组件(删除公司弹窗)
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
      const ceo = this.props.record.ceoID;
      const companyName = this.props.record.comName;
      console.log(companyName);
      let res = deleteCompany(ceo,companyName,localStorage.teachclass);
      res.then(
        (result) => { 
          console.log(result);
          console.log(result.data.flag);
          this.props.parent.setState({
                data: dataSource.filter((item) => item.key !== key)
          })
          if (result.data.flag == true) { 
            message.success('删除成功！');
            // let newdata = this.props.parent.pagination;
            // this.props.parent.Refresh(this.props.parent.state.pagination.current);
            let rest = this.props.parent.state.data.length % this.props.parent.state.pagination.pageSize;
            if (rest == 0) {
              this.props.parent.Refresh(this.props.parent.state.pagination.current - 1);
            }
            else { 
              this.props.parent.Refresh(this.props.parent.state.pagination.current);
            }
            

            // console.log(this.props.parent.pagination.current);
            // this.props.parent.setState({

            //   pagination:newdata
            // })
            
              }
          else {
              message.error('删除失败！');
          }
          
        },
        (err) => { 
          console.log(err);
          message.warning("请求超时或服务器异常，请检查网络或联系管理员!");
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

// 子组件(打分组件)
class CustomTextInput extends React.Component { 
  constructor(props) { 
      super(props);
      this.showModal = this.showModal.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
      this.textInput = React.createRef();
      this.focusTextInput = this.focusTextInput.bind(this);
      this.handleInput = this.handleInput.bind(this);
      this.state = {
          loading: false,
          visible: false,
          inputValue: this.props.txt,
          record:this.props.record
      }        
  }

  showModal = () => { 
      this.setState({
          visible:true
      })
  }
  
  handleCancel = () => {
      this.setState({ visible: false });
  };

  focusTextInput() {
      let ceo = this.state.record.ceoID;
      let scoreTeacher = this.state.inputValue;
      console.log(ceo);
      let res = putScore(ceo, scoreTeacher);
      res.then(
        (result) => { 
          console.log(result);
          if (result.data.error) {
            message.error('修改失败！');
            
          }
          else { 
            message.success('修改成功！');
            
          }
          
          
          
        },
        (err) => { 
          console.log(err);
          message.warning("请求超时或服务器异常，请检查网络或联系管理员!");
         
          }
      ).then(() => { 
        
        this.handleCancel();
        this.props.parent.Refresh(this.props.parent.state.pagination.current);
      })
    
    
    
  }

  handleInput(e) { 
    this.setState({
      inputValue:e
    })
  }


  render(){ 
      const { visible, loading } = this.state;
      return (
          <>
          <Button
          size='small'
          type='primary'
          ghost
          onClick={this.showModal}
          
        >
         打分
        </Button>
          <Modal
          width="15vw"
          visible={visible}
          title="老师打分"
          onCancel={this.handleCancel}
          footer={[
              <Button key="back" onClick={this.handleCancel}>
              取消
              </Button>,
              <Button key="submit" type="primary" loading={loading} onClick={this.focusTextInput}>
              确定
              </Button>,
          ]}
          >
            
            <div className="Inp-Sco-div">
              <InputNumber
                className='InpSco'
                type="text"
                value={this.state.inputValue}
                onChange={this.handleInput}
                min={1}
                max={100}
                step={0.01} 
              />
              </div>
                  
          </Modal>
      </>
          );
  }
}


// 子组件(添加学生组件)
class AddStudent extends React.Component {



  constructor(props) {
    super(props);
    this.onRef = this.onRef.bind(this);

    this.getChildrenData = this.getChildrenData.bind(this);
    this.state = {
      
      record:this.props.record,
      inputValue: '11111111',
      loading: false,
      visible: false,
    }
  }

  onRef = (ref) => { 
    this.child = ref;
  }


  getChildrenData = (result, msg) => { 

    let newState = this.state;
    newState.inputValue = msg;

    this.setState({inputValue:msg})

  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    // this.ChoseStudent.toParent();
    this.child.toParent();

    this.setState({ loading: true });
    // this.getChildrenData();
    let ceo = this.state.record.ceoID;
    let companyName = this.state.record.comName;
    
    console.log(this.state);
    let studentId = this.state.inputValue;
    console.log(studentId);
    console.log(ceo);
    let res = ChoseCompany(ceo, studentId,companyName);
    res.then(
      (result) => { 
        console.log(result);
       
        if (result.data.flag) {
          message.success(result.data.message);
        }
        else { 
          message.warning(result.data.message);
        }
        this.setState({ loading: false, visible: false });
        
        
      },
      (err) => { 
        console.log(err);
        message.warning(err.data.message);
        this.setState({ loading: false, visible: false });
        }
    ).then(() => { 
      this.props.parent.onExpand(true, this.state.record);
    })

    

  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
  render() {
    const { visible, loading } = this.state;
    return (
      <>
        {/* <Button type="primary" onClick={this.showModal}>
          添加
        </Button> */}
        <a onClick={this.showModal}>添加</a>
        <Modal
          style={{width:'40vw'}}
          visible={visible}
          title="添加新的学生信息"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[

            <Button key="back" onClick={this.handleCancel}>
              返回
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              提交
            </Button>,
          ]}
        >
            {/* <div className="Inp-Sco-div">
                <input
                      className='InpSco'
                      type="text"
                      ref={this.textInput}
                      value={this.state.inputValue}
                      onChange={this.handleInput}
                      placeholder='请输入学生学号'
                  />
            </div> */}
          <ChoseStudent parent={this} onRef={ this.onRef}/>
        </Modal>
      </>
    );
  }
}



// 子组件 (更改公司类型)
class ChangeType extends React.Component { 
  constructor(props) { 
    super(props);
    this.showModal = this.showModal.bind(this);
    // this.handleOk = this.handleOk.bind(this);
    this.handleType = this.handleType.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.state = {
      value:'贸易公司',
      options: [
        {
          label: '贸易公司',
          value:'贸易公司'
        },
        {
          label: '制造公司',
          value:'制造公司'
        },
        {
          label: '物流企业',
          value:'物流企业'
        },
        {
          label: '银行',
          value:'银行'
        },
        {
          label: '会计事务所',
          value:'会计事务所'
        },
        {
          label: '新闻机构',
          value:'新闻机构'
        },
        {
          label: '工商局',
          value:'工商局'
        },
        {
          label: '税务局',
          value:'税务局'
        },
      ],
      loading: false,
      visible: false,
    }
  }

  onChange = e => {
    // console.log('radio3 checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };
  showModal = () => { 
    const newvalue = this.props.record.type;
    this.setState({
      visible: true,
      value:newvalue
    })
}

  handleType = () => {
      // const dataSource = [...this.props.parent.state.data];
      // const key = this.props.record.key;
      const ceo = this.props.record.ceoID;
      // const companyName = this.props.record.comName;
      // console.log(companyName);
      // let res = deleteCompany(ceo,companyName,localStorage.teachclass);
      let res = ChangeComType(ceo, this.state.value);
      this.setState({
        loading: true
      })
      res.then(
        (result) => { 
          console.log(result);
          console.log(result.data.flag);
          // this.props.parent.setState({
          //       data: dataSource.filter((item) => item.key !== key)
          // })
          if (result.data.flag == true) { 
            message.success(result.data.message);
            this.props.parent.Refresh(this.props.parent.state.current);
            // this.handleCancel;
            
              }
          else {
            message.error(result.data.message);
            // this.handleCancel;
          }
          
        },
        (err) => { 
          console.log(err);
          message.warning("请求超时或服务器异常，请检查网络或联系管理员!");
          // this.handleCancel;
        }
      ).then(
        () => { 
          this.setState(
            {
              loading:false
            }
          )
          this.handleCancel();
        }
      )


  };

  handleCancel = () => {
      this.setState({ visible: false });
  };

  render() { 
    const { value } = this.state;
    const { visible, loading } = this.state;
    return (
      <>
        {/* <a onClick={this.showModal}>修改类型</a> */}
        <Button
          size='small'
          type='primary'
          ghost
          onClick={this.showModal}
          
        >
         修改类型
        </Button>
      <Modal
      visible={visible}
      title="修改公司类型"
      onOk={this.handleType}
      onCancel={this.handleCancel}
      footer={[
          <Button key="back" onClick={this.handleCancel}>
          取消
          </Button>,
          <Button key="submit" type="primary"
            loading={loading}
            onClick={this.handleType}>
          确定
          </Button>,
      ]}
        >

          
        <Radio.Group
          options={this.state.options}
          onChange={this.onChange}
          value={value}
          optionType="button"
        />
              
          
      </Modal>
  </>
      );
  }
}


export default ComInfo;