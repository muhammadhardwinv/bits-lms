<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Course\CourseController;
use App\Http\Controllers\Assignments\AssignmentsController;
use App\Http\Controllers\Sessions\SessionsController;
use App\Http\Controllers\Classroom\ClassroomController;
use App\Http\Controllers\AttendanceController;

// ---------- Authentication ----------
Route::get('/', fn() => Inertia::render('login'))->name('login');
Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

// ---------- Admin ----------
Route::prefix('admin')->name('admin.')->middleware(['auth', 'role:admin'])->group(function () {
    // Users
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::get('/users', [UserController::class, 'showPeople'])->name('users.index');
    Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update');

    // Classroom
    Route::get('/classroom', [ClassroomController::class, 'index'])->name('classroom.index');
    Route::post('/classroom', [ClassroomController::class, 'store'])->name('classroom.store');

    // Courses
    Route::get('/courses/create', [CourseController::class, 'create'])->name('courses.create');
    Route::post('/courses', [CourseController::class, 'store'])->name('courses.store');
    Route::put('/courses/{id}', [CourseController::class, 'update'])->name('courses.update');
    Route::delete('/courses/{id}', [CourseController::class, 'destroy'])->name('courses.destroy');
});

// ---------- Teacher ----------
Route::prefix('teacher')->name('teacher.')->middleware(['auth', 'role:teacher'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('teacher/dashboard'))->name('dashboard');
    Route::get('/courses/create', [CourseController::class, 'create'])->name('courses.create');
    Route::get('/assignments', [AssignmentsController::class, 'show'])->name('assignments.index');
    Route::get('/assignments/{id}/edit', [AssignmentsController::class, 'edit'])->name('assignments.edit');
});

// ---------- Student ----------
Route::prefix('student')->name('student.')->middleware(['auth', 'role:student'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('student/dashboard'))->name('dashboard');
});

