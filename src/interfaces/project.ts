export interface Project {
  _id: string;
  name: string;  // 'title' changed to 'name' in the new object
  description: string;
  assignedTo: string | null;
  status: string;
  dueDate: Date;
  startDate: Date | null;
  endDate: Date | null;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
  createdDate: Date;
  CreatedByUser: string | null;
  __v: number;
}
