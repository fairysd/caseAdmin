<template>
  <div class="case-process">
    <el-row class="body-head">
      <el-col :span="7" :offset="2">
        <ul class="sequence">
          <li class="selected">排序</li>
          <li>日期</li>
          <li>案由</li>
          <li>受理法院</li>
        </ul>
      </el-col>
      <el-col :span="4" :offset="5" class="serach"> 
        <el-input
          placeholder="搜索"
          suffix-icon="el-icon-search"
          class="search-box"
          v-model="searchValue">
        </el-input>
      </el-col>
      <el-col :span="3" :offset="1" class="create-btn"><button @click="dialogVisible = true">创建新案件</button></el-col>
    </el-row>
    <el-row  class="content-head">
      <el-col :span="14" :offset="1">
      <h4>任务(共4个任务组，14个任务)</h4>
      </el-col>    
      <el-col :span="8">
      <h4>概览</h4>
      </el-col>       
    </el-row>
     <el-row  class="content-body">
      <el-col :span="14" :offset="1">
          <div class="process">
              <h5>1、收案阶段</h5>
              <div class="process-detail">
                <el-checkbox v-model="checked" class="checked"></el-checkbox>
                <span class="name">办理委托手续</span>
                <span class="demo">模板</span>
                <span class="direction">指引</span>
                <span class="document">文档</span>
                <span class="time">2017-12-11</span>
              </div>
              <div class="process-detail">
                <el-checkbox v-model="checked" class="checked"></el-checkbox>
                <span class="name">出具《法律服务方案》</span>
                <span class="demo">模板</span>
                <span class="direction">指引</span>
                <span class="document">文档</span>
                <span class="time">2017-12-11</span>
              </div>
          </div>         
            <div class="process">
              <h5>1、收案阶段</h5>
              <div class="process-detail">
                <el-checkbox v-model="checked" class="checked"></el-checkbox>
                <span class="name">办理委托手续</span>
                <span class="demo">模板</span>
                <span class="direction">指引</span>
                <span class="document">文档</span>
                <span class="time">2017-12-11</span>
              </div>
              <div class="process-detail">
                <el-checkbox v-model="checked" class="checked"></el-checkbox>
                <span class="name">出具《法律服务方案》</span>
                <span class="demo">模板</span>
                <span class="direction">指引</span>
                <span class="document">文档</span>
                <span class="time">2017-12-11</span>
              </div>
          </div>    
      </el-col>      
    </el-row>
    <el-row>
      <el-col :span="24" class="divider"></el-col>
    </el-row>
    <el-row class="footer"> 
        <el-col :span="12">
          <div id="caseLine" class="line-echart" :style="'height:300px;width:98%;'"></div>
        </el-col>
        <el-col :span="12">
          <div id="casePie" class="pie-echart" :style="'height:300px;width:98%;'"></div>
        </el-col>
    </el-row>
    <el-dialog
      title="创建新案件"
      width="80%"
      :visible.sync="dialogVisible"
      class="new-case">
      <el-row class="new-form">
        <el-col :span="8"><label for="">委托人：</label><input type="text" v-model="newCase.userName"><span>*</span></el-col>
        <el-col :span="8"><label for="">联系方式：</label><input type="text" v-model="newCase.userTel"><span>*</span></el-col>
        <el-col :span="8"><label for="">案由：</label><input type="text" v-model="newCase.reasonName"><span>*</span></el-col>
        </el-row>      
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createCase">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: "caseManage",
  components: {},
  data() {
    return {
      searchValue: "",
      dialogVisible: false,
      caseList: [],
      chartInfo: {},
      caseState: ["收案", "起诉", "庭审", "结案"],
      newCase: {},
      checked:true
    };
  },
  mounted() {
    let baseUrl = this.GLOBAL.baseUrl;
    let userID = this.common.getCookie("userID");
    this.$http
      .post(
        baseUrl + "/order/FindOrderList",
        this.qs.stringify({
          orderState: 0,
          token: "df300d22e5318d076b29144f7193278ce0ef5b76",
          userId: "U1525405578581qbBSE",
          lawyerId: "U1525405578581qbBSE",
          page: 0,
          searchMode: "union"
        })
      )
      .then(({ data }) => {
        this.caseList = data.data;
        this.caseList.forEach(function(value, index) {
          value.createTime = value.createTime.split(" ")[0];
        });
      });
    //
   
    //

    //
  },
  methods: {
    createCase() {
      let baseUrl = this.GLOBAL.baseUrl;
      this.$http
        .post(
          baseUrl + "/order/SubmitOrder",
          this.qs.stringify({
            page: 0,           
          })
        )
        .then(({ data }) => {
         
        });
    }
  }
};
</script>
<style lang="less">
.case-process {
  .body-head {
    background-color: #f6f6f8;
  }
  .sequence {
    margin: 35px 0;
    padding: 0;
    height: 63px;
    line-height: 63px;
    border-radius: 10px;
    border: 1px solid #e4e4e6;
    background-color: #ffffff;
    list-style: none;
    li {
      width: 24%;
      display: inline-block;
      color: #a9aaaa;
      font-size: 24px;
      text-align: center;
    }
    .selected {
      color: #336fcf;
    }
  }
  .search-box .el-input__inner {
    margin: 35px 0;
    padding: 0;
    height: 63px;
    line-height: 63px;
    border: 1px solid #e4e4e6;
    border-radius: 10px;
    font-size: 24px;
    padding-left: 5%;
  }
  .create-btn {
    button {
      background: linear-gradient(
        to right,
        rgb(40, 217, 206),
        rgb(51, 110, 206)
      );
      margin: 35px 0;
      padding: 0;
      height: 63px;
      line-height: 63px;
      border: 1px solid #e4e4e6;
      border-radius: 10px;
      width: 100%;
      font-size: 24px;
      color: #ffffff;
    }
  }
  .content-head {
    ul {
      padding: 20px 0;
      margin: 0;
      border-bottom: 1px solid #eee;
      li {
        list-style: none;
        display: inline-block;
        text-align: center;
        font-size: 24px;
        color: #626262;
      }
      .first {
        width: 16%;
      }
      .second {
        width: 18%;
      }
      .third {
        width: 18%;
      }
      .fouth {
        width: 32%;
      }
      .fifth {
        width: 16%;
      }
    }
  }
  .content-body {
      .process{
          h5{
              margin: 0;
              margin-top: 13px;
              padding: 10px;
              background: linear-gradient(to right, rgb(40, 217, 206), rgb(51, 110, 206));
              color: #fff;
              border-radius: 15px;
              font-size: 16px;
          }
          .process-detail{
              margin-top: 10px;
              padding-left: 2%;
              padding-right: 3%;
              padding-bottom: 10px;
              border-bottom: 1px solid #ccc;
              >span{
                  display: inline-block;
                  font-size: 13px;
                  color: #626262;
              }
              .checked{
                  width: 3%;
                  text-align: center;
              }
              .name{
                  width: 27%;
              }
              .demo, .direction, .document{
                  width: 15%;
                  text-align: center;
              }
              .time{
                  width: 25%;
                  text-align: right;
                  color: #a9aaaa;
              }
          }
      }
  }
  .divider {
    height: 34px;
    background-color: #eee;
  }
  .footer {
    height: 300px;
    background: linear-gradient(to right, rgb(40, 217, 206), rgb(51, 110, 206));
  }
  .new-case {
    .el-dialog {
      border-radius: 20px;
    }
    .el-dialog__header {
      background-color: #f8f7fa;
      padding: 30px 0 30px 43px;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      .el-dialog__title {
        font-size: 30px;
        color: #626262;
      }
      .el-dialog__headerbtn {
        font-size: 30px;
        top: 30px;
      }
    }
    .new-form {
      text-align: right;
      margin-bottom: 30px;
      label {
        font-size: 24px;
        color: #626262;
        line-height: 50px;
      }
      input {
        height: 50px;
        box-sizing: border-box;
        vertical-align: top;
        width: 60%;
        border: 1px solid #eee;
        background-color: #f7f7fa;
        border-radius: 10px;
        font-size: 24px;
      }
      input:focus {
        outline: none;
        border-color: #409eff;
      }
      span {
        font-size: 24px;
        margin-left: 10px;
        color: red;
      }
    }
    .from3 {
      .divider {
        display: inline-block;
        width: 7%;
        height: 0;
      }
      input {
        display: inline-block;
        width: 23%;
        margin-right: 10px;
      }
      label {
        vertical-align: top;
      }
      button {
        width: 10%;
        height: 50px;
        border: none;
        border-radius: 5px;
        display: inline-block;
        vertical-align: top;
        color: #fff;
        font-size: 24px;
        background: linear-gradient(
          to right,
          rgb(40, 217, 206),
          rgb(51, 110, 206)
        );
      }
      padding-right: 0;
    }
    .from4,
    .from5 {
      span {
        width: 10px;
        display: inline-block;
      }
    }
    .el-dialog__footer {
      text-align: center;
      padding-bottom: 70px;
    }
    .dialog-footer {
      text-align: center;
      button {
        width: 40%;
        background: linear-gradient(
          to right,
          rgb(40, 217, 206),
          rgb(51, 110, 206)
        );
      }
    }
  }
}
</style>
