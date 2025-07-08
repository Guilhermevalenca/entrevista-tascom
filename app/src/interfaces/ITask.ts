export interface ITask {
  id?: number;
  title: string;
  description: string;
  status?: 'completed' | 'pending';
  createdAt?: Date;
  updatedAt?: Date;
}
