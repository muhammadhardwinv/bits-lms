<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Submissions extends Model
{
    //
    use HasFactory;

    protected $table = "submissions";
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'assignment_id',
        'student_id',
        'submitted_date',
        'content',
        'submission_text',
        'attachment_url',
        'is_late',
        'max_grade',
        'feedback',
        'graded_at',
        'status',
        'attempt_number',
        'created_at',
        'updated_at'
    ];

    public function assignment(){
        return $this->belongsTo(Assignment::class, 'assignment_id');
    }

    public function student(){
        return $this->belongsTo(User::class, 'student_id');
    }

    public function grade(){
        return $this->hasOne(Grade::class);
    }
}
