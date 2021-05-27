export type TableListItem = {
  code: string;
  createBy?: Date;
  createTime?: string;
  id: string;
  isDelete?: number;
  name: string;
  updateBy?: Date;
  updateTime?: string;
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type TableListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type TableListParams = {
  code?: string;
  createBy?: Date;
  createTime?: string;
  id: string;
  isDelete?: number;
  name?: string;
  updateBy?: Date;
  updateTime?: string;
};
