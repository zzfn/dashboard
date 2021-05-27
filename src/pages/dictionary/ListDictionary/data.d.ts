export type TableListItem = {
  code: string;
  createBy?: Date;
  createTime?: string;
  id: string;
  isDelete?: number;
  name: string;
  typeCode?: string;
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
  code: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
