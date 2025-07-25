<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AssignmentSubmission extends Model
{
    use HasFactory;

    protected $fillable = [
        'assignment_id',
        'student_id',
        'submission_text',
        'attachment_url',
        'submitted_at',
        'is_late',
        'grade',
        'max_grade',
        'feedback',
        'graded_at',
        'graded_by',
        'status',
        'attempt_number',
    ];

    protected $casts = [
        'submitted_at' => 'datetime',
        'graded_at' => 'datetime',
        'is_late' => 'boolean',
        'grade' => 'decimal:2',
        'max_grade' => 'decimal:2',
        'attempt_number' => 'integer',
    ];

    /**
     * Get the assignment for this submission
     */
    public function assignment(): BelongsTo
    {
        return $this->belongsTo(Assignment::class);
    }

    /**
     * Get the student who made this submission
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    /**
     * Get the teacher who graded this submission
     */
    public function grader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'graded_by');
    }

    /**
     * Check if submission is graded
     */
    public function isGraded(): bool
    {
        return $this->status === 'graded' && !is_null($this->grade);
    }

    /**
     * Check if submission is late
     */
    public function isLate(): bool
    {
        return $this->is_late || ($this->submitted_at > $this->assignment->due_date);
    }

    /**
     * Get grade percentage
     */
    public function getGradePercentageAttribute(): ?float
    {
        if (is_null($this->grade) || $this->max_grade == 0) {
            return null;
        }
        
        return round(($this->grade / $this->max_grade) * 100, 2);
    }

    /**
     * Scope for graded submissions
     */
    public function scopeGraded($query)
    {
        return $query->where('status', 'graded')->whereNotNull('grade');
    }

    /**
     * Scope for pending grading
     */
    public function scopePendingGrading($query)
    {
        return $query->where('status', 'submitted')->whereNull('grade');
    }

    /**
     * Scope for late submissions
     */
    public function scopeLate($query)
    {
        return $query->where('is_late', true);
    }
}
