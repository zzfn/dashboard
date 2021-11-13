import http from '@/utils/http';
import type { TableListParams } from './data.d';

export async function queryRule(params?: TableListParams): Promise<any> {
  return http({
    url: '/article/page',
    method: 'get',
    params,
  });
}

export async function removeRule(params: { id: string; tag: string }) {
  return http({
    method: 'delete',
    url: `/article/non/${params.id}/${params.tag}`,
  });
}
