<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class CreateTestUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:create-test {email} {password} {--role=student : User role (student, teacher, admin)} {--name= : User name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a test user with specified credentials';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');
        $password = $this->argument('password');
        $role = $this->option('role');
        $name = $this->option('name') ?: 'Test User';

        // Check if user already exists
        if (User::where('email', $email)->exists()) {
            $this->error("User with email {$email} already exists!");
            return 1;
        }

        // Validate role
        if (!in_array($role, ['student', 'teacher', 'admin'])) {
            $this->error("Invalid role. Must be one of: student, teacher, admin");
            return 1;
        }

        // Create user
        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => $password, // This will be hashed by the mutator
            'role' => $role,
        ]);

        $this->info("✅ Test user created successfully!");
        $this->line("📧 Email: {$user->email}");
        $this->line("🔑 Password: {$password}");
        $this->line("👤 Role: {$user->role}");
        $this->line("📛 Name: {$user->name}");
        
        $this->newLine();
        $this->info("🚀 You can now login at: http://127.0.0.1:8000/login");

        return 0;
    }
}
