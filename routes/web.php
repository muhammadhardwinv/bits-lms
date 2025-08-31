<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Course\CourseController;
use App\Http\Controllers\Assignments\AssignmentController;
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
    Route::get('/classroom/create', [ClassroomController::class, 'create'])->middleware('role:admin,teacher')->name('classroom.create');
    Route::delete('/classrooms/{id}', [ClassroomController::class, 'destroy'])
    ->name('admin.classrooms.destroy');
    Route::resource('classrooms', ClassroomController::class)
        ->names('admin.classroom');


    // Route::get('/classrooms/{id}', [ClassroomController::class, 'show'])->name('admin.classrooms.show');

    // Route::post('/classroom', [ClassroomController::class, 'store'])->name('classroom.store');
    Route::get('/classrooms/{id}/edit', [ClassroomController::class, 'edit'])->name('admin.classrooms.edit');
    Route::put('/classrooms/{id}', [ClassroomController::class, 'update'])->name('admin.classrooms.update');
    // Route::get('/classrooms/{id}', [ClassroomController::class, 'show'])
    // ->name('admin.classrooms.show');
    Route::get('/classroom/{id}', [ClassroomController::class, 'show'])->name('admin.classroom.show');



    // Courses
    Route::get('/courses/create', [CourseController::class, 'create'])->name('courses.create');
    Route::post('/courses', [CourseController::class, 'store'])->name('courses.store');
    Route::put('/courses/{id}', [CourseController::class, 'update'])->name('courses.update');
    Route::delete('/courses/{id}', [CourseController::class, 'destroy'])->name('courses.destroy');
});

Route::middleware(['auth', 'role:admin,teacher'])->group(function () {
    Route::get('/course/{courseId}/create', [SessionsController::class, 'create'])->name('sessions.create');
    Route::post('/course/{courseId}/sessions', [SessionsController::class, 'store'])->name('sessions.store');
});


Route::middleware(['auth'])->group(function () {
    Route::get('/classroom', [ClassroomController::class, 'show'])->name('classroom.show');
});


// ---------- Teacher ----------
Route::prefix('teacher')->name('teacher.')->middleware(['auth', 'role:teacher'])->group(function () {

Route::get('/dashboard', [CourseController::class, 'fetchTeacherCourses'])->name('dashboard');
    Route::get('/courses/create', [CourseController::class, 'create'])->name('courses.create');
    Route::get('/assignments', [AssignmentController::class, 'show'])->name('assignments.index');
    Route::get('/assignments/{id}/edit', [AssignmentController::class, 'edit'])->name('assignments.edit');
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
    // Route::middleware('role:teacher')->get('/teacher/dashboard', fn() => Inertia::render('teacher/dashboard'))->name('teacher.dashboard');
    Route::middleware('role:admin')->get('/admin/dashboard', fn() => Inertia::render('admin/dashboard'))->name('admin.dashboard');

    // Courses
    Route::get('/courses', [CourseController::class, 'fetch'])->name('courses.index');
    Route::get('/courses/{id}', [CourseController::class, 'show'])->name('courses.show');
    Route::get('/courses/{id}/edit', [CourseController::class, 'edit'])->middleware('role:admin,teacher')->name('courses.edit');
    Route::post('/courses', [CourseController::class, 'store'])->middleware('role:admin,teacher')->name('courses.store');
    Route::put('/courses/{id}', [CourseController::class, 'update'])->middleware('role:admin,teacher')->name('courses.update');
    Route::delete('/courses/{id}', [CourseController::class, 'destroy'])->middleware('role:admin,teacher')->name('courses.destroy');

    // Assignments
    Route::get('/assignments', [AssignmentController::class, 'show'])->name('assignments.index');
    Route::get('/assignments/{courseId}', fn($courseId) => Inertia::render('per-assignments', [
        'auth' => ['user' => Auth::user()],
        'courseId' => $courseId,
    ]))->name('assignments.view');
    Route::get('/assignments/new/{courseId}', [AssignmentController::class, 'create'])->name('assignments.create');
    Route::post('/assignments', [AssignmentController::class, 'store'])->name('assignments.store');
    // Route::post('/assignments', [AssignmentController::class, 'store'])->name('assignments.store');

    Route::get('/assignments/{id}/edit', [AssignmentController::class, 'edit'])->name('assignments.edit');
    Route::put('/assignments/{id}', [AssignmentController::class, 'update'])->name('assignments.update');

    // Sessions
    Route::middleware('role:admin,teacher')->group(function () {
        Route::post('/sessions', [SessionsController::class, 'store'])->name('sessions.store');

        // Classroom-specific sessions
        Route::get('/classroom/{id}/sessions/create', [SessionsController::class, 'create'])->name('sessions.create');
        Route::post('/classroom/{id}/sessions', [SessionsController::class, 'store'])->name('sessions.store');

        // Session management
        Route::delete('/sessions/{id}', [SessionsController::class, 'destroy'])->name('sessions.destroy');
        Route::get('/sessions/{id}/edit', [SessionsController::class, 'edit'])->name('sessions.edit');
        Route::post('/sessions/{id}', [SessionsController::class, 'store'])->name('sessions.store');

        Route::put('/sessions/{id}', [SessionsController::class, 'update'])->name('sessions.update');
        Route::get('/sessions/{id}/show', [SessionsController::class, 'show'])->name('sessions.show');

        Route::get('/classroom/{id}', [ClassroomController::class, 'show'])->name('classroom.show');
    });

    // Session Fallbacks
    Route::get('/sessions/{id}', [CourseController::class, 'show'])->name('sessions.fallback');
    Route::get('/sessions/{courseId}/session-1', fn($courseId) => Redirect::to("/sessions/{$courseId}"));

    // Classroom (singular/public-facing)
    Route::get('/classroom', [ClassroomController::class, 'index'])->name('classrooms.index');

    Route::post('/admin/classrooms', [ClassroomController::class, 'store'])->middleware('role:admin,teacher')->name('admin.classrooms.store');




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
    Route::get('/discussion', fn($courseId) => Inertia::render('discussion', [
        'user' => ['user' => Auth::user()],
        'courseId' => $courseId,
    ]))->name('discussion');
});

