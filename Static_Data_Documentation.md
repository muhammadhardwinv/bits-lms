# LMS Static Data Documentation
## Comprehensive List of Temporary Data for MySQL Database Migration

**Project:** BITS LMS (Learning Management System)
**Date:** July 15, 2025
**Purpose:** Document all static/constant values and mock data for database migration
**Total Records:** ~500+ static records across 13+ categories

This document provides a complete inventory of all hardcoded data, mock values, and static constants currently used in the LMS application that need to be migrated to the MySQL database.

---

## 1. SCHOOL STRUCTURE DATA

### 1.1 School Years (30 records)
**File:** `resources/js/lib/schoolData.ts`
```typescript
// Generated data: 30 school years from 1995/1996 to 2025/2026
{
    id: "SY-2025", "SY-2024", ..., "SY-1995"
    year: "2025/2026", "2024/2025", ..., "1995/1996"
    isCurrent: true (only for 2025/2026), false (for others)
}
```

### 1.2 Semesters (30 records)
**File:** `resources/js/lib/schoolData.ts`
```typescript
// Generated data: 30 semesters
{
    id: "SEM-1" to "SEM-30"
    name: "Semester 1" to "Semester 30"
    startDate: "2025-01-01"
    endDate: "2025-06-30"
    schoolYearId: "SY-2025" to "SY-2021" (cycling)
}
```

### 1.3 Subjects (30 records)
**File:** `resources/js/lib/schoolData.ts`
```typescript
[
    { id: 'SUB-01', name: 'Mathematics', code: 'MATH' },
    { id: 'SUB-02', name: 'Physics', code: 'PHYS' },
    { id: 'SUB-03', name: 'Chemistry', code: 'CHEM' },
    { id: 'SUB-04', name: 'Biology', code: 'BIO' },
    { id: 'SUB-05', name: 'English Literature', code: 'ENG' },
    { id: 'SUB-06', name: 'History', code: 'HIST' },
    { id: 'SUB-07', name: 'Geography', code: 'GEO' },
    { id: 'SUB-08', name: 'Computer Science', code: 'CS' },
    { id: 'SUB-09', name: 'Economics', code: 'ECON' },
    { id: 'SUB-10', name: 'Sociology', code: 'SOC' },
    { id: 'SUB-11', name: 'Psychology', code: 'PSY' },
    { id: 'SUB-12', name: 'Art', code: 'ART' },
    { id: 'SUB-13', name: 'Music', code: 'MUS' },
    { id: 'SUB-14', name: 'Physical Education', code: 'PE' },
    { id: 'SUB-15', name: 'Philosophy', code: 'PHIL' },
    { id: 'SUB-16', name: 'Business Studies', code: 'BUS' },
    { id: 'SUB-17', name: 'Accounting', code: 'ACC' },
    { id: 'SUB-18', name: 'Law', code: 'LAW' },
    { id: 'SUB-19', name: 'Political Science', code: 'POL' },
    { id: 'SUB-20', name: 'Environmental Science', code: 'ENV' },
    { id: 'SUB-21', name: 'Engineering Fundamentals', code: 'ENGF' },
    { id: 'SUB-22', name: 'Information Technology', code: 'IT' },
    { id: 'SUB-23', name: 'Statistics', code: 'STAT' },
    { id: 'SUB-24', name: 'Astronomy', code: 'ASTRO' },
    { id: 'SUB-25', name: 'Media Studies', code: 'MEDIA' },
    { id: 'SUB-26', name: 'Drama', code: 'DRAMA' },
    { id: 'SUB-27', name: 'Health Education', code: 'HE' },
    { id: 'SUB-28', name: 'Design and Technology', code: 'DT' },
    { id: 'SUB-29', name: 'International Relations', code: 'IR' },
    { id: 'SUB-30', name: 'Linguistics', code: 'LING' }
]
```

---

## 2. PEOPLE DATA

### 2.1 Teachers (30 records)
**File:** `resources/js/lib/schoolData.ts`
```typescript
// Generated data: 30 teachers
{
    id: "T-01" to "T-30"
    name: "Teacher 1" to "Teacher 30"
    email: "teacher1@school.edu" to "teacher30@school.edu"
    phone: "082131000000" to "082131000029"
    department: "Department 1" to "Department 5" (cycling)
    office: "Building 1, Room 100" to "Building 3, Room 109" (cycling)
}
```

