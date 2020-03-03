
Redux 三大构造
    action
        定义操作行为,摒弃其他非法行为对stroe的操作,是一个对象
        {
            type:"operation",
            text: value,
        }

        action创建函数,通过函数来创建action,可以传入参数

        export function actionA=(value)=>{
            return{
                type:"operation",
                text:value
            }
        }

    reducer
         根据action的不同 Switch(action),对state进行复制赋值,返回一个新是state,原state不会有任何改变


        export reduceA(state,action){
            switch(action.type){
                case "A":
                    return {..state,action.text的合并或者取值操作等};
                case "B":
                    return  return {..state,action.text的合并或者取值操作等};
                default 
                     return state
            }
             
        }

        多个reduce 进行合并 

        export default combineReducer({
            reduceA,
            //reduceB, ....
        })



    store
            import { createStore } from 'redux'
            let store = createStore(reduce)


store.dispatch(actionA(args))来进行state的值的改变,它会默认吊桶 reducer中switch分支的到新的state的值.

store.subscribe(()=>console.log(store.getStete()))来监听state的改变.


react-redux

在组件中自动绑定redux

在需要的数据地方 Provider( import from 'react-redux')
<Provider store ={store}>
        <APP>
</Provider>


在APP组件中 使用connect (from 'react-redux') 

export default connect(mapStateToProps,mapDispatchToProps)(APP)来连接store到组件属性上去                                         

mapDispatchToProps -->{可以替换为 action中的创建函数 actionA}

在组件中使用时候 onClick={this.props.actionA.bind(this,arguments)}

