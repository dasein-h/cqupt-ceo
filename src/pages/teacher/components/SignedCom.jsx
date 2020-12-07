import React from 'react'
import { Table, Button,notification } from "antd"
import { showAll} from '../../../until/api/teacherApi'
const columns = [
    {
        title: '名字',
        dataIndex: 'name',

    },
    {
        title: '学号',
        dataIndex: 'id',

    },
    {
        title:'专业',
        dataIndex:'major'
    },
    {
        title:'班级',
        dataIndex:'class'
    }
];


class SignedCom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data:[],
            rowSelect: {
                onSelect: (record, selected, selectedRows, nativeEvent) => {
                    console.log(record);
                    console.log(selected);
                }
            },
            loading:true,
            pagination: {
                showSizeChanger:false,
                pageSize: 7,
                current: 1,
                total: "",
                hideOnSinglePage: true,
                onChange: (page, pageSize) => {
                  this.changePage(page);
                  this.state.pagination.current = page
                  console.log(this.state.pagination.current);
                }
              },
        }
    }
    componentDidMount() {
      this.changePage(1);
    }
    changePage = (page) => {
        let lists = [];
        showAll("SJ00201A2031780003",page).then((res) => {
          this.setState({loading:false});
          let rs = JSON.parse(res.data);
          for(let i = 0;i<rs.length;i++){
            lists.push({
              "name":rs[i].userName,
              "id":rs[i].studentId,
              "major":rs[i].academy,
              "class":rs[i].cls
            })
          }
          if(rs.length!==0){
            let pagination = {...this.state.pagination};
            pagination.total = rs[0].page
            console.log(this.state.pagination.total);
            this.setState({ data:lists,pagination:pagination });
            console.log(this.state.pagination.total);
        }
        }).catch(err => {
          this.setState({ loading: false })
          notification.open({
            message: '警告',
            placement: "bottomRight",
            description:
              '请求超时或服务器异常,请检查网络或联系管理员!',
          });
        })
    
      }
    render() {
        return (
            <div>
                <Table 
                pagination={this.state.pagination}
                columns={columns} 
                loading={this.state.loading}
                rowSelection={this.state.rowSelect} 
                dataSource={this.state.data} 
                rowKey={record => record.id} />
            </div>
        )
    }
    submit = (record, selected, selectedRows, nativeEvent) => {
    }
}
export default SignedCom;