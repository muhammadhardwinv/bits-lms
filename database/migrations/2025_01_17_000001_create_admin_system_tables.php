<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Create subjects table
        Schema::create('subjects', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('code', 10)->unique();
            $table->text('description')->nullable();
            $table->timestamps();
            
            $table->index('code');
            $table->index('name');
        });

        // Create school_years table
        Schema::create('school_years', function (Blueprint $table) {
            $table->string('id', 10)->primary(); // 'SY-2025'
            $table->string('year', 9); // '2025/2026'
            $table->boolean('is_current')->default(false);
            $table->timestamps();
            
            $table->unique('is_current');
        });

        // Create semesters table
        Schema::create('semesters', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->date('start_date');
            $table->date('end_date');
            $table->string('school_year_id', 10);
            $table->timestamps();
            
            $table->foreign('school_year_id')->references('id')->on('school_years')->onDelete('cascade');
            $table->index('school_year_id');
            $table->index(['start_date', 'end_date']);
        });

        // Create classes table
        Schema::create('classes', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->string('grade_level', 10)->nullable();
            $table->integer('capacity')->default(30);
            $table->timestamps();
            
            $table->index('grade_level');
        });

        // Update users table to add role and is_active if not exists
        if (!Schema::hasColumn('users', 'role')) {
            Schema::table('users', function (Blueprint $table) {
                $table->enum('role', ['admin', 'teacher', 'student', 'parent'])->default('student');
                $table->boolean('is_active')->default(true);
                
                $table->index('role');
                $table->index('is_active');
            });
        }

        // Create courses table
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string('course_code', 20);
            $table->string('name', 255);
            $table->foreignId('class_id')->constrained('classes')->onDelete('cascade');
            $table->foreignId('teacher_id')->constrained('users')->onDelete('restrict');
            $table->foreignId('subject_id')->constrained('subjects')->onDelete('cascade');
            $table->foreignId('semester_id')->constrained('semesters')->onDelete('cascade');
            $table->text('description')->nullable();
            $table->integer('credits')->default(3);
            $table->json('schedule')->nullable(); // [{"day": "Monday", "time": "8:00-9:30"}]
            $table->integer('max_students')->default(30);
            $table->enum('status', ['active', 'completed', 'cancelled'])->default('active');
            $table->timestamps();
            
            $table->unique(['course_code', 'class_id', 'semester_id']);
            $table->index('course_code');
            $table->index('class_id');
            $table->index('teacher_id');
            $table->index('subject_id');
            $table->index('semester_id');
            $table->index('status');
        });

        // Create course_enrollments table
        Schema::create('course_enrollments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('course_id')->constrained('courses')->onDelete('cascade');
            $table->timestamp('enrolled_at')->useCurrent();
            $table->enum('status', ['active', 'completed', 'dropped', 'withdrawn'])->default('active');
            $table->string('final_grade', 5)->nullable();
            $table->decimal('grade_points', 3, 2)->nullable();
            $table->date('completion_date')->nullable();
            $table->timestamps();
            
            $table->unique(['student_id', 'course_id']);
            $table->index('student_id');
            $table->index('course_id');
            $table->index('status');
            $table->index('enrolled_at');
        });

        // Create assignments table
        Schema::create('assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained('courses')->onDelete('cascade');
            $table->string('title', 255);
            $table->text('description')->nullable();
            $table->enum('type', ['Essay', 'Written Report', 'Short Answer', 'True/False', 'Fill in the Blank']);
            $table->datetime('due_date');
            $table->integer('max_points')->default(100);
            $table->text('instructions')->nullable();
            $table->string('attachment_url', 500)->nullable();
            $table->timestamps();
            
            $table->index('course_id');
            $table->index('due_date');
            $table->index('type');
        });

        // Create assignment_submissions table
        Schema::create('assignment_submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('assignment_id')->constrained('assignments')->onDelete('cascade');
            $table->foreignId('student_id')->constrained('users')->onDelete('cascade');
            $table->text('submission_text')->nullable();
            $table->string('attachment_url', 500)->nullable();
            $table->timestamp('submitted_at')->useCurrent();
            $table->boolean('is_late')->default(false);
            $table->decimal('grade', 5, 2)->nullable();
            $table->decimal('max_grade', 5, 2)->default(100.00);
            $table->text('feedback')->nullable();
            $table->timestamp('graded_at')->nullable();
            $table->foreignId('graded_by')->nullable()->constrained('users')->onDelete('set null');
            $table->enum('status', ['draft', 'submitted', 'graded', 'returned', 'resubmitted'])->default('submitted');
            $table->integer('attempt_number')->default(1);
            $table->timestamps();
            
            $table->unique(['assignment_id', 'student_id', 'attempt_number']);
            $table->index('assignment_id');
            $table->index('student_id');
            $table->index('status');
            $table->index('graded_by');
            $table->index('submitted_at');
        });

        // Create course_scores table
        Schema::create('course_scores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_enrollment_id')->constrained('course_enrollments')->onDelete('cascade');
            $table->decimal('score', 5, 2);
            $table->decimal('max_score', 5, 2)->default(100.00);
            $table->decimal('progress', 5, 2)->default(0.00);
            $table->integer('lessons_completed')->default(0);
            $table->integer('total_lessons')->default(0);
            $table->json('lessons_data')->nullable();
            $table->decimal('attendance_percentage', 5, 2)->default(0.00);
            $table->decimal('assignment_average', 5, 2)->default(0.00);
            $table->decimal('quiz_average', 5, 2)->default(0.00);
            $table->text('remarks')->nullable();
            $table->timestamp('calculated_at')->useCurrent();
            $table->timestamps();
            
            $table->unique('course_enrollment_id');
            $table->index('course_enrollment_id');
            $table->index('score');
            $table->index('progress');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_scores');
        Schema::dropIfExists('assignment_submissions');
        Schema::dropIfExists('assignments');
        Schema::dropIfExists('course_enrollments');
        Schema::dropIfExists('courses');
        Schema::dropIfExists('classes');
        Schema::dropIfExists('semesters');
        Schema::dropIfExists('school_years');
        Schema::dropIfExists('subjects');
        
        // Remove columns from users table if they exist
        if (Schema::hasColumn('users', 'role')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn(['role', 'is_active']);
            });
        }
    }
};
