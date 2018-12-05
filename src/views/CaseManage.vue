<template>
  <div class="case-manage">
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
      <el-col :span="20" :offset="2">
        <ul>
          <li class="first">委托人</li>
          <li class="second">案由</li>
          <li class="third">法院</li>
          <li class="fouth"></li>
          <li class="fifth">日期</li>
        </ul>
      </el-col>         
    </el-row>
     <el-row  class="content-body">
      <el-col :span="20" :offset="2">
          <ul v-for="item in caseList" :key="item.id" class="content-body">
            <li class="first" v-text="item.bailorName"></li>
            <li class="second" v-text="item.reasonName"></li>
            <li class="third" v-text="item.courtName"></li>
            <li class="fouth" ><span v-for="(state,index) in caseState" v-if="index<item.orderState" v-text="state"></span></li>
            <li class="fifth" v-text="item.createTime">2018-10-22</li>
          </ul>        
          <el-pagination
            layout="prev, pager, next"
            :total="50">
          </el-pagination>
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
        <el-row class="new-form">
        <el-col :span="8"><label for="">受理法院：</label><input type="text" v-model="newCase.courtName"><span>*</span></el-col>
        <el-col :span="8"><label for="">案件类型：</label><input type="text" v-model="newCase.caseType"><span>*</span></el-col>
        <el-col :span="8"><label for="">诉讼地位：</label><input type="text" v-model="newCase.bailorType"><span>*</span></el-col>
      </el-row>
       <el-row class="new-form from3">
        <el-col :span="24"><label for="">相对方：</label><input type="text" v-model="newCase.counterParty"><input type="text" ><input type="text" ><button>添加</button><div class="divider"></div></el-col>
      </el-row>
       <el-row class="new-form from4">
        <el-col :span="8"><label for="">承办方：</label><input type="text" v-model="newCase.agent"><span></span></el-col>
        <el-col :span="8"><label for="">书记员：</label><input type="text" v-model="newCase.courtClerk"><span></span></el-col>
        <el-col :span="8"><label for="">对方代理 ：</label><input type="text" v-model="newCase.counterPartyLawyer"><span></span></el-col>
      </el-row>
       <el-row class="new-form from5">
        <el-col :span="8"><label for="">律师费：</label><input type="text" v-model="newCase.serviceCharge"><span></span></el-col>
        <el-col :span="8"><label for="">标的：</label><input type="text" v-model="newCase.orderPrice"><span></span></el-col>
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
      newCase: {}
    };
  },
  mounted() {
    let baseUrl = this.GLOBAL.baseUrl;
    let userID = this.common.getCookie("userID");
    let token = this.common.getCookie("token");
    this.$http
      .post(
        baseUrl + "/order/FindOrderList",
        this.qs.stringify({
          orderState: 0,
          token: token,
          userId: userID,
          lawyerId: userID,
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
    this.$http
      .get(baseUrl + "/findLawyerInfoByRegisterId", {
        params: {
          registerId: userID
        }
      })
      .then(({ data }) => {
        let info = data.data;
        this.chartInfo = info.chartInfo;
      })
      .then(() => {
        let lineChart = this.$echarts.init(document.getElementById("caseLine"));
        let option_line = {
          xAxis: {
            type: "category",
            data: this.chartInfo.monthCase[0]
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              data: this.chartInfo.monthCase[1],
              type: "line"
            }
          ]
        };
        lineChart.setOption(option_line);
      })
      .then(() => {
        let pieChart = this.$echarts.init(document.getElementById("casePie"));
        let option_pie = {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            x: "left",
            data: this.chartInfo.lawyerAbility[0]
          },
          series: [
            {
              name: "访问来源",
              type: "pie",
              selectedMode: "single",
              radius: [0, "30%"],

              label: {
                normal: {
                  position: "inner"
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              }
            },
            {
              name: "访问来源",
              type: "pie",
              radius: ["40%", "55%"],
              label: {
                normal: {
                  show: false,
                  formatter:
                    "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
                  backgroundColor: "#eee",
                  borderColor: "#aaa",
                  borderWidth: 1,
                  borderRadius: 4,
                  // shadowBlur:3,
                  // shadowOffsetX: 2,
                  // shadowOffsetY: 2,
                  // shadowColor: '#999',
                  // padding: [0, 7],
                  rich: {
                    a: {
                      color: "#999",
                      lineHeight: 22,
                      align: "center"
                    },
                    // abg: {
                    //     backgroundColor: '#333',
                    //     width: '100%',
                    //     align: 'right',
                    //     height: 22,
                    //     borderRadius: [4, 4, 0, 0]
                    // },
                    hr: {
                      borderColor: "#aaa",
                      width: "100%",
                      borderWidth: 0.5,
                      height: 0
                    },
                    b: {
                      fontSize: 16,
                      lineHeight: 33
                    },
                    per: {
                      color: "#eee",
                      backgroundColor: "#334455",
                      padding: [2, 4],
                      borderRadius: 2
                    }
                  }
                }
              },
              data: this.chartInfo.lawyerAbility[2]
            }
          ]
        };
        pieChart.setOption(option_pie);
      });
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
            orderState: 1,
            userName: this.newCase.userName,
            reasonName: this.newCase.reasonName,
            courtName: this.newCase.courtName,
            counterParty: this.newCase.counterParty,
            caseType: this.newCase.caseType,
            bailorType: this.newCase.bailorType,
            userTel: this.newCase.userTel,
            agent: this.newCase.agent,
            courtClerk: this.newCase.courtClerk,
            counterPartyLawyer: this.newCase.counterPartyLawyer,
            serviceCharge: this.newCase.serviceCharge,
            orderPrice: this.newCase.orderPrice
          })
        )
        .then(({ data }) => {
          if (data.message == "成功") {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            dialogVisible = false;
          }else{
            this.$message({
              message: "保存失败",
              type: "error"
            });
          }
        });
    }
  }
};
</script>
<style lang="less">
.case-manage {
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
    ul.content-body {
      padding: 20px 0;
      margin: 0;
      border-bottom: 1px solid #eee;
      li {
        list-style: none;
        display: inline-block;
        text-align: center;
        font-size: 20px;
        color: #838485;
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
        text-align: left;
        span {
          background-color: #2ca7e7;
          border-radius: 4px;
          color: #fff;
          padding: 3px 10px;
        }
      }
      .fifth {
        width: 16%;
      }
    }
    .el-pagination {
      text-align: center;
      padding: 20px 0;
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
