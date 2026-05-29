<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;


class Teacher extends Model
{
    protected $fillable = [
        'user_id',
        'workshop_id',
        'name',
        'nip',
        'nik',
        'nidn',
        'email',
        'date_of_birth',
        'joined_at',
        'profile_picture'
    ];

    protected $appends = [
        'pfp'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function workshop(): BelongsTo
    {
        return $this->belongsTo(Workshop::class);
    }

    public function teacher_course(): HasMany
    {
        return $this->hasMany(TeacherCourse::class, 'teacher_id');
    }

    public function getPfpAttribute() {
        return Storage::disk('public')->url($this->profile_picture);
    }

}