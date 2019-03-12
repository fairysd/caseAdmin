<template>
  <div id="bigData" class="big-data">
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
    <el-row class="content-body">      
      <el-col :span="24" class="data"> 
        <h4>案例分析</h4>
       <ul>
         <li v-for="item in caseA" :key="item.id" :params="item.params" :url="item.url">
           <img :src="item.image" alt="">
           <p v-text="item.name"></p>
         </li>       
        </ul>
      </el-col>
      <el-col :span="24" class="data"> 
        <h4>法律关系</h4>
       <ul>
         <li v-for="item in caseB" :key="item.id" :params="item.params" :url="item.url">
           <img :src="item.image" alt="">
           <p v-text="item.name"></p>
         </li> 
        </ul>
      </el-col>
      <el-col :span="24" class="data"> 
        <h4>法律维护</h4>
       <ul>
       <li v-for="item in caseC" :key="item.id" :params="item.params" :url="item.url">
           <img :src="item.image" alt="">
           <p v-text="item.name"></p>
         </li> 
        </ul>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// @ is an alias to /src
//for test rebase
//aiaiaiaiaiaiaiaiaiaiai git 
export default {
  name: "bigData",
  components: {},
  data() {
    return {
      searchValue: "",
      caseA:[],
      caseB:[],
      caseC:[]
    };
  },
  mounted(){
    let baseUrl = this.GLOBAL.baseUrl;
     this.$http
      .get(baseUrl + "/bigDataIconInfo", {})
      .then(({ data }) => {
        var caseAObject = data.data.A0.icons;
        var caseBObject = data.data.A1.icons;
        var caseCObject = data.data.A2.icons;
        for (const key in caseAObject) {
          if (caseAObject.hasOwnProperty(key)) {
            const element = caseAObject[key];
            this.caseA.push(element)
          }
        }
        for (const key in caseBObject) {
          if (caseBObject.hasOwnProperty(key)) {
            const element = caseBObject[key];
            this.caseB.push(element)
          }
        }
        for (const key in caseCObject) {
          if (caseCObject.hasOwnProperty(key)) {
            const element = caseCObject[key];
            this.caseC.push(element)
          }
        }
      });
    this.openNotice();
  },
  methods:{
     openNotice() {
        this.$notify({
          title: '提示',
          message: '勾选你想查询的网站，点击搜索按钮',
          duration: 0
        });
      }
  }
};
</script>
<style lang="less">
#bigData {
  background-color: #f6f6f8;
  .body-head {
    padding-top: 50px;
    padding-bottom: 100px;
  }
  .content-body{
    padding-bottom: 150px;
    h4{
      padding-left: 5%;
      color: #626262;
      font-size: 24px;
      font-weight: normal;
    }
    ul{
      padding: 0 5%;
      li{
        list-style: none;
        display: inline-block;
        background-color: #fff;
        height: 200px;
        width: 15%;
        margin-right: 1%;
        vertical-align: top;
        text-align: center;
        img{
          margin-top: 14%;
        }
        p{
          text-align: center;
          color: #626262;
        }
      }
      li:nth-child(6){
        margin-right: 0;
      }
    }
  }
}
</style>
