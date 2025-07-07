# 🎓 School LMS - Laravel + React + Inertia.js

A full-featured Learning Management System (LMS) built using **Laravel**, **React.js**, and **Inertia.js**, designed to help lecturers and students manage academic tasks such as assignments, quizzes, discussions, and progress tracking.

---

## 📚 Features

### 🚀 Core Modules
- **Courses Dashboard** with progress tracking and course summaries
- **Assignments** (create, view, and per-course detail)
- **Quizzes** with 3-attempt logic and adaptive question targeting
- **Discussion Forum** with lecturer-student threads per course
- **Slideshow uploads** per course
- **Exam overview** (optional)
- **Attendance tracking** with face recognition and time logs *(Python/OpenCV-powered)*
- **Notifications**, **Announcements**, and **Threaded Discussions**
- **Semester/Year Control**, Class Groups, and Subjects Management
- **Parent & Student Role View**

---

## 🧠 Tech Stack

| Layer        | Tech                    |
|-------------|-------------------------|
| Backend      | Laravel 10, PHP 8.2     |
| Frontend     | React.js, Tailwind CSS  |
| Middleware   | Inertia.js              |
| Auth         | Laravel Breeze or Sanctum *(depending on config)* |
| Database     | MySQL or PostgreSQL     |
| Realtime     | Firebase (for attendance) |
| Face Logic   | Python, OpenCV, FaceRecognition, Firebase |

---

## 🗂 Project Structure (Simplified)

```
resources/js/
├── Pages/
│   ├── dashboard.tsx
│   ├── selected-Course.tsx
│   └── forum/
│       ├── forum-content.tsx
│       └── discussion-content.tsx
├── Components/
│   ├── course-card.tsx
│   ├── assignment-content.tsx
│   ├── quiz-panel.tsx
│   └── slideshow.tsx
├── lib/
│   ├── courseDetails.ts
│   ├── discussionThreads.ts
│   ├── forumContent.ts
│   └── courseScores.ts

routes/
└── web.php

---
```
## ⚙️ Setup Instructions

#### 1. Clone Repository
```bash
git clone https://github.com/muhammadhardwinv/bits-lms.git
cd bits-lms

```

### 2. Install PHP Dependencies
```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
```

### 3. Install JavaScript Dependencies
```bash
npm install
npm run dev
```

### 4. Serve Application
```bash
composer run dev
```

---

## 👤 Demo Users

| Role     | Email              | Password  |
|----------|--------------------|-----------|
| Lecturer | lecturer@test.com  | password  |
| Student  | student@test.com   | password  |

---

## 📌 Routing Examples

| Feature       | Route Format                                   |
|---------------|------------------------------------------------|
| Course Page   | `/courses/{courseId}`                          |
| Assignment    | `/assignment/{safeCourseName}/{courseId}`      |
| Quiz Page     | `/assignment/{safeCourseName}/{courseId}/quiz` |
| Forum Page    | `/discussion/{courseId}`                       |
| Slideshow     | `/courses/{courseId}/slideshow`                |
| Exam Page     | `/courses/{courseId}/exam`                     |

---

## 🚀 Planned Features

- [ ] Role-based access middleware  
- [ ] Gradebook integration  
- [ ] In-app Notifications  
- [ ] AI-generated quiz recommendations  
- [ ] REST API for mobile extension  

---
