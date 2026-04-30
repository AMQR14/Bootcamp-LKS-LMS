<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Course extends Model
{
    protected $fillable = [
        'workshop_id',
        'name',
        'description'
    ];

    public function workshop(): BelongsTo
    {
    return $this->belongsTo(Workshop::class);
    }

    public function exam(): HasMany
    {
        return $this->hasMany(Exam::class, 'course_id');
    }

    public function courseFiles(): HasMany
    {
        return $this->hasMany(CourseFile::class, 'course_id');
    }
 
    public function teacher_course(): HasMany
    {
        return $this->hasMany(TeacherCourse::class, 'course_id');
    }
}
