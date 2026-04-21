<?php

namespace App\Models;

use App\Models\Course;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Exam extends Model
{
    protected $fillable = [
        'course_id',
        'name',
        'start_time',
        'end_time'
    ];

    public function question(): HasMany
    {
        return $this->hasMany(Question::class, 'exam_id');
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }
}