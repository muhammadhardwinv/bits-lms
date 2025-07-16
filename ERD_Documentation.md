# LMS Database ERD (Entity Relationship Diagram)
## Based on Static Data Documentation

**Project:** BITS LMS Database Design  
**Date:** July 15, 2025  
**Purpose:** Define database structure and relationships for static data migration  

---

## 1. CORE ENTITIES OVERVIEW

### Primary Entities (13 Tables)
1. **school_years** - Academic year management
2. **semesters** - Semester periods within school years
3. **subjects** - Academic subjects/disciplines
4. **users** - All system users (students, teachers, admins, parents)
5. **classes** - Class groupings for students
6. **courses** - Specific course instances
7. **assignments** - Course assignments and tasks
8. **course_enrollments** - Student-course relationships
9. **course_scores** - Student grades and progress
10. **forum_topics** - Discussion forum topics
11. **discussion_posts** - Forum discussions and responses
12. **events** - Campus events and activities
13. **news** - News articles and announcements

---

## 2. DETAILED ENTITY DEFINITIONS

### 2.1 ACADEMIC STRUCTURE ENTITIES

#### **school_years**
```sql
CREATE TABLE school_years (
    id VARCHAR(10) PRIMARY KEY,           -- 'SY-2025'
    year VARCHAR(9) NOT NULL,             -- '2025/2026'
    is_current BOOLEAN DEFAULT FALSE,     -- Only one can be true
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    UNIQUE KEY unique_current_year (is_current) -- Ensure only one current year
);
```

#### **semesters**
```sql
CREATE TABLE semesters (
    id VARCHAR(10) PRIMARY KEY,           -- 'SEM-1'
    name VARCHAR(50) NOT NULL,            -- 'Semester 1'
    start_date DATE NOT NULL,             -- '2025-01-01'
    end_date DATE NOT NULL,               -- '2025-06-30'
    school_year_id VARCHAR(10) NOT NULL,  -- FK to school_years
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (school_year_id) REFERENCES school_years(id) ON DELETE CASCADE,
    INDEX idx_school_year (school_year_id),
    INDEX idx_dates (start_date, end_date)
);
```

#### **subjects**
```sql
CREATE TABLE subjects (
    id VARCHAR(10) PRIMARY KEY,           -- 'SUB-01'
    name VARCHAR(100) NOT NULL,           -- 'Mathematics'
    code VARCHAR(10) NOT NULL UNIQUE,     -- 'MATH'
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_code (code),
    INDEX idx_name (name)
);
```

#### **classes**
```sql
CREATE TABLE classes (
    id VARCHAR(10) PRIMARY KEY,           -- 'X-01'
    name VARCHAR(50) NOT NULL,            -- 'Class X-01'
    grade_level VARCHAR(10),              -- 'X', 'XI', 'XII'
    capacity INT DEFAULT 30,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_grade_level (grade_level)
);
```

### 2.2 USER MANAGEMENT ENTITIES

#### **users** (Base authentication table)
```sql
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'teacher', 'student', 'parent') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    remember_token VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_role (role),
    INDEX idx_email (email),
    INDEX idx_active (is_active)
);
```

#### **teachers** (Teacher-specific data)
```sql
CREATE TABLE teachers (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL UNIQUE,
    teacher_code VARCHAR(20) UNIQUE,      -- 'T-01', 'T-02', etc.
    department VARCHAR(100) NOT NULL,
    office VARCHAR(100),
    specialization VARCHAR(255),
    hire_date DATE,
    status ENUM('active', 'inactive', 'retired') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_teacher_code (teacher_code),
    INDEX idx_department (department),
    INDEX idx_status (status)
);
```

#### **students** (Student-specific data)
```sql
CREATE TABLE students (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL UNIQUE,
    student_code VARCHAR(20) UNIQUE,      -- 'S-01', 'S-02', etc.
    student_number VARCHAR(50) UNIQUE,    -- Official student ID
    class_id VARCHAR(10) NOT NULL,        -- FK to classes
    grade_level VARCHAR(10) NOT NULL,     -- 'X', 'XI', 'XII'
    enrollment_date DATE NOT NULL,
    status ENUM('active', 'graduated', 'transferred', 'suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE RESTRICT,
    INDEX idx_user_id (user_id),
    INDEX idx_student_code (student_code),
    INDEX idx_student_number (student_number),
    INDEX idx_class_id (class_id),
    INDEX idx_grade_level (grade_level),
    INDEX idx_status (status)
);
```

#### **parents** (Parent-specific data)
```sql
CREATE TABLE parents (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL UNIQUE,
    parent_code VARCHAR(20) UNIQUE,       -- 'P-01', 'P-02', etc.
    phone VARCHAR(20),
    address TEXT,
    emergency_contact VARCHAR(255),
    occupation VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_parent_code (parent_code),
    INDEX idx_phone (phone)
);
```

