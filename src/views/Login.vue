<template>
  <div class="login">
   <div id="background">
        <img src="css/images/index-logo-1.jpg">
        <div class="indexLogo index-logo" style="height:0px;">
            <!-- 问案及按钮等 -->
            <div class="indexLogoWenan">
                <div>
                    <button class="btn btnSubmit" data-toggle="modal">注册</button>
                    <button class="btn btnLogin" data-toggle="modal" data-target=".bs-example-modal-sm">登录</button>
                </div>
            </div>
            <!-- 模态框 -->
            <div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog modal-sm" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            <p>律师登录</p>

                            <div class="alert-box" >

                            </div>
                            <div class="m-label" >
                                <div>手机号: <input id="inputs" type="text" placeholder="输入注册的手机号码"/></div>
                                <div><button  type="button"  class="btn btn-info btn-info-local" onclick="telllogin()">登录</button></div>
                            </div>

                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "login",
  components: {}
};
var ServerAddress = "http://icase360.com/api";
function telllogin() {
  var tell = $("#inputs").val();
  var $alerttext = "";
  if (tell == "") {
    $(".alert-box").html(
      ` <div class="alert alert-warning" role="alert">请输入手机号</div>`
    );

    setTimeout(function() {
      $(".alert-box").html("");
    }, 2000);
    return;
  }

  $.ajax({
    type: "GET",
    url: ServerAddress + "/findLawyer",
    data: {
      tell: tell
    },
    success: function(data) {
      console.log(data);
      if (data.data.length == 0) {
        $(".alert-box").html(
          ` <div class="alert alert-warning" role="alert">手机号码未注册</div>`
        );
        setTimeout(function() {
          $(".alert-box").html("");
        }, 2000);

        return;
      }
      var userid = data.data[0].registerId;
      $.cookie("LuserId", userid);
      $.ajax({
        type: "POST",
        url: ServerAddress + "/order/CheckLogin",
        data: {
          userid: $.cookie("LuserId"),
          islogin: true
        },
        success: function(data) {
          if (data.code != 0) {
            $(".alert-box").html(
              ` <div class="alert alert-warning" role="alert">用户未激活</div>`
            );
            setTimeout(function() {
              $(".alert-box").html("");
            }, 2000);

            return;
          }
          $.cookie("Ltoken", data.token);
          window.top.location.href = "html/caseAdmin.html";
        }
      });
    }
  });
}
</script>
<style lang="less" scoped>
.indexLogo .indexLogoWenan {
  width: auto;
}
.modal-body {
  position: absolute;
  padding: 0;
  top: 15px;
}
.icp-icon {
//   background-image: url(css/images/xxxxx.png);
  width: 24px;
  height: 24px;
  display: inline-block;
  background-position: 274px 108px;
}

.modal-content {
  height: 360px;
  width: 300px;
  margin: 30px auto;
}

.modal-content p {
  margin: 0;
  margin-bottom: 10px;
  font-size: 20px;
}
.modal-content .m-label {
  position: relative;
  top: -10px;
}
.modal-content .m-label:nth-child(1) {
  width: 298px;
}

.modal-content .m-label input {
  width: 180px;
  height: 32px;
  margin-left: 10px;
  margin-bottom: 10px;
}
.modal-content .m-label .btn-info-local {
  width: 298px;
}
.alert-box {
  height: 60px;
}
</style>

