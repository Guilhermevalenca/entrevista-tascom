export interface IFilterTask {
  byStatus?: 'completed' | 'pending';
  orderDate?: 'asc' | 'desc';
  byDate?: {
    start?: string | Date;
    end?: string | Date;
  };
}