#### **parent_student_relationships** (Many-to-Many: Parents ↔ Students)
```sql
CREATE TABLE parent_student_relationships (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    parent_id BIGINT UNSIGNED NOT NULL,   -- FK to parents
    student_id BIGINT UNSIGNED NOT NULL,  -- FK to students
    relationship_type ENUM('father', 'mother', 'guardian', 'other') NOT NULL,
    is_primary_contact BOOLEAN DEFAULT FALSE,
    is_emergency_contact BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (parent_id) REFERENCES parents(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    UNIQUE KEY unique_parent_student (parent_id, student_id),
    INDEX idx_parent_id (parent_id),
    INDEX idx_student_id (student_id),
    INDEX idx_relationship_type (relationship_type),
    INDEX idx_primary_contact (is_primary_contact)
);
```

#### **admins** (Admin-specific data)
```sql
CREATE TABLE admins (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL UNIQUE,
    admin_code VARCHAR(20) UNIQUE,        -- 'A-01', 'A-02', etc.
    access_level ENUM('super_admin', 'admin', 'moderator') DEFAULT 'admin',
    department VARCHAR(100),
    permissions JSON,                     -- Specific permissions array
    last_login_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_admin_code (admin_code),
    INDEX idx_access_level (access_level)
);
```

### 2.3 ACADEMIC CONTENT ENTITIES

#### **courses**
```sql
CREATE TABLE courses (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    course_code VARCHAR(20) NOT NULL,     -- 'COURSE-1', 'SCI-4321'
    name VARCHAR(255) NOT NULL,           -- 'Mathematics - Advanced Level'
    class_id VARCHAR(10) NOT NULL,        -- FK to classes
    teacher_id BIGINT UNSIGNED NOT NULL,  -- FK to teachers
    subject_id VARCHAR(10) NOT NULL,      -- FK to subjects
    semester_id VARCHAR(10) NOT NULL,     -- FK to semesters
    description TEXT,
    credits INT DEFAULT 3,
    schedule JSON,                        -- [{"day": "Monday", "time": "8:00-9:30"}]
    max_students INT DEFAULT 30,
    status ENUM('active', 'completed', 'cancelled') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE RESTRICT,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (semester_id) REFERENCES semesters(id) ON DELETE CASCADE,
    UNIQUE KEY unique_course_class_semester (course_code, class_id, semester_id),
    INDEX idx_course_code (course_code),
    INDEX idx_class (class_id),
    INDEX idx_teacher (teacher_id),
    INDEX idx_subject (subject_id),
    INDEX idx_semester (semester_id),
    INDEX idx_status (status)
);
```

#### **course_enrollments** (Many-to-Many: Students ↔ Courses)
```sql
CREATE TABLE course_enrollments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT UNSIGNED NOT NULL,  -- FK to students
    course_id BIGINT UNSIGNED NOT NULL,   -- FK to courses
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'completed', 'dropped', 'withdrawn') DEFAULT 'active',
    final_grade VARCHAR(5),               -- 'A', 'B+', etc.
    grade_points DECIMAL(3,2),            -- 4.00, 3.67, etc. for GPA calculation
    completion_date DATE NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_enrollment (student_id, course_id),
    INDEX idx_student (student_id),
    INDEX idx_course (course_id),
    INDEX idx_status (status),
    INDEX idx_enrolled_at (enrolled_at)
);
```

#### **assignments**
```sql
CREATE TABLE assignments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT UNSIGNED NOT NULL,   -- FK to courses
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type ENUM('Essay', 'Written Report', 'Short Answer', 'True/False', 'Fill in the Blank') NOT NULL,
    due_date DATETIME NOT NULL,
    max_points INT DEFAULT 100,
    instructions TEXT,
    attachment_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    INDEX idx_course (course_id),
    INDEX idx_due_date (due_date),
    INDEX idx_type (type)
);
```

#### **assignment_submissions**
```sql
CREATE TABLE assignment_submissions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    assignment_id BIGINT UNSIGNED NOT NULL, -- FK to assignments
    student_id BIGINT UNSIGNED NOT NULL,    -- FK to students
    submission_text TEXT,
    attachment_url VARCHAR(500),
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_late BOOLEAN DEFAULT FALSE,
    grade DECIMAL(5,2),                     -- 87.50
    max_grade DECIMAL(5,2) DEFAULT 100.00,
    feedback TEXT,
    graded_at TIMESTAMP NULL,
    graded_by BIGINT UNSIGNED,              -- FK to teachers
    status ENUM('draft', 'submitted', 'graded', 'returned', 'resubmitted') DEFAULT 'submitted',
    attempt_number INT DEFAULT 1,           -- For multiple submission attempts
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (graded_by) REFERENCES teachers(id) ON DELETE SET NULL,
    UNIQUE KEY unique_submission (assignment_id, student_id, attempt_number),
    INDEX idx_assignment (assignment_id),
    INDEX idx_student (student_id),
    INDEX idx_status (status),
    INDEX idx_graded_by (graded_by),
    INDEX idx_submitted_at (submitted_at)
);
```

