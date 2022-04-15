import http from '@/utils/http';

export async function listFiles(params: any): Promise<any> {
  return http({
    url: '/oss/listFiles',
    method: 'get',
    params
  });
}

export async function delFile(data: any): Promise<any> {
  return http({
    url: '/oss/deleteFile',
    method: 'delete',
    data
  });
}
export async function deleteFolder(data: any): Promise<any> {
  return http({
    url: '/oss/deleteFolder',
    method: 'delete',
    data
  });
}
