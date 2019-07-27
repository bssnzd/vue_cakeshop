<template>
  <div class="box">
    <ul class="head">
      <li v-for="(item,index) in datalist" :key="index" @click="sel(index)" 
      :class="{'active':cindex==index}">
        {{item.title}}
      </li>
    </ul>
    <ul class="goods">
      <li v-for="(item,index) in glist" :key="index">
        <img :src="item.ImgUrl" alt="" @click="goItem(item)">
        <p v-text="item.Name"></p>
        <div v-text="item.Means"></div>
        <div>
          <span>￥</span>
          <span v-text="item.CurrentPrice" class="spanp"></span>
          <span>.00</span>
          <span v-text="'/'+item.Size" class="spans"></span>
          <i class="fa fa-cart-plus fa-lg" @click="add(item)"></i>
        </div> 
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
     cindex:0,
     glist:[]
    }
  },
  created(){
    this.sel(0)
  },
  props:["datalist"],
  methods:{
    sel(i){
      this.cindex=i;
      this.glist=this.datalist[i].list;
      // console.log(this.glist)
    },
    goItem(item){
      this.$store.state.bool=false
      this.$router.push({path:"/item",query:{
        City: this.$store.state.city,
        Id:item.ID,
        Name:item.Name,
        SupplyNo:item.SupplyNo
        }
      })
    },
    add(item){
      item.id=item.ID;
      item.num=1;
      item.cindex=0;
      this.$store.commit("add",item);
      Toast({
        message: item.Name+'已加入购物车',
        position: 'middle',
        duration: 1500
      });
    }
  },
  watch:{
    datalist(){
       this.sel(0);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.box{
  width: r(375);
  margin:0 auto;
  overflow: hidden;
  .head{
    width: r(275);
    margin:0 auto;
    margin-top: r(28);
    height: r(22);
    position: relative;
    display: flex;
    justify-content: space-around;
    font-size: r(16)
  }
  .active{
    border-bottom: r(2) solid #1db0b8;
    font-weight: 700;
  }

  .goods{
    width: r(363);
    padding: 0 r(6);
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    li{
      width: r(165);
      height: r(231);
      margin-bottom: r(20);
      img{
        max-width: 100%;
        height: r(165);
      }
      p{
        font-size: r(14);
        color: #333;
        padding-left: r(7.5);
        height: r(20);
        line-height: r(20);
        overflow: hidden;
      }
      div:nth-of-type(1){
        font-size: r(12);
        color: #999;
        padding-left: r(7.5);
        width: r(150);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: r(16);
      }
      div:nth-of-type(2){
        padding-left: r(7.5); 
        position: relative;
        height: r(25);
        span{
          color: rgb(255, 51, 0);
          font-size: r(12);
          line-height: r(25);
        }
        .spanp{
          font-size: r(16);
        }
        .spans{
          color: #bcbcbc;
        }
        i{
          position: absolute;
          font-size: r(22);
          top: r(4);
          right: r(4);
          color: #1db0b8;
        }
      }
    }
    li:nth-child(odd){
      margin-right: r(32);
    }
  }
}

</style>
