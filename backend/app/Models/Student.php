<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Student extends Model
{
    protected $fillable = [
        'course_id',
        'user_id',
        'workshop_id',
        'name',
        'nisn',
        'nik',
        'email',
        'date_of_birth',
        'joined_at'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function workshop(): BelongsTo
    {
        return $this->belongsTo(Workshop::class);
    }

    public function answer(): HasMany
    {
        return $this->hasMany(Answer::class, 'student_id');
    }
}
