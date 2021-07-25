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
    name: '首页',
    icon: 'dashboard',
    path: '/home',
    component: './home/Home',
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
    path: '/',
    redirect: '/home',
  },
  {
    name: '编辑文章',
    icon: 'smile',
    path: '/form-article',
    hideInMenu: true,
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
    name: '钉钉',
    icon: 'smile',
    path: '/form-talk',
    access: 'canAdmin',
    component: './talk/FormTalk',
  },
  {
    component: './404',
  },
];
