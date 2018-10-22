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
      <el-col :span="3" :offset="1" class="create-btn"><button>创建新案件</button></el-col>
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
          <ul class="content-body">
            <li class="first">邓念念</li>
            <li class="second">非法吸收公共存款罪</li>
            <li class="third">秦淮区人民法院</li>
            <li class="fouth"><span>签约</span></li>
            <li class="fifth">2018-10-22</li>
          </ul>
          <ul class="content-body">
            <li class="first">邓念念</li>
            <li class="second">非法吸收公共存款罪</li>
            <li class="third">秦淮区人民法院</li>
            <li class="fouth"></li>
            <li class="fifth">2018-10-22</li>
          </ul>
          <ul class="content-body">
            <li class="first">邓念念</li>
            <li class="second">非法吸收公共存款罪</li>
            <li class="third">秦淮区人民法院</li>
            <li class="fouth"></li>
            <li class="fifth">2018-10-22</li>
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
      <el-col :span="24" class=""></el-col>
    </el-row>
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: "caseManage",
  components: {}
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
  .content-head{
    ul{
      padding: 20px 0;
      margin: 0;
      border-bottom: 1px solid #eee;
      li{
        list-style: none;
        display: inline-block;
        text-align: center;
        font-size: 24px;
        color:#626262;
      }
      .first{
        width: 16%;
      }
      .second{
        width: 18%;
      }
      .third{
        width: 18%;
      }
      .fouth{
        width:32%;
      }
      .fifth{
        width:16%;
      }
    }
  }
    .content-body{
    ul.content-body{
      padding: 20px 0;
      margin: 0;
      border-bottom: 1px solid #eee;
      li{
        list-style: none;
        display: inline-block;
        text-align: center;
        font-size: 20px;
        color:#838485;
      }
      .first{
        width: 16%;
      }
      .second{
        width: 18%;
      }
      .third{
        width: 18%;
      }
      .fouth{
        width:32%;
        text-align: left;
        span{
          background-color: #2CA7E7;
          border-radius: 4px;
          color: #fff;
          padding: 3px 10px;
        }
        
      }
      .fifth{
        width:16%;
      }
    }
    .el-pagination{
      text-align: center;
      padding: 20px 0;
    }
  }
  .divider{
    height: 34px;
    background-color: #eee;
  }
  .footer{
    height: 300px;
     background: linear-gradient(
        to right,
        rgb(40, 217, 206),
        rgb(51, 110, 206)
      );
  }
}
</style>
