<template>
  <div id="book" class="book">
    <el-row class="body-head">      
      <el-col :span="8" :offset="8" class="serach"> 
        <el-input
          placeholder="搜索"
          suffix-icon="el-icon-search"
          class="search-box"
          v-model="searchValue">
        </el-input>
      </el-col>
    </el-row>
    <el-row class="content-head">      
      <el-col :span="18"  class="list"> 
        <ul>
          <li>
            <img src="../assets/images/book.png" alt="">
            <p>江苏省高级人民法院</p>
          </li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </el-col>
      <el-col :span="6"  class="list-history"> 
        <h4>历史纪录</h4>
       <ul>
         <li>江苏省人民法院法官信息</li>
         <li>江苏省人民法院法官信息</li>
         <li>江苏省人民法院法官信息</li>
         <li>江苏省人民法院法官信息</li>
         <li>江苏省人民法院法官信息</li>
       </ul>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: "book",
  components: {
    
  },
  data(){
    return{
      searchValue:""
    }
  }
};
</script>
<style lang="less">
#book {
  background-color: #f6f6f8;
  .body-head {
    padding-top: 50px;
    padding-bottom: 35px;
  }
  .content-head{
    .list{
      padding-left: 5%;
      ul{
        padding: 0;
        margin: 0;
        li{
          list-style: none;
          display: inline-block;
          width: 30%;
          margin-right: 3%;
          margin-bottom: 20px;
          height: 150px;;
          background-color: #fff;
          vertical-align: top;
          text-align: center;
          img{
            width: 100%;
            height: 55%;
          }
          p{
            font-size: 24px;
          }
        }
      }
    }
    .list-history{
      padding-right: 5%;
      h4{
        font-size: 24px;
        color:#626262;
        background-color: #E8EAEC;
        padding: 30px;
        margin: 0;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        border: 1px solid #000;
        border-bottom: none;
      }
      ul{
        padding: 0;
        margin: 0;
        border: 1px solid #000;
        border-top: none;
        border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
        li{
          list-style: none;
          padding:  20px 0; 
          padding-left: 20px;
          background-color: #fff;
          border-bottom-right-radius: 10px;
        border-bottom-left-radius: 10px;
        }
      }
    }
  }
}
</style>
