<template>
  <div class="box">
    <button @click="sel(1)" :class="{'col':col1}">自营</button>
    <button @click="sel(2)" :class="{'col':col2}">贝氏严选</button>
    <goods_list v-if="dataList.length!=0" :datalist="dataList"></goods_list>
    <div class="d1"></div>
  </div>
</template>
<script>
import goods_list from "@/components/main/sortlist";
export default {
  data() {
    return {
      goodsList:[
        {title:"经典",mark:"KSK",list:[]},
        {title:"女神",mark:"NS",list:[]},
        {title:"伴手礼",mark:"JZ",list:[]},
        {title:"乳品",mark:"RP",list:[]}
      ],
      dataList:[],
      col1:true,
      col2:false
    };
  },
  mounted() {
    this.pageInit()
  },
  components:{
    goods_list
  },
  methods:{
    pageInit(){
      this._getFication(res=>{
        this.goodsList.map((item)=>{
          res.map((r)=>{
            if(r.SupplyNo.indexOf(item.mark)!=-1){
              r.ImgUrl=this.$global.setUrl(r)
              item.list.push(r); 
            }
          })
        })
        this.sel(1)
      })
    },
    _getFication(callback){
      this.$apis.getFication().then(res=>{
        callback(res.data.Tag.cakelist)
      })
    },
    sel(n){
      if(n==1){
        this.dataList=this.goodsList.slice(0,3)
        this.col1=true;
        this.col2=false;
      }else{
        this.dataList=this.goodsList.slice(3)
        this.col1=false;
        this.col2=true;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.box{
  width: r(375);
  margin:0 auto;
  overflow: hidden;
  button{
    width: 50%;
    float: left;
    font-size: r(16);
    text-align: center;
    height: r(50);
    line-height: r(50);
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: none;
    background: #fff;
    border-bottom: r(1) solid rgb(173, 170, 170);
  }
  .col{
    color: #1db0b8;
    border-bottom: r(2) solid #1db0b8;
  }
  .d1{
    height: r(80);
  }
}


</style>
