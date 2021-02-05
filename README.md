# **仿真辅助系统**



## 项目简介

​    该系统用于辅助学生和老师进行企业运营的模拟仿真实验，用户均为学校的老师和学生，主要功能如下：

* 帮助学生完成申请成为CEO，文件上传，创建公司，查看公司，以及在实验后的成员打分操作等等

* 帮助老师对学生和CEO的管理，如任命学生成为CEO，学生的旷课，迟到的情况管理，导出和导入学生信息等等

* 此外，系统还设置了超级管理员来对所有用户进行管理，可以为老师分配教学班等

  

## 项目目录

使用tree生成的src目录内容

```js
│  index.js
│  router.js
│  setupProxy.js       //开发时使用的代理，用于解决跨域问题
│  tree.txt                    //目录
│  
├─components
├─pages
│  │  App.js
│  │  
│  ├─ceo                    //CEO端
│  │  │  CEO.js
│  │  │  
│  │  ├─application
│  │  ├─components
│  │  │      Comfirm.js
│  │  │      Lists.js
│  │  │      MyTable.js
│  │  │      NavMenu.js
│  │  │      Router.js
│  │  │      WelcomeTitle.js
│  │  │      WithModal.js
│  │  │      
│  │  ├─config
│  │  │      defaultPagination.js
│  │  │      
│  │  ├─store
│  │  │      actionCreators.js
│  │  │      constants.js
│  │  │      index.js
│  │  │      reducer.js
│  │  │      
│  │  └─views
│  │      ├─application
│  │      │  │  index.js
│  │      │  │  
│  │      │  ├─components
│  │      │  │      ApplicationItem.js
│  │      │  │      
│  │      │  ├─consts
│  │      │  │      constants.js
│  │      │  │      
│  │      │  └─style
│  │      │          application.scss
│  │      │          
│  │      ├─company
│  │      │  │  index.js
│  │      │  │  
│  │      │  ├─components
│  │      │  │      CompanyItem.js
│  │      │  │      Member.js
│  │      │  │      MyCompany.js
│  │      │  │      
│  │      │  └─style
│  │      │          position.scss
│  │      │          
│  │      └─file
│  │          │  index.js
│  │          │  
│  │          └─components
│  │                  FileList.js
│  │                  Uploader.js
│  │                  
│  ├─manager                    //管理员端
│  │  │  Manager.js
│  │  │  
│  │  ├─components
│  │  │      AddClass.jsx
│  │  │      ChoseTeacher.jsx
│  │  │      DeleteClass.jsx
│  │  │      MenuClass.jsx
│  │  │      
│  │  ├─style
│  │  │      choseclass.scss
│  │  │      ImData.css
│  │  │      Nav.css
│  │  │      
│  │  └─view
│  │          ChoseClass.jsx
│  │          ImData.jsx
│  │          
│  ├─student                    //学生端
│  │      AllCompanies.jsx
│  │      CEO.jsx
│  │      ChosenClasses.jsx
│  │      CompanyMember.jsx
│  │      Detail.jsx
│  │      Join.jsx
│  │      MyCompany.jsx
│  │      Student.jsx
│  │      WriteWant.jsx
│  │      
│  └─teacher                    //老师端
│      ├─components
│      │      ChosenStuClass.jsx
│      │      ChoseStudent.jsx
│      │      NewsName.jsx
│      │      NewsType.jsx
│      │      SetCompany.jsx
│      │      SetOthers.jsx
│      │      SetPersonal.jsx
│      │      ShowScore.jsx
│      │      SignedCom.jsx
│      │      UnChosenStuClass.jsx
│      │      UnsignCom.jsx
│      │      
│      ├─content
│      │      Teacher.js
│      │      
│      ├─style
│      │      ComInfo.css
│      │      contentNav.css
│      │      StuInfo.css
│      │      VoSit.css
│      │      
│      └─view
│              ComInfo.js
│              Download.jsx
│              news.jsx
│              Set.jsx
│              Sign.jsx
│              StuClass.jsx
│              StuInfo.js
│              Teacher.js
│              VotSit.js
│              
├─redux                    //redux文件夹
│  │  actionTypes.js
│  │  store.js
│  │  
│  ├─actionCreators
│  │      creators.js
│  │      user.js
│  │      
│  ├─reducers
│  │      reducer.js
│  │      
│  └─sagas                    //中间键
│          index.js
│          
├─static
│  ├─images
│  └─style                    //样式文件
│          style.css
│          style.css.map
│          style.sass
│          style.scss
│          teacherStyle.css
│          teacherStyle.css.map
│          teacherStyle.scss
│          
└─until                    //页面中使用的函数及封装
    │  .Service.js.swp
    │  .Service_BASE_1018.js.swp
    │  .Service_LOCAL_1018.js.swp
    │  .Service_REMOTE_1018.js.swp
    │  BaseUrl.js                    //请求地址
    │  changeNav.js                    //保留导航栏高亮
    │  changePage.js                   //保留导航栏高亮
    │  encrypt.js                    //加密
    │  index.js
    │  Jquery.js
    │  Service.js                    //请求封装
    │  Service_BACKUP_1018.js
    │  Service_BASE_1018.js
    │  Service_LOCAL_1018.js
    │  Service_REMOTE_1018.js
    │  useInput.js
    │  useRequest.js
    │  
    └─api                    //页面中使用的接口封装
            ceo.js
            common.js
            isPPT.js
            LoginApi.js
            managerApi.js
            ManagerApi.js~Stashed changes_0
            StudentApi.js
            teacherApi.js
```



