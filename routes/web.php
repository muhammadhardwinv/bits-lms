<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\MaterialsController;

// Authentication Routes (Enhanced with proper controller)
Route::get('/', fn () => Inertia::render('login'))->name('login');
Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

Route::prefix('admin')->name('admin.')->group(function () {
    // User Routes
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');

});
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/materials/create', [MaterialsController::class, 'create'])->name('add.materials');
    Route::post('/materials', [MaterialsController::class, 'store'])->name('store.materials');
});

// Basic Dashboard Routes
Route::get('/dashboard', fn () => Inertia::render('dashboard'))->name('dashboard');
Route::get('/courses', fn () => Inertia::render('courses'))->name('courses');
Route::get('/events', fn () => Inertia::render('events'))->name('events');
Route::get('/lecturer-dashboard', fn () => Inertia::render('lecturerdashboard'))->name('lecturerdashboard');

// Gradebook Routes
Route::get('/gradebook', fn () => Inertia::render('gradebook'))->name('gradebook.index');
Route::get('/gradebook/{courseId}', fn ($courseId) => Inertia::render('course-grade', [
    'courseId' => $courseId,
]))->name('gradebook.show');

// Course Session Routes
Route::get('/selected-course/{courseId}', fn ($courseId) => Inertia::render('selected-Course', [
    'auth' => ['user' => Auth::user()],
    'courseId' => $courseId,
]))->name('course.selected');

Route::get('/current-session/{courseId}', fn ($courseId) => Inertia::render('selected-Course', [
    'auth' => ['user' => Auth::user()],
    'courseId' => $courseId,
]))->name('course.session');

// Lecturer Routes
Route::get('/select-class', fn () => Inertia::render('lecturerSelectPage'))->name('select-class');

Route::get('/forum/{courseId}', fn ($courseId) => Inertia::render('Forum', [
    'auth' => ['user' => Auth::user()],
    'courseId' => $courseId,
]))->name('forum.show');

Route::get('/discussion', fn () => Inertia::render('baseDiscussion'))->name('base.discussion');

Route::get('/discussion/{courseId}', fn ($courseId) => Inertia::render('discussion', [
    'courseId' => $courseId,
    'user' => [
        'name' => 'Guest Viewer',
        'role' => 'student'
    ],
]))->name('discussion');

Route::get('/people/{courseId}', fn($courseId) => Inertia::render('people', [
    'courseId' => $courseId,
]))->name('people');

Route::get('/attendance/{courseId}', [AttendanceController::class, 'index'])->name('attendance.index');

Route::get('/assignment/new/{courseId}', fn ($courseId) => Inertia::render('assignment-form', [
        'courseId' => $courseId,
    ])
)->name('assignment.new');

Route::get('/assignment', fn () => Inertia::render('assignment'))->name('assignment');

Route::get('/assignment/{courseId}', fn($courseId) => Inertia::render('per-assignment', [
    'courseId' => $courseId,
]))->name('assignment.view');

Route::get('/{courseId}/quiz', function ($courseId) {
    return Inertia::render('courseQuiz', [
        'courseId' => $courseId,
    ]);
})->name('course.quiz');

Route::prefix('assignment')->group(function () {
    Route::get('/{course}/{courseId}/slideshow', fn ($course, $courseId) => Inertia::render('assignmentPage/assignmentSlideshow', [
        'course' => $course,
        'courseId' => $courseId,
    ]))->name('assignment.slideshow');

    Route::get('/{course}/{courseId}', fn ($course, $courseId) => Inertia::render('per-assignment', [
        'course' => $course,
        'courseId' => $courseId,
    ]))->name('assignment.show');
});

Route::prefix('courses')->group(function () {
    Route::get('/{course}/slideshow', fn ($course) => Inertia::render('slideshow', [
        'course' => $course,
    ]))->name('courses.slideshow');
});



// Additional Assignment Route (from your changes)
Route::get('/{courseName}/new-assignment', fn ($courseName) => Inertia::render('NewAssignmentContent', [
    'courseName' => $courseName,
]))->name('assignment.new.content');

// Protected Dashboard Routes (Role-based system)
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Role-specific dashboard routes with role protection
    Route::middleware(['role:student'])->group(function () {
        Route::get('/student/dashboard', function () {
            return Inertia::render('student/dashboard');
        })->name('student.dashboard');
    });

    Route::middleware(['role:teacher'])->group(function () {
        Route::get('/teacher/dashboard', function () {
            return Inertia::render('teacher/dashboard');
        })->name('teacher.dashboard');
    });

    Route::middleware(['role:admin'])->group(function () {
        Route::get('/admin/dashboard', function () {
            return Inertia::render('admin/dashboard');
        })->name('admin.dashboard');
    });
});
