export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'| string;

export type Task = {
  id: string;
  status: TaskStatus;
  title: string;
  priority:string;
  dueDate:string;
  description: string;
};

export type Columns = {
  id: TaskStatus;
  title: string;
  color:string;
};