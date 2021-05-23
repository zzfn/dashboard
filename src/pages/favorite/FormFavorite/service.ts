import http from '@/utils/http';

export async function saveFavorite(data: any) {
  return http({
    url: '/favorite/save',
    method: 'post',
    data,
  });
}

export async function fetchFavorite(params: any) {
  return http({
    url: '/favorite',
    method: 'get',
    params,
  });
}
