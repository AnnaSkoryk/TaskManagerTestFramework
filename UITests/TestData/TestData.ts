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
  priority: 'low',
  successMessage: 'Task added successfully!'
};