// ---------- Assignment Slideshow ----------
Route::prefix('assignments')->middleware('auth')->group(function () {
    Route::get('/{course}/{courseId}/slideshow', function($course, $courseId) {
        $classroom = Classes::findOrFail($courseId);

        return Inertia::render('assignmentPage/assignmentSlideshow', [
            'course' => $course,
            'courseId' => $courseId,
            'classroom'=> $classes,
        ]);
    })->name('assignments.slideshow');
});

Route::get('/courses/{id}/slideshow', [ClassroomController::class, 'slideshow'])
    ->name('courses.slideshow');
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
]))->name('course.quiz');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('dashboard'))->name('dashboard');

    Route::middleware(['role:student'])->group(function () {
        Route::get('/student/dashboard', fn() => Inertia::render('student/dashboard'))->name('student.dashboard');
    });

    // Route::middleware(['role:teacher'])->group(function () {
    //     Route::get('/teacher/dashboard', fn() => Inertia::render('teacher/dashboard'))->name('teacher.dashboard');
    // });

    Route::middleware(['role:admin'])->group(function () {
        Route::get('/admin/dashboard', [App\Http\Controllers\Admin\AdminController::class, 'dashboard'])->name('admin.dashboard');

        // User Management Routes
        // Route::prefix('admin/users')->name('admin.users.')->group(function () {
        //     Route::get('/', [App\Http\Controllers\Admin\UserManagementController::class, 'index'])->name('index');
        //     Route::get('/create', [App\Http\Controllers\Admin\UserManagementController::class, 'create'])->name('create');
        //     Route::post('/', [App\Http\Controllers\Admin\UserManagementController::class, 'store'])->name('store');
        //     Route::get('/{user}', [App\Http\Controllers\Admin\UserManagementController::class, 'show'])->name('show');
        //     Route::get('/{user}/edit', [App\Http\Controllers\Admin\UserManagementController::class, 'edit'])->name('edit');
        //     Route::put('/{user}', [App\Http\Controllers\Admin\UserManagementController::class, 'update'])->name('update');
        //     Route::delete('/{user}', [App\Http\Controllers\Admin\UserManagementController::class, 'destroy'])->name('destroy');
        //     Route::patch('/{user}/toggle-status', [App\Http\Controllers\Admin\UserManagementController::class, 'toggleStatus'])->name('toggle-status');
        //     Route::post('/bulk-action', [App\Http\Controllers\Admin\UserManagementController::class, 'bulkAction'])->name('bulk-action');

        //     // AJAX endpoints for ID generation
        //     Route::post('/get-next-id', [App\Http\Controllers\Admin\UserManagementController::class, 'getNextId'])->name('get-next-id');
        //     Route::get('/role-statistics', [App\Http\Controllers\Admin\UserManagementController::class, 'getRoleStatistics'])->name('role-statistics');
        // });

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
        // Route::prefix('admin/courses')->name('admin.courses.')->group(function () {
        //     Route::get('/', [App\Http\Controllers\Admin\CourseManagementController::class, 'index'])->name('index');
        //     Route::get('/create', [App\Http\Controllers\Admin\CourseManagementController::class, 'create'])->name('create');
        //     Route::post('/', [App\Http\Controllers\Admin\CourseManagementController::class, 'store'])->name('store');
        //     Route::get('/{course}', [App\Http\Controllers\Admin\CourseManagementController::class, 'show'])->name('show');
        //     Route::get('/{course}/edit', [App\Http\Controllers\Admin\CourseManagementController::class, 'edit'])->name('edit');
        //     Route::put('/{course}', [App\Http\Controllers\Admin\CourseManagementController::class, 'update'])->name('update');
        //     Route::delete('/{course}', [App\Http\Controllers\Admin\CourseManagementController::class, 'destroy'])->name('destroy');
        // });

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
