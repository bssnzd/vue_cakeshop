<template>
  <div v-if="fool" class="box warn">
    <div class="banner warn">
      <mt-swipe :auto='0'>
        <mt-swipe-item v-for="(item,index) in [1,2,3,4]" :key="index">
          <img :src="img+item+'.jpg'" />
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="name warn">
      <div>
        <p v-text="itemdata.Name"></p>
      </div>  
    </div>
    <div class="item warn">
      <div>
        <div>甜度</div>
        <div v-if="itemdata.Sweet">
          <img :src="`https://res.bestcake.com/m-images/ww/jz/tiandu_${itemdata.Sweet}.png`" alt="">
        </div>
      </div>
      <div>
        <div>口味</div>
        <div v-text="itemdata.CategoryName">  
        </div>
      </div>
      <div>
        <div>原材料</div>
        <div v-text="itemdata.Resourse">
        </div>
      </div>
      <div>
        <div>适合人群</div>
        <div v-text="itemdata.details_tips">
        </div>
      </div>
      <div>
        <div>保鲜条件</div>
        <div v-text="itemdata.KeepFresh">  
        </div>
      </div>
    </div>
    <div class="pj warn">
           商品评价
    </div>
    <div class="num warn">
      <div :class="{'bj':!bj}" class="d1">
          <div v-for="(item,index) in itemdata.CakeType" :key="'a'+index"
            v-text="item.Size" @click="sql(index)"
            :class="{active:cindex==index}">
          </div>
      </div>
      <div v-if="bj" class="d2">
        <div v-for="(item,index1) in [1,2,3,4]" :key="index1">
          <img :src="`https://res.bestcake.com/m-images/ww/detail/icon-custom-${item}.png`" alt="">
          <div v-text="data[cindex][index1]"></div>
        </div>
      </div>
      <div v-if="jz" class="jz d2">
        <div>
          <img :src="`https://res.bestcake.com/m-images/ww/detail/icon-custom-3.png`" alt="">
          <div>至少2-4人分享</div>
        </div>
        <div>
          <img :src="`https://res.bestcake.com/m-images/ww/detail/icon-custom-4.png`" alt="">
          <div>至少需提前一天预约</div>
        </div>
      </div>
    </div>
    <div class="sl warn">
      <span>购买数量</span>
      <div>
        <p v-show="num>1" @click="num--">-</p>
        <p v-text="num"></p>
        <p @click="num++">+</p>
      </div>
    </div>
    <div class="sm warn">
      <div>
        <div>
          划线价格
        </div>
        <div>
          商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。 
        </div>
      </div>
      <div>
        <div>
          未划线价格
        </div>
        <div>
          商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页价格为准。 
        </div>
      </div>
    </div>
    <div class="total warn">
      <div v-if="itemdata.CakeType&&itemdata.CakeType.length>0">
        <div v-text="itemdata.CakeType[cindex].CurrentPrice*num+'.00'"></div>
        <!-- ?itemdata.CakeType[cindex].CurrentPrice:1 -->
        <span>已优惠</span>
        <span>0.00</span>
      </div>
      <div @click="$global.set">
        立即购买
      </div>
      <div @click="add">
        加入购物车
      </div>   
    </div>
    <div class="footer">

    </div>
    <div class="list" @click="sel">
        更多商品
    </div>
  </div>

