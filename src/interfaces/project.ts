export interface Project {
  _id: string;
  name: string;
  description: string;
  assignedTo: string | null;
  status: string;
  dueDate: string;
}