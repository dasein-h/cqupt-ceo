import React, { Component,Fragment } from 'react';
import { Upload, Button, message,notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import baseurl from '../../../until/BaseUrl';
import axios from 'axios';
import '../style/ImData.css';
import { ImportData } from '../../../until/api/teacherApi';
import qs from 'qs';

// axios.defaults.headers.common['token'] = sessionStorage.getItem("tk")
class ImData extends Component {
  constructor(props) { 
    super(props);
    this.state = {
      classList: [],
      uploadingClass:false
    }
    this.handleUploadClass = this.handleUploadClass.bind(this);
    this.handleStatusClass = this.handleStatusClass.bind(this);
    // this.Ajax = this.Ajax.bind(this);
  }


  handleUploadClass = () => {
    this.setState({classList:[]})
    const { classList } = this.state;

    const formData = new FormData();
    console.log(classList.length);
    classList.forEach(file => {
      console.log(file);
      formData.append('file', file)
    })

    console.log(sessionStorage.tk)

    axios({
      url:'http://39.100.140.143:8080/admin/file',
      method:'post',
      data:formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token':sessionStorage.tk
      }
      }).then(
        function(res){
          console.log(res)
          if(res.status == 200 && res.data.flag){
            message.success("上传成功")
            
          }
          else{
            if(res.message)
            message.error(res.message)
            else
              message.error("上传失败")
          }
        }
    ).then(
      () => { 
        this.handleStatusClass(true);
      }
    )
    
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
    console.log(info.file);
    let newlist = [];
    newlist.push(info.file);
    this.setState(
      {
        classList:newlist
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
