-- =====================================================
-- LMS Database Schema - Improved ERD Implementation
-- =====================================================
-- This schema follows proper database normalization
-- with separate tables for each user role
-- =====================================================

-- Drop existing tables if they exist (in reverse dependency order)
DROP TABLE IF EXISTS discussion_posts;
DROP TABLE IF EXISTS forum_topics;
DROP TABLE IF EXISTS course_scores;
DROP TABLE IF EXISTS assignment_submissions;
DROP TABLE IF EXISTS assignments;
DROP TABLE IF EXISTS course_enrollments;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS parent_student_relationships;
DROP TABLE IF EXISTS admins;
DROP TABLE IF EXISTS parents;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS teachers;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS classes;
DROP TABLE IF EXISTS subjects;
DROP TABLE IF EXISTS semesters;
DROP TABLE IF EXISTS school_years;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS news;

-- =====================================================
-- 1. ACADEMIC STRUCTURE TABLES
-- =====================================================

-- School Years
CREATE TABLE school_years (
    id VARCHAR(10) PRIMARY KEY,           -- 'SY-2025'
    year VARCHAR(9) NOT NULL,             -- '2025/2026'
    is_current BOOLEAN DEFAULT FALSE,     -- Only one can be true
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    UNIQUE KEY unique_current_year (is_current),
    INDEX idx_year (year)
);

-- Semesters
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

-- Subjects
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

-- Classes
CREATE TABLE classes (
    id VARCHAR(10) PRIMARY KEY,           -- 'X-01'
    name VARCHAR(50) NOT NULL,            -- 'Class X-01'
    grade_level VARCHAR(10),              -- 'X', 'XI', 'XII'
    capacity INT DEFAULT 30,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_grade_level (grade_level)
);

-- =====================================================
-- 2. USER MANAGEMENT TABLES
-- =====================================================

-- Base Users Table (Authentication)
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

-- Teachers Table
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

-- Students Table
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

-- Parents Table
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

-- Parent-Student Relationships (Many-to-Many)
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

-- Admins Table
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

-- =====================================================
-- 3. ACADEMIC CONTENT TABLES
-- =====================================================

-- Courses
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

-- Course Enrollments (Many-to-Many: Students ↔ Courses)
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

-- Assignments
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
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    INDEX idx_course (course_id),
    INDEX idx_due_date (due_date),
    INDEX idx_type (type),
    INDEX idx_published (is_published)
);

-- Assignment Submissions
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

-- Course Scores (Overall course performance)
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

-- =====================================================
-- 4. COMMUNICATION TABLES
-- =====================================================

-- Forum Topics
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

-- Discussion Posts
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

-- =====================================================
-- 5. CONTENT MANAGEMENT TABLES
-- =====================================================

-- Events
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

-- News
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

-- =====================================================
-- 6. TRIGGERS AND CONSTRAINTS
-- =====================================================

-- Trigger to ensure only one current school year
DELIMITER $$
CREATE TRIGGER ensure_single_current_year
    BEFORE INSERT ON school_years
    FOR EACH ROW
BEGIN
    IF NEW.is_current = TRUE THEN
        UPDATE school_years SET is_current = FALSE WHERE is_current = TRUE;
    END IF;
END$$

CREATE TRIGGER ensure_single_current_year_update
    BEFORE UPDATE ON school_years
    FOR EACH ROW
BEGIN
    IF NEW.is_current = TRUE AND OLD.is_current = FALSE THEN
        UPDATE school_years SET is_current = FALSE WHERE is_current = TRUE AND id != NEW.id;
    END IF;
END$$
DELIMITER ;

-- =====================================================
-- 7. VIEWS FOR COMMON QUERIES
-- =====================================================

-- View for complete user information with role details
CREATE VIEW user_details AS
SELECT
    u.id,
    u.name,
    u.email,
    u.role,
    u.is_active,
    CASE
        WHEN u.role = 'teacher' THEN t.teacher_code
        WHEN u.role = 'student' THEN s.student_code
        WHEN u.role = 'parent' THEN p.parent_code
        WHEN u.role = 'admin' THEN a.admin_code
    END as user_code,
    CASE
        WHEN u.role = 'teacher' THEN t.department
        WHEN u.role = 'student' THEN s.grade_level
        WHEN u.role = 'admin' THEN a.department
    END as department_or_grade,
    u.created_at
FROM users u
LEFT JOIN teachers t ON u.id = t.user_id
LEFT JOIN students s ON u.id = s.user_id
LEFT JOIN parents p ON u.id = p.user_id
LEFT JOIN admins a ON u.id = a.user_id;

-- View for course enrollment details
CREATE VIEW course_enrollment_details AS
SELECT
    ce.id as enrollment_id,
    u.name as student_name,
    s.student_code,
    c.name as course_name,
    c.course_code,
    sub.name as subject_name,
    ut.name as teacher_name,
    cl.name as class_name,
    ce.status as enrollment_status,
    ce.final_grade,
    ce.enrolled_at
FROM course_enrollments ce
JOIN students s ON ce.student_id = s.id
JOIN users u ON s.user_id = u.id
JOIN courses c ON ce.course_id = c.id
JOIN subjects sub ON c.subject_id = sub.id
JOIN teachers t ON c.teacher_id = t.id
JOIN users ut ON t.user_id = ut.id
JOIN classes cl ON c.class_id = cl.id;

-- =====================================================
-- END OF SCHEMA
-- =====================================================