</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
  data () {
    return {
     img:"",
     fool:false,
     initdata:"",
     itemdata:{},
     data:[
       ['13.5*13.5cm','适合4-5人分享','含五人份餐具','至少需提前一天预约'],
       ['17*17cm','适合8-10人分享','含十人份餐具','至少需提前一天预约'],
       ['21*21cm','适合12-15人分享','含十五人份餐具','至少需提前一天预约'],
       ['27*40.5cm','适合35-40人分享','含四十人份餐具','至少需提前一天预约']
     ],
     cindex:"",
     num:1,
     bj:true,
     jz:false,
     bxtj:"最适宜0℃~8℃冷藏保存，离开冷藏请勿超过2小时。5月1日~10月31日建议2天内食用 11月1日~翌年4月30日建议3天内食用。"
    }
  },
  created(){
    this.pageInit()
    this.sql(this.$route.query.cindex||0)
  },
  methods:{
    pageInit(){
      this.img=this.getItem(this.$route.query);
    },
    getItem(res){
      let path="https://res.bestcake.com/m-images/"
      // jd-detail/极地牛乳/%E6%9E%81%E5%9C%B0%E7%89%9B%E4%B9%B3-1.jpg?v=20170607
      if(res.SupplyNo.indexOf("KSK")!=-1){
        let data={
          City: res.City,
          ProName: res.Name,
          c: 'Product',
          m: 'GetCakeByName',
          v: new Date().getTime()
        }
        this._getItem(data,(res)=>{
          this.initdata=res;
        })
        return path+`jd-detail/${res.Name}/${res.Name}-`
      }else if(res.SupplyNo.indexOf("NS")!=-1){
        let data={
          Name: res.Name,
          c: 'NsCakeCenter',
          m: 'GetNSCakeByName',
          v: new Date().getTime()
        }
        this._getItem(data,(res)=>{
          this.initdata=res;
        })
        return path+`ns-detail/${res.Name}/${res.Name}-`
      }else if(res.SupplyNo.indexOf("RP")!=-1){
        let data={
          Name: res.Name,
          c: 'NsCakeCenter',
          m: 'GetRuPCakeByName',
          v: new Date().getTime()
        }
        this._getItem(data,(res)=>{
          this.initdata=res;
        })
        return path+`rp-detail/${res.Name}/${res.Name}-`
      }else if(res.SupplyNo.indexOf("JZ")!=-1){
        let data={
          City: res.City,
          ProName: res.Name,
          c: 'IndexCenter',
          m: 'GetjzCakeInfo',
          v: new Date().getTime()
        }
        this._getItem(data,(res)=>{
          this.initdata=res;
        })
        return path+`jz-detail/${res.Name}/${res.Name}-`
      }
    },
    sql(index){
      this.cindex=index;
    },
    sel(){
      this.$router.push({path:"/sort"})
    },
    add(){
      let data={
        Name:this.itemdata.Name,
        Size:this.itemdata.CakeType[this.cindex].Size,
        CurrentPrice:this.itemdata.CakeType[this.cindex].CurrentPrice,
        num:this.num,
        id:this.itemdata.CakeType[this.cindex].Id,
        cindex:this.cindex,
        SupplyNo:this.itemdata.CakeType[this.cindex].SupplyNo
      }
      this.$store.commit('adds',data);
      MessageBox.confirm('成功添加到购物车 是否前往购物车？'
        // {
      //   title: '',
      //   message: '成功添加到购物车',
      //   cancelButton:'再看看',
      //   confirmButton:'去结算'
      //  }
       ).then(action => {
         this.$router.push({path:"/cart"})
      },cor=>{

      });
    },
    _getItem(data,callback){
      this.$apis.getItem(data).then((res)=>{
        callback(res.data.Tag)
      })
    }
    
  },
  watch:{
    initdata(){
      let query=this.$route.query;
      // console.log(this.initdata)
      // console.log(this.$route.query)
      if(this.initdata.length){
        if(query.SupplyNo.indexOf("NS")!=-1){
          this.initdata.map(res=>{
            if(res.City==query.City){
              this.itemdata={
                Name:res.Name,
                CategoryName:res.CategoryName,
                Resourse:res.Resource,
                details_tips:"所有人群",
                KeepFresh:this.bxtj,
                Sweet:res.Sweet,
                CakeType:[{Size:res.Size,CurrentPrice:res.CurrentPrice,Id:res.ID,SupplyNo:res.SupplyNo}],
                query:query
              }; 
            }
          })
          this.fool=true;
        }else if(query.SupplyNo.indexOf("RP")!=-1){
          this.bj=false;
          let obj=[];
          this.initdata.map(res=>{
            if(res.City==query.City){
              this.itemdata={
                Name:res.Name,
                CategoryName:res.CategoryName,
                Resourse:res.Resource,
                details_tips:JSON.parse(res.Details).details_tips,
                KeepFresh:res.KeepFresh,
                Sweet:res.Sweet,
                query:query
              }; 
              obj.unshift({Size:res.Size,CurrentPrice:res.CurrentPrice,Id:res.ID,SupplyNo:res.SupplyNo})
            }
          })
          this.itemdata.CakeType=obj;
          this.fool=true;
        }else if(query.SupplyNo.indexOf("JZ")!=-1){
          this.bj=false;
          this.jz=true;
          let obj=[];
          let res=this.initdata[0]
            this.itemdata={
              Name:res.Name,
              CategoryName:res.CategoryName,
              Resourse:res.Resourse,
              details_tips:JSON.parse(res.Details).details_tips,
              KeepFresh:res.KeepFresh,
              CakeType:res.CakeType,
              Sweet:res.CakeType[0].Sweet,
              query:query
            }; 
        }
        this.fool=true;
      }else{
        this.itemdata={
          Name:this.initdata.infos.Name,
          CategoryName:this.initdata.infos.CategoryName,
          Resourse:this.initdata.infos.Resourse,
          details_tips:JSON.parse(this.initdata.Detail[0]).details_tips,
          KeepFresh:this.initdata.infos.KeepFresh,
          CakeType:this.initdata.infos.CakeType,
          Sweet:this.initdata.infos.CakeType[0].Sweet,
          query:query
        };
        this.fool=true;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.warn{
  width: r(375);
  margin: 0 auto;
  background: white;
}
.box{
  background: #f7f7f7;
  position: relative;
}
.banner{
  height:r(445);
  img{
    width: 100%;
    height:auto;
  }
}
.name{
  height: r(91);
  div{
    width: r(218.75);
    height: r(61);
    text-align: center;
    margin-bottom: r(30);
    overflow: hidden;
    margin: 0 auto;
    p{
      line-height: r(17);
      font-weight: bold;
      color: #333;
      font-size: r(16);
      margin-top: r(7.5);
      margin-bottom: r(15);
      text-align: center;
    }
  } 
}
.item{
  height: r(278);
  overflow: hidden;
  margin-top: r(15);
  >div{
    margin-bottom: r(15);
    overflow: hidden;
    div:nth-child(1){
      font-size: r(14);
      float: left;
      width: r(60);
      margin-left: r(15);
      line-height: r(22);
      color: #9A9A9A;
    }
    div:nth-child(2){
      font-size: r(14);
      float: left;
      width: r(270);
      margin-left: r(15);
      margin-right: r(15);
      line-height: r(22);
    }
    img{
      vertical-align: top;
      width: r(84);
      margin-top: r(2.25);
    }
  }
  >div:nth-child(1){
    margin-bottom: r(11);
    margin-top: r(34);
    
  }
}
.pj{
  padding: r(15) 0;
  margin-top: r(15);
  height: r(22);
  line-height: r(22);
  text-indent: r(15);
}
.num{
  margin-top: r(15);
  
  .d1{
    padding-top: r(30);
    height: r(30);
    width: 100%;
    div{
      float: left;
      font-size: r(14);
      text-align: center;
      line-height: r(28);
      padding: 0 r(13.5);
      height: r(28);
      margin-left: r(15);
      background: #fff;
      border-radius: r(1);
      color: #333;
      border: r(1) solid #ddd;
    }
    .active{
      background: #02d3d6;
      border-radius: r(2);
      color: #fff;
      border: r(1) solid #02d3d6;
    }
  }
  .d2{
    padding-top: r(42);
    height: r(93);
    width: 100%;
    >div{
      width: 50%;
      float: left;
      height: r(24);
      margin-bottom: r(15);
      img{
        float: left;
        width: 12%;
        margin-right: r(10);
        margin-left: r(15);
      }
      div{
        float: left;
        line-height: r(24);
        font-size: r(14);
      }
    }
    .active{
      background: #02d3d6;
      border-radius: r(2);
      color: #fff;
      border: r(1) solid #02d3d6;
    }
  }
  .bj{
    padding-top: r(15);
    height: r(45);
  }
  .jz{
    height: r(54);
  }
}
.sl{
  padding: r(15) 0;
  margin-top: r(15);
  height: r(22);
  span{
    float: left;
    padding-left: r(15);
    line-height: r(22);
    font-size: r(14);
  }
  div{
    float: right;
    height: r(22);
    p{
      float: left;
      line-height: r(22);
      font-size: r(14);
      padding: 0 r(10) ;
    }
  }
}
.sm{
  background: #f7f7f7;
  padding: r(7.5) 0;
  height: r(184);
  >div{
    margin: 0 r(15);
    font-size: r(14);
    margin-top: r(15);
    div:nth-child(1){
      float: left;
      width: r(101.25);
      color: #181818;
      line-height: r(22);
    }
    div:nth-child(2){
      float: left;
      width: r(243.75);
      color: #a2a2a2;
      line-height: r(22);
    }
  }
}
.total{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    height: r(55);
    margin-top: r(15);
    >div:nth-child(1){
      float: left;
      margin-left: r(15);
      margin-top: r(5.4);
      margin-bottom: r(9);
      width: r(135);
      overflow: hidden;
      div{
        font-size: r(17);
        color: #f2495e;
        font-weight: bolder;
        line-height: r(27);
        width: r(135);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    >div:nth-child(2){
      font-size: r(16);
      float: right;
      width: r(115);
      text-align: center;
      padding: r(16.3) 0;
      background: #02d4d7;
      color: white;
      font-weight: bolder;
      line-height: r(27);
    }
     >div:nth-child(3){
      float: right;
      width: r(110);
      text-align: center;
      padding: r(16.3) 0;
      line-height: r(27);
      font-size: r(16);
    }
}
.list{
    position: fixed;
    right: r(-2);
    top: r(15);
    background-color: rgba(255,255,255,0.5);
    width: r(80);
    height: r(32);
    border-radius: r(2) 0vw 0vw r(2);
    line-height: r(30);
    text-align: center;
    z-index: 23;
    border: r(1) solid #333;
    font-size: r(16);
}
.footer{
  height: r(70);
}
</style>
