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
        // Create subjects table only if it doesn't exist
        if (!Schema::hasTable('subjects')) {
            Schema::create('subjects', function (Blueprint $table) {
                $table->id();
                $table->string('name', 100);
                $table->string('code', 10)->unique();
                $table->text('description')->nullable();
                $table->timestamps();

                $table->index('code');
                $table->index('name');
            });
        }

        // Create school_years table only if it doesn't exist
        if (!Schema::hasTable('school_years')) {
            Schema::create('school_years', function (Blueprint $table) {
                $table->string('id', 10)->primary(); // 'SY-2025'
                $table->string('year', 9); // '2025/2026'
                $table->boolean('is_current')->default(false);
                $table->timestamps();

                // Create a partial unique index that only applies to TRUE values
                // This allows multiple FALSE values but only one TRUE value
                $table->index('is_current');
            });
        }

        // Create semesters table only if it doesn't exist
        if (!Schema::hasTable('semesters')) {
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
        }

        // Create classes table only if it doesn't exist
        if (!Schema::hasTable('classes')) {
            Schema::create('classes', function (Blueprint $table) {
                $table->id();
                $table->string('name', 50);
                $table->string('grade_level', 10)->nullable();
                $table->integer('capacity')->default(30);
                $table->timestamps();

                $table->index('grade_level');
            });
        }

        // Update users table to add missing columns if they don't exist
        // Note: Users table already exists with role and status columns
        if (!Schema::hasColumn('users', 'is_active')) {
            Schema::table('users', function (Blueprint $table) {
                $table->boolean('is_active')->default(true);
                $table->index('is_active');
            });
        }

        // Courses table already exists, so we'll skip creating it
        // Instead, we'll add any missing columns to the existing courses table
        if (Schema::hasTable('courses')) {
            Schema::table('courses', function (Blueprint $table) {
                // Add missing columns if they don't exist
                if (!Schema::hasColumn('courses', 'course_code')) {
                    $table->string('course_code', 20)->nullable();
                }
                if (!Schema::hasColumn('courses', 'credits')) {
                    $table->integer('credits')->default(3);
                }
                if (!Schema::hasColumn('courses', 'schedule')) {
                    $table->json('schedule')->nullable();
                }
                if (!Schema::hasColumn('courses', 'max_students')) {
                    $table->integer('max_students')->default(30);
                }
                if (!Schema::hasColumn('courses', 'status')) {
                    $table->enum('status', ['active', 'completed', 'cancelled'])->default('active');
                }
                if (!Schema::hasColumn('courses', 'created_at')) {
                    $table->timestamps();
                }
            });
        }

        // Enrollments table already exists, update it if needed
        if (Schema::hasTable('enrollments')) {
            Schema::table('enrollments', function (Blueprint $table) {
                // Add missing columns if they don't exist
                if (!Schema::hasColumn('enrollments', 'enrolled_at')) {
                    $table->timestamp('enrolled_at')->useCurrent();
                }
                if (!Schema::hasColumn('enrollments', 'final_grade')) {
                    $table->string('final_grade', 5)->nullable();
                }
                if (!Schema::hasColumn('enrollments', 'grade_points')) {
                    $table->decimal('grade_points', 3, 2)->nullable();
                }
                if (!Schema::hasColumn('enrollments', 'completion_date')) {
                    $table->date('completion_date')->nullable();
                }
                if (!Schema::hasColumn('enrollments', 'created_at')) {
                    $table->timestamps();
                }
            });
        } else {
            // Create course_enrollments table if enrollments doesn't exist
            Schema::create('course_enrollments', function (Blueprint $table) {
                $table->id();
                $table->string('student_id', 10);
                $table->string('course_id', 10);
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

                $table->foreign('student_id')->references('id')->on('users')->onDelete('cascade');
                $table->foreign('course_id')->references('id')->on('courses')->onDelete('cascade');
            });
        }

        // Assignments table already exists, update it if needed
        if (Schema::hasTable('assignments')) {
            Schema::table('assignments', function (Blueprint $table) {
                // Add missing columns if they don't exist
                if (!Schema::hasColumn('assignments', 'type')) {
                    $table->enum('type', ['Essay', 'Written Report', 'Short Answer', 'True/False', 'Fill in the Blank'])->nullable();
                }
                if (!Schema::hasColumn('assignments', 'max_points')) {
                    $table->integer('max_points')->default(100);
                }
                if (!Schema::hasColumn('assignments', 'instructions')) {
                    $table->text('instructions')->nullable();
                }
                if (!Schema::hasColumn('assignments', 'attachment_url')) {
                    $table->string('attachment_url', 500)->nullable();
                }
                if (!Schema::hasColumn('assignments', 'created_at')) {
                    $table->timestamps();
                }
            });
        }

        // Submissions table already exists, update it if needed
        if (Schema::hasTable('submissions')) {
            Schema::table('submissions', function (Blueprint $table) {
                // Add missing columns if they don't exist
                if (!Schema::hasColumn('submissions', 'submission_text')) {
                    $table->text('submission_text')->nullable();
                }
                if (!Schema::hasColumn('submissions', 'attachment_url')) {
                    $table->string('attachment_url', 500)->nullable();
                }
                if (!Schema::hasColumn('submissions', 'is_late')) {
                    $table->boolean('is_late')->default(false);
                }
                if (!Schema::hasColumn('submissions', 'max_grade')) {
                    $table->decimal('max_grade', 5, 2)->default(100.00);
                }
                if (!Schema::hasColumn('submissions', 'feedback')) {
                    $table->text('feedback')->nullable();
                }
                if (!Schema::hasColumn('submissions', 'graded_at')) {
                    $table->timestamp('graded_at')->nullable();
                }
                if (!Schema::hasColumn('submissions', 'graded_by')) {
                    $table->string('graded_by', 10)->nullable();
                }
                if (!Schema::hasColumn('submissions', 'status')) {
                    $table->enum('status', ['draft', 'submitted', 'graded', 'returned', 'resubmitted'])->default('submitted');
                }
                if (!Schema::hasColumn('submissions', 'attempt_number')) {
                    $table->integer('attempt_number')->default(1);
                }
                if (!Schema::hasColumn('submissions', 'created_at')) {
                    $table->timestamps();
                }
            });
        }

        // Create course_scores table only if it doesn't exist
        if (!Schema::hasTable('course_scores')) {
            Schema::create('course_scores', function (Blueprint $table) {
                $table->id();
                $table->string('course_enrollment_id', 10);
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
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Only drop tables that were created by this migration
        Schema::dropIfExists('course_scores');
        Schema::dropIfExists('classes');
        Schema::dropIfExists('semesters');
        Schema::dropIfExists('school_years');
        Schema::dropIfExists('subjects');

        // Remove columns that were added to existing tables
        if (Schema::hasColumn('users', 'is_active')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('is_active');
            });
        }

        // Remove columns added to existing courses table
        if (Schema::hasTable('courses')) {
            Schema::table('courses', function (Blueprint $table) {
                $columns_to_drop = [];
                if (Schema::hasColumn('courses', 'course_code')) $columns_to_drop[] = 'course_code';
                if (Schema::hasColumn('courses', 'credits')) $columns_to_drop[] = 'credits';
                if (Schema::hasColumn('courses', 'schedule')) $columns_to_drop[] = 'schedule';
                if (Schema::hasColumn('courses', 'max_students')) $columns_to_drop[] = 'max_students';
                if (Schema::hasColumn('courses', 'status')) $columns_to_drop[] = 'status';

                if (!empty($columns_to_drop)) {
                    $table->dropColumn($columns_to_drop);
                }
            });
        }

        // Remove columns added to existing enrollments table
        if (Schema::hasTable('enrollments')) {
            Schema::table('enrollments', function (Blueprint $table) {
                $columns_to_drop = [];
                if (Schema::hasColumn('enrollments', 'enrolled_at')) $columns_to_drop[] = 'enrolled_at';
                if (Schema::hasColumn('enrollments', 'final_grade')) $columns_to_drop[] = 'final_grade';
                if (Schema::hasColumn('enrollments', 'grade_points')) $columns_to_drop[] = 'grade_points';
                if (Schema::hasColumn('enrollments', 'completion_date')) $columns_to_drop[] = 'completion_date';

                if (!empty($columns_to_drop)) {
                    $table->dropColumn($columns_to_drop);
                }
            });
        }

        // Remove columns added to existing assignments table
        if (Schema::hasTable('assignments')) {
            Schema::table('assignments', function (Blueprint $table) {
                $columns_to_drop = [];
                if (Schema::hasColumn('assignments', 'type')) $columns_to_drop[] = 'type';
                if (Schema::hasColumn('assignments', 'max_points')) $columns_to_drop[] = 'max_points';
                if (Schema::hasColumn('assignments', 'instructions')) $columns_to_drop[] = 'instructions';
                if (Schema::hasColumn('assignments', 'attachment_url')) $columns_to_drop[] = 'attachment_url';

                if (!empty($columns_to_drop)) {
                    $table->dropColumn($columns_to_drop);
                }
            });
        }

        // Remove columns added to existing submissions table
        if (Schema::hasTable('submissions')) {
            Schema::table('submissions', function (Blueprint $table) {
                $columns_to_drop = [];
                if (Schema::hasColumn('submissions', 'submission_text')) $columns_to_drop[] = 'submission_text';
                if (Schema::hasColumn('submissions', 'attachment_url')) $columns_to_drop[] = 'attachment_url';
                if (Schema::hasColumn('submissions', 'is_late')) $columns_to_drop[] = 'is_late';
                if (Schema::hasColumn('submissions', 'max_grade')) $columns_to_drop[] = 'max_grade';
                if (Schema::hasColumn('submissions', 'feedback')) $columns_to_drop[] = 'feedback';
                if (Schema::hasColumn('submissions', 'graded_at')) $columns_to_drop[] = 'graded_at';
                if (Schema::hasColumn('submissions', 'graded_by')) $columns_to_drop[] = 'graded_by';
                if (Schema::hasColumn('submissions', 'status')) $columns_to_drop[] = 'status';
                if (Schema::hasColumn('submissions', 'attempt_number')) $columns_to_drop[] = 'attempt_number';

                if (!empty($columns_to_drop)) {
                    $table->dropColumn($columns_to_drop);
                }
            });
        }
    }
};