#### **course_scores** (Overall course performance)
```sql
CREATE TABLE course_scores (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    course_enrollment_id BIGINT UNSIGNED NOT NULL, -- FK to course_enrollments
    score DECIMAL(5,2) NOT NULL,          -- 92.50
    max_score DECIMAL(5,2) DEFAULT 100.00,
    progress DECIMAL(5,2) DEFAULT 0.00,   -- Percentage completion
    lessons_completed INT DEFAULT 0,
    total_lessons INT DEFAULT 0,
    lessons_data JSON,                    -- Detailed lesson progress tracking
    attendance_percentage DECIMAL(5,2) DEFAULT 0.00,
    assignment_average DECIMAL(5,2) DEFAULT 0.00,
    quiz_average DECIMAL(5,2) DEFAULT 0.00,
    remarks TEXT,
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (course_enrollment_id) REFERENCES course_enrollments(id) ON DELETE CASCADE,
    UNIQUE KEY unique_enrollment_score (course_enrollment_id),
    INDEX idx_course_enrollment (course_enrollment_id),
    INDEX idx_score (score),
    INDEX idx_progress (progress)
);
```

### 2.4 COMMUNICATION ENTITIES

#### **forum_topics**
```sql
CREATE TABLE forum_topics (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT UNSIGNED NOT NULL,   -- FK to courses
    title VARCHAR(255) NOT NULL,
    learning_outcome TEXT,
    sub_topics JSON,                      -- Array of subtopic strings
    lecturer_id BIGINT UNSIGNED NOT NULL, -- FK to teachers
    is_active BOOLEAN DEFAULT TRUE,
    is_pinned BOOLEAN DEFAULT FALSE,
    view_count INT DEFAULT 0,
    post_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (lecturer_id) REFERENCES teachers(id) ON DELETE CASCADE,
    INDEX idx_course (course_id),
    INDEX idx_lecturer (lecturer_id),
    INDEX idx_active (is_active),
    INDEX idx_pinned (is_pinned)
);
```

#### **discussion_posts**
```sql
CREATE TABLE discussion_posts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    forum_topic_id BIGINT UNSIGNED NOT NULL, -- FK to forum_topics
    author_id BIGINT UNSIGNED NOT NULL,      -- FK to users (can be student or teacher)
    author_type ENUM('student', 'teacher') NOT NULL,
    content TEXT NOT NULL,
    parent_post_id BIGINT UNSIGNED NULL,     -- FK to discussion_posts (for replies)
    is_solution BOOLEAN DEFAULT FALSE,       -- Mark as solution to the topic
    like_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (forum_topic_id) REFERENCES forum_topics(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_post_id) REFERENCES discussion_posts(id) ON DELETE CASCADE,
    INDEX idx_forum_topic (forum_topic_id),
    INDEX idx_author (author_id),
    INDEX idx_author_type (author_type),
    INDEX idx_parent_post (parent_post_id),
    INDEX idx_created_at (created_at)
);
```

### 2.5 CONTENT MANAGEMENT ENTITIES

#### **events**
```sql
CREATE TABLE events (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    event_date DATE NOT NULL,
    location VARCHAR(255) NOT NULL,
    featured_speaker VARCHAR(255),
    image_urls JSON,                      -- Array of image URLs
    topics JSON,                          -- Array of topic strings
    is_featured BOOLEAN DEFAULT FALSE,
    status ENUM('upcoming', 'ongoing', 'completed', 'cancelled') DEFAULT 'upcoming',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_event_date (event_date),
    INDEX idx_status (status),
    INDEX idx_featured (is_featured)
);
```

#### **news**
```sql
CREATE TABLE news (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    publish_date DATE NOT NULL,
    location VARCHAR(255),
    featured_speaker VARCHAR(255),
    image_urls JSON,                      -- Array of image URLs
    topics JSON,                          -- Array of topic strings
    is_published BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_publish_date (publish_date),
    INDEX idx_published (is_published),
    INDEX idx_featured (is_featured)
);
```

---

## 3. RELATIONSHIP MAPPING

### 3.1 ONE-TO-MANY RELATIONSHIPS

