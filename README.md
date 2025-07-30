# 🧠 Team Pulse Dashboard

A real-time, responsive team management dashboard built with React and Redux. Team Pulse allows leads to track team members' task progress, status, and productivity using clean visuals and interactive UI components.

---
[[Watch Demo video]](https://drive.google.com/file/d/1LfkwgGI-43Vm5fNml5SJD7HEihukAbwF/view?usp=sharing)

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

<img width="1920" height="1080" alt="Dashboard" src="https://github.com/user-attachments/assets/ee0af5e5-064c-4dea-a3e7-cf3deec12e4a" />
<img width="1920" height="1080" alt="DarkTheme" src="https://github.com/user-attachments/assets/4dcaf3bd-9d07-49b3-aa70-757613d20f99" />
<img width="1920" height="1080" alt="Assign_Task" src="https://github.com/user-attachments/assets/3aa870af-8516-4224-8e1d-b88a57086ab8" />
<img width="1920" height="1080" alt="Employee_Task_BarChart" src="https://github.com/user-attachments/assets/aa320ebc-81bc-4742-b9c4-de868a70a27e" />
<img width="1920" height="1080" alt="Calender" src="https://github.com/user-attachments/assets/3feae5ea-b1ca-4975-865a-695b41c6b607" />
<img width="1920" height="1080" alt="Team_member View" src="https://github.com/user-attachments/assets/908f545c-9c46-4f4b-b235-a1c73ddb5de9" />
<img width="1920" height="1080" alt="Pie_Chart_view" src="https://github.com/user-attachments/assets/d7b0eaf7-23a9-4647-ab8a-b80e834164ad" />
<img width="1920" height="1080" alt="Add_member" src="https://github.com/user-attachments/assets/f497531d-c158-41dc-b333-4ecacf909077" />
