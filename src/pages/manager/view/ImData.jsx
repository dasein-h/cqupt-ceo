import React, { Component,Fragment } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import baseurl from '../../../until/BaseUrl';
import axios from 'axios';
import '../style/ImData.css';


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

  Ajax (type, url, formData){
    let status = false;
    axios({
      method: 'post',
      url: url,
      data: formData,
      processData: false,
      contentType:false
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
      if (type == 0) {
        this.handleStatusStu(status);
      }
      else if (type == 1) {
        this.handleStatusClass(status);
      }
    })

  }


  handleUploadClass = () => {
    const { classList } = this.state;
    const formData = new FormData();
    classList.forEach(file => {
      formData.append('file', file);
    });
    this.setState({
      uploadingClass: true
    })
    this.Ajax(1, baseurl + '/admin/file', formData);
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
      // console.log(this.state.classList.length);
      return true;
    }
    else if (this.state.classList.length > 1) {
      // console.log(this.state.classList.length);
      message.warning('只能上传一份文件');
      return true;
    }
    
  }

  handleChange = (info) => { 


    let fileList = [...info.fileList];

    // console.log(fileList);
    // console.log(1);
    fileList = fileList.slice(-1);
    // console.log(fileList);

    // console.log(2);
    this.setState(
      {
        classList:fileList
      }
    )
    // setTimeout(() => {
    //   console.log(3);
    //   console.log(this.state.classList);
    // }, 1000);
    
    
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
