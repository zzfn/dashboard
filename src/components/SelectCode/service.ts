import http from '@/utils/http';

export async function fetchList(params: any): Promise<any> {
  return http({
    url: '/sysDict/getDict',
    method: 'get',
    params,
  });
}
