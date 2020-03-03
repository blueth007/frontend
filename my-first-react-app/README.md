
1,components文件夹下的组件建议使用层级目录
     ----Header   组件1
        ---index.js  (export default)
     ----Content  组件2
        ---index.js  (export default)
     index.js  合并组件
            --内部 import Header Content from  ,导出 export {Header ,Content}       
   在外部引用 import { Header,Content} from './components';

2, 在组件中添加默认值
   class 组件中 使用 static defaultProps={name:"myName""},
   函数组件中使用 Components.defaultProps={name:"myName"}
   

