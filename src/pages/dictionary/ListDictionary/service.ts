import type { TableListParams } from './data.d';
import http from '@/utils/http';

export async function queryRule(params?: TableListParams): Promise<any> {
  return http({
    url: '/sysDict/getDict',
    method: 'get',
    params,
  });
}

export async function removeRule(data: { id: string }) {
  return http({
    url: '/sysDict/removeDict',
    method: 'delete',
    data,
  });
}

export async function addRule(data: TableListParams) {
  return http({
    url: '/sysDict/saveDict',
    method: 'POST',
    data,
  });
}
