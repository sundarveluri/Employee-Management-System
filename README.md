# Employee Management System

A frontend team project built with **HTML, CSS, and JavaScript**, developed collaboratively by a 4-member team using Git and GitHub.

> **Note:** This first version is a frontend demonstration project. Data is stored in the browser using Local Storage, so it is **not** a secure authentication system or a shared company database. See [Limitations](#limitations) and [Future Enhancements](#future-enhancements).

---

## Table of Contents

- [Team and Responsibilities](#team-and-responsibilities)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Git and GitHub Workflow](#git-and-github-workflow)
- [Limitations](#limitations)
- [Future Enhancements](#future-enhancements)

---

## Team and Responsibilities

| Member         | Role      | Responsibility                                               | Files                                                |
| -------------- | --------- | ------------------------------------------------------------ | ---------------------------------------------------- |
| **Sundar**     | Team Lead | GitHub repository, dashboard, and integration of all modules | `index.html`, project coordination                   |
| **Abigneshri** | Developer | Login and Registration                                       | `login.html`, `login.css`, `login.js`                |
| **Mahesh**     | Developer | Employee Management                                          | `employee.html`, `employee.css`, `employee.js`       |
| **Rohit**      | Developer | Attendance Management                                        | `attendance.html`, `attendance.css`, `attendance.js` |

Each developer writes and tests their own module independently, pushes it to GitHub, and opens a Pull Request. The Team Lead reviews and integrates everything.

---

## Technology Stack

| Technology                | Purpose                                                 |
| ------------------------- | ------------------------------------------------------- |
| **HTML**                  | Webpage structure                                       |
| **CSS**                   | Design and styling                                      |
| **JavaScript**            | Functionality                                           |
| **Browser Local Storage** | Temporarily saving employee, login, and attendance data |
| **Git**                   | Version control                                         |
| **GitHub**                | Collaboration and code sharing                          |
| **VS Code**               | Code editor                                             |

---

## Project Structure

```
employee-management-system/
│
├── index.html          # Dashboard (Sundar)
│
├── login.html          # Login & Registration (Abigneshri)
├── login.css
├── login.js
│
├── employee.html       # Employee Management (Mahesh)
├── employee.css
├── employee.js
│
├── attendance.html     # Attendance Management (Rohit)
├── attendance.css
├── attendance.js
│
└── README.md
```

---

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Edge, Firefox)
- [VS Code](https://code.visualstudio.com/) (recommended)
- [Git](https://git-scm.com/)

### Run Locally

1. **Clone the repository**

```bash
   git clone <repository-url>
   cd employee-management-system
```

2. **Open the project**
   - Open the folder in VS Code, then open `index.html` in your browser
   - Or use the **Live Server** extension in VS Code for auto-reload
     No installation or build step is needed.

---

## Git and GitHub Workflow

1. **Clone** the repository (first time only).
2. **Create your own branch** for your module:

```bash
   git checkout -b feature/<your-module>
```

Examples: `feature/login`, `feature/employee`, `feature/attendance` 3. **Write and test** your HTML, CSS, and JavaScript files. 4. **Commit** your work:

```bash
   git add .
   git commit -m "Add <module> files"
```

5. **Push** your branch:

```bash
   git push origin feature/<your-module>
```

6. **Open a Pull Request** on GitHub.
7. The **Team Lead (Sundar)** reviews, merges, and integrates all modules.

### Guidelines

- Only edit your own module's files to avoid merge conflicts.
- Write clear commit messages.
- Pull the latest `main` before starting new work:

```bash
  git pull origin main
```

---

## Limitations

- Data is stored in each user's **browser Local Storage**, so it is not shared between users or devices.
- Local Storage is **not secure**, so do not store real passwords or sensitive information.
- This version is intended for **learning and demonstration** only.

---

## Future Enhancements

- Connect a **Python/Flask backend**
- Add a proper **database** for shared, persistent data
- Implement **secure authentication**
- Support true multi-user access

---

## Contributors

- **Sundar** – Team Lead
- **Abigneshri** – Login and Registration
- **Mahesh** – Employee Management
- **Rohit** – Attendance Management
