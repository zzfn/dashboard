import request from 'umi-request';
import http from '@/utils/http';

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}
export async function getTags() {
  return http({
    url: '/overview/non/tags',
    method: 'get',
  });
}
export async function getAll() {
  return http({
    url: '/overview/non/all',
    method: 'get',
  });
}
export async function getServerInfo(params: any) {
  return http({
    url: '/system/os',
    method: 'get',
    params,
  });
}
