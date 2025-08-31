<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Carbon\Carbon;

class Assignment extends Model
{
    use HasFactory;

    protected $table = "assignments";
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'session_id',
        'course_id',
        'title',
        'description',
        'due_date',
        'attempt_limit',
        'type',
        'max_points',
        'instructions',
        'attachment_url',
        'created_at',
        'updated_at',
    ];

    public function session()
    {
        return $this->belongsTo(CourseSession::class, 'session_id');
    }

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id', 'id');
    }
}
