# TaskManagerTestFramework

🚧 **Work in progress** — this framework is being actively built. Core structure, first UI test cases, and CI are in place; more coverage (API tests, reporting, pipeline polish) is on the way.

A TypeScript + Playwright end-to-end test automation framework for [TaskManager](https://github.com/AnnaSkoryk/TaskManager), a demo task management web app. Built to practice and showcase modern JS/TS test automation, complementing my earlier [C# + Selenium framework](https://github.com/AnnaSkoryk/TestAutomationFramework).

## Tech Stack

* **Language:** TypeScript
* **Test runner / framework:** [Playwright](https://playwright.dev/)
* **Design pattern:** Page Object Model
* **Package manager:** npm

## Project Structure

```
TaskManagerTestFramework/
├── UITests/                # UI test specs, organized by feature
├── playwright.config.ts    # Playwright configuration
├── package.json
└── README.md
```

## What's Covered

The suite tests core [TaskManager](https://github.com/AnnaSkoryk/TaskManager) flows, including:

* Creating, editing, and deleting tasks
* Marking tasks complete / active and verifying visual state
* Filtering tasks by tab (All / Active / Completed) and persistence on refresh
* Field-level validation (title, description, due date, priority)
* Edge cases: tasks without a due date, past due dates, empty task list state

Test cases are documented in detail as they're added.

## Getting Started

```bash
# install dependencies
npm install

# install Playwright browsers
npx playwright install

# run the tests
npx playwright test

# run with the HTML report
npx playwright show-report
```

> Note: requires the \[TaskManager](https://github.com/AnnaSkoryk/TaskManager) app running locally (see that repo's README for setup).

## Roadmap

* \[ ] Expand UI coverage (additional edge cases, negative scenarios)
* \[ ] Add API-level tests
* \[ ] Add GitHub Actions CI pipeline
* \[ ] Add HTML/Allure reporting
* \[ ] Cross-browser test runs

## Related Projects

* [TaskManager](https://github.com/AnnaSkoryk/TaskManager) — the app under test
* [TestAutomationFramework](https://github.com/AnnaSkoryk/TestAutomationFramework) — earlier C# + Selenium test framework



# Test Cases

## UI Tests

### TC-001 Create task shows success message

Preconditions:

* Application is running

Steps:

1. Click "Add Task"
2. Fill all required fields
3. Click Save
4. Validate the success message
5. Validate all fields in created item

Expected Result:

* Success message is shown for at least 1 sec.
* Message text is 'Task added successfully!'
* Task appears in task list
* Title is valid
* Description is valid
* Date is vaild
* Priority is valid
* Completed status is unchecked

### TC-002 Cancel create task

Preconditions:

* Application is running

Steps:

1. Click "Add Task"
2. Click Cancel

Expected Result:

* Main page is shown

### TC-004 Check 'Completed' checkBox

Preconditions:

* Application is running
* At least 1 task exists

Steps:

1. Check checkbox "Completed" on selected task
2. Refresh the page

Expected Result:

* Main page is displayed after refresh
* Task remains in the list
* "Completed" checkbox is checked
* Task is displayed in completed state:

  * Title is crossed out
  * Title and description are displayed in greyed (disabled) style

### TC-005 Uncheck 'Completed' checkBox

Preconditions:

* Application is running
* At least 1 task exists

Steps:

1. Uncheck checkbox "Completed" on selected task
2. Refresh the page

Expected Result:

* Main page is displayed after refresh
* Task remains in the list
* "Completed" checkbox is unchecked
* Task is displayed in active state:

  * Title is not crossed out
  * Title and description are displayed in normal (non-greyed) style

### TC-006 Active Tab Validation

Preconditions:

* At least 1 completed task exists
* At least 1 active task exists

Steps:

1. Press 'Active' button
2. Verify only active tasks are visible
3. Refresh the page

Expected Result:

* Main page is shown
* Full task list is displayed

### TC-007 Completed Tab Validation

Preconditions:

* At least 1 completed task exists
* At least 1 active task exists

Steps:

1. Press 'Completed' button
2. Verify only completed tasks are visible
3. Refresh the page

Expected Result:

* Main page is shown
* Full task list is displayed

### TC-008 All Tab Validation

Preconditions:

* At least 1 completed task exists
* At least 1 active task exists
* User is on Active/Completed Tab

Steps:

1. Press 'All' button

Expected Result:

* Main page is shown
* Full task list is displayed

### TC-009 Validation of the date field for task without Due Date

Preconditions:

* At least 1 task without due date exists

Steps:

1. Validate text in the Date field of selected task.

Expected Result:

* The text color is red (#991b1b).
* The text is "Due: No due date"

### TC-012 Create task with date before today

Preconditions:

* Application is running

Steps:

1. Click "Add Task"
2. Fill all required fields with date before today
3. Click Save

Expected Result:

* Task is not present in task list

### TC-013 Validate Title text

Preconditions:

* Application is running

Steps:

1. Validate Title text

Expected Result:

* text is "Task Manager"

### TC-003 Delete task

Preconditions:

* Application is running
* At least 1 task exists

Steps:

1. Click "Remove" button on selected task

Expected Result:

* Main page is shown.
* Task is not present in the Task List

### TC-014 Validate text in the empty Task list

Preconditions:

* Application is running
* Deleted all tasks

Steps:

1. Validate text in the task list

Expected Result:

* text is "No tasks yet. Add one to get started!"



## Author

**Anna Skoryk**

