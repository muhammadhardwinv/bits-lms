<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Course;
use App\Models\Assignment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AdminController extends Controller
{
    // Middleware is applied in routes/web.php instead of constructor in Laravel 11

    /**
     * Display the admin dashboard
     */
    public function dashboard()
    {
        $stats = $this->getDashboardStats();
        $recentActivity = $this->getRecentActivity();
        $systemHealth = $this->getSystemHealth();

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recentActivity' => $recentActivity,
            'systemHealth' => $systemHealth,
        ]);
    }

    /**
     * Get dashboard statistics
     */
    private function getDashboardStats()
    {
        $totalUsers = User::count();
        $totalStudents = User::where('role', 'student')->count();
        $totalTeachers = User::where('role', 'teacher')->count();
        $totalAdmins = User::where('role', 'admin')->count();

        // Use existing schema - courses table doesn't have status column
        $totalCourses = Course::count();
        $activeUsers = User::where('status', 'active')->count();

        // Check if assignments table exists, if not use 0
        $totalAssignments = 0;
        try {
            $totalAssignments = DB::table('assignments')->count();
        } catch (\Exception $e) {
            // Assignments table might not exist yet
        }

        return [
            'users' => [
                'total' => $totalUsers,
                'students' => $totalStudents,
                'teachers' => $totalTeachers,
                'admins' => $totalAdmins,
                'active' => $activeUsers,
            ],
            'courses' => [
                'total' => $totalCourses,
            ],
            'assignments' => [
                'total' => $totalAssignments,
            ],
        ];
    }

    /**
     * Get recent system activity
     */
    private function getRecentActivity()
    {
        // Get recent users - your users table has these columns
        $recentUsers = User::orderBy('id', 'desc')->take(5)->get(['id', 'name', 'email', 'role']);

        // Get recent courses - your courses table has these columns
        $recentCourses = Course::orderBy('id', 'desc')->take(5)->get(['id', 'name', 'description', 'teacher_id']);

        return [
            'users' => $recentUsers,
            'courses' => $recentCourses,
        ];
    }

    /**
     * Get system health metrics
     */
    private function getSystemHealth()
    {
        $dbConnection = $this->checkDatabaseConnection();
        $storageSpace = $this->getStorageInfo();
        
        return [
            'database' => $dbConnection,
            'storage' => $storageSpace,
            'uptime' => '99.9%', // You can implement actual uptime tracking
        ];
    }

    /**
     * Check database connection
     */
    private function checkDatabaseConnection()
    {
        try {
            DB::connection()->getPdo();
            return ['status' => 'healthy', 'message' => 'Database connection is working'];
        } catch (\Exception $e) {
            return ['status' => 'error', 'message' => 'Database connection failed'];
        }
    }

    /**
     * Get storage information
     */
    private function getStorageInfo()
    {
        $storagePath = storage_path();
        $freeBytes = disk_free_space($storagePath);
        $totalBytes = disk_total_space($storagePath);
        
        return [
            'free' => $this->formatBytes($freeBytes),
            'total' => $this->formatBytes($totalBytes),
            'used_percentage' => round((($totalBytes - $freeBytes) / $totalBytes) * 100, 2),
        ];
    }

    /**
     * Format bytes to human readable format
     */
    private function formatBytes($bytes, $precision = 2)
    {
        $units = array('B', 'KB', 'MB', 'GB', 'TB');
        
        for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
            $bytes /= 1024;
        }
        
        return round($bytes, $precision) . ' ' . $units[$i];
    }
}
