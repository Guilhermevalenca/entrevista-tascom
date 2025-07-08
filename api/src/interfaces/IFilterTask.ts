export interface IFilterTask {
  byStatus?: 'completed' | 'pending';
  orderDate?: 'asc' | 'desc';
  byDate?: {
    start?: Date;
    end?: Date;
  };
}
