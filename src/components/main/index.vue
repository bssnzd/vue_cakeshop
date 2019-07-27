<template>
  <div>
    <div class="nav warn">
      <img src="https://res.bestcake.com/images/newIndex/localtion.png" alt="">
      <p>上海</p>
      <img src="https://res.bestcake.com/images/newIndex/more.png" alt="" class="im">
    </div>
    <div class="banner warn">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item,index) in SwiperBannerList" :key="index">
          <img :src="item.ImgUrl" />
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="bz warn">
      <img src="https://res.bestcake.com/images/newIndex/title.png?v=1">
    </div>
    <a href="" class="a warn">
      <img src="https://res.bestcake.com/images/newindex/tusi.gif" alt="">
    </a>
    <div class="iconList warn">
      <a href="" v-for="(item,index) in TopIconList" :key="index">
        <img :src="item.ImgUrl" alt="">
        <p v-text="item.ActName"></p>
      </a>
    </div>
    <div class="broadcast warn">
      <div class="left">通知</div>
      <div class="right">
        <div v-text="NoticeList"></div>
      </div>
    </div>
    <div class="special warn">
      <div  v-for="(item,index) in CenterContentList" :key="index">
        <img :src="item.ImgUrl" alt="">
      </div>
    </div>
    <div class="box warn">
      <div v-for="(item,index) in SaleListImg" :key="index">
          <img :src="item.TabImgUrl" alt="">
          <swiper_t v-if="SaleList.length!=0">
            <div class="swiper-slide" v-for="(item,index1) in SaleList[index]" :key="index1" style="width:r(156)">
              <img :src="item.ImgUrl" @click="goItem(item)"/>
              <p v-text="item.Name"></p>
              <div>
                <span v-text="'￥'+item.Price" class="spanp"></span>
                <span v-text="'/'+item.Size" class="spans"></span>
              </div> 
            </div>
          </swiper_t>
      </div>
      <div class="warn footer">

      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      SwiperBannerList:[],
      TopIconList:[],
      NoticeList:[],
      CenterContentList:[],
      SaleListImg:[],
      SaleList:[]

    };
  },
  computed: {
    
  },
  mounted() {
    this.pageInit()
    this.$store.state.bool=true
  },
  methods: {
    pageInit(){
      this._getIndexData((res)=>{
        this.SwiperBannerList=res.SwiperBannerList;
        this.TopIconList=res.TopIconList;
        this.NoticeList=res.NoticeList;
        this.CenterContentList=res.CenterContentList;
        this.SaleListImg=res.SaleList;
        res.SaleList.map((item,index)=>{
          if(index==1){
            this.SaleList.push(JSON.parse(item.CakeList).reverse());
            return;
          }
          this.SaleList.push(JSON.parse(item.CakeList));
        })
        this.SaleList.map(item => {
          item.map(item => {
            item.ImgUrl = this.$global.setUrl(item);
          });
        });
        // console.log(res)
      })
    },
    goItem(item){ 
      this.$store.state.bool=false
      this.$router.push({path:"/item",query:{
        City: this.$store.state.city,
        Id:item.Id,
        Name:item.Name,
        SupplyNo:item.SupplyNo
        }
      })
    },
    _getIndexData(callback){
      this.$apis.getIndexData().then((res)=>{
        callback(res.data.Tag.mainresult)
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.warn{
  width: r(343);
  margin: 0 auto;
}
 .nav{
   height: r(44);
   img{
     width: r(19);
     height: r(22);
     margin-top: r(11);
     float: left;
   }
   p{
     font-size: r(14);
     line-height: r(44);
     color:#333;
     margin-left: r(4);
     float: left;
   }
   .im{
     width: r(9);
     height: r(16);
     margin-top: r(14);
     margin-left: r(4);
     float: left;
   }
 }
 .banner{
   height: r(180);
   img{
     width: 100%;
     height: 100%;
   }
 }
 .bz{
   width: r(375);
   height: r(36);
   img{
     width: 100%;
     height: 100%;
   }
 }
 .a{
   display: block;
   width: r(375);
   height: r(86);
   img{
     width: r(343);
     margin-left: r(16);
     height: 100%;
   }
 }
 .iconList{
   padding: 0 r(25);
   padding-bottom: r(20);
   display: flex;
   width: r(325);
   height: r(196);
   flex:1;
   flex-wrap: wrap;
   a{
     text-decoration: none;
     margin-right: r(27);
     img{
      width: r(52);
      margin: r(16) r(3.75) 0;
      height: r(52);
     }
     p{
       width: r(60);
       height: r(19);
       font:r(12)/r(19) ""; 
       color:#333;
       text-align: center; 
     }
   }
 }
 .iconList a:nth-child(4){
   margin-right: r(0);
 }
 .broadcast{
   width: r(375);
     height:r(40.25) ;
     line-height: r(18);
     text-align: center;
     border-top: r(8) solid #fafafa;
     border-bottom: r(8) solid #fafafa;
   .left{
     width: r(36);
     height:r(18) ;
     line-height: r(18);
     text-align: center;
     margin: r(11.25) 0 0 r(16);
     border-radius: r(3);
     background: #1fb1b8;
     color:#333;
     float: left;
   }
   .right{
     width: r(294);
     height:100% ;
     float: right;
     margin-right: r(24);
     position: relative;
     overflow: hidden;
     div{
       width: r(1498);
       height:r(18) ;
       position: absolute;
       top:r(11.25);
       animation: go 25s linear infinite;
       font-size: r(14);
       color:#1fb1b8;
     }
     @keyframes go {
       0%{
         transform:translateX(30%)
       }
       100%{
         transform:translateX(-100%)
       }
     }
   }
 }
 .special{
    width: r(343);
    height: r(209);
     padding: r(16);
     background: #fff;
     div{
       width: r(167);
       height: r(100);
       float: left;
       border-radius: r(3);
       margin-right: r(9);
       margin-bottom: r(9);
        img{
          width: r(167);
          height: r(100);
        }
      }
  }
  .special div:nth-child(2){
    margin-right: r(0);
  }
  .special div:nth-child(3){
    margin-bottom: r(0);
  }
  .special div:nth-child(4){
    margin-bottom: r(0);
    margin-right: r(0);
  }
  .box{
    width: r(375);
    >div>img{
      width: 100%;
      height:r(142);
    }
    >div>div{
      border: none;
      div>div{
       width: r(156);
       height: r(190);
       border-radius: r(3);
       margin: r(12) r(0) r(24) r(12);
       padding: r(15) 0;
       background: #fff;
       box-shadow: 0 2px 6px rgba(0,0,0,0.1);
       img{
       width: r(120);
       height: r(120);
       margin: 0 auto;
       display: block;
       }
       p{
          width: r(118);
          margin: 0 auto;
          height: r(40);
          font: r(14)/r(20) ""; 
          font-family: "Segoe UI","Lucida Grande";
          margin-top: r(5);
          overflow: hidden;
          font-weight: bold;
       } 
       div{
         width: r(118);
          margin: 0 auto;
          height: r(25);
          border-radius: 0;
       padding: 0;
       background: #fff;
       box-shadow: none;
       }
      }  
    }
  }
  .box .spanp{
          color:#CC2825;
          font-size: r(16);
       }
  .box .spans{
          color:#999;
          font-size: r(14);
       }


  .footer{
    height: r(50)
  }
</style>
