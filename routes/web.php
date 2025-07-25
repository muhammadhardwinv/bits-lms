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
Route::get('/courses', fn () => Inertia::render('courses', [
    'auth' => ['user' => Auth::user()],
]))->name('courses');
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

Route::get('/discussion/{courseId}', fn ($courseId) => Inertia::render('discussion', [
    'user' => ['user' => Auth::user()],
    'courseId' => $courseId,
]))->name('discussion');

Route::get('/people/{courseId}', fn($courseId) => Inertia::render('people', [
    'auth' => ['user' => Auth::user()],
    'courseId' => $courseId,
]))->name('people');

Route::get('/attendance/{courseId}', [AttendanceController::class, 'index'])->name('attendance.index');

Route::get('/assignment/new/{courseId}', fn ($courseId) => Inertia::render('assignment-form', [
        'auth' => ['user' => Auth::user()],
        'courseId' => $courseId,
    ])
)->name('assignment.new');

Route::get('/assignment', fn () => Inertia::render('assignment'))->name('assignment');

Route::get('/assignment/{courseId}', fn($courseId) => Inertia::render('per-assignment', [
    'auth' => ['user' => Auth::user()],
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
         'auth' => ['user' => Auth::user()],
        'course' => $course,
    ]))->name('courses.slideshow');
});



// Additional Assignment Route (from your changes)
Route::get('/{courseName}/new-assignment', fn ($courseName) => Inertia::render('assignment-form', [
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
        Route::get('/admin/dashboard', [App\Http\Controllers\Admin\AdminController::class, 'dashboard'])->name('admin.dashboard');

        // User Management Routes
        Route::prefix('admin/users')->name('admin.users.')->group(function () {
            Route::get('/', [App\Http\Controllers\Admin\UserManagementController::class, 'index'])->name('index');
            Route::get('/create', [App\Http\Controllers\Admin\UserManagementController::class, 'create'])->name('create');
            Route::post('/', [App\Http\Controllers\Admin\UserManagementController::class, 'store'])->name('store');
            Route::get('/{user}', [App\Http\Controllers\Admin\UserManagementController::class, 'show'])->name('show');
            Route::get('/{user}/edit', [App\Http\Controllers\Admin\UserManagementController::class, 'edit'])->name('edit');
            Route::put('/{user}', [App\Http\Controllers\Admin\UserManagementController::class, 'update'])->name('update');
            Route::delete('/{user}', [App\Http\Controllers\Admin\UserManagementController::class, 'destroy'])->name('destroy');
            Route::patch('/{user}/toggle-status', [App\Http\Controllers\Admin\UserManagementController::class, 'toggleStatus'])->name('toggle-status');
            Route::post('/bulk-action', [App\Http\Controllers\Admin\UserManagementController::class, 'bulkAction'])->name('bulk-action');

            // AJAX endpoints for ID generation
            Route::post('/get-next-id', [App\Http\Controllers\Admin\UserManagementController::class, 'getNextId'])->name('get-next-id');
            Route::get('/role-statistics', [App\Http\Controllers\Admin\UserManagementController::class, 'getRoleStatistics'])->name('role-statistics');
        });

        // Course Management Routes
        Route::prefix('admin/courses')->name('admin.courses.')->group(function () {
            Route::get('/', [App\Http\Controllers\Admin\CourseManagementController::class, 'index'])->name('index');
            Route::get('/create', [App\Http\Controllers\Admin\CourseManagementController::class, 'create'])->name('create');
            Route::post('/', [App\Http\Controllers\Admin\CourseManagementController::class, 'store'])->name('store');
            Route::get('/{course}', [App\Http\Controllers\Admin\CourseManagementController::class, 'show'])->name('show');
            Route::get('/{course}/edit', [App\Http\Controllers\Admin\CourseManagementController::class, 'edit'])->name('edit');
            Route::put('/{course}', [App\Http\Controllers\Admin\CourseManagementController::class, 'update'])->name('update');
            Route::delete('/{course}', [App\Http\Controllers\Admin\CourseManagementController::class, 'destroy'])->name('destroy');
        });

        // System Settings Routes
        Route::prefix('admin/settings')->name('admin.settings.')->group(function () {
            Route::get('/', [App\Http\Controllers\Admin\SystemSettingsController::class, 'index'])->name('index');
            Route::put('/', [App\Http\Controllers\Admin\SystemSettingsController::class, 'update'])->name('update');
            Route::post('/clear-cache', [App\Http\Controllers\Admin\SystemSettingsController::class, 'clearCache'])->name('clear-cache');
            Route::post('/optimize', [App\Http\Controllers\Admin\SystemSettingsController::class, 'optimize'])->name('optimize');
            Route::post('/migrate', [App\Http\Controllers\Admin\SystemSettingsController::class, 'migrate'])->name('migrate');
            Route::get('/logs', [App\Http\Controllers\Admin\SystemSettingsController::class, 'logs'])->name('logs');
            Route::post('/clear-logs', [App\Http\Controllers\Admin\SystemSettingsController::class, 'clearLogs'])->name('clear-logs');
            Route::get('/download-logs', [App\Http\Controllers\Admin\SystemSettingsController::class, 'downloadLogs'])->name('download-logs');
            Route::get('/health-check', [App\Http\Controllers\Admin\SystemSettingsController::class, 'healthCheck'])->name('health-check');
        });

        // Reports Routes
        Route::prefix('admin/reports')->name('admin.reports.')->group(function () {
            Route::get('/', [App\Http\Controllers\Admin\ReportsController::class, 'index'])->name('index');
            Route::get('/users', [App\Http\Controllers\Admin\ReportsController::class, 'userReport'])->name('users');
            Route::get('/courses', [App\Http\Controllers\Admin\ReportsController::class, 'courseReport'])->name('courses');
            Route::get('/assignments', [App\Http\Controllers\Admin\ReportsController::class, 'assignmentReport'])->name('assignments');
            Route::get('/export', [App\Http\Controllers\Admin\ReportsController::class, 'export'])->name('export');
        });
    });
});
