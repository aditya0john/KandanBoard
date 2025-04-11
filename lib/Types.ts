export type Task = {
  _id: string;
  title: string;
  priority: string;
  dueDate: string;
  description: string;
  columnId: string;
};

export type Columns = {
  _id: string;
  title: string;
  color: string;
  userId: string;
};