// ---------- Authenticated ----------
Route::middleware(['auth'])->group(function () {

    // Dashboard
    Route::get('/dashboard', fn() => Inertia::render('dashboard'))->name('dashboard');
    Route::middleware('role:student')->get('/student/dashboard', fn() => Inertia::render('student/dashboard'))->name('student.dashboard');
    Route::middleware('role:teacher')->get('/teacher/dashboard', fn() => Inertia::render('teacher/dashboard'))->name('teacher.dashboard');
    Route::middleware('role:admin')->get('/admin/dashboard', fn() => Inertia::render('admin/dashboard'))->name('admin.dashboard');

    // Courses
    Route::get('/courses', [CourseController::class, 'fetch'])->name('courses.index');
    Route::get('/courses/{id}', [CourseController::class, 'show'])->name('courses.show');
    Route::get('/courses/{id}/edit', [CourseController::class, 'edit'])->middleware('role:admin,teacher')->name('courses.edit');
    Route::post('/courses', [CourseController::class, 'store'])->middleware('role:admin,teacher')->name('courses.store');
    Route::put('/courses/{id}', [CourseController::class, 'update'])->middleware('role:admin,teacher')->name('courses.update');
    Route::delete('/courses/{id}', [CourseController::class, 'destroy'])->middleware('role:admin,teacher')->name('courses.destroy');

    // Assignments
    Route::get('/assignments', [AssignmentsController::class, 'show'])->name('assignments.index');
    Route::get('/assignments/{courseId}', fn($courseId) => Inertia::render('per-assignments', [
        'auth' => ['user' => Auth::user()],
        'courseId' => $courseId,
    ]))->name('assignments.view');
    Route::get('/assignments/new/{courseId}', [AssignmentsController::class, 'create'])->name('assignments.create');
    Route::get('/assignments/new', [AssignmentsController::class, 'create'])->name('assignments.new');
    Route::post('/assignments', [AssignmentsController::class, 'store'])->name('assignments.store');
    Route::get('/assignments/{id}/edit', [AssignmentsController::class, 'edit'])->name('assignments.edit');
    Route::put('/assignments/{id}', [AssignmentsController::class, 'update'])->name('assignments.update');

    // Sessions
    Route::middleware('role:admin,teacher')->group(function () {
    // Classroom-specific sessions
    Route::get('/classroom/{id}/sessions/create', [SessionsController::class, 'create'])->name('sessions.create');
    Route::post('/classroom/{id}/sessions', [SessionsController::class, 'store'])->name('sessions.store');

    // General session management
    Route::delete('/sessions/{id}', [SessionsController::class, 'destroy'])->name('sessions.destroy');
    Route::get('/sessions/{id}/edit', [SessionsController::class, 'edit'])->name('sessions.edit');
    Route::put('/sessions/{id}', [SessionsController::class, 'update'])->name('sessions.update');
    Route::get('/sessions/{id}/show', [SessionsController::class, 'show'])->name('sessions.show');

    // Optional: If needed for course-specific session creation (but redundant with classroom)
    // Route::post('/sessions', [SessionsController::class, 'store'])->name('sessions.store');
    // Route::get('/sessions/create/{course}', [SessionsController::class, 'create'])->name('sessions.create');
});

    // Session Fallbacks
    Route::get('/sessions/{id}', [CourseController::class, 'show'])->name('sessions.fallback');
    Route::get('/sessions/{courseId}/session-1', fn($courseId) => Redirect::to("/sessions/{$courseId}"));

    // Classroom (singular/public-facing)
    Route::get('/classroom', [ClassroomController::class, 'index'])->name('classrooms.index');
    Route::get('/classroom/create', [ClassroomController::class, 'create'])->middleware('role:admin,teacher')->name('classroom.create');
    Route::post('/admin/classrooms', [ClassroomController::class, 'store'])->middleware('role:admin,teacher')->name('admin.classrooms.store');
    Route::get('/classroom/{id}', function ($id) {
        return Inertia::render('classroom/selectedClassroom', [
            'id' => $id,
            'auth' => ['user' => Auth::user()],
        ]);
    })->name('classroom.show');
    Route::get('/classroom/{id}', [ClassroomController::class, 'show'])->name('classroom.show');



    // Attendance
    Route::get('/attendance/{courseId}', [AttendanceController::class, 'index'])->name('attendance.index');

    // Static pages
    Route::get('/events', fn() => Inertia::render('events'))->name('events');
    Route::get('/lecturer-dashboard', fn() => Inertia::render('lecturerdashboard'))->name('lecturerdashboard');
    Route::get('/gradebook', fn() => Inertia::render('gradebook'))->name('gradebook.index');
    Route::get('/gradebook/{courseId}', fn($courseId) => Inertia::render('course-grade', [
        'auth' => ['user' => Auth::user()],
        'course' => CourseController::getCourseByCourseId($courseId),
    ]))->name('gradebook.show');
    Route::get('/forum/{courseId}', fn($courseId) => Inertia::render('Forum', [
        'auth' => ['user' => Auth::user()],
        'courseId' => $courseId,
    ]))->name('forum.show');
    Route::get('/discussion/{courseId}', fn($courseId) => Inertia::render('discussion', [
        'user' => ['user' => Auth::user()],
        'courseId' => $courseId,
    ]))->name('discussion');
});

// ---------- Assignment Slideshow ----------
Route::prefix('assignments')->middleware('auth')->group(function () {
    Route::get('/{course}/{courseId}/slideshow', fn($course, $courseId) => Inertia::render('assignmentPage/assignmentSlideshow', [
        'course' => $course,
        'courseId' => $courseId,
    ]))->name('assignments.slideshow');

    Route::get('/{course}/{courseId}', fn($course, $courseId) => Inertia::render('per-assignments', [
        'course' => $course,
        'courseId' => $courseId,
    ]))->name('assignments.show');
});

// ---------- Course Slideshow ----------
Route::prefix('courses')->middleware('auth')->group(function () {
    Route::get('/{course}/slideshow', fn($course) => Inertia::render('slideshow', [
        'auth' => ['user' => Auth::user()],
        'course' => $course,
    ]))->name('courses.slideshow');
});

// ---------- Quiz ----------
Route::get('/{courseId}/quiz', fn($courseId) => Inertia::render('courseQuiz', [
    'courseId' => $courseId,
]))->middleware('auth')->name('course.quiz');