### 2.2 Students (30 records)
**File:** `resources/js/lib/schoolData.ts`
```typescript
// Generated data: 30 students
{
    id: "S-01" to "S-30"
    name: "Student 1" to "Student 30"
    classId: "X-01" to "X-03" (cycling)
    email: "student1@student.edu" to "student30@student.edu"
    enrolledCourses: ["COURSE-1"] to ["COURSE-10"] (cycling)
    parentId: "P-01" to "P-30"
    joinedAt: "2024-07-01" to "2024-07-28" (cycling)
}
```

### 2.3 Parents (30 records)
**File:** `resources/js/lib/schoolData.ts`
```typescript
// Generated data: 30 parents
{
    id: "P-01" to "P-30"
    name: "Parent 1" to "Parent 30"
    email: "parent1@parent.edu" to "parent30@parent.edu"
    phone: "081231000000" to "081231000029"
    studentIds: ["S-01"] to ["S-30"]
}
```

### 2.4 People Data (Alternative Dataset)
**File:** `resources/js/lib/peopleData.ts`
```typescript
// 120 people records (20 per course)
// Names: Alex, Sam, Jordan, Taylor, Morgan, Jamie, Riley, Casey, Skyler, Hayden
// Last Names: Smith, Johnson, Brown, Lee, Martinez, Davis, Miller, Wilson, Anderson, Thomas
// Courses: MAT-1010, SCI-4321, BIO-2201, PHY-2502, CHEM-1103, GEO-3010
// Email format: firstname.lastname@bits.ac.id
```

---

## 3. COURSE DATA

### 3.1 Courses (30 records)
**File:** `resources/js/lib/schoolData.ts`
```typescript
// Generated data: 30 courses
{
    name: "{Subject Name} - Advanced Level"
    classId: "X-01" to "X-03" (cycling)
    courseId: "COURSE-1" to "COURSE-30"
    teacherId: "T-01" to "T-30"
    subjectId: "SUB-01" to "SUB-30"
    description: "An in-depth study of {subject} including theoretical and practical applications."
    schedule: [{ day: "Monday-Friday" (cycling), time: "8:00-9:30" to "12:00-13:30" }]
    credits: 3
    semesterId: "SEM-1" to "SEM-30"
    createdAt: "2025-01-01" to "2025-01-28" (cycling)
}
```

### 3.2 Course Details (16 specific courses)
**File:** `resources/js/lib/coursesDetails.ts`
```typescript
// Specific course assignments with detailed descriptions
[
    {
        title: 'Environmental Impact of Chemical',
        courseName: 'Science',
        courseId: 'SCI-4321',
        classId: 'XII-Science-1',
        dueDate: '2025-07-10',
        type: 'Written Report'
    },
    {
        title: 'Photosynthesis Process Essay',
        courseName: 'Biology',
        courseId: 'BIO-2201',
        classId: 'XI-Biology-2',
        dueDate: '2025-07-08',
        type: 'Essay'
    }
    // ... 14 more detailed course assignments
]
```

### 3.3 Course Scores (Multiple records)
**File:** `resources/js/lib/courseScores.ts`
```typescript
[
    {
        courseId: 'SCI-4321',
        classId: 'XII-Science-1',
        score: 92,
        lessons: [lesson progress data],
        progress: calculated percentage,
        maxScore: 100,
        gradedAt: '2025-07-03',
        remarks: 'Excellent understanding of Chemical impact.'
    }
    // ... more course scores
]
```

---

## 4. ASSIGNMENT DATA

### 4.1 New Assignments
**File:** `resources/js/lib/newAssignment.ts`
```typescript
// Multiple assignment records with detailed descriptions
[
    {
        title: 'Environmental Impact of Chemical',
        courseName: 'Science',
        courseId: 'SCI-4321',
        classId: 'XII-Science-1',
        dueDate: '2025-07-10',
        type: 'Written Report',
        description: 'Comprehensive report analyzing Chemical disposal...',
        link: '/assignment/science/SCI-4321'
    }
    // ... more assignments
]
```

---

## 5. DISCUSSION & FORUM DATA

### 5.1 Forum Contents
**File:** `resources/js/lib/forumContent.ts`
```typescript
// Forum discussion topics with learning outcomes
[
    {
        forumTitle: 'Environmental Impact of Chemical',
        learningOutcome: 'Analyze ecological consequences...',
        subTopics: ['Terrestrial pollution', 'Aquatic ecosystem effects', ...],
        lecturerName: 'Dr. Sinta Dewi',
        lecturerId: 'LECT-SCI-01',
        courseName: 'Science',
        courseId: 'SCI-4321'
    }
    // ... more forum topics
]
```

