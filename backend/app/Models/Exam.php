<?php

namespace App\Models;

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
        return $this->hasMany();
    }

    public function courses(): BelongsTo
    {
        return $this->hasMany();
    }
}