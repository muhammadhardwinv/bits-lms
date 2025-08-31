<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Enrollment extends Model
{
    use HasFactory;

    protected $table = "enrollments";

    protected $fillable = [
        'student_id',
        'course_id',
        'enrollment_date',
        'status',
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * Get the student for this enrollment
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id', 'id');
    }

    /**
     * Get the course for this enrollment
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Courses::class, 'course_id', 'id');
    }

    public function score(){
        return $this->hasOne(CourseScore::class, 'course_enrollment_id');
    }
}
