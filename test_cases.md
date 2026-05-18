# Test Cases: AI-Based Employee Performance Analytics

This document outlines the manual test cases performed to validate the functionality of the MERN application.

## 1. Authentication Tests

| Test Case ID | Description | Pre-conditions | Steps | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TC_AUTH_01 | User Registration | None | 1. Navigate to `/signup`.<br>2. Enter valid email and password.<br>3. Click "Sign up". | User is registered, token generated, and redirected to Dashboard. | PASS |
| TC_AUTH_02 | Duplicate Registration | Registered email exists | 1. Navigate to `/signup`.<br>2. Enter existing email.<br>3. Click "Sign up". | Error message "User already exists" is displayed. | PASS |
| TC_AUTH_03 | User Login | User is registered | 1. Navigate to `/login`.<br>2. Enter valid credentials.<br>3. Click "Sign in". | User is authenticated and redirected to Dashboard. | PASS |
| TC_AUTH_04 | Invalid Login | None | 1. Navigate to `/login`.<br>2. Enter invalid password.<br>3. Click "Sign in". | Error message "Invalid email or password" is displayed. | PASS |
| TC_AUTH_05 | Protected Routes | User is logged out | 1. Attempt to navigate to `/` or `/add` directly. | User is redirected to the `/login` page. | PASS |

## 2. Employee Management Tests

| Test Case ID | Description | Pre-conditions | Steps | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TC_EMP_01 | Add Employee | User is logged in | 1. Navigate to "Add Employee".<br>2. Fill in all details (Name, Email, Role, Score, etc.).<br>3. Click "Save Employee". | Employee is saved in the database and user is redirected to Dashboard where new employee is listed. | PASS |
| TC_EMP_02 | Add Employee (Missing Fields) | User is logged in | 1. Navigate to "Add Employee".<br>2. Leave 'Name' blank.<br>3. Click "Save Employee". | HTML5 validation prevents submission or Backend returns 400 Bad Request. | PASS |
| TC_EMP_03 | View Employee List | User is logged in, Employees exist | 1. Navigate to Dashboard. | All added employees are displayed in a tabular format with their core metrics. | PASS |
| TC_EMP_04 | Search/Filter Employees | User is logged in, Employees exist | 1. On Dashboard, type an employee's name or role in the search bar. | The list dynamically updates to show only matching employees. | PASS |

## 3. AI Recommendation Tests

| Test Case ID | Description | Pre-conditions | Steps | Expected Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TC_AI_01 | Generate AI Insights | User is logged in, Employee exists | 1. On Dashboard, click "AI Insights" for an employee.<br>2. Click "Generate New Insights". | Application shows a loading state, calls OpenRouter API, and displays a formatted recommendation. | PASS |
| TC_AI_02 | AI API Failure Handling | User is logged in, Invalid API Key | 1. Provide invalid API key in `.env`.<br>2. Click "Generate New Insights". | Application handles the error gracefully and displays an error message to the user without crashing. | PASS |
