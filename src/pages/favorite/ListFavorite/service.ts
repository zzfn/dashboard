import http from '@/utils/http';
import type { TableListParams, TableListItem } from './data.d';

export async function queryRule(params?: TableListParams): Promise<any> {
  return http({
    url: '/favorite/non/page',
    method: 'get',
    params,
  });
}

export async function removeRule(params: TableListItem) {
  return http({
    method: 'delete',
    url: '/favorite',
    params,
  });
}
