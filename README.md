# 📝 Task Manager App

A modern, feature-rich task management application built with React and Vite. Manage your tasks efficiently with both list and calendar views, real-time countdown timers, and persistent local storage.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-4.4.0-purple)
![React Router](https://img.shields.io/badge/React_Router-7.9.3-red)


![Uploading image.png…]()


## ✨ Features

### Core Functionality
- **Task Creation & Management**: Create, edit, delete, and mark tasks as complete
- **Priority Levels**: Organize tasks with High, Medium, and Low priority levels
- **Due Dates**: Set deadlines for your tasks
- **Descriptions**: Add detailed descriptions to provide context for each task

### Advanced Features
- **Dual View System**:
  - **List View**: Traditional task list with filtering options
  - **Calendar View**: Interactive calendar for date-based task visualization and creation
  
- **Real-time Countdown Timers**: 
  - Live countdown showing time remaining until task deadlines
  - Updates every second
  - Visual indicators for overdue tasks with pulsing animation
  - Automatically hides when tasks are completed

- **Smart Filtering**: Filter tasks by:
  - All Tasks
  - Active Tasks
  - Completed Tasks
  - Priority Level (High/Medium/Low)

- **Task Statistics Dashboard**: 
  - Total tasks count
  - Active tasks
  - Completed tasks
  - High priority tasks
  - Completion percentage

- **Calendar Features**:
  - Visual task indicators on calendar dates
  - Color-coded priority dots
  - Quick task creation by clicking dates
  - Month navigation
  - Today highlighting
  - Task count per date

- **Data Persistence**: All tasks are automatically saved to browser's localStorage
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices

## 🚀 Technologies Used

- **React 18.2.0**: Modern React with hooks for state management
- **React Router DOM 7.9.3**: Client-side routing for navigation
- **Vite 4.4.0**: Fast build tool and development server
- **LocalStorage API**: Browser-based data persistence
- **CSS3**: Modern styling with gradients, animations, and flexbox/grid layouts

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Steps

1. Clone or download the repository:
```bash
git clone <repository-url>
cd "Task manager"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## 🎯 Usage

### Creating Tasks

#### From List View:
1. Navigate to the Task List page
2. Fill in the task form with:
   - Title (required)
   - Description (optional)
   - Priority level
   - Due date (optional)
3. Click "Add Task" button

#### From Calendar View:
1. Navigate to the Calendar page
2. Click on any date in the calendar
3. Fill in the task details in the form that appears
4. Click "Add Task"

### Managing Tasks

- **Mark as Complete**: Click the checkbox next to any task
- **Edit Task**: Click the edit (✏️) button on a task
- **Delete Task**: Click the delete (🗑️) button on a task
- **Filter Tasks**: Use the filter buttons in List View to show specific task groups

### Calendar Navigation

- **Previous/Next Month**: Use the arrow buttons
- **Today**: Click the "Today" button to return to current month
- **Select Date**: Click any date to view and create tasks for that day

### Understanding Visual Indicators

- **Countdown Timer Colors**:
  - Green: Task is active and not overdue
  - Red (pulsing): Task is overdue
  
- **Calendar Dots**:
  - Red: High priority task
  - Yellow: Medium priority task
  - Blue: Low priority task

## 📁 Project Structure

```
Task manager/
├── src/
│   ├── components/           # Reusable React components
│   │   ├── Calendar/
│   │   │   └── Calendar.jsx         # Interactive calendar component
│   │   ├── CountdownTimer/
│   │   │   └── CountdownTimer.jsx   # Real-time countdown timer
│   │   ├── TaskForm/
│   │   │   └── TaskForm.jsx         # Task creation form
│   │   ├── TaskItem/
│   │   │   └── TaskItem.jsx         # Individual task display
│   │   ├── TaskList/
│   │   │   └── TaskList.jsx         # Task list with filters
│   │   └── TaskStats/
│   │       └── TaskStats.jsx        # Statistics dashboard
│   │
│   ├── pages/                # Route pages
│   │   ├── MainView.jsx             # Main task list page
│   │   └── CalendarView.jsx         # Calendar page
│   │
│   ├── utils/                # Utility functions
│   │   └── localStorage.js          # LocalStorage helpers
│   │
│   ├── App.jsx               # Main app component with routing
│   ├── main.jsx              # App entry point
│   └── index.css             # Global styles
│
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
└── README.md                 # Project documentation
```

## 🎨 Component Overview

### Core Components

#### `App.jsx`
- Main application container
- Manages global state (tasks, filters)
- Handles routing between views
- Provides task CRUD operations to child components

#### `MainView.jsx`
- Displays traditional list view
- Shows task statistics
- Includes task creation form
- Renders filtered task list

#### `CalendarView.jsx`
- Wrapper for calendar component
- Provides calendar-specific layout

### Feature Components

#### `Calendar.jsx`
- Renders interactive monthly calendar
- Shows task indicators on dates
- Handles date selection
- Provides inline task creation form
- Includes month navigation controls

#### `CountdownTimer.jsx`
- Displays real-time countdown to task deadline
- Updates every second
- Shows overdue status with animation
- Automatically hides for completed tasks

#### `TaskStats.jsx`
- Calculates and displays task statistics
- Shows total, active, completed, and high-priority counts
- Displays completion percentage

#### `TaskForm.jsx`
- Reusable form for task creation
- Validates required fields
- Resets after submission

#### `TaskItem.jsx`
- Displays individual task details
- Includes edit mode with inline form
- Shows countdown timer
- Provides complete/delete actions
- Displays priority badge and due date

#### `TaskList.jsx`
- Renders list of tasks
- Provides filtering UI
- Shows empty state when no tasks match filter

### Utilities

#### `localStorage.js`
- `getTasks()`: Retrieves tasks from localStorage
- `saveTasks(tasks)`: Saves tasks to localStorage
- `clearTasks()`: Removes all tasks from localStorage

## 🎨 Styling

The app uses a modern design with:
- Purple gradient background
- Clean white cards with shadows
- Smooth transitions and animations
- Responsive grid and flexbox layouts
- Color-coded priority system
- Hover effects for better UX

## 🔄 State Management

Tasks are managed at the App level and passed down to components via props:
- Task data flows down through props
- Event handlers bubble up to App component
- All state changes trigger localStorage updates
- Components re-render automatically on state changes

## 💾 Data Persistence

- Tasks are automatically saved to browser's localStorage
- Data persists across browser sessions
- No backend required
- Data is loaded on app initialization

## 🌐 Browser Compatibility

Works on all modern browsers that support:
- ES6+ JavaScript
- CSS Grid and Flexbox
- LocalStorage API
- React 18

Tested on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## 📱 Responsive Design

The app is fully responsive with breakpoints for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

Mobile optimizations include:
- Stacked navigation
- Smaller calendar cells
- Touch-friendly buttons
- Adjusted spacing and typography

## 🚧 Build for Production

To create a production build:

```bash
npm run build
```

This creates an optimized build in the `dist` folder.

To preview the production build:

```bash
npm run preview
```

## 🔮 Future Enhancements

Potential features for future versions:

- [ ] Task categories/tags
- [ ] Dark mode theme
- [ ] Task search functionality
- [ ] Drag and drop task reordering
- [ ] Recurring tasks
- [ ] Task attachments
- [ ] Export tasks to CSV/JSON
- [ ] Cloud sync with backend
- [ ] User accounts and authentication
- [ ] Notifications for upcoming deadlines
- [ ] Task sharing and collaboration
- [ ] Multi-language support
- [ ] Keyboard shortcuts
- [ ] Task templates
- [ ] Time tracking per task

## 📄 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🐛 Known Issues

None currently. Please report any issues you encounter.

## 📝 License

This project is open source and available for personal and commercial use.

## 👨‍💻 Development

Built with modern React best practices:
- Functional components with hooks
- Component composition
- Props drilling for state management
- Organized file structure
- Reusable components
- Clean code principles

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the blazing-fast build tool
- React Router for seamless navigation
- The open-source community

---

**Happy Task Managing! 🎉**

For questions or support, please open an issue in the repository.

