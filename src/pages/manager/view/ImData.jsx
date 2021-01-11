import React, { Component,Fragment } from 'react';
import { Upload, Button, message,notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import baseurl from '../../../until/BaseUrl';
import axios from 'axios';
import '../style/ImData.css';
import { ImportData } from '../../../until/api/teacherApi';

axios.defaults.headers.common['token'] = sessionStorage.getItem("tk")
class ImData extends Component {
  constructor(props) { 
    super(props);
    this.state = {
      classList: [],
      uploadingClass:false
    }
    this.handleUploadClass = this.handleUploadClass.bind(this);
    this.handleStatusClass = this.handleStatusClass.bind(this);
    this.Ajax = this.Ajax.bind(this);
  }

  // Ajax(formData) {
  //   let status = false;

  //   let res = ImportData(formData);
  //   res.then(
  //     (result) => {
  //       // console.log(result);

  //       if (result.data.flag == true) {
  //         // console.log('上传成功！');
  //         message.success("上传成功");
  //         status = true;
  //       }
  //       else if (result.data.flag == false) {
  //         // console.log('上传失败');
  //         message.error('上传失败！');
  //       }
  //     }
  //   ).then(() => {
      
  //     this.handleStatusClass(status);

  //   }).catch(err => {
      
      
  //     this.handleStatusClass(status);
      
  //     notification.warning({
  //       message: '警告',
  //       placement: "bottomRight",
  //       description:
  //         '请求超时或服务器异常,请检查网络或联系管理员!',
  //     })
  //   })


  // }


  Ajax (formData){
    let status = false;
    let url = baseurl + '/admin/file';
    axios({
      method: 'post',
      url: url,
      data: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'token':sessionStorage.getItem("tk")
      }
    }).then(
      (result) => {
        // console.log(result);

        if (result.data.flag == true) {
          // console.log('上传成功！');
          message.success("上传成功");
          status = true;
        }
        else if (result.data.flag == false) {
          // console.log('上传失败');
          message.error('上传失败！');
        }
      }
    ).then(() => {
      this.handleStatusClass(status);
    })

  }

  handleUploadClass = () => {
    const { classList } = this.state;
    console.log(this.state.classList[0]);
    const formData = new FormData();
    formData.append('file', this.state.classList[0]);
    this.Ajax(formData);
    this.setState({
      uploadingClass: true
    })
  }
    

  handleStatusClass = (status) => { 
    // console.log(status);
    if (status == true) { 
      this.setState({
        uploadingClass: false,
        classList:[]
      })
    }
    
  }
  
  IsDisabled = () => { 
    if (this.state.classList.length == 0) {
      
      return true;
    }
    else if (this.state.classList.length > 1) {
     
      message.warning('只能上传一份文件');
      return true;
    }
    
  }

  handleChange = (info) => { 


    let fileList = [...info.fileList];

    
    fileList = fileList.slice(-1);
    
    this.setState(
      {
        classList:fileList
      }
    )
    
    
  }

  render() {

    const { uploadingClass} = this.state;
    const classprops = {
      onRemove: file => {
        this.setState(state => {
          const index = state.classList.indexOf(file);
          const newclassList = state.classList.slice();
          newclassList.splice(index, 1);
          return {
            classList: newclassList,
          };
        });
       
      },
      beforeUpload: file => {
        return false;
      },
      onChange: this.handleChange,
      multiple:true
    };
    
    return (
      <>
        <div>
          <div>
              <span className="Nav-top">导入数据</span>
          </div>
          <div className="StuInfo">
            <Upload {...classprops} fileList={ this.state.classList}>
                  <Button icon={<UploadOutlined />} className="button">更新学生信息</Button>
              </Upload>
              <Button
                    onClick={this.handleUploadClass}
                    disabled={this.IsDisabled()}
                    loading={uploadingClass}
                    style={{ marginTop: 16 }}
                  >
                    {uploadingClass ? '上传中' : '开始上传'}
              </Button>
            <span
              style={{color:'#1890FF',fontSize:'1vw',paddingLeft:'5%'}}
            >一次只能上传一份文件</span>
          </div> 
        </div>
        
      </>
    );
  }
}

export default ImData;
