import React, { Component } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import   ManagerApi  from '../../../until/api/managerApi';
import reqwest from 'reqwest';
import { InboxOutlined } from '@ant-design/icons';
import '../style/ImData.css';
const { Dragger } = Upload;


class ImData extends Component {
  constructor(props) { 
    super(props);
    this.state = {
      stuList: [],
      classList:[],
      uploadingStu: false,
      uploadingClass:false
    }
  }
  

  handleUploadStu = () => {
    const { stuList } = this.state;
    const formData = new FormData();
    stuList.forEach(file => {
      formData.append('files[]', file);
    });

    this.setState({
      uploadingStu: true,
    });



    let res = ManagerApi.upLoadStu(formData);
    res.then(
      () => {
        this.setState({
          classList: [],
          uploadingClass: false,
        });
        message.success('上传成功!');
      },
      () => {
        this.setState({
          uploadingClass: false,
        });
        message.error('上传失败！');
      },
    );

  //   reqwest({
  //     url: 'http://120.79.207.60:8089/admin/stufile',
  //     method: 'post',
  //     processData: false,
  //     data: formData,
  //     success: () => {
  //       this.setState({
  //         stuList: [],
  //         uploadingStu: false,
  //       });
  //       message.success('上传成功!');
  //     },
  //     error: () => {
  //       this.setState({
  //         uploadingStu: false,
  //       });
  //       message.error('上传失败！');
  //     },
  //   });
  };

  handleUploadClass = () => {
    const { classList } = this.state;
    const formData = new FormData();
    classList.forEach(file => {
      formData.append('files[]', file);
    });

    this.setState({
      uploadingClass: true,
    });
    
    let res = ManagerApi.upLoadClass(formData);
    res.then(
      () => {
        this.setState({
          classList: [],
          uploadingClass: false,
        });
        message.success('上传成功!');
      },
      () => {
        this.setState({
          uploadingClass: false,
        });
        message.error('上传失败！');
      },
    );
  //   reqwest({
  //     url: 'http://120.79.207.60:8089/admin/teafile',
  //     method: 'post',
  //     processData: false,
  //     data: formData,
  //     success: () => {
  //       this.setState({
  //         classList: [],
  //         uploadingClass: false,
  //       });
  //       message.success('上传成功!');
  //     },
  //     error: () => {
  //       this.setState({
  //         uploadingClass: false,
  //       });
  //       message.error('上传失败！');
  //     },
  //   });
  };

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
    const classprops = {
      onRemove: file => {
        this.setState(state => {
          const index = state.ClassList.indexOf(file);
          const newclassList = state.ClassList.slice();
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
      stuList,
    };
    return (
      <>
        <div id="div">
          <div className="StuInfo">
              <Upload {...stuprops}>
                  <Button icon={<UploadOutlined />} className="button">导入学生信息</Button>
                </Upload>
              <Button
                    // type="primary"
                    onClick={this.handleUploadStu}
                    disabled={stuList.length === 0}
                    loading={uploadingStu}
                    style={{ marginTop: 16 }}
                  >
                    {uploadingStu ? '上传中' : '开始上传'}
              </Button>
          </div>
          <div className="StuInfo">
              <Upload {...classprops}>
                  <Button icon={<UploadOutlined />} className="button">导入教学班信息</Button>
                </Upload>
              <Button
                    // type="primary"
                    onClick={this.handleUploadClass}
                    disabled={classList.length === 0}
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


export default ImData;