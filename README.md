# TaskManagerTestFramework
this is my automation tests for task manager project
# Test Cases

## UI Tests

### TC-001 Create task
Preconditions:
- Application is running

Steps:
1. Click "Add Task"
2. Fill all required fields
3. Click Save

Expected Result:
- Task appears in task list

### TC-010 Success message is shown after new task created
Preconditions:
TC-001

Expected Result:
- Success message is shown for 2 seconds

### TC-011 Validate all fields in created item
Preconditions:
TC-001

Steps:
1. Check all fields in created item

Expected Result:
- Title is valid
- Description is valid
- Date is vaild
- Priority is valid
- Completed status is unchecked

### TC-002 Cancel create task
Preconditions:
- Application is running

Steps:
1. Click "Add Task"
3. Click Cancel

Expected Result:
- Main page is shown

### TC-004 Check 'Completed' checkBox
Preconditions:
- Application is running
- At least 1 task exists

Steps:
1. Check checkbox "Completed" on selected task
2. Refresh the page

Expected Result:
- Main page is displayed after refresh
- Task remains in the list
- "Completed" checkbox is checked
- Task is displayed in completed state:
  - Title is crossed out
  - Title and description are displayed in greyed (disabled) style

### TC-005 Uncheck 'Completed' checkBox
Preconditions:
- Application is running
- At least 1 task exists

Steps:
1. Uncheck checkbox "Completed" on selected task
2. Refresh the page

Expected Result:
- Main page is displayed after refresh
- Task remains in the list
- "Completed" checkbox is unchecked
- Task is displayed in active state:
  - Title is not crossed out
  - Title and description are displayed in normal (non-greyed) style

### TC-006 Active Tab Validation
Preconditions:
- At least 1 completed task exists
- At least 1 active task exists

Steps:
1. Press 'Active' button
2. Verify only active tasks are visible
3. Refresh the page 

Expected Result:
- Main page is shown
- Full task list is displayed

### TC-007 Completed Tab Validation
Preconditions:
- At least 1 completed task exists
- At least 1 active task exists

Steps:
1. Press 'Completed' button
2. Verify only completed tasks are visible
3. Refresh the page 

Expected Result:
- Main page is shown
- Full task list is displayed

### TC-008 All Tab Validation
Preconditions:
- At least 1 completed task exists
- At least 1 active task exists
- User is on Active/Completed Tab

Steps:
1. Press 'All' button

Expected Result:
- Main page is shown
- Full task list is displayed

### TC-009 Validation of the date field for task without Due Date
Preconditions:
- At least 1 task without due date exists

Steps:
1. Validate text in the Date field of selected task.

Expected Result:
- The text color is red (#991b1b).
- The text is "Due: No due date"

### TC-012 Create task with date before today
Preconditions:
- Application is running

Steps:
1. Click "Add Task"
2. Fill all required fields with date before today
3. Click Save

Expected Result:
- Task is not present in task list

### TC-013 Validate Title text
Preconditions:
- Application is running

Steps:
1. Validate Title text

Expected Result:
- text is "Task Manager"

### TC-003 Delete task
Preconditions:
- Application is running
- At least 1 task exists

Steps:
1. Click "Remove" button on selected task

Expected Result:
- Main page is shown. 
- Task is not present in the Task List

### TC-014 Validate text in the empty Task list
Preconditions:
- Application is running
- Deleted all tasks

Steps:
1. Validate text in the task list 

Expected Result:
- text is "No tasks yet. Add one to get started!"
