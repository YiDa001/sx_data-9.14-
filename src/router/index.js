import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/protect'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/protect',
                    component: resolve => require(['../components/page/protect.vue'], resolve),
                    meta: { title: '预防性保护' }
                },
                {
                    path: '/Relic',
                    component: resolve => require(['../components/page/Relic.vue'], resolve),
                    meta: { title: '文保修复', permission: true }
                },
                {
                    path: '/Collection',
                    component: resolve => require(['../components/page/Collection.vue'], resolve),
                    meta: { title: '藏品管理', permission: true }
                },
                {
                    path: '/Audience',
                    component: resolve => require(['../components/page/Audience.vue'], resolve),
                    meta: { title: '观众服务', permission: true }
                },
                {
                    path: '/Exhibition',
                    component: resolve => require(['../components/page/Exhibition.vue'], resolve),
                    meta: { title: '展览陈列', permission: true }
                },
                {
                    path: '/Science',
                    component: resolve => require(['../components/page/Science.vue'], resolve),
                    meta: { title: '科研成果', permission: true }
                },
                {
                    path: '/Public',
                    component: resolve => require(['../components/page/Public.vue'], resolve),
                    meta: { title: '舆情系统', permission: true }
                },
                {
                    path: '/Society',
                    component: resolve => require(['../components/page/Society.vue'], resolve),
                    meta: { title: '社会教科', permission: true }
                },
                {
                    path: '/Total',
                    component: resolve => require(['../components/page/Total.vue'], resolve),
                    meta: { title: '综合展示', permission: true }
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        // {
        //     path: '/login1',
        //     component: resolve => require(['../components/page/Login1.vue'], resolve)
        // },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
