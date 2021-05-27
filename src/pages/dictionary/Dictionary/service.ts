import request from 'umi-request';
import type { TableListParams } from './data.d';
import http from '@/utils/http';

export async function queryRule(params: any) {
  return http({
    url: '/sysDictType/listDictType',
    method: 'get',
    params,
  });
}

export async function removeRule(data: { id: string }) {
  return http({
    url: '/sysDictType/removeDictType',
    method: 'delete',
    data,
  });
}

export async function addRule(data: TableListParams) {
  return http({
    url: '/sysDictType/saveDictType',
    method: 'POST',
    data,
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
