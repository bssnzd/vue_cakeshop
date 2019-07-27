<template>
  <div class="footer">
    <!-- <mt-tabbar v-model="selected" :fixed="true"  class="footer" v-show="!$store.state.loginbool">
      <mt-tab-item
       :id="'box'+index"
       v-for="(item,index) in routerList" 
       :key="index" 
       @click.native="sel(index)"
       :class="{'is-selected':cindex==index}"
       >
        <i :class="item.classname"></i>
        <p v-text="item.name"></p>
      </mt-tab-item>
    </mt-tabbar> -->
    <ul v-show="!$store.state.loginbool">
      <li v-for="(item,index) in routerList" :key="index" :class="{'sel':$store.state.cindex==index}" @click="sel(index)">
        <i :class="item.classname"></i>
        <p v-text="item.name"></p>
        <span v-show="index==2& !$store.state.loginbool &$store.getters.count>0">{{$store.getters.count}}</span>
      </li>
    </ul>
    <div class="login" v-show="$store.state.loginbool">
      <p @click="fack">
        <i></i>
      </p>
      <div v-show="bool">
        <h3>登录</h3>
        <p>账号</p>
        <input type="text" v-model="name">
        <p>密码</p>
        <input type="text" v-model="pwd">
        <p class="p1" @click="bools">注册账号</p>
        <div @click="login">
          <i></i>
        </div>
      </div>
      <div class="d1" v-show="!bool">
        <h3>注册</h3>
        <p>昵称</p>
        <input type="text" v-model="id">
        <p>账号</p>
        <input type="text" v-model="name">
        <p>密码</p>
        <input type="text" v-model="pwd">
        <p class="p1" @click="bools">返回登录</p>
        <div @click="register">
          <i></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
import Store from 'storejs';
export default {
  data() {
    return {
      routerList: [
        { path: "/index", name: "首页" ,classname:'fa fa-home'},
        { path: "/sort", name: "分类" ,classname:'fa fa-th-large'},
        { path: "/cart", name: "购物车",classname:'fa fa-cart-plus' },
        { path: "/my", name: "我的" ,classname:'fa fa-user-o'}
      ],
      selected:"",
      bool:true,
      name:'',
      id:'',
      pwd:''
    };
  },
  created(){
    // this.bool=true;
  },
  methods:{
    sel(index){
      if(Store.get('userData')){
        this.$store.state.loginbool=false;
        this.$store.state.nomy=false;
      }
      if(index==3 && this.$store.state.nomy){
        this.$store.state.loginbool=true;
        return;
      }
      this.$store.state.cindex=index;
      this.$store.state.loginbool=false;
      this.$router.push(this.routerList[index].path);
    },
    fack(){
      this.$store.state.loginbool=!this.$store.state.loginbool;
      this.bool=true;
      this.clear();
    },
    bools(){
      this.bool=!this.bool;
      this.clear()
    },
    register(){
      let data={
        id:this.id,
        name:this.name,
        pwd:this.pwd
      }
      this.$apis.register(data).then((res)=>{       
        if(res.data.status==200){
          MessageBox.alert(res.data.msg+'，立即登录').then(action => {
            this.bool=true;
            this.clear();
          })
        }else{
           MessageBox.alert(res.data.msg).then(action => {
            this.bool=false;
          })
        }   
      })
    },
    login(){
      let data={
        name:this.name,
        pwd:this.pwd
      }
      this.$apis.login(data).then((res)=>{
        if(res.data.status==200){
          this.nomy=false;
          res.data.userData.pwd='******'
          Store.set('userData',res.data.userData)
          Toast({
            message: res.data.msg,
            duration: 1000
          });
          this.$store.state.loginbool=false;
          this.$store.state.cindex=3;
          this.$router.push("/my");
        }else{
          Toast({
            message: res.data.msg,
            duration: 1000
          });        
        }
      })
    },
    clear(){
      this.name='';
      this.id='';
      this.pwd='';
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.footer{
  width: r(375);
  margin: 0 auto;
  position: relative;
  ul{
    right: r(0);
    bottom: r(0);
    left: r(0);
    position: fixed;
    width: r(375);
    margin: 0 auto;
    height:r(50);
    z-index: 9;
    background: #fff;
    z-index: 20;
    li{
      width: 25%;
      float: left;
      height:100%;
      text-align: center;
      i{ 
      font-size: r(22);
      height: r(22);
      padding-top:r(4); 
      }
      p{
      font-size: r(14);
      padding-top:r(6); 
      height: r(17);
      }
    }
    .sel{
      color: #02d4d7;
    }
  }
  
}
span{
    background: #f2495e;
    border-radius: 50%;
    width: r(14);
    height: r(14);
    text-align: center;
    line-height: r(14);
    font-size: r(12);
    color: #fff;
    right: r(120);
    bottom: r(33);
    position: absolute;
    z-index: 50;
}
.login{
  width: r(375);
  margin: 0 auto;
  height: r(667);
  background: linear-gradient(180deg,rgba(54,209,220,1),rgba(9,152,154,1));
  z-index: 1000;
  >p{
    width: 100%;
    height: r(42);
    position: relative;
    i{
      position: absolute;
      display: inline-block;
      width: r(9.6);
      height: r(9.6);
      top: r(13);
      margin-top: r(1);
      left: r(15);
      border-left: r(3) solid #fff;
      border-bottom: r(3) solid #fff;
      transform: rotate(45deg);
    }
  }
  >div{
    width: r(335);
    height:r(230);
    margin: 0 auto;
    position: relative;
    h3{
      color: #fff;
      font-size: r(32);
      line-height: r(45);
      font-weight: 100;
    }
    p{
      color: rgb(255, 255, 255);
      font-size:r(14);
      line-height: r(19);
    }
    input{
      width: 100%;
      border: none;
      border-bottom: r(1) solid #fff;
      outline: 0;
      height: r(39);
      background: none;
      border-radius: 0;
      font-size: 4.6vw;
      color: #fff;
    }
    .p1{
      text-align: center;
      width: r(122);
      height: r(30);
      line-height: r(30);
      font-size: r(16);
      border-radius: r(15);
      border: 1px solid #fff;
      color: #fff;
      margin-top: r(30)
    }
    div{
      position: absolute;
      bottom:0;
      right: 0;
      width: r(46);
      height: r(46);
      background-color: rgba(255,255,255,0.4);
      border-radius: 50%;
      i{
        border-top: r(2) solid #22AEB3;
        border-right: r(2) solid #22AEB3;
        transform: rotate(45deg);
        width: r(12);
        height: r(12);
        left: r(13);
        position: absolute;
        top: r(16);
      }
    }
  }
  .d1{
    height: r(290);
  }
}
</style>
