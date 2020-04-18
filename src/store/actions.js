import {ADD_COUNT,ADD_TO_CART} from './mutation-types'
export default{
    addCart(context,payload){
        // let oldObj = null;
        // for(let item of state.cartlist){
        // if(item.iid === payload.iid){
        //     oldObj = item
        // }
        // }
        // if(oldObj){
        //     oldObj.count+=1
        // }else{
        //     payload.count=1
        //     state.cartlist.push(payload)
        // }
        return new Promise((resolve,reject)=>{
            let oldObj = context.state.cartlist.find(item => item.iid===payload.iid)            
            if(oldObj){
                context.commit(ADD_COUNT,oldObj)
                resolve('商品数量加1')
            }else{
                payload.count=1
                context.commit(ADD_TO_CART,payload)
                resolve('商品添加成功')
            }
        })
        
        
            // console.log(context.state.cartlist);
    }
}