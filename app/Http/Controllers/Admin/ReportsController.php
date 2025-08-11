<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Course;
use App\Models\Assignment;
use App\Models\CourseEnrollment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ReportsController extends Controller
{
    // Middleware is applied in routes/web.php instead of constructor in Laravel 11

    /**
     * Display reports dashboard
     */
    public function index()
    {
        $reports = [
            'user_statistics' => $this->getUserStatistics(),
            'course_statistics' => $this->getCourseStatistics(),
            'enrollment_trends' => $this->getEnrollmentTrends(),
            'assignment_statistics' => $this->getAssignmentStatistics(),
        ];

        return Inertia::render('admin/reports/index', [
            'reports' => $reports,
        ]);
    }

    /**
     * Generate user statistics report
     */
    public function userReport(Request $request)
    {
        $period = $request->get('period', '30'); // days
        $startDate = Carbon::now()->subDays($period);

        $userStats = [
            'total_users' => User::count(),
            'new_users' => User::where('created_at', '>=', $startDate)->count(),
            'active_users' => User::where('is_active', true)->count(),
            'users_by_role' => User::select('role', DB::raw('count(*) as count'))
                                  ->groupBy('role')
                                  ->get(),
            'registration_trend' => User::select(
                                        DB::raw('DATE(created_at) as date'),
                                        DB::raw('count(*) as count')
                                    )
                                    ->where('created_at', '>=', $startDate)
                                    ->groupBy('date')
                                    ->orderBy('date')
                                    ->get(),
        ];

        return Inertia::render('admin/reports/users', [
            'userStats' => $userStats,
            'period' => $period,
        ]);
    }

    /**
     * Generate course statistics report
     */
    public function courseReport(Request $request)
    {
        $courseStats = [
            'total_courses' => Course::count(),
            'active_courses' => Course::where('status', 'active')->count(),
            'completed_courses' => Course::where('status', 'completed')->count(),
            'courses_by_status' => Course::select('status', DB::raw('count(*) as count'))
                                         ->groupBy('status')
                                         ->get(),
            'enrollment_stats' => Course::with('enrollments')
                                        ->get()
                                        ->map(function ($course) {
                                            return [
                                                'course_name' => $course->name,
                                                'course_code' => $course->course_code,
                                                'max_students' => $course->max_students,
                                                'enrolled_students' => $course->enrollments->count(),
                                                'enrollment_rate' => $course->max_students > 0 
                                                    ? round(($course->enrollments->count() / $course->max_students) * 100, 2)
                                                    : 0,
                                            ];
                                        }),
        ];

        return Inertia::render('admin/reports/courses', [
            'courseStats' => $courseStats,
        ]);
    }

    /**
     * Generate assignment statistics report
     */
    public function assignmentReport(Request $request)
    {
        $assignmentStats = [
            'total_assignments' => Assignment::count(),
            'overdue_assignments' => Assignment::where('due_date', '<', now())->count(),
            'upcoming_assignments' => Assignment::where('due_date', '>', now())
                                               ->where('due_date', '<=', now()->addDays(7))
                                               ->count(),
            'assignments_by_type' => Assignment::select('type', DB::raw('count(*) as count'))
                                              ->groupBy('type')
                                              ->get(),
            'submission_rates' => Assignment::with(['course', 'submissions'])
                                           ->get()
                                           ->map(function ($assignment) {
                                               $totalStudents = $assignment->course->enrollments->count();
                                               $submissions = $assignment->submissions->count();
                                               
                                               return [
                                                   'assignment_title' => $assignment->title,
                                                   'course_name' => $assignment->course->name,
                                                   'total_students' => $totalStudents,
                                                   'submissions' => $submissions,
                                                   'submission_rate' => $totalStudents > 0 
                                                       ? round(($submissions / $totalStudents) * 100, 2)
                                                       : 0,
                                                   'due_date' => $assignment->due_date,
                                               ];
                                           }),
        ];

        return Inertia::render('admin/reports/assignments', [
            'assignmentStats' => $assignmentStats,
        ]);
    }

    /**
     * Export report data
     */
    public function export(Request $request)
    {
        $type = $request->get('type');
        $format = $request->get('format', 'csv');

        switch ($type) {
            case 'users':
                return $this->exportUsers($format);
            case 'courses':
                return $this->exportCourses($format);
            case 'assignments':
                return $this->exportAssignments($format);
            default:
                return redirect()->back()->with('error', 'Invalid report type');
        }
    }

    private function getUserStatistics()
    {
        return [
            'total' => User::count(),
            'students' => User::where('role', 'student')->count(),
            'teachers' => User::where('role', 'teacher')->count(),
            'admins' => User::where('role', 'admin')->count(),
            'active' => User::where('is_active', true)->count(),
        ];
    }

    private function getCourseStatistics()
    {
        return [
            'total' => Course::count(),
            'active' => Course::where('status', 'active')->count(),
            'completed' => Course::where('status', 'completed')->count(),
            'cancelled' => Course::where('status', 'cancelled')->count(),
        ];
    }

    private function getEnrollmentTrends()
    {
        return CourseEnrollment::select(
                    DB::raw('DATE(enrolled_at) as date'),
                    DB::raw('count(*) as count')
                )
                ->where('enrolled_at', '>=', Carbon::now()->subDays(30))
                ->groupBy('date')
                ->orderBy('date')
                ->get();
    }

    private function getAssignmentStatistics()
    {
        return [
            'total' => Assignment::count(),
            'overdue' => Assignment::where('due_date', '<', now())->count(),
            'due_soon' => Assignment::where('due_date', '>', now())
                                   ->where('due_date', '<=', now()->addDays(7))
                                   ->count(),
        ];
    }

    private function exportUsers($format)
    {
        $users = User::all();
        
        if ($format === 'csv') {
            $filename = 'users_report_' . date('Y-m-d') . '.csv';
            
            $headers = [
                'Content-Type' => 'text/csv',
                'Content-Disposition' => 'attachment; filename="' . $filename . '"',
            ];

            $callback = function() use ($users) {
                $file = fopen('php://output', 'w');
                fputcsv($file, ['ID', 'Name', 'Email', 'Role', 'Status', 'Created At']);
                
                foreach ($users as $user) {
                    fputcsv($file, [
                        $user->id,
                        $user->name,
                        $user->email,
                        $user->role,
                        $user->is_active ? 'Active' : 'Inactive',
                        $user->created_at->format('Y-m-d H:i:s'),
                    ]);
                }
                
                fclose($file);
            };

            return response()->stream($callback, 200, $headers);
        }

        return redirect()->back()->with('error', 'Unsupported export format');
    }

    private function exportCourses($format)
    {
        $courses = Course::with(['teacher', 'subject'])->get();
        
        if ($format === 'csv') {
            $filename = 'courses_report_' . date('Y-m-d') . '.csv';
            
            $headers = [
                'Content-Type' => 'text/csv',
                'Content-Disposition' => 'attachment; filename="' . $filename . '"',
            ];

            $callback = function() use ($courses) {
                $file = fopen('php://output', 'w');
                fputcsv($file, ['Course Code', 'Name', 'Teacher', 'Subject', 'Status', 'Max Students', 'Created At']);
                
                foreach ($courses as $course) {
                    fputcsv($file, [
                        $course->course_code,
                        $course->name,
                        $course->teacher->name ?? 'N/A',
                        $course->subject->name ?? 'N/A',
                        $course->status,
                        $course->max_students,
                        $course->created_at->format('Y-m-d H:i:s'),
                    ]);
                }
                
                fclose($file);
            };

            return response()->stream($callback, 200, $headers);
        }

        return redirect()->back()->with('error', 'Unsupported export format');
    }

    private function exportAssignments($format)
    {
        $assignments = Assignment::with('course')->get();
        
        if ($format === 'csv') {
            $filename = 'assignments_report_' . date('Y-m-d') . '.csv';
            
            $headers = [
                'Content-Type' => 'text/csv',
                'Content-Disposition' => 'attachment; filename="' . $filename . '"',
            ];

            $callback = function() use ($assignments) {
                $file = fopen('php://output', 'w');
                fputcsv($file, ['Title', 'Course', 'Type', 'Due Date', 'Max Points', 'Created At']);
                
                foreach ($assignments as $assignment) {
                    fputcsv($file, [
                        $assignment->title,
                        $assignment->course->name ?? 'N/A',
                        $assignment->type,
                        $assignment->due_date->format('Y-m-d H:i:s'),
                        $assignment->max_points,
                        $assignment->created_at->format('Y-m-d H:i:s'),
                    ]);
                }
                
                fclose($file);
            };

            return response()->stream($callback, 200, $headers);
        }

        return redirect()->back()->with('error', 'Unsupported export format');
    }
}
