import request from 'umi-request';
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

export async function addRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
