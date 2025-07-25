<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ClassModel extends Model
{
    use HasFactory;

    protected $table = 'classes';

    protected $fillable = [
        'name',
        'grade_level',
        'capacity',
    ];

    protected $casts = [
        'capacity' => 'integer',
    ];

    /**
     * Get the students in this class
     */
    public function students(): HasMany
    {
        return $this->hasMany(User::class, 'class_id')->where('role', 'student');
    }

    /**
     * Get the courses for this class
     */
    public function courses(): HasMany
    {
        return $this->hasMany(Course::class, 'class_id');
    }

    /**
     * Get active courses for this class
     */
    public function activeCourses(): HasMany
    {
        return $this->hasMany(Course::class, 'class_id')->where('status', 'active');
    }

    /**
     * Check if the class is full
     */
    public function isFull(): bool
    {
        return $this->students()->count() >= $this->capacity;
    }

    /**
     * Get available spots in the class
     */
    public function getAvailableSpotsAttribute(): int
    {
        return $this->capacity - $this->students()->count();
    }
}
