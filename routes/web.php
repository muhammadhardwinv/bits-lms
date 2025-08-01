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
        Route::get('/admin/dashboard', fn() => Inertia::render('admin/dashboard'))->name('admin.dashboard');
    });
});
