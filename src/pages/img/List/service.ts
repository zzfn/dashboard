import http from '@/utils/http';

export async function listFiles(params: any): Promise<any> {
  return http({
    url: '/oss/listFiles',
    method: 'get',
    params
  });
}

export async function botList(): Promise<any> {
  return http({
    url: '/talk/all',
    method: 'get',
  });
}
