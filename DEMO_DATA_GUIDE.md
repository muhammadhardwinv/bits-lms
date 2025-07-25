# 🎯 LMS Demo Data Guide

## 🚀 How to Populate Demo Data

### Method 1: Using Laravel Seeder (Recommended)
```bash
php artisan db:seed --class=DemoDataSeeder
```

### Method 2: Using Direct PHP Script
```bash
php populate_demo_data.php
```

### Method 3: Direct SQL Import
```bash
mysql -u username -p database_name < database/seeders/demo_data.sql
```

## 🔑 Login Credentials

### Admin Accounts
- **Email**: admin@bits-lms.edu
- **Password**: password
- **Role**: Admin
- **Name**: Dr. Sarah Wilson

- **Email**: admin2@bits-lms.edu  
- **Password**: password
- **Role**: Admin
- **Name**: Prof. Michael Chen

### Teacher Accounts
- **Email**: emily.rodriguez@bits-lms.edu
- **Password**: password
- **Role**: Teacher
- **Name**: Dr. Emily Rodriguez

- **Email**: james.thompson@bits-lms.edu
- **Password**: password
- **Role**: Teacher  
- **Name**: Prof. James Thompson

### Student Accounts
- **Email**: alice.johnson@student.bits-lms.edu
- **Password**: password
- **Role**: Student
- **Name**: Alice Johnson

- **Email**: bob.smith@student.bits-lms.edu
- **Password**: password
- **Role**: Student
- **Name**: Bob Smith

## 📚 Demo Content Overview

### Courses Available
1. **CS101** - Introduction to Computer Science (Dr. Emily Rodriguez)
2. **MATH201** - Calculus I (Prof. James Thompson)
3. **ENG101** - Academic Writing (Dr. Maria Garcia)
4. **PHYS101** - General Physics (Prof. David Kim)
5. **CS201** - Data Structures & Algorithms (Dr. Emily Rodriguez)
6. **MATH301** - Linear Algebra (Prof. James Thompson)
7. **CS301** - Database Systems (Dr. Emily Rodriguez)

### Sample Learning Path
**Beginner Student (Alice Johnson)**:
- Enrolled in: CS101, MATH201, PHYS101, CS201, MATH301, CS301
- Has submitted assignments and received grades
- Active in forum discussions
- Demonstrates progression from basic to advanced courses

### Demo Scenarios

#### 📖 Course Management Demo
- **CS101** has 8 enrolled students with 5 sessions and assignments
- **MATH201** has 5 enrolled students with 4 sessions and assignments
- Shows realistic enrollment patterns and course progression

#### 📝 Assignment & Grading Demo
- 23 assignments across different courses and difficulty levels
- 19 student submissions with realistic content
- Graded assignments showing score distribution
- Demonstrates assignment workflow from creation to grading
 
#### 💬 Forum Discussion Demo
- 16 discussion threads across different sessions
- 30+ threaded replies showing student-teacher interaction
- Demonstrates nested conversations and academic discussions
- Shows how forums enhance learning through peer interaction

#### 📎 File Management Demo
- 40+ files attached to sessions, assignments, submissions, and forums
- Shows polymorphic file system in action
- Demonstrates how files enhance learning materials

## 🎭 Demo User Personas

### Alice Johnson (STU001) - Star Student
- Enrolled in 6 courses (beginner to advanced)
- High grades (85-97%)
- Active in forums
- Submits quality assignments
- Perfect for demonstrating student progression

### Dr. Emily Rodriguez (TCH001) - Active Teacher
- Teaches 3 courses (CS101, CS201, CS301)
- Creates engaging assignments
- Participates in forum discussions
- Uploads helpful resources

### Dr. Sarah Wilson (ADM001) - System Administrator
- Can access all admin features
- Manages users and courses
- Views system analytics
- Perfect for admin demo

## 📊 Data Statistics

| Category | Count | Description |
|----------|-------|-------------|
| Users | 17 | 2 admins, 5 teachers, 15 students |
| Courses | 7 | Across CS, Math, English, Physics |
| Enrollments | 40+ | Realistic enrollment patterns |
| Sessions | 25+ | Individual class sessions |
| Assignments | 23 | Various types and difficulties |
| Submissions | 19 | Student work with content |
| Grades | 19 | Realistic score distribution |
| Forum Threads | 16 | Academic discussions |
| Forum Replies | 30+ | Threaded conversations |
| Files | 40+ | Attachments across all content |

## 🎯 Demo Features Showcased

### ✅ Core LMS Features
- User authentication and role management
- Course creation and enrollment
- Assignment submission and grading
- Discussion forums with threading
- File attachment system
- Academic progress tracking

### ✅ Advanced Features
- Nested forum replies (Reddit-style)
- Polymorphic file attachments
- Session-based course structure
- Attempt limits on assignments
- User status management
- Cross-course enrollment

### ✅ Realistic Academic Content
- Programming assignments with code
- Math problems with solutions
- Essay assignments with content
- Physics problems with calculations
- Academic discussions and help-seeking

## 🔧 Customization Tips

### Adding More Data
1. Follow the existing ID patterns (STU001, TCH001, etc.)
2. Maintain referential integrity
3. Use realistic academic content
4. Include variety in grades and participation

### Modifying Existing Data
1. Update the SQL file directly
2. Re-run the seeder
3. Or use Laravel's database tools for specific changes

## 🎉 Perfect for Demonstrating

- **Student Experience**: Course browsing, assignment submission, forum participation
- **Teacher Experience**: Course management, grading, student interaction
- **Admin Experience**: User management, system oversight, analytics
- **Academic Workflow**: Complete learning cycle from enrollment to graduation
- **Collaboration**: Student-teacher and peer-to-peer interaction

This demo data provides a comprehensive, realistic LMS environment perfect for showcasing all features and capabilities!
