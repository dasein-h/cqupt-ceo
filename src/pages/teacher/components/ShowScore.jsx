import React, { Component, Fragment } from 'react'
import {
  Table,Modal,Button
} from 'antd';

import '../../teacher/style/ComInfo.css';

const SpecialColumns = [
    {
        title: '',
        dataIndex:''
    },
    {
        title: '',
        dataIndex:''
    },
    {
        title: '',
        dataIndex:''
    }
]

class ShowScore extends Component { 
    constructor(props) { 
        super(props);
        this.state = {
            columns : [
                {
                    title: '描述',
                    dataIndex:'describe'
                },
                {
                    title: '分数',
                    dataIndex:'score'
                }
            ],
            data: [],
            isShowEditModal: false,
            loading: false,
            
        }
    }


    componentDidMount() { 
        // console.log(this.props.record);
        this.setState({ loading: true });
        // typecode在3以下
        if (this.props.record.typeCode < 3) {
            let newData = [];
            newData.push({
                key:0,
                describe:'会计事务所评分',
                score: this.props.record.scoreAccount,
            })
            newData.push({
                key:1,
                describe:'银行评分',
                score: this.props.record.scoreBank,
            })
            newData.push({
                key:2,
                describe:'CEO评分',
                score: this.props.record.scoreCeo,
            })
            newData.push({
                key:3,
                describe:'新闻机构评分',
                score: this.props.record.scoreNews,
            })
            newData.push({
                key:4,
                describe:'税务局评分',
                score: this.props.record.scoreRevenue,
            })
            newData.push({
            
                key:5,
                describe:'老师评分',
                score: this.props.record.scoreTeacher,
            })
            newData.push({
            
                key:6,
                describe:'工商局评分',
                score: this.props.record.scoreTrade,
            })
               
            this.setState({
                data: newData,
                loading:false
            });
        }
        else { 
            let newData = [];
            newData.push({
                key:0,
                describe:'企业得分',
                score: this.props.record.companyScore,
            })
            newData.push({
                key:1,
                describe:'企业互评给机构评分',
                score: this.props.record.fromCompanyScore,
            })
            newData.push({
                key:2,
                describe:'老师评分',
                score: this.props.record.scoreTeacher,
            })
               
            this.setState({
                data: newData,
                loading:false
            });
        }



          
        
    }

    
    handleEditOkClick = () => {
        // console.log('点击确定');
    
        this.setState ({
          isShowEditModal: false,
        })
      }
    
    handleEditCancelClick = () => {
        // console.log('点击取消');
    
        this.setState ({
          isShowEditModal: false,
        })
      }
    
    showDetail = () => { 
        this.setState({
            isShowEditModal:true
        })
    }
    render() { 
        const { loading} = this.state;
        
        // const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <Fragment>
                <Button
                size='small'
                type='primary'
                ghost
                onClick={this.showDetail}
                
                >
                详细分数
                </Button>
                    {/* <a onClick={this.showDetail}>详细分数</a> */}
                    <Modal
                        title="查看详细分数"
                        visible={this.state.isShowEditModal}
                        onOk={this.handleEditOkClick}
                        onCancel={this.handleEditCancelClick}
                        footer={[]}
                    >
                        <Table
                            style={{ width: '100%' }}
                            columns={this.state.columns}
                            dataSource={this.state.data}
                            loading={this.state.loading}
                            pagination={{ hideOnSinglePage: true }}
                        />
                    </Modal>
                </Fragment>
                
            
                
          </div>
        );
    }
}
export default ShowScore;