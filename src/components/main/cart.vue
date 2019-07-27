<template>
  <div class="warn box">
    <div v-for="(item,index) in $store.state.cartlist" :key="index" class="cart warn">
      <div @click="sq(index)">
        <img src="https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg" alt="" v-show="item.sele">
        <img src="https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg" alt="" v-show="!item.sele">
      </div>
      <div>
        <div class="d1">
          <img :src="`https://res.bestcake.com/m-images/cart/${item.Name}.png`" alt="" @click="goItem(item)">
        </div>
        <div class="d2">
          <div v-text="item.Name" class="t1"></div>
          <div class="t2">
            <p v-text="item.Size"></p>
            <p @click="del(item)">-</p>
            <p>{{item.num}}</p>
            <p @click="add(item)">+</p>
          </div>
          <div class="t3" v-text="item.CurrentPrice*item.num+'.00'"></div>
        </div>
      </div> 
    </div>
    <div class="warn cl">
      <ul>
        <li @click="sel">
          <img src="https://res.bestcake.com/m-images/order/mw_firm_duihao_1.jpg" alt="" v-show="bool">
          <img src="https://res.bestcake.com/m-images/order/mw_firm_duihao_2.jpg" alt="" v-show="!bool">
        </li>
        <li @click="sel">全选</li>
        <li @click="clear">清空</li>
        <li>
          <div>合计：<span>{{allprice}}.00</span></div>
          <div>已优惠：.00</div>
        </li>
        <li @click="$global.set">结算</li>
      </ul>
    </div>
    <div class="foot">

    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import Store from 'storejs';
export default {
  data() {
    return {
      bool:true,
      allprice:0
    };
  },
  created(){
    this.$store.commit('vuexInit');
    this.aprice();
    let num=0;
     this.$store.state.cartlist.map(res=>{
        if(res.sele==true){
          num++;
        }
      })
      if(num==this.$store.state.cartlist.length){
        this.bool=true;
      }else {
        this.bool=false;
      }
  },
  methods:{
    add(item){
      this.$store.commit("add",item);
      this.aprice()
    },
    del(item){
      this.$store.commit("del",item);
      this.aprice()
    },
    sq(i){
      let resq=this.$store.state.cartlist[i]
      resq.sele=!this.$store.state.cartlist[i].sele;
      this.$store.state.cartlist.splice(i,1,resq);
      Store.set("cartList", this.$store.state.cartlist)
      let num=0;
      this.$store.state.cartlist.map(res=>{
        if(res.sele==true){
          num++;
        }
      })
      if(num==this.$store.state.cartlist.length){
        this.bool=true;
      }else {
        this.bool=false;
      }
      this.aprice()
    },
    sel(){
      this.bool=!this.bool;
      this.$store.state.cartlist.map((res,index)=>{
        res.sele=this.bool;
        // this.$store.state.cartlist.splice(index,1,res);
      })
      this.aprice()
    },
    aprice(){
      this.allprice=0;
      this.$store.state.cartlist.map((res,index)=>{
        if(res.sele){
          this.allprice+=res.num*res.CurrentPrice;
        }
      })
    },
    clear(){
      if(this.bool){
        MessageBox.confirm('确定清空购物车?').then(action => {
          this.$store.state.cartlist=[];
          Store.set("cartList", this.$store.state.cartlist);
          this.bool=false;
          this.aprice();
        },failure=>{
         
        });   
      }
    },
    goItem(item){
      this.$store.state.bool=false
      this.$router.push({path:"/item",query:{
        City: this.$store.state.city,
        Id:item.Id,
        Name:item.Name,
        SupplyNo:item.SupplyNo,
        cindex:item.cindex||0
        }
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.warn{
  width: r(375);
  margin: 0 auto;
}
.box{
  background: #f7f7f7;
  position: relative;
}
.cart{
  background: #fff;
  padding-bottom: r(16);
  margin-bottom: r(15);
  height: r(122);
  >div:nth-child(1){
    float: left;
    margin-left: r(15);
    margin-right: r(11.25);
    img{
      width: r(20);
      margin-top: r(63.75);
    }
  }
  >div:nth-child(2){
    float: left;
    height: 100%;
    .d1{
      float: left;
      margin-right: r(16);
      padding-top: r(15);
      width: r(114);
      height: r(106);
      overflow: hidden;
      img{
        width: 100%;
        height: auto;
      }
    }
    .d2{
      float: left;
      width: r(195);
      height: r(77);
      overflow: hidden;
      padding-top: r(19);
      .t1{
        font-size: r(16);
        color: #000;
        line-height: r(18);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: r(183.75);
      }
      .t2{
        margin: r(4.5) 0;
        width: 100%;
        overflow: hidden;
        height: r(25);
        p{
          float: left;
          line-height: r(25);
          font-size: r(16);
          padding: 0 r(8);
          color: #333;
        }
        p:nth-child(1){
          width: 50%;
          line-height: r(12);
          font-size: r(12);
          color: #ccc;
          margin-top: r(6.4);
          padding: 0;
        }
      }
      .t3{
        font-size: r(13);
        color: #030303;
        font-weight: bold;
        line-height: r(15);
        margin-top: r(10);
      }
    }
  }
}
.cl{
  position: fixed;
  background: #fff;
  left: 0;
  right: 0;
  bottom: r(50);
  height: r(56);
  ul{
    height: r(56);
    li{
      float: left;
      font-size: r(15);
      color: #333;
      line-height: r(56);
      text-align: center;
    }
    li:nth-child(1){
      width: r(20);
      margin-left: r(11.25);
      margin-right: r(5);
      img{
        width: 100%;
        height: auto;
        margin-top: r(17.5);
      }
    }
    li:nth-child(2){
      width: r(33.75);
      margin-right: r(15); 
    }
    li:nth-child(4){
      width: r(137.5);
      height: r(43);
      margin-right: r(6.5); 
      margin-top: r(9.5);
      font-size: r(12);
      div:nth-child(1){
        height: r(24);
        line-height: r(24);
        text-align: right;
        padding-right: r(8.5);
        span{
          font-size: r(18);
          color: #f2495e;
        }
      }
      div:nth-child(2){
        height: r(19);
        line-height: r(16);
        text-align: right;
        padding-right: r(8.5)
      }
    }
    li:nth-child(5){
      width: r(115);
      line-height:r(56);
      background: #02d4d7;
      color: #fff;
      font-weight: bolder;
    }
  }
}
.foot{
  height: r(200);
}
</style>
