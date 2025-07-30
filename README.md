# 🧠 Team Pulse Dashboard

A real-time, responsive team management dashboard built with React and Redux. Team Pulse allows leads to track team members' task progress, status, and productivity using clean visuals and interactive UI components.

---

## 🔧 Features

### 👤 Role-Based Views

- **Team Lead View**:

  - 📋 See all team members and their current working status
  - 🧠 View tasks assigned to each member along with completion status
  - 🗂️ Filter team members by their current status (e.g., Working, Break)
  - 🔢 Sort members by number of active or completed tasks
  - 📊 Visualize team activity with dynamic pie charts and bar graphs
  - 🔍 Quickly scan performance trends and bottlenecks

- **Team Member View**:
  - 🟢 Change personal working status in one click (Working, Break, Meeting, Offline)
  - 📄 View list of assigned tasks and track progress
  - 🎯 Minimal, distraction-free UI focused only on individual responsibilities

### 📊 Reports

- Real-time charts displaying:
  - Distribution of member statuses
  - Task completion ratio
  - Member-wise workload comparisons
- Built using **Recharts** (easily switchable to Chart.js)
- Automatically updates as members and tasks change
- **Restricted to Leads only**

### ⚙️ Smart Features

- 💤 **Auto-Offline Mode**: Automatically sets user status to “Offline” after 10 minutes of inactivity
- 🌙 **Dark Mode Toggle**: Seamless light/dark mode experience with Tailwind's `dark:` utility
- 📱 **Responsive Design**: Mobile-first layout with optimized spacing, stacking, and visibility
- 🌀 **Framer Motion Animations**: Smooth entry, hover, and transition animations across all components
- ♻️ **Reusable Components**: Modular card, chart, and status selector components for scalability

---

## 🛠 Tech Stack

| Layer        | Tech Used                           |
| ------------ | ----------------------------------- |
| Frontend     | React, Tailwind CSS, Framer Motion  |
| State Mgmt   | Redux Toolkit                       |
| Charts       | Recharts (with option for Chart.js) |
| UI Framework | Vite / Create React App             |
| Routing      | React Router DOM (if applicable)    |
| Animations   | Framer Motion                       |
| Styling      | Tailwind CSS + Dark Mode            |

---

## 📦 Installation

Follow these steps to run the project locally:

```bash
# Clone the repository
git clone https://github.com/your-username/team-pulse-dashboard.git
cd team-pulse-dashboard

# Install dependencies
npm install

# Start development server
npm run dev   # or: npm start (for Create React App)
```
