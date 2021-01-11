import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Table, Tag, Space,pagination, message, Button , Empty , Modal , Upload,} from 'antd';
import actions from '../../redux/actionCreators/creators'
import changePage from '../../until/changePage'
import { UploadOutlined , ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios'
import baseurl from '../../until/BaseUrl';
// import $ from 'jquery';
import '../../static/style/style.scss'
axios.defaults.headers.common['token'] = sessionStorage.getItem("tk")
// axios.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   let token = window.localStorage.getItem("accessToken")
//   if (token) {
//       config.headers.accessToken = token
//       return config
//   }
// }, function (error) {
//   return Promise.reject(error)
// })
// axios.interceptors.response.use(res => {
//   const code = res.data.code
//   if (code === 401) {
//   } else if (code !== 200) {
//     Notification.error({
//       title: res.data.msg
//     })
//     return Promise.reject('error')
//   } else {
//     return res.data
//   }
// },
// error => {
//   console.log('err' + error)
//   return Promise.reject(error)
// }
// )
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalNum:0,
            currentPage:parseInt(sessionStorage.getItem("Page4"))||1,
            data : [],
            visible:false,
            loading:true,
            fileList:[],
         }
         this.onPageChange=this.onPageChange.bind(this)
         this.confirm = this.confirm.bind(this)
    }

    UNSAFE_componentWillUpdate(newProps,newState){
      if(newProps!==this.props){
        try{
          if(newProps.Exist===true){
            this.setState({
              loading:false
            })
          }
          if(newProps.isShowFile===true){
            this.setState({
              loading:false
            })
          }
          else if(newProps.isShowFile===false){
            this.setState({
              loading:false
            })
          }
          if( newProps.isDeleteFile === true ){
            message.success("删除成功")
            this.props.ShowFile(sessionStorage.getItem("class"),parseInt(sessionStorage.getItem("Page4"))||1)
            this.setState({
              loading:true
            })
          }
          if( newProps.message ){
            if( newProps.isDeleteFile === false ){
              message.error(newProps.message)
            }
          }
          const {FileData} = newProps
          let newdata = FileData
          for (let item in newdata){
            newdata[item].key = item
            var totalNumber = newdata[item].filePath
          }
          this.setState({
            currentPage: parseInt(sessionStorage.getItem("Page4"))||1,
            data:newdata,
            totalNum:totalNumber,
          })
        }
        catch{}
      }
    }
    componentDidMount() {
      if(sessionStorage.getItem("class") && !this.props.FileData){
        this.props.ShowFile(sessionStorage.getItem("class"),parseInt(sessionStorage.getItem("Page4"))||1)
      }
      if(this.props.FileData){
        this.props.Exist()
        this.setState({
          loading:false
        })
      }
    }
    shouldComponentUpdate(nextProps, nextState) {
      if (nextProps !== this.props || nextState!== this.state) {
        return true
      }
      else {
        return false
      }
    }
    showModal = () => {
      this.setState({
        visible: true,
      });
    };
    handleOk = e => {

      this.setState({
        visible: false,
      });
    };
    handleCancel = e => {
      this.setState({
        visible: false,
      });
    };
    handleUpload = () => {
      this.setState({
        fileList:[]
      })
      const { fileList } = this.state;
      const formData = new FormData()
      fileList.forEach(file => {
        console.log(file)
        formData.append('file', file)
      })
      formData.append("studentId",sessionStorage.getItem("userId"))
      formData.append("teachclass",sessionStorage.getItem("class"))
      this.setState({
        uploading: true,
      })
      var that = this
    axios({
      // url: 'http://172.22.4.2:8089/upload/up',
      url: baseurl + '/upload/up',
      
      method:'post',
      data:formData,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }).then(
        function(res){
          console.log(res)
          if(res.status == 200 && res.data.flag){
            message.success("上传成功")
            that.props.ShowFile(sessionStorage.getItem("class"),parseInt(sessionStorage.getItem("Page4"))||1)
            that.setState({
              uploading: false,
              loading:true,
            })
          }
          else{
            if(res.message)
            message.error(res.message)
            else
            message.error("上传失败")
            //后端返回提示信息后再修改
            that.setState({
              uploading: false,
            })
          }
        }
      )
      // var ajax = new XMLHttpRequest()
      // var that = this
      // ajax.open("post", baseurl+"/upload/up", true)
      // ajax.onload = function () {
      // }
      // ajax.send(formData);
      // ajax.onreadystatechange = function() {
			// 	if(ajax.readyState == 4){
			// 		if(ajax.status == 200 && JSON.parse(ajax.response).flag){
      //       message.success("上传成功")
      //       that.props.ShowFile(sessionStorage.getItem("class"),parseInt(sessionStorage.getItem("Page4"))||1)
      //       that.setState({
      //         uploading: false,
      //         loading:true,
      //       })
      //     }
      //     else{
      //       if(JSON.parse(ajax.response).message)
      //       message.error(JSON.parse(ajax.response).message)
      //       else
      //       message.error("上传失败")
      //       //后端返回提示信息后再修改
      //       that.setState({
      //         uploading: false,
      //       })
      //     }
      //   }
      // }

      // $.ajax({
      //   url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      //   method: 'post',
      //   processData: false,
      //   data: formData,
      //   success: () => {
      //     this.setState({
      //       fileList: [],
      //       uploading: false,
      //     });
      //     message.success('upload successfully.');
      //   },
      //   error: () => {
      //     this.setState({
      //       uploading: false,
      //     });
      //     message.error('upload failed.');
      //   },
      // })
    }
    confirm(id) {
      Modal.confirm({
        title: '提示',
        icon: <ExclamationCircleOutlined />,
        content: '确定要删除文件？',
        onOk: () => {
          this.props.DeleteFile(id)
        },
        okText: '确认',
        cancelText: '取消',
      })
    }
    onPageChange (page,pageSize) {
        this.props.ShowFile(sessionStorage.getItem("class"),page)
        // let newdata = this.state.data.object
        this.setState({
            currentPage: page,
            // data:newdata
        })
        changePage(4,page)
    }

    render() {
      const columns = [
        {
            title: '文件名',
            dataIndex: 'fileName',
            key: 'fileName',
        },
          {
            title: '文件ID',
            dataIndex: 'id',
            key: 'id',
          },
        {
            title: '上传学号',
            dataIndex: 'studentId',
            key: 'studentId',
        },
        {
            title: '教学班',
            dataIndex: 'teachclass',
            key: 'teachclass',
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => {
            if(record.studentId!==sessionStorage.getItem("userId"))
              return(
            <Space size="middle">
              <a onClick={this.props.DownloadFile.bind(this,record.id,record.fileName)}>下载</a>
            </Space>
          )
            else
              return(
                <Space size="middle">
                <a onClick={this.props.DownloadFile.bind(this,record.id)}>下载</a>
                {/* <a onClick={this.props.DeleteFile.bind(this,record.id)}>删除</a> */}
                <a onClick={this.confirm.bind(this,record.id)}>删除</a>
              </Space>
              )},
        },
      ]
      const pagination = {
        pageSize: 8,
        total:this.state.totalNum,
        onChange:this.onPageChange,
        current:this.state.currentPage,
        hideOnSinglePage:true,
    }
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          }
        })
      },
      beforeUpload: file => {
        this.setState({
          fileList:[file]
        });
        return false
      },
      fileList,
    };

    if(sessionStorage.getItem("class"))
        return (
            <div className="table_div">
              <Button className="RunCeo" type="primary" onClick={this.showModal}>上传</Button>
              {/* 如果需要再开启 */}
              <Modal
                title="上传文件"
                visible={this.state.visible}
                onCancel={this.handleCancel}
                footer={
                <Button
                onClick={this.handleCancel}
                >关闭
                </Button>
                }
                >
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>选择文件</Button>
        </Upload>
        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? '上传中' : '上传文件'}
        </Button>
              </Modal>
            <Table columns={columns} dataSource={this.state.data} pagination={pagination} loading={this.state.loading}/>
            </div>
             )
    else return(
            <div className="table_div">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>请登录后查看</Empty>
            </div>
            )
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ShowFile: (teachClass,currentPage) => {
        dispatch(actions.ShowFile(teachClass,currentPage))
    },
    UploadFile: (file,studentId,teachclass) => {
      dispatch(actions.UploadFile(file,studentId,teachclass))
    },
    DownloadFile: (id,name) => {
      dispatch(actions.DownloadFile(id,name))
    },
    DeleteFile: (id) => {
      dispatch(actions.DeleteFile(id))
    },
    Exist: () => {
      dispatch(actions.Exist())
    },
  }
}
const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
