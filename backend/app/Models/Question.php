<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Question extends Model
{
    protected $fillable = [
        'exam_id',
        'course_id',
        'question'
    ];

    public function exam(): BelongsTo
    {
        return $this->belongsTo(Exam::class);
    } 

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    } 

    public function answer(): HasMany
    {
        return $this->belongsTo(Answer::class , 'question_id');
    } 

    public function multipleChoice(): HasMany
    {
        return $this->belongsTo(multipleChoice::class , 'question_id');
    } 
}

