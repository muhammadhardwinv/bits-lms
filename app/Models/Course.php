<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    use HasFactory;

    protected $table = "courses";
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'name',
        'description',
        'teacher_id',
        'course_code',
        'credits',
        'schedule',
        'max_students',
        'status',
        'created_at',
        'updated_at'
    ];


    /**
     * Get the teacher that teaches this course
     */
    public function teacher(): BelongsTo
    {
        return $this->belongsTo(User::class, 'teacher_id', 'id');
    }

    /**
     * Get the enrollments for this course (using your existing enrollments table)
     */
    public function enrollments(): HasMany
    {
        return $this->hasMany(Enrollment::class, 'course_id', 'id');
    }

    /**
     * Get count of enrolled students
     */
    public function getEnrolledCountAttribute(): int
    {
        return $this->enrollments()->count();
    }

    /**
     * Scope for courses by teacher
     */
    public function scopeByTeacher($query, $teacherId)
    {
        return $query->where('teacher_id', $teacherId);
    }

    /**
     * Get students enrolled in this course
     */
    public function students()
    {
        return $this->belongsToMany(User::class, 'enrollments', 'course_id', 'student_id');
    }

    public function sessions()
    {
        return $this->hasMany(CourseSession::class);
    }

    public function materials(){
        return $this->belongsToMany(Material::class);
    }

     public function course_sessions()
    {
        return $this->hasMany(\App\Models\CourseSession::class, 'course_id', 'id');
    }

    public function classes()
    {
    return $this->belongsToMany(Classes::class, 'class_course_teacher', 'course_id', 'class_id')
                ->withPivot('teacher_id');
    }

    public function assignments()
    {
        return $this->hasMany(Assignment::class, 'course_id', 'id');
    }


    // public function classrooms()
    // {
    //     return $this->hasMany(Classroom::class, 'course_id', 'id');
    // }
}
