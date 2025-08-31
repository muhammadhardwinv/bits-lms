<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $table = "users";
    protected $primaryKey = "id";
    protected $keyType = 'string';
    public $timestamps = false;


    protected $fillable = [
        'id',
        'name',
        'email',
        'password',
        'role',
        'status',
    ];

    public $incrementing = false;
    // protected $keyType = 'string';

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];


    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Check if the user is a student.
     */
    public function isStudent(): bool
    {
        return $this->role === 'student';
    }

    /**
     * Check if the user is a teacher.
     */
    public function isTeacher(): bool
    {
        return $this->role === 'teacher';
    }

    /**
     * Check if the user is an admin.
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * Get the dashboard route based on user role.
     */
    public function getDashboardRoute(): string
    {
        return match ($this->role) {
            'student' => 'student.dashboard',
            'teacher' => 'teacher.dashboard',
            'admin' => 'admin.dashboard',
            default => 'dashboard',
        };
    }

    // One user (student) belongs to one classroom
    public function classes()
    {
    return $this->belongsToMany(Classes::class, 'class_course_teacher', 'teacher_id', 'class_id')
                ->withPivot('course_id');
    }

    // Many-to-many: user enrolled in many courses
    public function courses()
    {
        return $this->belongsToMany(Courses::class, 'teacher_id', 'course_user', 'user_id', 'course_id');
    }
    /**}}
     * Get courses taught by this user (if teacher)
     */
    public function taughtCourses()
    {
        return $this->hasMany(Courses::class, 'teacher_id');
    }

    /**
     * Get course enrollments for this user (if student)
     */
    public function courseEnrollments()
    {
        return $this->hasMany(CourseEnrollment::class, 'student_id');
    }

    /**
     * Get courses this user is enrolled in (if student)
     */
    public function enrolledCourses()
    {
        return $this->belongsToMany(Courses::class, 'course_enrollments', 'student_id', 'course_id')
                    ->withPivot(['enrolled_at', 'status', 'final_grade', 'grade_points'])
                    ->withTimestamps();
    }

    public function enrollments(){
        return $this->hasMany(Enrollment::class, 'student_id');
    }

    public function attendances(){
        return $this->hasMany(Attendance::class, 'student_id');
    }

    public function submissions(){
        return $this->hasMany(Submission::class,'student_id');
    }

    public function files(){
        return $this->hasMany(Files::class, 'upload_by');
    }

    public function forumThreads(){
        return $this->hasMany(ForumThreads::class, 'user_id');
    }

    public function forumReplies(){
        return $this->hasMany(ForumReplies::class, 'user_id');
    }

    /**
     * Get assignment submissions by this user (if student)
     */
    public function assignmentSubmissions()
    {
        return $this->hasMany(AssignmentSubmission::class, 'student_id');
    }

    /**
     * Get assignments graded by this user (if teacher)
     */
    public function gradedAssignments()
    {
        return $this->hasMany(AssignmentSubmission::class, 'graded_by');
    }
}