### 5.2 Discussion Threads
**File:** `resources/js/lib/discussionContent.ts`
```typescript
// Student-lecturer discussion exchanges
[
    {
        classId: 'SCI-4321',
        studentName: 'Alya Nurhaliza',
        studentArgument: 'I think local factories still dump Chemical...',
        lecturerResponse: 'Alya, that's a valid observation...',
        timestampStudent: '2025-06-28T09:14:00Z',
        timestampLecturer: '2025-06-28T11:23:00Z'
    }
    // ... hundreds of discussion entries
]
```

---

## 6. EVENTS & NEWS DATA

### 6.1 Events (6 records)
**File:** `resources/js/lib/events-lib/eventData.ts`
```typescript
[
    {
        imageUrls: ['/assets/events-assets/assets1.jpg'],
        description: 'High-level panel discussion at the World Economic Forum...',
        date: '2025-01-15',
        location: 'Davos, Switzerland',
        featuredSpeaker: 'Klaus Schwab (Founder of WEF)',
        topics: ['Global Economy', 'Sustainability', 'Geopolitics']
    }
    // ... 5 more events
]
```

### 6.2 News (9 records)
**File:** `resources/js/lib/events-lib/newsData.ts`
```typescript
[
    {
        imageUrls: ['/assets/news-assets/ghost-nets-featured.jpg'],
        description: 'Coastal fishing harbor with multiple traditional wooden fishing boats...',
        date: '2025-06-15',
        location: 'Jamestown Fishing Port, Accra, Ghana',
        featuredSpeaker: 'Kwame Boateng (Local Fisheries Advocate)',
        topics: ['Artisanal Fisheries', 'Marine Conservation', 'Ghost Nets', 'Sustainable Livelihoods']
    }
    // ... 8 more news items
]
```

---

## 7. DASHBOARD MOCK DATA

### 7.1 Student Dashboard Data
**File:** `resources/js/pages/student/dashboard.tsx`
```typescript
// Enrolled Courses (4 records)
[
    { id: 1, name: 'Computer Science Fundamentals', code: 'CS101', progress: 75, instructor: 'Dr. Smith' },
    { id: 2, name: 'Mathematics for Computing', code: 'MATH201', progress: 60, instructor: 'Prof. Johnson' },
    { id: 3, name: 'Database Systems', code: 'CS301', progress: 85, instructor: 'Dr. Brown' },
    { id: 4, name: 'Web Development', code: 'CS250', progress: 90, instructor: 'Ms. Davis' }
]

// Upcoming Assignments (3 records)
[
    { id: 1, title: 'Algorithm Analysis Report', course: 'CS101', dueDate: '2025-07-15', status: 'pending' },
    { id: 2, title: 'Database Design Project', course: 'CS301', dueDate: '2025-07-18', status: 'in-progress' },
    { id: 3, title: 'Calculus Problem Set 5', course: 'MATH201', dueDate: '2025-07-20', status: 'pending' }
]

// Recent Grades (3 records)
[
    { id: 1, assignment: 'Midterm Exam', course: 'CS101', grade: 'A-', points: '87/100' },
    { id: 2, assignment: 'Lab Assignment 3', course: 'CS301', grade: 'B+', points: '85/100' },
    { id: 3, assignment: 'Quiz 4', course: 'MATH201', grade: 'A', points: '95/100' }
]
```

### 7.2 Teacher Dashboard Data
**File:** `resources/js/pages/teacher/dashboard.tsx`
```typescript
// Pending Grading (3 records)
[
    { id: 1, assignment: 'Midterm Exam', course: 'CS101', submissions: 45, graded: 30 },
    { id: 2, assignment: 'Lab Assignment 4', course: 'CS301', submissions: 32, graded: 25 },
    { id: 3, assignment: 'Final Project', course: 'CS250', submissions: 38, graded: 15 }
]

// Upcoming Classes (3 records)
[
    { id: 1, course: 'CS101', time: '09:00 AM', room: 'Room 201', date: 'Today' },
    { id: 2, course: 'CS301', time: '02:00 PM', room: 'Lab 105', date: 'Today' },
    { id: 3, course: 'CS250', time: '10:00 AM', room: 'Room 303', date: 'Tomorrow' }
]
```

