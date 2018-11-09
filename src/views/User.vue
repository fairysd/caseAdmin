<template>
  <div id="user" class="user">
     <el-row class="body-head">      
      <el-col :span="24" >    
      </el-col>
    </el-row>
     <el-row class="user-info">    
      <el-col :span="12" class="info-form">      
        <div class="inline-row">
          <label for="">姓名：</label><input type="text">
        </div>
        <div class="inline-row">
           <label for="">性别：</label>
          <div class="sexy">
            <el-radio v-model="radio" label="1">男</el-radio>
          <el-radio v-model="radio" label="2">女</el-radio>
          </div>          
        </div>         
        <div class="inline-row">
          <label for="">生日：</label><input type="text">
        </div>
        <div class="inline-row">
          <label for="">手机：</label><input type="text">
        </div>
        <div class="inline-row">
          <label for="">固话：</label><input type="text">
        </div>
        <div class="inline-row">
          <label for="">邮箱：</label><input type="text">
        </div>
        <div class="inline-row">
          <label for="">职业律所：</label><input type="text">
        </div>
        <div class="inline-row">
          <label for="">执业证号：</label><input type="text">
        </div>
        <div class="inline-row">
          <label for="">地址：</label><input type="text">
        </div>
        <div class="inline-row">
          <label for="">学历：</label><input type="text">
        </div>
        <div class="inline-row">
          <label for="">毕业院校：</label><input type="text">
        </div>
      </el-col>
      <el-col :span="12" class="info-pic">  
        <el-row>
          <el-col :span="24" >
            <label>头像</label><span>仅支持JPG,PNG格式，文件小于1M</span>
            <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
        </el-row>  
        <el-row>
          <el-col :span="24" >
            <label>资质照片</label>
   <el-upload
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
              
          </el-col>
        </el-row> 
      </el-col>
    </el-row>
    <el-row class="body-footer">      
      <el-col :span="24" >    
        <button>编辑</button>
        <button>保存</button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: "user",
  components: {},
  data() {
    return {
      radio: "1",
      imageUrl: "",
      fileList2: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ]
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
};
</script>
<style lang="less">
#user {
  .body-head {
    height: 133px;
    background-color: #f6f6f8;
  }
  .body-footer {
    height: 160px;
    background-color: #f6f6f8;
    text-align: center;
    padding-top: 4%;
     button {
        width:10%;
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
      button:nth-child(1){
        margin-right: 50px;
      }
  }
  .user-info {
    text-align: right;
    margin-top: 85px;
    margin-bottom: 50px;
    input {
      background-color: #f7f7fa;
      border: 1px solid #e7e7e9;
      border-radius: 5px;
    }
    .inline-row {
      margin-bottom: 28px;
    }
    .info-form {
      input {
        width: 50%;
        height: 48px;
      }
      .sexy {
        display: inline-block;
        width: 50%;
        height: 25px;
        vertical-align: middle;
        text-align: left;
      }
    }
    .info-pic {
      text-align: left;
      padding-left: 100px;
      padding-right: 15%;
      label{
        font-size: 24px;
        color: #626262;
        padding-right: 50px;
      }
      span{
         font-size: 18px;
        color: #a9aaaa;
      }
      .upload-q span{
        color: #fff;
        font-size: 16px;
      }
      .avatar-uploader{
        margin-top: 43px;
        margin-bottom: 80px;
      }
      .upload-qua{
         margin-top: 43px;
      }
    }
  }
  //touxiang
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  //end
}
</style>
