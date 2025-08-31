<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Courses;
use App\Models\User;
use App\Models\Subject;
use App\Models\Semester;
use App\Models\ClassModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseManagementController extends Controller
{
    // Middleware is applied in routes/web.php instead of constructor in Laravel 11

    /**
     * Display a listing of courses
     */
    public function index(Request $request)
    {
        $query = Courses::with(['teacher', 'subject', 'semester', 'class']);

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter by teacher
        if ($request->filled('teacher_id')) {
            $query->where('teacher_id', $request->teacher_id);
        }

        // Filter by semester
        if ($request->filled('semester_id')) {
            $query->where('semester_id', $request->semester_id);
        }

        // Search by course name or code
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('course_code', 'like', '%' . $request->search . '%');
            });
        }

        $courses = $query->orderBy('created_at', 'desc')
                        ->paginate(15)
                        ->withQueryString();

        $stats = [
            'total' => Course::count(),
            'active' => Course::where('status', 'active')->count(),
            'completed' => Course::where('status', 'completed')->count(),
            'cancelled' => Course::where('status', 'cancelled')->count(),
        ];

        $teachers = User::where('role', 'teacher')->get(['id', 'name']);
        $semesters = Semester::all(['id', 'name']);

        return Inertia::render('admin/courses/index', [
            'courses' => $courses,
            'stats' => $stats,
            'teachers' => $teachers,
            'semesters' => $semesters,
            'filters' => $request->only(['status', 'teacher_id', 'semester_id', 'search']),
        ]);
    }

    /**
     * Show the form for creating a new course
     */
    public function create()
    {
        $teachers = User::where('role', 'teacher')->get(['id', 'name']);
        // $subjects = Subject::all(['id', 'name', 'code']);
        // $semesters = Semester::all(['id', 'name']);
        // $classes = ClassModel::all(['id', 'name']);

        return Inertia::render('admin/courses/create', [
            'teachers' => $teachers,
            // 'subjects' => $subjects,
            // 'semesters' => $semesters,
            // 'classes' => $classes,
        ]);
    }

    /**
     * Store a newly created course
     */
    public function store(Request $request)
    {
        $request->validate([
            'course_code' => 'required|string|max:20|unique:courses',
            'name' => 'required|string|max:255',
            'class_id' => 'required|exists:classes,id',
            'teacher_id' => 'required|exists:users,id',
            'subject_id' => 'required|exists:subjects,id',
            'semester_id' => 'required|exists:semesters,id',
            'description' => 'nullable|string',
            'credits' => 'required|integer|min:1|max:6',
            'max_students' => 'required|integer|min:1|max:100',
            'schedule' => 'required|array',
            'schedule.*.day' => 'required|string',
            'schedule.*.time' => 'required|string',
        ]);

        // Verify teacher role
        $teacher = User::find($request->teacher_id);
        if (!$teacher || $teacher->role !== 'teacher') {
            return redirect()->back()
                           ->withErrors(['teacher_id' => 'Selected user is not a teacher.']);
        }

        $course = Course::create([
            'course_code' => $request->course_code,
            'name' => $request->name,
            'class_id' => $request->class_id,
            'teacher_id' => $request->teacher_id,
            'subject_id' => $request->subject_id,
            'semester_id' => $request->semester_id,
            'description' => $request->description,
            'credits' => $request->credits,
            'max_students' => $request->max_students,
            'schedule' => json_encode($request->schedule),
            'status' => 'active',
        ]);

        return redirect()->route('admin.courses.index')
                        ->with('success', 'Course created successfully.');
    }

    /**
     * Display the specified course
     */
    public function show(Course $course)
    {
        $course->load(['teacher', 'subject', 'semester', 'class', 'enrollments.student']);

        $enrollmentStats = [
            'total_enrolled' => $course->enrollments->count(),
            'max_capacity' => $course->max_students,
            'available_spots' => $course->max_students - $course->enrollments->count(),
        ];

        return Inertia::render('admin/courses/show', [
            'course' => $course,
            'enrollmentStats' => $enrollmentStats,
        ]);
    }

    /**
     * Show the form for editing the specified course
     */
    public function edit(Course $course)
    {
        $teachers = User::where('role', 'teacher')->get(['id', 'name']);
        $subjects = Subject::all(['id', 'name', 'code']);
        $semesters = Semester::all(['id', 'name']);
        $classes = ClassModel::all(['id', 'name']);

        $course->schedule = json_decode($course->schedule, true);

        return Inertia::render('admin/courses/edit', [
            'course' => $course,
            'teachers' => $teachers,
            'subjects' => $subjects,
            'semesters' => $semesters,
            'classes' => $classes,
        ]);
    }

    /**
     * Update the specified course
     */
    public function update(Request $request, Course $course)
    {
        $request->validate([
            'course_code' => 'required|string|max:20|unique:courses,course_code,' . $course->id,
            'name' => 'required|string|max:255',
            'class_id' => 'required|exists:classes,id',
            'teacher_id' => 'required|exists:users,id',
            'subject_id' => 'required|exists:subjects,id',
            'semester_id' => 'required|exists:semesters,id',
            'description' => 'nullable|string',
            'credits' => 'required|integer|min:1|max:6',
            'max_students' => 'required|integer|min:1|max:100',
            'schedule' => 'required|array',
            'schedule.*.day' => 'required|string',
            'schedule.*.time' => 'required|string',
            'status' => 'required|in:active,completed,cancelled',
        ]);

        // Verify teacher role
        $teacher = User::find($request->teacher_id);
        if (!$teacher || $teacher->role !== 'teacher') {
            return redirect()->back()
                           ->withErrors(['teacher_id' => 'Selected user is not a teacher.']);
        }

        $course->update([
            'course_code' => $request->course_code,
            'name' => $request->name,
            'class_id' => $request->class_id,
            'teacher_id' => $request->teacher_id,
            'subject_id' => $request->subject_id,
            'semester_id' => $request->semester_id,
            'description' => $request->description,
            'credits' => $request->credits,
            'max_students' => $request->max_students,
            'schedule' => json_encode($request->schedule),
            'status' => $request->status,
        ]);

        return redirect()->route('admin.courses.index')
                        ->with('success', 'Course updated successfully.');
    }

    /**
     * Remove the specified course
     */
    public function destroy(Course $course)
    {
        // Check if course has enrollments
        if ($course->enrollments()->count() > 0) {
            return redirect()->back()
                           ->with('error', 'Cannot delete course with enrolled students.');
        }

        $course->delete();

        return redirect()->route('admin.courses.index')
                        ->with('success', 'Course deleted successfully.');
    }
}
