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

    protected $fillable = [
        'course_id',
        'title',
        'description',
        'type',
        'due_date',
        'max_points',
        'instructions',
        'attachment_url',
    ];

    protected $casts = [
        'due_date' => 'datetime',
        'max_points' => 'integer',
    ];

    /**
     * Get the course this assignment belongs to
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Get the submissions for this assignment
     */
    public function submissions(): HasMany
    {
        return $this->hasMany(AssignmentSubmission::class);
    }

    /**
     * Check if the assignment is overdue
     */
    public function isOverdue(): bool
    {
        return $this->due_date < now();
    }

    /**
     * Get days until due date
     */
    public function getDaysUntilDueAttribute(): int
    {
        if ($this->isOverdue()) {
            return 0;
        }
        
        return now()->diffInDays($this->due_date);
    }

    /**
     * Get submission statistics
     */
    public function getSubmissionStatsAttribute(): array
    {
        $totalStudents = $this->course->enrollments()->count();
        $submittedCount = $this->submissions()->count();
        $gradedCount = $this->submissions()->whereNotNull('grade')->count();

        return [
            'total_students' => $totalStudents,
            'submitted' => $submittedCount,
            'graded' => $gradedCount,
            'pending_submission' => $totalStudents - $submittedCount,
            'pending_grading' => $submittedCount - $gradedCount,
            'submission_rate' => $totalStudents > 0 ? round(($submittedCount / $totalStudents) * 100, 2) : 0,
        ];
    }

    /**
     * Scope for assignments due soon
     */
    public function scopeDueSoon($query, $days = 7)
    {
        return $query->where('due_date', '>=', now())
                    ->where('due_date', '<=', now()->addDays($days));
    }

    /**
     * Scope for overdue assignments
     */
    public function scopeOverdue($query)
    {
        return $query->where('due_date', '<', now());
    }

    /**
     * Scope for assignments by course
     */
    public function scopeByCourse($query, $courseId)
    {
        return $query->where('course_id', $courseId);
    }
}
