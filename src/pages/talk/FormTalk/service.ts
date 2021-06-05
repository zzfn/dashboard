import http from '@/utils/http';

export async function sendMsg(data: any) {
  return http({
    baseURL: KOA_URL,
    url: '/talk',
    method: 'post',
    data,
  });
}
