<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Course\CourseController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\Assignments\AssignmentsController;
use App\Models\Course;

Route::get('/', fn() => Inertia::render('login'))->name('login');
Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');


// ----------------User-----------------//
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::get('/users', [UserController::class, 'showPeople']);
    Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('admin.users.edit');
    Route::put('/users/{id}', [UserController::class, 'update'])->name('admin.users.update');
    Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy');

    // ----------------Course-----------------//
    Route::get('/courses/create', [CourseController::class, 'create'])->name('courses.create');
    Route::post('/courses/create', [CourseController::class, 'store'])->name('courses.store');
    Route::get('/courses/{id}/edit', [CourseController::class, 'edit'])->name('course.edit');
    Route::put('/courses/{id}', [CourseController::class, 'update'])->name('course.update');
    Route::delete('/courses/{id}', [CourseController::class, 'destroy'])->name('courses.destroy');

    // ----------------Assignments-----------------//
    Route::get('/assignments/new', [AssignmentsController::class, 'create'])->name('assignments.create');
    Route::post('/assignments', [AssignmentsController::class, 'store'])->name('assignments.store');
});

Route::prefix('teacher')->name('teacher.')->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('teacher/dashboard'))->name('dashboard');
    Route::get('/courses/create', [CourseController::class, 'create'])->name('courses.create');
});

Route::prefix('student')->name('student.')->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('student/dashboard'))->name('dashboard');
});

Route::get('/courses', fn() => Inertia::render('courses', [
    'auth' => ['user' => Auth::user()],
    'allCourse' => app(CourseController::class)->fetch(),
]))->name('courses');

Route::get('/assignments', [AssignmentsController::class, 'show'])->name('assignments');

Route::get('/courses/{id}', [CourseController::class, 'show'])->name('courses.show');

Route::get('/events', fn() => Inertia::render('events'))->name('events');
Route::get('/lecturer-dashboard', fn() => Inertia::render('lecturerdashboard'))->name('lecturerdashboard');

Route::get('/gradebook', fn() => Inertia::render('gradebook'))->name('gradebook.index');
Route::get('/gradebook/{courseId}', fn($courseId) => Inertia::render('course-grade', ['courseId' => $courseId]))->name('gradebook.show');

Route::get('/selected-course/{courseId}', function ($courseId) {
    $course = \App\Models\Course::findOrFail($courseId);
    return Inertia::render('selected-Course', [
        'auth' => ['user' => \Illuminate\Support\Facades\Auth::user()],
        'courseId' => $course->id,
        'course' => $course,
    ]);
})->name('course.selected');

Route::get('/forum/{courseId}', fn($courseId) => Inertia::render('Forum', [
    'auth' => ['user' => Auth::user()],
    'courseId' => $courseId,
]))->name('forum.show');

Route::get('/discussion/{courseId}', fn($courseId) => Inertia::render('discussion', [
    'user' => ['user' => Auth::user()],
    'courseId' => $courseId,
]))->name('discussion');

Route::get('/attendance/{courseId}', [AttendanceController::class, 'index'])->name('attendance.index');


// ✅ Route to show assignments by courseId
Route::get('/assignments/{courseId}', fn($courseId) => Inertia::render('per-assignments', [
    'auth' => ['user' => Auth::user()],
    'courseId' => $courseId,
]))->name('assignments.view');

Route::get('/assignments/new/{courseId}', [AssignmentsController::class, 'create'])
    ->name('assignment.new')
    ->middleware(['auth']);

Route::prefix('assignments')->group(function () {
    Route::get('/{course}/{courseId}/slideshow', fn($course, $courseId) => Inertia::render('assignmentPage/assignmentSlideshow', [
        'course' => $course,
        'courseId' => $courseId,
    ]))->name('assignments.slideshow');

    Route::get('/{course}/{courseId}', fn($course, $courseId) => Inertia::render('per-assignments', [
        'course' => $course,
        'courseId' => $courseId,
    ]))->name('assignments.show');
});

Route::prefix('courses')->group(function () {
    Route::get('/{course}/slideshow', fn($course) => Inertia::render('slideshow', [
        'auth' => ['user' => Auth::user()],
        'course' => $course,
    ]))->name('courses.slideshow');
});

Route::get('/{courseId}/quiz', fn($courseId) => Inertia::render('courseQuiz', [
    'courseId' => $courseId,
]))->name('course.quiz');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('dashboard'))->name('dashboard');

    Route::middleware(['role:student'])->group(function () {
        Route::get('/student/dashboard', fn() => Inertia::render('student/dashboard'))->name('student.dashboard');
    });

    Route::middleware(['role:teacher'])->group(function () {
        Route::get('/teacher/dashboard', fn() => Inertia::render('teacher/dashboard'))->name('teacher.dashboard');
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

        // Materials Management Routes
        Route::prefix('admin/materials')->name('admin.materials.')->group(function () {
            Route::get('/', [App\Http\Controllers\Admin\MaterialsController::class, 'index'])->name('index');
            Route::get('/create', [App\Http\Controllers\Admin\MaterialsController::class, 'create'])->name('create');
            Route::post('/', [App\Http\Controllers\Admin\MaterialsController::class, 'store'])->name('store');
            Route::get('/{material}', [App\Http\Controllers\Admin\MaterialsController::class, 'show'])->name('show');
            Route::get('/{material}/edit', [App\Http\Controllers\Admin\MaterialsController::class, 'edit'])->name('edit');
            Route::put('/{material}', [App\Http\Controllers\Admin\MaterialsController::class, 'update'])->name('update');
            Route::delete('/{material}', [App\Http\Controllers\Admin\MaterialsController::class, 'destroy'])->name('destroy');
        });

        // Legacy route for add materials page
        Route::get('/admin/add/materials', [App\Http\Controllers\Admin\MaterialsController::class, 'create'])->name('admin.add.materials');

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