## 技术栈

* antd 

* react 

* react-dom 

* react-router 

* react-router-dom 

* redux 

* react-redux 

* redux-saga 

* axios 

* sass

* crypto-js 

  

## 项目运行方式

 springboot 



## 图例

### 登录界面

![login](https://img01.sogoucdn.com/app/a/100520146/0139e977cc8732bb4cfb303097ac18f3)

### 学生提交公司申请

![wish](https://img01.sogoucdn.com/app/a/100520146/d985a77ee3e47a1bc4dfd992cd0aa136)



### 管理员管理老师的班级

![manager](https://img01.sogoucdn.com/app/a/100520146/b2a434475eebc1099414c53e5cedde2a)

### 确认删除文件

![delete](https://img04.sogoucdn.com/app/a/100520146/eeaff668264a51776263a17a799793ee)



##  项目亮点/难点

### 1. 通过页数来进行分批获取

项目要从后端获取的数据量比较大，所以前端在获取数据时，需要哪一页的数据，再发送相应的请求，只得到一页的数据渲染到页面即可，不必一次性把全部数据获取

### 2. 获取到的数据进行存储

当用户从一个页面切换到另一个页面，如果用户已经获取过了当前页面的数据，那么数据就会直接呈现在页面上，不用重新请求，一定程度上缓解了数据库的压力

### 3. 组件的优化

应用了生命组件函数来进行性能优化，不需要进行数据更新的组件不重新渲染

### 4. 用户登录状态过期检测

如果用户登录状态过期，那么在这个用户登录过期后发出的第一个请求中，就会提示用户，让用户重新登录，并且自动回到登录界面，不需要定时进行检查

### 5. 页面即时反馈

用户进行的每一个操作都会即时在页面上反馈，例如用户为CEO投票，如果投票成功，那么显示在该页面上的被投票的CEO的票数也会对应增加

### 6. 防止高并发导致业务来不及处理的问题

防止用户通过多次点击按钮来多次发送同一个请求，在用户发送请求后把按钮变为loading状态不让用户再点击，也使用了redux-saga的监听机制，在接受到一个请求后的一定时间内不再接受同样的action，也就不会发送同样的请求



## 项目存在的不足、优化

* 代码的格式，风格以及class的命名方式都没有进行规范
* 虽然已经经过调整，但是不同的页面的样式风格之间还是有些许差异
* 项目的文件目录格式没有规范，不同层次的文件层次没有分明
* 部分无用，多余的代码
* 功能比较简陋



## 接口文档





## 参与项目成员以及项目负责人

成员：

 前端

1. 尹彦臻
2. 冉渝
3. 冯宇
4. 娄欣雨
5. 秦元浩(负责人)

 后端

1. 何科伟(负责人)
2. 陈瑞



## 项目上线时间

2021-1-12



## 代码的 GitHub 地址

 https://github.com/cqupt-geek-studio/cqupt-ceo 



## 项目的线上地址

 172.22.4.2 



## 项目部署服务器

重庆邮电大学实验室内部服务器
