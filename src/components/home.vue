<template>
  <div>
   
    <lay_head v-show="$route.path!='item'"></lay_head>
     <router-view v-show="!$store.state.loginbool"/>
     
      <!-- keepAlive true 禁止重复加载  false不禁止-->
     <!-- <div class="box" v-if="$route.meta.name=='ok'?true:false"></div> -->
  </div>
</template>

<script>
import lay_head from "@/components/layout/head"
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
      this.$store.commit('vuexInit')
  },
  components:{
    lay_head
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
