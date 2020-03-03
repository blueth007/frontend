import Loadable from 'react-loadable'; 
import Loading from '../components/Loading';
//自定义loadable
// import Loadable from './loadable'


// import {
//     DashBoard,
//     Login,
//     NotFound,
//     Settings,
//     ArticleList,
//     ArticleEdit,
// } from '../views';



//路由懒加载   发挥作用:在很多页面需要渲染时候 很方便

const DashBoard=Loadable({
    loader: ()=>import('../views/Dashboard'),
    loading:Loading,
})
const Login=Loadable({
    loader: ()=>import('../views/Login'),
    loading:Loading,
})
const NotFound=Loadable({
    loader: ()=>import('../views/NotFound'),
    loading:Loading,
})
const Settings=Loadable({
    loader: ()=>import('../views/Settings'),
    loading:Loading,
})
const ArticleList=Loadable({
    loader: ()=>import('../views/Article/ArticleList'),
    loading:Loading,
})
const ArticleEdit=Loadable({
    loader: ()=>import('../views/Article/Edit'),
    loading:Loading,
})





//路由结构配置
export const mainRouter = [
    {
        pathname: "/login",
        component: Login,
        exact:false
    },
    {
        pathname: "/404",
        component: NotFound,
        exact:false
    }
]


export const adminRouter = [
    {
        pathname: "/admin/dashboard",
        component: DashBoard,
        title:"仪表盘",
        isNav:true,
        icon:"dashboard",
        exact:false,
    },
   
    {
        pathname: "/admin/article",
        component: ArticleList,
        title:"文章管理",
        icon:"unordered-list",
        isNav:true,
        exact:true
    },
    {
        pathname: "/admin/article/edit/:id",
        component: ArticleEdit,
        exact:false
    }, {
        pathname: "/admin/settings",
        component: Settings,
        title:"设置",
        icon:"setting",
        isNav:true,
        exact:false
    },
]