1. **school_years** → **semesters** (1:N)
   - One school year has multiple semesters

2. **semesters** → **courses** (1:N)
   - One semester has multiple courses

3. **subjects** → **courses** (1:N)
   - One subject can have multiple course instances

4. **classes** → **users** (students) (1:N)
   - One class has multiple students

5. **users** (teachers) → **courses** (1:N)
   - One teacher can teach multiple courses

6. **users** (parents) → **users** (students) (1:N)
   - One parent can have multiple children

7. **courses** → **assignments** (1:N)
   - One course has multiple assignments

8. **courses** → **forum_topics** (1:N)
   - One course has multiple forum topics

9. **forum_topics** → **discussion_posts** (1:N)
   - One forum topic has multiple discussion posts

10. **assignments** → **assignment_submissions** (1:N)
    - One assignment has multiple student submissions

### 3.2 MANY-TO-MANY RELATIONSHIPS

1. **users** (students) ↔ **courses** (via course_enrollments)
   - Students can enroll in multiple courses
   - Courses can have multiple students

### 3.3 ONE-TO-ONE RELATIONSHIPS

1. **course_enrollments** → **course_scores** (1:1)
   - Each enrollment has one overall score record

---

## 4. KEY CONSTRAINTS & INDEXES

### 4.1 Primary Keys
- All tables use AUTO_INCREMENT BIGINT UNSIGNED for internal IDs
- Business keys (like course codes) are separate UNIQUE fields

### 4.2 Foreign Key Constraints
- **CASCADE DELETE**: When parent is deleted, children are deleted
- **SET NULL**: When parent is deleted, foreign key is set to NULL
- **RESTRICT**: Prevent deletion if children exist

### 4.3 Unique Constraints
- Email addresses (users)
- Subject codes
- Course codes within same semester
- Student-course enrollment pairs
- Current school year (only one can be active)

### 4.4 Indexes for Performance
- Foreign key columns
- Search columns (name, email, code)
- Date columns (due_date, event_date)
- Status/enum columns
- Composite indexes for common queries

---

## 5. DATA MIGRATION MAPPING

### 5.1 Static Data Sources → Database Tables

| Source File | Target Table | Records | Priority |
|-------------|--------------|---------|----------|
| schoolData.ts (schoolYears) | school_years | 30 | High |
| schoolData.ts (semesters) | semesters | 30 | High |
| schoolData.ts (subjects) | subjects | 30 | High |
| schoolData.ts (teachers) | users (role='teacher') | 30 | High |
| schoolData.ts (people) | users (role='student') | 30 | High |
| schoolData.ts (parents) | users (role='parent') | 30 | High |
| schoolData.ts (courses) | courses | 30 | High |
| coursesDetails.ts | assignments | 16 | Medium |
| courseScores.ts | course_scores | Multiple | Medium |
| forumContent.ts | forum_topics | Multiple | Medium |
| discussionContent.ts | discussion_posts | 100+ | Medium |
| eventData.ts | events | 6 | Low |
| newsData.ts | news | 9 | Low |

### 5.2 Dashboard Mock Data → Dynamic Queries
- Student dashboard data → Generated from course_enrollments, assignments, course_scores
- Teacher dashboard data → Generated from courses, assignment_submissions
- Admin dashboard data → Generated from system-wide aggregations

---

## 6. BUSINESS RULES & VALIDATIONS

### 6.1 Academic Rules
1. Only one school year can be current at a time
2. Students can only be enrolled in courses from their assigned class
3. Assignment due dates must be within the semester period
4. Course scores must be between 0 and max_score
5. Teachers can only grade assignments for their courses

### 6.2 User Rules
1. Email addresses must be unique across all users
2. Students must be assigned to a class
3. Parents can be linked to multiple students
4. Teachers must have department and office information

### 6.3 Data Integrity Rules
1. Soft deletes for user accounts (add deleted_at column)
2. Audit trails for grade changes
3. Cascade deletes for academic structure (school_year → semester → course)
4. Preserve historical data (don't delete completed courses/assignments)

---

## 7. PERFORMANCE CONSIDERATIONS

### 7.1 Indexing Strategy
- Composite indexes for common query patterns
- Partial indexes for filtered queries
- Full-text indexes for search functionality

### 7.2 Partitioning
- Partition large tables by academic year
- Archive old data to separate tables

### 7.3 Caching Strategy
- Cache frequently accessed reference data (subjects, classes)
- Cache user session data
- Cache dashboard aggregations

---

**Total Tables:** 13 core tables  
**Total Relationships:** 15+ foreign key relationships  
**Estimated Storage:** 50MB+ for initial static data  
**Migration Complexity:** Medium (due to relationships and data validation)
