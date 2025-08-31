<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseScores extends Model
{
    //
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     */
    protected $table = "course_scores";
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'course_enrollment_id',
        'score',
        'max_score',
        'progress',
        'lessons_completed',
        'total_lessons',
        'lessons_data',
        'attendance_average',
        'quiz_average',
        'remarks',
        'calculated_at',
        'created_at',
        'updated_at'
    ];

    public function enrollment(){
        return $this->belongsTo(Enrollment::class, 'course_enrollment_id');
    }
}
