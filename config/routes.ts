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
    icon: 'smile',
    path: '/list-article',
    component: './article/ListArticle',
  },
  {
    name: 'list-favorite',
    icon: 'smile',
    path: '/list-favorite',
    component: './favorite/ListFavorite',
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
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
    component: './404',
  },
];
