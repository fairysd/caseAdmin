<template>
  <div id="login">
    <el-row class="login">
      <el-col :span="24" class="imgBox">
        <img src="../assets/images/loginBg.jpg" alt="">
      </el-col>
      <el-col :span="24" class="btn-login">
        <div class="btn-box">
           <button class="btn-reg">注册</button>
          <button class="btn-log"  @click="dialogVisible = true">登陆</button>
        </div>       
      </el-col>
    </el-row>
    <el-row class="login-footer">
      <el-col :span="10" :offset="2">
        <el-col :span="8" :offset="4">
          <img src="../assets/images/wxapp.jpg" alt="">
          <p class="qrdes">关注问案</p>
        </el-col>
        <el-col :span="8" :offset="2">
          <img src="../assets/images/wxpub.jpg" alt="">
          <p class="qrdes">加入icase360</p>
        </el-col>
      </el-col>
      <el-col :span="10" class="text-info">
        <p>© 苏州法智科技有限公司</p>
        <p>邮箱：  icase360@163.com&nbsp;&nbsp;&nbsp;&nbsp;地址：  江苏苏州市十梓街338号</p>
        <p><a href="http://www.miitbeian.gov.cn">苏ICP备17060514号-1</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32050802010594">苏公网安备32050802010594号</a></p>
      </el-col>
    </el-row>
    <el-dialog
      title="登陆"
      width="30%"
      :visible.sync="dialogVisible"
      class="login-dia">
      <el-row class="new-form">
        <el-col :span="8"><label for="">手机号：</label><input type="text" v-model="tellPhone"></el-col>    
        </el-row>    
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="login">确 定</el-button>
      </span>
       
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "login",
  components: {},
  data() {
    return {
      dialogVisible: false,
      tellPhone: "13801582831"
    };
  },
  methods: {
    login() {
      let baseUrl = this.GLOBAL.baseUrl;
      let userPhone = this.tellPhone;
      this.dialogVisible = false;
      this.$http
        .get(baseUrl + "/findLawyer", {
          params: {
            tell: userPhone
          }
        })
        .then(({ data }) => {
          if (data.message == "成功") {
            let user = data.data[0];
            let userID = user.registerId;
            this.$http
              .post(
                baseUrl + "/order/CheckLogin",
                this.qs.stringify({
                 userid:userID,
                 islogin:true
                })
              )
              .then(({ data }) => {
                if (data.message == "成功") {
                  this.common.setCookie("userID",userID);
                  this.common.setCookie("token",data.token);
                  this.$router.push({ name: "caseManage"});
                }
              });
          }
        });
    }
  }
};
</script>
<style lang="less">
#login {
  .login {
    width: 100%;
    .imgBox {
      background-color: #212121;
    }
    img {
      width: 100%;
    }
    .btn-login {
      position: relative;
      top: -220px;
      height: 0;
      .btn-box {
        text-align: center;
        button {
          padding: 6px 76px;
          color: #000;
          font-size: 20px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
        }
        .btn-reg {
          background-color: #fff;
        }
        .btn-log {
          background-color: #20a0ff;
          color: #fff;
          margin-left: 30px;
        }
      }
    }
  }
  .login-footer {
    padding-top: 30px;
    padding-bottom: 30px;
    background-color: #212121;
    .qrdes {
      text-align: center;
    }
    .text-info {
      padding-top: 30px;
    }
    img {
      width: 100%;
      height: 206px;
    }
    p {
      color: #fff;
      a {
        color: #fff;
        text-decoration: none;
      }
    }
  }
  .login-dia {
    .el-dialog__footer {
      text-align: center;
    }
  }
}
</style>

