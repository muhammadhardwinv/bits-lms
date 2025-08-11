<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Subject;
use App\Models\Material;
use App\Services\UserIdGeneratorService;

class AdminSystemSeeder extends Seeder
{
    private $userIdGenerator;

    public function __construct()
    {
        $this->userIdGenerator = new UserIdGeneratorService();
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('🚀 Starting comprehensive LMS data seeding...');

        // Seed in order of dependencies
        $this->seedSchoolYears();
        $this->seedSemesters();
        $this->seedSubjects();
        $this->seedClasses();
        $this->seedUsers();
        $this->seedCourses();
        $this->seedMaterials();

        $this->command->info('✅ LMS data seeding completed successfully!');
        $this->displayCredentials();
    }

    /**
     * Seed school years data
     */
    private function seedSchoolYears(): void
    {
        $this->command->info('📅 Seeding school years...');

        // First, ensure no current year exists
        DB::table('school_years')->update(['is_current' => false]);

        $schoolYears = [];
        for ($year = 1995; $year <= 2025; $year++) {
            $schoolYears[] = [
                'id' => "SY-{$year}",
                'year' => "{$year}/" . ($year + 1),
                'is_current' => false, // Set all to false initially
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        foreach ($schoolYears as $schoolYear) {
            DB::table('school_years')->updateOrInsert(
                ['id' => $schoolYear['id']],
                $schoolYear
            );
        }

        // Now set only 2025 as current
        DB::table('school_years')
            ->where('id', 'SY-2025')
            ->update(['is_current' => true]);

        $this->command->info("   ✓ Created " . count($schoolYears) . " school years");
    }

    /**
     * Seed semesters data
     */
    private function seedSemesters(): void
    {
        $this->command->info('📚 Seeding semesters...');

        $semesters = [];
        for ($i = 1; $i <= 30; $i++) {
            $schoolYearId = "SY-" . (2025 - (($i - 1) % 5)); // Cycle through recent years
            $semesters[] = [
                'id' => $i,
                'name' => "Semester {$i}",
                'start_date' => '2025-01-01',
                'end_date' => '2025-06-30',
                'school_year_id' => $schoolYearId,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        foreach ($semesters as $semester) {
            DB::table('semesters')->updateOrInsert(
                ['id' => $semester['id']],
                $semester
            );
        }

        $this->command->info("   ✓ Created " . count($semesters) . " semesters");
    }

    /**
     * Seed subjects data
     */
    private function seedSubjects(): void
    {
        $this->command->info('📖 Seeding subjects...');

        $subjects = [
            ['name' => 'Mathematics', 'code' => 'MATH', 'description' => 'Mathematics and related topics'],
            ['name' => 'Science', 'code' => 'SCI', 'description' => 'General science subjects'],
            ['name' => 'English', 'code' => 'ENG', 'description' => 'English language and literature'],
            ['name' => 'History', 'code' => 'HIST', 'description' => 'History and social studies'],
            ['name' => 'Computer Science', 'code' => 'CS', 'description' => 'Computer science and programming'],
            ['name' => 'Physics', 'code' => 'PHY', 'description' => 'Physics and physical sciences'],
            ['name' => 'Chemistry', 'code' => 'CHEM', 'description' => 'Chemistry and chemical sciences'],
            ['name' => 'Biology', 'code' => 'BIO', 'description' => 'Biology and life sciences'],
            ['name' => 'Geography', 'code' => 'GEO', 'description' => 'Geography and earth sciences'],
            ['name' => 'Art', 'code' => 'ART', 'description' => 'Visual and performing arts'],
        ];

        foreach ($subjects as $subject) {
            Subject::firstOrCreate(
                ['code' => $subject['code']],
                $subject
            );
        }

        $this->command->info("   ✓ Created " . count($subjects) . " subjects");
    }

    /**
     * Seed classes data
     */
    private function seedClasses(): void
    {
        $this->command->info('🏫 Seeding classes...');

        $classes = [
            ['name' => 'Class X-01', 'grade_level' => 'X', 'capacity' => 30],
            ['name' => 'Class X-02', 'grade_level' => 'X', 'capacity' => 30],
            ['name' => 'Class X-03', 'grade_level' => 'X', 'capacity' => 30],
            ['name' => 'Class XI-01', 'grade_level' => 'XI', 'capacity' => 25],
            ['name' => 'Class XI-02', 'grade_level' => 'XI', 'capacity' => 25],
            ['name' => 'Class XII-01', 'grade_level' => 'XII', 'capacity' => 20],
            ['name' => 'Class XII-02', 'grade_level' => 'XII', 'capacity' => 20],
        ];

        foreach ($classes as $class) {
            DB::table('classes')->updateOrInsert(
                ['name' => $class['name']],
                array_merge($class, [
                    'created_at' => now(),
                    'updated_at' => now(),
                ])
            );
        }

        $this->command->info("   ✓ Created " . count($classes) . " classes");
    }

    /**
     * Seed users data (admins, teachers, students)
     */
    private function seedUsers(): void
    {
        $this->command->info('👥 Seeding users...');

        // Create admin users
        $admins = [
            [
                'name' => 'Dr. Sarah Wilson',
                'email' => 'admin@bits-lms.edu',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'status' => 'active',
            ],
            [
                'name' => 'Prof. Michael Chen',
                'email' => 'admin2@bits-lms.edu',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'status' => 'active',
            ],
        ];

        foreach ($admins as $admin) {
            $adminId = $this->userIdGenerator->generateNextIdSafe('admin');
            User::firstOrCreate(
                ['email' => $admin['email']],
                array_merge($admin, [
                    'id' => $adminId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ])
            );
        }

        // Create teacher users
        $teachers = [
            [
                'name' => 'Dr. Emily Rodriguez',
                'email' => 'emily.rodriguez@bits-lms.edu',
                'password' => Hash::make('password'),
                'role' => 'teacher',
                'status' => 'active',
            ],
            [
                'name' => 'Prof. James Thompson',
                'email' => 'james.thompson@bits-lms.edu',
                'password' => Hash::make('password'),
                'role' => 'teacher',
                'status' => 'active',
            ],
            [
                'name' => 'Dr. Maria Garcia',
                'email' => 'maria.garcia@bits-lms.edu',
                'password' => Hash::make('password'),
                'role' => 'teacher',
                'status' => 'active',
            ],
            [
                'name' => 'Prof. David Kim',
                'email' => 'david.kim@bits-lms.edu',
                'password' => Hash::make('password'),
                'role' => 'teacher',
                'status' => 'active',
            ],
            [
                'name' => 'Dr. Lisa Wang',
                'email' => 'lisa.wang@bits-lms.edu',
                'password' => Hash::make('password'),
                'role' => 'teacher',
                'status' => 'active',
            ],
        ];

        foreach ($teachers as $teacher) {
            $teacherId = $this->userIdGenerator->generateNextIdSafe('teacher');
            User::firstOrCreate(
                ['email' => $teacher['email']],
                array_merge($teacher, [
                    'id' => $teacherId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ])
            );
        }

        // Create student users
        $students = [
            [
                'name' => 'Alice Johnson',
                'email' => 'alice.johnson@student.bits-lms.edu',
                'password' => Hash::make('password'),
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Bob Smith',
                'email' => 'bob.smith@student.bits-lms.edu',
                'password' => Hash::make('password'),
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Carol Martinez',
                'email' => 'carol.martinez@student.bits-lms.edu',
                'password' => Hash::make('password'),
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'David Garcia',
                'email' => 'david.garcia@student.bits-lms.edu',
                'password' => Hash::make('password'),
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Eva Rodriguez',
                'email' => 'eva.rodriguez@student.bits-lms.edu',
                'password' => Hash::make('password'),
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Frank Wilson',
                'email' => 'frank.wilson@student.bits-lms.edu',
                'password' => Hash::make('password'),
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Grace Lee',
                'email' => 'grace.lee@student.bits-lms.edu',
                'password' => Hash::make('password'),
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Henry Brown',
                'email' => 'henry.brown@student.bits-lms.edu',
                'password' => Hash::make('password'),
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Ivy Chen',
                'email' => 'ivy.chen@student.bits-lms.edu',
                'password' => Hash::make('password'),
                'role' => 'student',
                'status' => 'active',
            ],
            [
                'name' => 'Jack Taylor',
                'email' => 'jack.taylor@student.bits-lms.edu',
                'password' => Hash::make('password'),
                'role' => 'student',
                'status' => 'active',
            ],
        ];

        foreach ($students as $student) {
            $studentId = $this->userIdGenerator->generateNextIdSafe('student');
            User::firstOrCreate(
                ['email' => $student['email']],
                array_merge($student, [
                    'id' => $studentId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ])
            );
        }

        $this->command->info("   ✓ Created " . (count($admins) + count($teachers) + count($students)) . " users");
    }

    /**
     * Seed courses data
     */
    private function seedCourses(): void
    {
        $this->command->info('📚 Seeding courses...');

        // Get teacher IDs that were created
        $teachers = User::where('role', 'teacher')->pluck('id')->toArray();

        if (empty($teachers)) {
            $this->command->error('No teachers found! Please seed users first.');
            return;
        }

        $courses = [
            [
                'id' => 'CS101',
                'name' => 'Introduction to Computer Science',
                'description' => 'Fundamentals of computer science and programming',
                'teacher_id' => $teachers[0] ?? $teachers[0], // Dr. Emily Rodriguez
                'course_code' => 'CS101',
                'credits' => 3,
                'max_students' => 30,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 'MATH201',
                'name' => 'Calculus I',
                'description' => 'Differential and integral calculus',
                'teacher_id' => $teachers[1] ?? $teachers[0], // Prof. James Thompson
                'course_code' => 'MATH201',
                'credits' => 4,
                'max_students' => 25,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 'ENG101',
                'name' => 'Academic Writing',
                'description' => 'Academic writing and communication skills',
                'teacher_id' => $teachers[2] ?? $teachers[0], // Dr. Maria Garcia
                'course_code' => 'ENG101',
                'credits' => 3,
                'max_students' => 20,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 'PHYS101',
                'name' => 'General Physics',
                'description' => 'Introduction to physics principles',
                'teacher_id' => $teachers[3] ?? $teachers[0], // Prof. David Kim
                'course_code' => 'PHYS101',
                'credits' => 4,
                'max_students' => 25,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 'CS201',
                'name' => 'Data Structures & Algorithms',
                'description' => 'Advanced programming concepts and algorithms',
                'teacher_id' => $teachers[0] ?? $teachers[0], // Dr. Emily Rodriguez
                'course_code' => 'CS201',
                'credits' => 3,
                'max_students' => 20,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 'MATH301',
                'name' => 'Linear Algebra',
                'description' => 'Vector spaces and linear transformations',
                'teacher_id' => $teachers[1] ?? $teachers[0], // Prof. James Thompson
                'course_code' => 'MATH301',
                'credits' => 3,
                'max_students' => 15,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 'CS301',
                'name' => 'Database Systems',
                'description' => 'Database design and management',
                'teacher_id' => $teachers[0] ?? $teachers[0], // Dr. Emily Rodriguez
                'course_code' => 'CS301',
                'credits' => 3,
                'max_students' => 18,
                'status' => 'active',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($courses as $course) {
            DB::table('courses')->updateOrInsert(
                ['id' => $course['id']],
                $course
            );
        }

        $this->command->info("   ✓ Created " . count($courses) . " courses");
    }

    /**
     * Seed materials data
     */
    private function seedMaterials(): void
    {
        $this->command->info('📄 Seeding materials...');

        $materials = [
            [
                'title' => 'Introduction to Programming',
                'description' => 'Basic programming concepts and syntax',
                'file_path' => 'materials/intro_programming.pdf',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Calculus Fundamentals',
                'description' => 'Essential calculus concepts and formulas',
                'file_path' => 'materials/calculus_fundamentals.pdf',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Academic Writing Guide',
                'description' => 'Guidelines for academic writing and citations',
                'file_path' => 'materials/academic_writing_guide.pdf',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Physics Lab Manual',
                'description' => 'Laboratory procedures and safety guidelines',
                'file_path' => 'materials/physics_lab_manual.pdf',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Data Structures Reference',
                'description' => 'Quick reference for common data structures',
                'file_path' => 'materials/data_structures_ref.pdf',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($materials as $material) {
            Material::firstOrCreate(
                ['title' => $material['title']],
                $material
            );
        }

        $this->command->info("   ✓ Created " . count($materials) . " materials");
    }

    /**
     * Display login credentials
     */
    private function displayCredentials(): void
    {
        $this->command->info('');
        $this->command->info('🔑 Login Credentials:');
        $this->command->info('');
        $this->command->info('👨‍💼 Admin Accounts:');
        $this->command->info('   Email: admin@bits-lms.edu | Password: password');
        $this->command->info('   Email: admin2@bits-lms.edu | Password: password');
        $this->command->info('');
        $this->command->info('👨‍🏫 Teacher Accounts:');
        $this->command->info('   Email: emily.rodriguez@bits-lms.edu | Password: password');
        $this->command->info('   Email: james.thompson@bits-lms.edu | Password: password');
        $this->command->info('');
        $this->command->info('👨‍🎓 Student Accounts:');
        $this->command->info('   Email: alice.johnson@student.bits-lms.edu | Password: password');
        $this->command->info('   Email: bob.smith@student.bits-lms.edu | Password: password');
        $this->command->info('');
        $this->command->info('🎉 Ready to use your LMS!');
    }
}
