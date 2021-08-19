// @ts-ignore
/* eslint-disable */
import http from '@/utils/http';

/** 获取规则列表 GET /api/rule */
export async function fetchList(params: any): Promise<any> {
  return http({
    url: '/trace/list',
    method: 'GET',
    params,
  });
}
