<template>
  <div class="header">
   <el-row>
     <el-col :span="5"><div class="grid-content bg-purple-dark">这里是logo</div></el-col>
     <el-col :span="13">
         <ul>
             <li v-for="menu in menus" :key="menu.title">
                 <router-link v-bind:to="menu.url" v-text="menu.title"></router-link>
            </li>
         </ul>
    </el-col>
     <el-col :span="6"><div class="grid-content bg-purple-dark">这里是个人信息</div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return{
      menus: [
        {
          url: "/case/caseManage",
          title: "nav1"
        },
        {
          url: "",
          title: "nav2"
        },
        {
          url: "",
          title: "nav3"
        },
        {
          url: "",
          title: "nav4"
        },
        {
          url: "",
          title: "nav5"
        }
      ]
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.header{
    ul{
        li{
            display: inline-block;
            width: 20%;
            list-style: none;
            a{
                text-decoration: none;
                color: #000;
            }
            
        }
    }
}
</style>
