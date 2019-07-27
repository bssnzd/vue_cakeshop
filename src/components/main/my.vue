<template>
  <div class="box">
      <div v-show="bool">
        <div class="d1" >
            <div>
                <img :src="userData.imgurl||'https://res.bestcake.com/m-images/order/mw-person-tx.png'" alt=""
                @click="bool=!bool">
            </div>      
        </div>
        <div v-text="userData.id" class="d2"></div>
        <div class="d3">
            <div>
                <p>会员等级</p>
                <div>V0</div>
            </div>
            <div>
                <p>吉致币</p>
                <div>0</div>
            </div>
            <div>
                <p>优惠劵</p>
                <div>0</div>
            </div>
            <div>
                <p>兑换券</p>
                <div>0</div>
            </div>
        </div>
      </div>
      <div v-show="!bool">
          <p @click="bool=!bool" class="p1"> 
              <img src="https://res.bestcake.com/m-images/ww/info/arrow-r.png" alt="">返回
          </p>
          <ul>
            <li>
                <div>头像</div>
                <img src="https://res.bestcake.com/m-images/ww/info/arrow-r.png" alt="" v-fileUpload="{fn:'fileUpload',multiple:true}">
                <div class="i1">
                    <img :src="userData.imgurl||'https://res.bestcake.com/m-images/order/mw-person-tx.png'" alt="" >
                </div>   
            </li>
            <li>
                <div>昵称</div>  
                <img src="https://res.bestcake.com/m-images/ww/info/arrow-r.png" alt="" @click="upid">
                <div v-text="userData.id" class="ud1"></div>
            </li>
            <li class="li1">
                <button @click="quit">退出登录</button>
            </li>
        </ul>
      </div>
  </div>
</template>

<script>
import Store from 'storejs';
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
  data () {
    return {
        userData:{},
        bool:true
    }
  },
  created(){
      this.userData=Store.get('userData')||{}
  },
  methods:{
      fileUpload(url){
          let data=Store.get('userData');
          data.imgurl=url;
          Store.set('userData',data);
          this.userData=Store.get('userData')
          Toast({
            message: '修改成功',
            duration: 1000
          });
      },
      quit(){
        MessageBox.confirm('确定退出登录?退出后进入首页').then(action => {
             Store.remove('userData');
             Store.remove('cartList');
             this.$store.state.nomy=true;
             this.$store.state.cindex=0;
             this.$router.push('/');
        },failure=>{
        
        });    
      },
      upid(){
          MessageBox.prompt('请输入新昵称').then(({ value, action }) => {
              let data=Store.get('userData');
              data.id=value;
              Store.set('userData',data);
              this.userData=Store.get('userData')
              Toast({
                  message: '修改成功',
                  duration: 1000
              });
          },failure=>{

          });
      }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.box{
    width: r(375);
    margin: 0 auto;
    .d1{
        width: 100%;
        margin: 0 auto;
        height: r(81);
        padding-top: r(25);
        div{
            width: r(79);
            height: r(81);
            margin: 0 auto;
            border: r(1) solid #fff;
            border-radius: 50%;
            overflow: hidden;
            img{
                width: 100%;
                height: auto;
                margin: 0 auto;
            }
        }  
    }
    .d2{
        width: 100%;
        margin: 0 auto;
        padding-top: r(5);
        line-height: r(24);
        font-size: r(14);
        color: #333;
        text-align: center;
    }
    .d3{
        width: 100%;
        margin: 0 auto;
        padding-top: r(32.5);
        background: #fff;
        padding-bottom: r(15);
        display: flex;
        >div{
            width: 25%;
            text-align: center;
            p{
                line-height: r(15);
                font-size: r(12);
                color: #ccc;
            }
            div{
                padding-top: r(6.5);
                line-height: r(21);
                font-size: r(18);
                color: #333;
            }
        }
    }
}
.p1{
    height: r(50);
    border-bottom:r(1) solid #7c7b7b; 
    font-size: r(16);
    line-height: r(50);
    text-indent: r(30);
    position: relative;
     img{
            transform: rotate(180deg);
            width: auto;
            height: r(18);
            position: absolute;
            left:r(15);
            top:r(16);
    }
}
ul{
    li{
        border-bottom:r(1) solid #7c7b7b; 
        overflow: hidden;
        height: r(66);
        div{
            float: left;
            color: #333;
            font-size: r(14);
            line-height: r(14);
            margin-top: r(26);
            margin-bottom: r(26);
            margin-left: r(15);
        }
        img{
            float: right;
            margin: r(25) r(35) r(25) r(15);
            width: r(10);
            height: auto;
        }
        .ud1{
            float: right;
        }
        .i1{
            float: right;
            width: r(46);
            height: r(46);
            margin-top: r(10);
            margin-bottom: r(10);
            overflow: hidden;
            border-radius:50%; 
            img{
                float: none;
                margin: 0;
                width: 100%;
                height: auto;
            }
        }
        
    }
    .li1{
        border: none;
        text-align: center;
        margin-top: r(15);
        button{
            width: r(100);
            height: r(50);
            margin: 0 ;
            padding: 0;
            background:#fff;
            border: r(1) solid #f2495e;
            color: #f2495e;
            font-size:r(16) ;
            border-radius: r(10)
        }
    }
}

</style>
