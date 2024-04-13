# React Calendar App with Flask Backend

## Overview

This project combines a React frontend with a Flask backend to create a dynamic calendar application. The frontend allows users to manage events and tasks, while the backend handles data storage, retrieval, and external calendar subscriptions.

## Features

### Frontend (React)

- **Event Management**: Users can add, view, and delete events on the calendar.
- **Recurrence Rules**: Supports recurring events using the RRule library.
- **Subscription**: Users can subscribe to external calendars by providing a URL and a name for the calendar.
- **Chatbot Integration**: Includes a chatbot feature for interacting with users and adding events based on chat input.

### Backend (Flask)

- **Data Handling**: Receives and processes data from the frontend, including user information, events, tasks, and calendar subscriptions.
- **Database Interaction**: Interfaces with a database to store and retrieve user data, events, tasks, and subscriptions.
- **Chatbot Management**: Manages chatbot instances for each user session, handling user interactions and generating responses.
- **External Calendar Subscription**: Facilitates the subscription to external calendars and stores subscription information in the database.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   ```
Navigate to the project directory:

```bash
cd react-calendar-app
```
Install frontend dependencies:
```bash
npm install
```
Install backend dependencies:

```bash
pip install -r requirements.txt
```

Frontend Dependencies
@aws-amplify/ui-react: UI components for building authentication flows in React applications.
@syncfusion/ej2-react-schedule: React wrapper for Syncfusion's Essential JS 2 Scheduler component.
axios: Promise-based HTTP client for making requests to external APIs.
luxon: Library for working with dates and times in JavaScript.
moment: Library for parsing, validating, manipulating, and formatting dates.
openai: SDK for interfacing with the OpenAI GPT-3 API.
react: JavaScript library for building user interfaces.
react-big-calendar: React component for displaying a calendar with events.
react-confirm-alert: Library for creating confirmation dialogs in React applications.
react-dom: Entry point to the React DOM library for web applications.
react-modal: Accessible modal dialog component for React applications.
react-scripts: Configuration and scripts for Create React App.
rrule: Library for working with recurrence rules for calendar events.
Backend Dependencies
flask: Micro web framework for Python.
flask-cors: Flask extension for handling Cross-Origin Resource Sharing (CORS).
markdown: Python implementation of Markdown.
multiprocessing: Package for spawning processes using an API similar to the threading module.
requests: HTTP library for making requests in Python.
Scripts
start: Starts the React frontend development server.
build: Builds the React application for production deployment.
test: Runs tests for the React application.
eject: Removes Create React App build dependency.
flask_server: Starts the Flask backend server.
coverage: Runs tests with coverage report.
all: Runs both frontend and backend servers concurrently.
Contributing
Contributions are welcome! If you have suggestions, enhancements, or bug fixes, please open an issue or create a pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.
