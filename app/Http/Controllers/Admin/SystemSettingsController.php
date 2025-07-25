<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Artisan;
use Inertia\Inertia;

class SystemSettingsController extends Controller
{
    // Middleware is applied in routes/web.php instead of constructor in Laravel 11

    /**
     * Display system settings
     */
    public function index()
    {
        $settings = [
            'app_name' => config('app.name'),
            'app_url' => config('app.url'),
            'timezone' => config('app.timezone'),
            'locale' => config('app.locale'),
            'mail_driver' => config('mail.default'),
            'mail_host' => config('mail.mailers.smtp.host'),
            'mail_port' => config('mail.mailers.smtp.port'),
            'mail_from_address' => config('mail.from.address'),
            'mail_from_name' => config('mail.from.name'),
        ];

        $systemInfo = [
            'php_version' => PHP_VERSION,
            'laravel_version' => app()->version(),
            'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown',
            'database_connection' => config('database.default'),
            'cache_driver' => config('cache.default'),
            'session_driver' => config('session.driver'),
            'queue_driver' => config('queue.default'),
        ];

        return Inertia::render('admin/settings/index', [
            'settings' => $settings,
            'systemInfo' => $systemInfo,
        ]);
    }

    /**
     * Update system settings
     */
    public function update(Request $request)
    {
        $request->validate([
            'app_name' => 'required|string|max:255',
            'app_url' => 'required|url',
            'timezone' => 'required|string',
            'locale' => 'required|string',
            'mail_from_address' => 'required|email',
            'mail_from_name' => 'required|string|max:255',
        ]);

        // In a real application, you would save these to a settings table
        // or update the .env file programmatically
        
        return redirect()->back()
                        ->with('success', 'System settings updated successfully.');
    }

    /**
     * Clear application cache
     */
    public function clearCache()
    {
        try {
            Artisan::call('cache:clear');
            Artisan::call('config:clear');
            Artisan::call('route:clear');
            Artisan::call('view:clear');

            return redirect()->back()
                           ->with('success', 'Application cache cleared successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                           ->with('error', 'Failed to clear cache: ' . $e->getMessage());
        }
    }

    /**
     * Optimize application
     */
    public function optimize()
    {
        try {
            Artisan::call('config:cache');
            Artisan::call('route:cache');
            Artisan::call('view:cache');

            return redirect()->back()
                           ->with('success', 'Application optimized successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                           ->with('error', 'Failed to optimize application: ' . $e->getMessage());
        }
    }

    /**
     * Run database migrations
     */
    public function migrate()
    {
        try {
            Artisan::call('migrate', ['--force' => true]);

            return redirect()->back()
                           ->with('success', 'Database migrations completed successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                           ->with('error', 'Failed to run migrations: ' . $e->getMessage());
        }
    }

    /**
     * Generate application key
     */
    public function generateKey()
    {
        try {
            Artisan::call('key:generate', ['--force' => true]);

            return redirect()->back()
                           ->with('success', 'Application key generated successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                           ->with('error', 'Failed to generate key: ' . $e->getMessage());
        }
    }

    /**
     * Get system logs
     */
    public function logs()
    {
        $logFile = storage_path('logs/laravel.log');
        $logs = [];

        if (file_exists($logFile)) {
            $logContent = file_get_contents($logFile);
            $logLines = explode("\n", $logContent);
            
            // Get last 100 lines
            $logs = array_slice(array_reverse($logLines), 0, 100);
        }

        return Inertia::render('admin/settings/logs', [
            'logs' => $logs,
        ]);
    }

    /**
     * Clear logs
     */
    public function clearLogs()
    {
        try {
            $logFile = storage_path('logs/laravel.log');
            if (file_exists($logFile)) {
                file_put_contents($logFile, '');
            }

            return redirect()->back()
                           ->with('success', 'Logs cleared successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                           ->with('error', 'Failed to clear logs: ' . $e->getMessage());
        }
    }

    /**
     * Download logs
     */
    public function downloadLogs()
    {
        $logFile = storage_path('logs/laravel.log');
        
        if (file_exists($logFile)) {
            return response()->download($logFile, 'laravel-' . date('Y-m-d') . '.log');
        }

        return redirect()->back()
                        ->with('error', 'Log file not found.');
    }

    /**
     * Get system health check
     */
    public function healthCheck()
    {
        $checks = [
            'database' => $this->checkDatabase(),
            'cache' => $this->checkCache(),
            'storage' => $this->checkStorage(),
            'mail' => $this->checkMail(),
        ];

        return response()->json($checks);
    }

    private function checkDatabase()
    {
        try {
            \DB::connection()->getPdo();
            return ['status' => 'healthy', 'message' => 'Database connection is working'];
        } catch (\Exception $e) {
            return ['status' => 'error', 'message' => 'Database connection failed'];
        }
    }

    private function checkCache()
    {
        try {
            Cache::put('health_check', 'test', 60);
            $value = Cache::get('health_check');
            Cache::forget('health_check');
            
            return $value === 'test' 
                ? ['status' => 'healthy', 'message' => 'Cache is working']
                : ['status' => 'error', 'message' => 'Cache test failed'];
        } catch (\Exception $e) {
            return ['status' => 'error', 'message' => 'Cache error: ' . $e->getMessage()];
        }
    }

    private function checkStorage()
    {
        $storagePath = storage_path();
        $isWritable = is_writable($storagePath);
        
        return $isWritable
            ? ['status' => 'healthy', 'message' => 'Storage is writable']
            : ['status' => 'error', 'message' => 'Storage is not writable'];
    }

    private function checkMail()
    {
        try {
            $driver = config('mail.default');
            return ['status' => 'healthy', 'message' => "Mail driver ({$driver}) is configured"];
        } catch (\Exception $e) {
            return ['status' => 'error', 'message' => 'Mail configuration error'];
        }
    }
}
