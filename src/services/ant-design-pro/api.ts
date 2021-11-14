// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import http from '@/utils/http';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(): Promise<any> {
  return http({
    url: '/user/getUserInfo',
    method: 'get',
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin() {
  return http({
    url: '/user/logout',
    method: 'post',
  });
}

/** 登录接口 POST /api/login/account */
export async function login(data: API.LoginParams, options?: { [key: string]: any }): Promise<any> {
  return http({
    url: '/user/login',
    method: 'post',
    data,
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