### 7.3 Admin Dashboard Data
**File:** `resources/js/pages/admin/dashboard.tsx`
```typescript
// System Stats (4 records)
[
    { id: 1, label: 'Total Users', value: 1250, change: '+12%', color: 'text-blue-600' },
    { id: 2, label: 'Active Courses', value: 45, change: '+5%', color: 'text-green-600' },
    { id: 3, label: 'Total Assignments', value: 320, change: '+8%', color: 'text-purple-600' },
    { id: 4, label: 'System Uptime', value: '99.9%', change: 'Stable', color: 'text-emerald-600' }
]

// Recent Activity (4 records)
[
    { id: 1, type: 'user_registration', user: 'John Smith', action: 'New user registered', time: '2 hours ago' },
    { id: 2, type: 'course_creation', user: 'Dr. Johnson', action: 'Created new course: Advanced Physics', time: '4 hours ago' },
    { id: 3, type: 'system_update', user: 'System', action: 'Database backup completed', time: '6 hours ago' },
    { id: 4, type: 'user_issue', user: 'Jane Doe', action: 'Reported login issue', time: '8 hours ago' }
]

// Pending Approvals (3 records)
[
    { id: 1, type: 'course', title: 'Machine Learning Fundamentals', requester: 'Dr. Smith', date: '2025-07-08' },
    { id: 2, type: 'user', title: 'Teacher Account Request', requester: 'Prof. Wilson', date: '2025-07-07' },
    { id: 3, type: 'resource', title: 'Library Access Request', requester: 'Student Union', date: '2025-07-06' }
]
```

---

## 8. HARDCODED VALUES

### 8.1 Default User Data
**File:** `resources/js/pages/dashboard.tsx`
```typescript
// Default hardcoded user
{
    name: 'Chris',
    role: 'student'
}
```

### 8.2 Avatar Generation
**File:** `resources/js/components/app/people/people-content.tsx`
```typescript
// Avatar API endpoint
function generateAvatar(id: string) {
    return `https://api.dicebear.com/7.x/personas/svg?seed=${id}`;
}
```

### 8.3 Course Mappings
**File:** `resources/js/lib/coursesDetails.ts`
```typescript
// Course ID to subject mappings
const course_mappings = [
    ['SCI-4321', 'Science'],
    ['BIO-2201', 'Biology'],
    ['GEO-3010', 'Geography'],
    ['CHEM-1103', 'Chemistry'],
    ['BIO-3302', 'Biology'],
    ['PHY-2502', 'Physics'],
    ['PHY-1205', 'Physics'],
    ['GEO-2222', 'Geography'],
    ['SCI-5533', 'Science'],
    ['CHEM-1211', 'Chemistry'],
    ['BIO-4120', 'Biology'],
    ['SCI-2098', 'Science'],
    ['BIO-1015', 'Biology'],
    ['GEO-8787', 'Geography'],
    ['CHEM-2920', 'Chemistry'],
    ['PHY-1205', 'Physics']
];
```

---

## 9. MIGRATION PRIORITY

### High Priority (Core System Data)
1. **Subjects** - Foundation for all courses
2. **School Years & Semesters** - Academic calendar structure
3. **Teachers** - User accounts and authentication
4. **Students** - User accounts and authentication
5. **Parents** - User accounts and relationships
6. **Courses** - Core academic content

### Medium Priority (Academic Content)
1. **Assignments** - Course content and assessments
2. **Course Scores** - Student progress tracking
3. **Discussion Threads** - Forum content and interactions

### Low Priority (Supplementary Content)
1. **Events** - Campus events and activities
2. **News** - News articles and updates
3. **Dashboard Mock Data** - Can be generated dynamically

---

## 10. DATABASE SCHEMA RECOMMENDATIONS

### Tables to Create:
1. `school_years` (id, year, is_current, created_at, updated_at)
2. `semesters` (id, name, start_date, end_date, school_year_id, created_at, updated_at)
3. `subjects` (id, name, code, created_at, updated_at)
4. `teachers` (id, name, email, phone, department, office, created_at, updated_at)
5. `students` (id, name, email, class_id, parent_id, joined_at, created_at, updated_at)
6. `parents` (id, name, email, phone, created_at, updated_at)
7. `courses` (id, name, course_id, class_id, teacher_id, subject_id, description, credits, semester_id, created_at, updated_at)
8. `assignments` (id, course_id, title, description, due_date, type, created_at, updated_at)
9. `course_scores` (id, course_id, student_id, score, max_score, graded_at, remarks, created_at, updated_at)
10. `events` (id, title, description, date, location, featured_speaker, image_urls, topics, created_at, updated_at)
11. `news` (id, title, description, date, location, featured_speaker, image_urls, topics, created_at, updated_at)
12. `forum_topics` (id, course_id, title, learning_outcome, sub_topics, lecturer_id, created_at, updated_at)
13. `discussion_posts` (id, forum_topic_id, student_id, lecturer_id, student_argument, lecturer_response, student_timestamp, lecturer_timestamp, created_at, updated_at)

---

**Total Records to Migrate:** ~500+ static records across all categories
**Estimated Migration Time:** 2-4 hours depending on data validation and relationships setup
**Recommended Approach:** Use Laravel seeders to populate the database with this static data
