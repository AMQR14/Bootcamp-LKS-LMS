<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Course extends Model
{
    protected $fillable = [
        'name',
        'description'
    ];

    public function workshop(): BelongsTo
    {
    return $this->belongsTo(Workshop::class);
    }

    public function teacher(): HasOne
    {
        return $this->hasOne(Teacher::class, 'course_id');
    }

    public function student(): HasMany
    {
        return $this->hasMany(Student::class, 'course_id');
    }

    public function exam(): HasMany
    {
        return $this->hasMany(Exam::class, 'course_id');
    }

    public function courseFiles(): HasMany
    {
        return $this->hasMany(CourseFile::class, 'course_id');
    }

    public function question(): HasMany
    {
        return $this->hasMany(Question::class, 'course_id');
    }
}
