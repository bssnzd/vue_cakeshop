

import Vuex from "vuex";
import Vue from "vue";
import apis from "@/core/api"
import { MessageBox } from 'mint-ui';
import { Indicator } from 'mint-ui';
import Store from 'storejs';
Vue.use(Vuex);
// Vuex作用是什么? 全局状态管理

//理解为 组件内部  data 属性
const state={
    city:"上海",
    loginbool: false,
    cartlist:[],
    nomy:true,
    cindex:0
}
//定义  methods 同步方法   视图调用     this.$store.commit("xxxx",val)
const mutations={
    // 没有第三个参数
    add(state,data){
        let bool=true;
        if(state.cartlist.length!=0){
            state.cartlist.map((res,index)=>{
                if(res.id==data.id){
                    res.num++;
                    state.cartlist.splice(index,1,res);
                    bool=false;
                }
            })
        }
        if(bool){
            data.sele=true;
            state.cartlist.push(data);
        }
        Store.set('cartList',state.cartlist)
    },
    del(state,data){
        if(state.cartlist.length!=0){
            state.cartlist.map((res,index)=>{
                if(res.id==data.id){
                    res.num--;
                    if(res.num<=0){
                        res.num=1;
                        MessageBox.confirm('确定删除此商品?').then(action => {
                            state.cartlist.splice(index,1)
                            Store.set('cartList',state.cartlist)
                        }).catch(fa=>{
                            state.cartlist.splice(index,1,res);
                            Store.set('cartList',state.cartlist)
                        }); 
                    }
                    state.cartlist.splice(index,1,res);
                    Store.set('cartList',state.cartlist)
                }
            })
        }
        
    },
    adds(state,data){
        let bool=true;
        if(state.cartlist.length!=0){
            state.cartlist.map((res,index)=>{
                if(res.id==data.id){
                    res.num+=data.num;
                    state.cartlist.splice(index,1,res);
                    bool=false;
                }
            })
        }
        if(bool){
            data.sele=true;
            state.cartlist.push(data);
        }
        Store.set('cartList',state.cartlist)
    },
    vuexInit(state){
        if(Store.get('cartList')){
            state.cartlist=Store.get('cartList')
        }  
    }
}
// 定义 compunted  属性计算
const getters={
    count(state){
        let num=0;
        state.cartlist.map(res=>{
            num+=res.num
        });
        if(num>=99){
            num=99;
        }
        return num;
    }
}
// --------------
//定义 异步方法 通用接口调用    视图调用     this.$store.dispatch("xxxx",val)
const actions={
    test(context,data){
        console.log(context)  //可以调用  mutations 方法    actions调actions自己的方法,也可以使用 getters,也可以使用state
        // apis.getItem().then((res)=>{
            // console.log(res)
        // })
    },
    test2(context,data){
        console.log("run");
        Indicator.open("加载中...")
      setTimeout(()=>{
        Indicator.close()
        context.state.isTopic=true;
      },5000)
    }
}
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})