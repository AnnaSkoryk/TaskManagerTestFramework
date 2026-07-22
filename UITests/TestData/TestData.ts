export interface ITestData {
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  successMessage: string;
}

const defaultSuccessMessage = 'Task added successfully!';

export const GeneralTestData = {
  title: 'New Task',
  description: 'Test description',
  dueDate: '2028-07-15',
  priority: 'low',
  successMessage: defaultSuccessMessage
};

export const TestDataWoDate = {
  title: 'New Task without Date',
  description: 'Test description',
  dueDate: '',
  priority: 'low',
  successMessage: defaultSuccessMessage
};

export const TestDataWithDateBeforeToday = {
  title: 'New Task without Date',
  description: 'Test description',
  dueDate: '2026-07-15',
  priority: 'low',
  successMessage: defaultSuccessMessage
};
