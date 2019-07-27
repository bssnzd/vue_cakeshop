import request from "./http"
import mock from  "@/mock"

class Apis {
    
    // json1811.ashx?v=1562741893374&c=NewIndexController&m=index
    getIndexData() {
        return request({
            method: 'get',
            url: '/json1811.ashx',
            params: {
                "v": "1562741438965",
                "c": "NewIndexController",
                "m": "index"
            }
        });
    }
    getFication(){
        return request({
            method: 'get',
            url: '/json1811.ashx',
            params: {
                "v": "1563267500571",
                "c": "NsCakeCenter",
                "m": "GetJdListNew"
            }
        });
    }
    getItem(params){
        return request({
            method: 'get',
            url: '/json1811.ashx',
            params
        });
    }
    login(data){
        return mock.post("/login",{
          data
        })
    }
    register(data){
        return mock.post("/register",{
          data
        })
    }
}
export default new Apis();