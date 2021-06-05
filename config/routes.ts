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
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    name: 'list-article',
    icon: 'EditOutlined',
    path: '/list-article',
    component: './article/ListArticle',
  },
  {
    name: 'list-favorite',
    icon: 'ShareAltOutlined',
    path: '/list-favorite',
    component: './favorite/ListFavorite',
  },
  {
    name: 'list-dictionary',
    icon: 'smile',
    path: '/list-dictionary',
    hideInMenu: true,
    component: './dictionary/ListDictionary',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    name: 'form-article',
    icon: 'smile',
    path: '/form-article',
    hideInMenu: true,
    component: './article/FormArticle',
  },
  {
    name: 'form-favorite',
    icon: 'smile',
    path: '/form-favorite',
    hideInMenu: true,
    component: './favorite/FormFavorite',
  },
  {
    name: 'dictionary',
    icon: 'SendOutlined',
    path: '/dictionary',
    component: './dictionary/Dictionary',
  },
  {
    name: 'talk',
    icon: 'smile',
    path: '/form-talk',
    component: './talk/FormTalk',
  },
  {
    component: './404',
  },
];
