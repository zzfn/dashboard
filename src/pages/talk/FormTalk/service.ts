import http from '@/utils/http';

export async function sendMsg(data: any) {
  return http({
    url: '/talk/send',
    method: 'post',
    data,
    params: { id: data.bot },
  });
}

export async function botList(): Promise<any> {
  return http({
    url: '/talk/all',
    method: 'get',
  });
}
