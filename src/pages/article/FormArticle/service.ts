import http from '@/utils/http';

export async function saveArticle(data: any) {
  return http({
    url: '/article/admin/save',
    method: 'post',
    data,
  });
}

export async function fetchArticle(params: any) {
  return http({
    url: `/article/${params.id}`,
    method: 'get',
  });
}
