# Advanced Todo App

## Overview
The **Advanced Todo App** is a feature-rich task management application built using React, Redux, and Bootstrap. This app allows users to add, view, and prioritize tasks while supporting both **light and dark themes**. Tasks are stored in **local storage** for persistence, and filtering options help users manage their tasks efficiently.

## Features
- **Add Tasks**: Users can add new tasks with optional priority settings.
- **View Tasks**: Displays a list of tasks with filtering options.
- **Prioritize Tasks**: Mark tasks as important for quick access.
- **Toggle Task Completion**: Mark tasks as completed or pending.
- **Dark and Light Mode**: Users can switch between themes.
- **List and Grid view for tasks** : Users can switch view mode.
- **Local Storage Support**: All tasks are saved locally to ensure data persistence.
- **Task Filtering**:
  - View **All Tasks**
  - View **Important Tasks**
  - View **Completed Tasks**
- **Progress Chart**: Displays completion percentage using a dynamic donut chart.

## Technologies Used
- **React**: Frontend framework for UI development.
- **Redux Toolkit**: State management for tasks and filters.
- **Bootstrap**: Styling and UI components.
- **Local Storage**: Saves tasks persistently in the browser.

## Installation & Setup

### 1. Clone the Repository
```sh
git clone https://github.com/ShivaKrishnaReddyBurra/advanced-todo.git
cd advanced-todo
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Run the Application
```sh
npm start
```
The application will run on `http://localhost:3000/` by default.

## Folder Structure
```markdown
advanced-todo/
│── /src
│   ├── components
│   │   ├── Header.js
│   │   ├── MainLayout.js
│   │   ├── SideBar.js
│   │   ├── TaskGrid.js
│   │   ├── TaskInput.js
│   │   ├── TaskList.js
│   │   ├── TaskWithWeather.js
│   │   ├── WeatherWidget.js
│   ├── pages
│   │   ├── Login.js
│   │   ├── Todo.js
│   ├── services
│   │   ├── weatherService.js
│   ├── store
│   │   ├── authSlice.js
│   │   ├── store.js
│   │   ├── taskSlice.js
│   │   ├── weatherSlice.js
│   ├── styles
│   │   ├── global.css
│   │   ├── weather.css
│   ├── App.js
│   ├── index.js
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│── /public
│── package.json
│── README.md
│── .env  # Add your weather API key here
```

## Usage
### Adding a Task
1. Type the task name in the input field.
2. Click the **Add Task** button.

### Marking Task as Important
- Click the **star icon** next to a task to mark it as important.

### Marking Task as Completed
- Check the **checkbox** to mark a task as completed.

### Filtering Tasks
- Click on the sidebar filters:
  - **All Tasks**: Show all tasks.
  - **Important**: Show only starred tasks.
  - **Completed**: Show only completed tasks.

### Switching Theme
- Click the **moon/sun icon** to toggle between dark and light modes.


## License
This project is licensed under the MIT License.


