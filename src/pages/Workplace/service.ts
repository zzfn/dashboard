import http from '@/utils/http';

export async function getPerformance(): Promise<any> {
  return http({
    url: '/trace/getPerformance',
    method: 'get',
  });
}
