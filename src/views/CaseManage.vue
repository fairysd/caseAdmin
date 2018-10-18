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
      <el-col :span="4" :offset="5" class="serach"> <el-input
    placeholder="搜索"
    suffix-icon="el-icon-search"
    class="search-box"
    v-model="searchValue">
  </el-input></el-col>
      <el-col :span="3" :offset="1" class="create-btn"><button>创建新案件</button></el-col>
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
  .body-head{
    background-color: #F6F6F8;
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
    .selected{
      color: #336fcf;
    }
  }
  .search-box .el-input__inner{
    margin: 35px 0;
    padding: 0;
    height: 63px;
    line-height: 63px;
    border: 1px solid #e4e4e6;
    border-radius: 10px;
    font-size: 24px;
        padding-left: 5%;
  }
  .create-btn{
    button{
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
}
</style>
