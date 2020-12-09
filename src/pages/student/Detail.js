import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Table, Tag, Space,pagination, message, Button , Empty , Modal , Upload,} from 'antd';
import actions from '../../redux/actionCreators/creators'
import changePage from '../../until/changePage'
import { UploadOutlined } from '@ant-design/icons';
import baseurl from '../../until/BaseUrl'
// import $ from 'jquery';
import '../../static/style/style.scss'

// const columns = [
//     {
//       title: 'count',
//       dataIndex: 'count',
//       key: 'count',
//     },
//     {
//       title: 'type',
//       dataIndex: 'type',
//       key: 'type',
//     },
//     {
//       title: 'companyName',
//       dataIndex: 'companyName',
//       key: 'companyName',
//     },
//     {
//       title: 'ceoName',
//       key: 'ceoName',
//       dataIndex: 'ceoName',

//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (text, record) => (
//         <Space size="middle">
//           <a>Invite {record.name}</a>
//           <a>Delete</a>
//         </Space>
//       ),
//     },
//   ];

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            totalNum:0,
            currentPage:parseInt(sessionStorage.getItem("Page4"))||"1",
            data : [],
            visible:false,
            fileList:[],       
         }
         this.onPageChange=this.onPageChange.bind(this)
    }

    UNSAFE_componentWillUpdate(newProps,newState){
      if(newProps!==this.props){
        try{
          const {FileData} = newProps
          let newdata = FileData
          for (let item in newdata){
            newdata[item].key = item
            var totalNumber = newdata[item].filePath
          }
          this.setState({
            currentPage: parseInt(sessionStorage.getItem("Page4"))||'1',
            data:newdata,
            totalNum:totalNumber
          })
        
        }
        catch{
          console.log("error")
        }
      }
    }
    componentDidMount() {
      if(localStorage.getItem("class") && !this.props.FileData){
        this.props.ShowFile(localStorage.getItem("class"),parseInt(sessionStorage.getItem("Page4"))||'1')
      }
      if(this.props.FileData){
        this.props.Exist()
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
      const formData = new FormData();
      fileList.forEach(file => {
        formData.append('file', file)
      })
      formData.append("studentId",localStorage.getItem("userId"))
      formData.append("teachclass",localStorage.getItem("class"))
      this.setState({
        uploading: true,
      });
      var ajax = new XMLHttpRequest()
      ajax.open("post", baseurl+"/upload/up", true)
      ajax.onload = function () {
      console.log(ajax.responseText);
      }
      ajax.send(formData);
      ajax.onreadystatechange = function() {
				if(ajax.readyState == 4){
					if(ajax.status == 200){
						console.log(ajax.responseText);
					}
				}
			}
     
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
    onPageChange (page,pageSize) {
        this.props.ShowFile(localStorage.getItem("class"),page)
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
            title: 'fileName',
            dataIndex: 'fileName',
            key: 'fileName',
        },
          {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
          },
        {
            title: 'studentId',
            dataIndex: 'studentId',
            key: 'studentId',
        },
        {
            title: 'teachclass',
            dataIndex: 'teachclass',
            key: 'teachclass',
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <a onClick={this.props.DownloadFile.bind(this,record.id)}>下载</a>
            </Space>
          ),
        },
      ]
      const pagination = {
        pageSize: 8,
        total:this.state.totalNum,
        onChange:this.onPageChange,
        current:this.state.currentPage,
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
          };
        });
      },
      beforeUpload: file => {
        this.setState({
          fileList:[file]
        });
        return false;
      },
      fileList,
    };

    if(localStorage.getItem("class"))
        return ( 
            <div className="table_div">
              <Button className="RunCeo" type="primary" onClick={this.showModal}>上传</Button>
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
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'Uploading' : 'Start Upload'}
        </Button>
              </Modal>
            <Table columns={columns} dataSource={this.state.data} pagination={pagination}/>
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
  //把发送action的方法绑定到当前组件的props
  return {
    ShowFile: (teachClass,currentPage) => {
        dispatch(actions.ShowFile(teachClass,currentPage))
    },
    UploadFile: (file,studentId,teachclass) => {
      dispatch(actions.UploadFile(file,studentId,teachclass))
    },
    DownloadFile: (id) => {
      dispatch(actions.DownloadFile(id))
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