export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    name: '工作台',
    icon: 'smile',
    path: '/workplace',
    component: './workplace',
  },
  {
    name: '文章列表',
    icon: 'EditOutlined',
    path: '/list-article',
    component: './article/ListArticle',
  },
  {
    name: '收藏列表',
    icon: 'ShareAltOutlined',
    path: '/list-favorite',
    component: './favorite/ListFavorite',
  },
  {
    name: '字典列表',
    icon: 'smile',
    path: '/list-dictionary',
    hideInMenu: true,
    component: './dictionary/ListDictionary',
  },

  {
    name: '编辑文章',
    icon: 'smile',
    path: '/form-article',
    hideInMenu: true,
    access: 'canAdmin',
    component: './article/FormArticle',
  },
  {
    name: '编辑收藏',
    icon: 'smile',
    path: '/form-favorite',
    hideInMenu: true,
    component: './favorite/FormFavorite',
  },
  {
    name: '字典',
    icon: 'SendOutlined',
    path: '/dictionary',
    component: './dictionary/Dictionary',
  },
  {
    name: '日志查询',
    icon: 'AlertOutlined',
    path: '/monitor',
    component: './monitor/ListMonitor',
  },
  {
    name: '文件管理',
    icon: 'smile',
    path: '/oss',
    component: './oss/List',
  },
  {
    path: '/',
    redirect: '/workplace',
  },
  {
    component: './404',
  },
];
