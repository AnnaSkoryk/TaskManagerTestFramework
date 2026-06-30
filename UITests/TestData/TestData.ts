export interface ITestData {
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  successMessage: string;
}

export const TestData = {
  title: 'New Task',
  description: 'Test description',
  dueDate: '2026-07-15',
  priority: 'high',
  successMessage: 'Task added successfully!'
};
