<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Subject;
use App\Models\ClassModel;
use App\Models\Course;

class AdminSystemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::firstOrCreate(
            ['email' => 'admin@bits-lms.com'],
            [
                'name' => 'System Administrator',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
                'is_active' => true,
            ]
        );

        // Create sample subjects
        $subjects = [
            ['name' => 'Mathematics', 'code' => 'MATH', 'description' => 'Mathematics and related topics'],
            ['name' => 'Science', 'code' => 'SCI', 'description' => 'General science subjects'],
            ['name' => 'English', 'code' => 'ENG', 'description' => 'English language and literature'],
            ['name' => 'History', 'code' => 'HIST', 'description' => 'History and social studies'],
            ['name' => 'Computer Science', 'code' => 'CS', 'description' => 'Computer science and programming'],
        ];

        foreach ($subjects as $subject) {
            Subject::firstOrCreate(
                ['code' => $subject['code']],
                $subject
            );
        }

        // Create sample classes
        $classes = [
            ['name' => 'Class X-01', 'grade_level' => 'X', 'capacity' => 30],
            ['name' => 'Class X-02', 'grade_level' => 'X', 'capacity' => 30],
            ['name' => 'Class XI-01', 'grade_level' => 'XI', 'capacity' => 25],
            ['name' => 'Class XI-02', 'grade_level' => 'XI', 'capacity' => 25],
            ['name' => 'Class XII-01', 'grade_level' => 'XII', 'capacity' => 20],
        ];

        foreach ($classes as $class) {
            ClassModel::firstOrCreate(
                ['name' => $class['name']],
                $class
            );
        }

        // Create sample teachers
        $teachers = [
            [
                'name' => 'Dr. John Smith',
                'email' => 'john.smith@bits-lms.com',
                'password' => Hash::make('teacher123'),
                'role' => 'teacher',
                'is_active' => true,
            ],
            [
                'name' => 'Prof. Sarah Johnson',
                'email' => 'sarah.johnson@bits-lms.com',
                'password' => Hash::make('teacher123'),
                'role' => 'teacher',
                'is_active' => true,
            ],
            [
                'name' => 'Dr. Michael Brown',
                'email' => 'michael.brown@bits-lms.com',
                'password' => Hash::make('teacher123'),
                'role' => 'teacher',
                'is_active' => true,
            ],
        ];

        foreach ($teachers as $teacher) {
            User::firstOrCreate(
                ['email' => $teacher['email']],
                $teacher
            );
        }

        // Create sample students
        $students = [
            [
                'name' => 'Alice Wilson',
                'email' => 'alice.wilson@student.bits-lms.com',
                'password' => Hash::make('student123'),
                'role' => 'student',
                'is_active' => true,
            ],
            [
                'name' => 'Bob Davis',
                'email' => 'bob.davis@student.bits-lms.com',
                'password' => Hash::make('student123'),
                'role' => 'student',
                'is_active' => true,
            ],
            [
                'name' => 'Carol Martinez',
                'email' => 'carol.martinez@student.bits-lms.com',
                'password' => Hash::make('student123'),
                'role' => 'student',
                'is_active' => true,
            ],
            [
                'name' => 'David Garcia',
                'email' => 'david.garcia@student.bits-lms.com',
                'password' => Hash::make('student123'),
                'role' => 'student',
                'is_active' => true,
            ],
            [
                'name' => 'Eva Rodriguez',
                'email' => 'eva.rodriguez@student.bits-lms.com',
                'password' => Hash::make('student123'),
                'role' => 'student',
                'is_active' => true,
            ],
        ];

        foreach ($students as $student) {
            User::firstOrCreate(
                ['email' => $student['email']],
                $student
            );
        }

        $this->command->info('Admin system seeded successfully!');
        $this->command->info('Admin credentials: admin@bits-lms.com / admin123');
        $this->command->info('Teacher credentials: john.smith@bits-lms.com / teacher123');
        $this->command->info('Student credentials: alice.wilson@student.bits-lms.com / student123');
    }
}
