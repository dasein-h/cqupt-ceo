import React, { Component,Fragment } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
<<<<<<< HEAD
import baseurl from '../../../until/BaseUrl';
import axios from 'axios';
import '../style/ImData.css';


=======
import   ManagerApi  from '../../../until/api/managerApi';
// import reqwest from 'reqwest';
import { InboxOutlined } from '@ant-design/icons';
import '../style/ImData.css';
>>>>>>> ry
class ImData extends Component {
  constructor(props) { 
    super(props);
    this.state = {
      stuList: [],
      classList:[],
      uploadingStu: false,
      uploadingClass:false
    }
    this.handleUploadStu = this.handleUploadStu.bind(this);
    this.handleUploadClass = this.handleUploadClass.bind(this);
<<<<<<< HEAD
    this.handleStatusStu = this.handleStatusStu.bind(this);
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
        console.log(result);

        if (result.data.flag == true) {
          console.log('上传成功！');
          message.success("上传成功");
          status = true;
        }
        else if (result.data.flag == false) {
          console.log('上传失败');
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

=======
  }
  
>>>>>>> ry

  handleUploadStu = () => {
    const { stuList } = this.state;
    const formData = new FormData();
<<<<<<< HEAD
    stuList.forEach(file => {
      formData.append('stufile', file);
    });
    this.setState({
      uploadingStu: true
    });
    this.Ajax(0, baseurl + '/admin/stufile', formData);
    
  };

  handleStatusStu = (status) => { 
    console.log(status);
=======
    let status = true;
    stuList.forEach(file => {
      formData.append('stufile', file);
    });

    
    this.setState({
      uploadingStu: true,
    });
    
    var ajax = new XMLHttpRequest()
    ajax.open("post", "http://120.79.207.60:8089/admin/stufile", true)
    ajax.onload = function () {
    console.log(ajax.responseText)
    }
    ajax.send(formData);
    ajax.onreadystatechange = function() {
      if(ajax.readyState == 4){
        if(ajax.status == 200){
          message.success("上传成功");
          status = true;
          
        }
      }
      else{
        message.error("上传失败")
      }
    }
    

>>>>>>> ry
    if (status == true) { 
      this.setState({
        uploadingStu: false,
        stuList:[]
      });
<<<<<<< HEAD

    }
      
  }

=======
    }
  };
>>>>>>> ry

  handleUploadClass = () => {
    const { classList } = this.state;
    const formData = new FormData();
<<<<<<< HEAD
    classList.forEach(file => {
      formData.append('file', file);
    });
    this.setState({
      uploadingClass: true
    })
    this.Ajax(1, baseurl + '/admin/file', formData);
  }
    

  handleStatusClass = (status) => { 
    console.log(status);
=======
    let status = false;
    classList.forEach(file => {
      formData.append('file', file);
    });

    this.setState({
      uploadingClass: true,
    });

    var ajax = new XMLHttpRequest()
    ajax.open("post", "http://120.79.207.60:8089/admin/file", true)
    ajax.onload = function () { 
    console.log(ajax.responseText)
    }
    ajax.send(formData);
    ajax.onreadystatechange = function() {
      if(ajax.readyState == 4){
        if(ajax.status == 200){
          message.success("上传成功");
          status = true;
          
        }


        
      }
      else{
        message.error("上传失败")
      }
    }
    
>>>>>>> ry
    if (status == true) { 
      this.setState({
        uploadingClass: false,
        classList:[]
<<<<<<< HEAD
      })
    }
    
  }
=======
      });
    }
    

  };

>>>>>>> ry
  
  render() {
    const { uploadingStu,uploadingClass, stuList,classList } = this.state;
    const stuprops = {
      onRemove: file => {
        this.setState(state => {
          const index = state.stuList.indexOf(file);
          const newstuList = state.stuList.slice();
          newstuList.splice(index, 1);
          return {
            stuList: newstuList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          stuList: [...state.stuList, file],
        }));
        return false;
      },
      stuList,
    };
<<<<<<< HEAD

=======
>>>>>>> ry
    const classprops = {
      onRemove: file => {
        this.setState(state => {
          const index = state.classList.indexOf(file);
          const newclassList = state.classList.slice();
          newclassList.splice(index, 1);
          return {
            classsList: newclassList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          classList: [...state.classList, file],
        }));
        return false;
      },
<<<<<<< HEAD
      // classList,
    };
    
=======
      classList,
    };
>>>>>>> ry
    return (
      <>
        <div id="div">
          <div className="StuInfo">
              <Upload {...stuprops}>
<<<<<<< HEAD
                  <Button icon={<UploadOutlined />} className="button">导入教学信息</Button>
=======
                  <Button icon={<UploadOutlined />} className="button">导入学生信息</Button>
>>>>>>> ry
              </Upload>
              <Button
                    onClick={this.handleUploadStu}
                    disabled={stuList.length === 0  || stuList.length>1}
                    loading={uploadingStu}
                    style={{ marginTop: 16 }}
                  >
                    {uploadingStu ? '上传中' : '开始上传'}
              </Button>
          </div>
          <div className="StuInfo">
              <Upload {...classprops}>
<<<<<<< HEAD
                  <Button icon={<UploadOutlined />} className="button">更新学生信息</Button>
              </Upload>
              <Button
                    onClick={this.handleUploadClass}
                    disabled={classList.length === 0  }
=======
                  <Button icon={<UploadOutlined />} className="button">导入教学班信息</Button>
              </Upload>
              <Button
                    onClick={this.handleUploadClass}
                    disabled={classList.length === 0  || classList.length>1}
>>>>>>> ry
                    loading={uploadingClass}
                    style={{ marginTop: 16 }}
                  >
                    {uploadingClass ? '上传中' : '开始上传'}
              </Button>
          </div> 
        </div>
        
      </>
    );
  }
}

<<<<<<< HEAD
export default ImData;
=======
export default ImData;
>>>>>>> ry
