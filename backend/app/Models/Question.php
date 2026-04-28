<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Question extends Model
{
    protected $fillable = [
        'exam_id',
        'question'
    ];

    public function exam(): BelongsTo
    {
        return $this->belongsTo(Exam::class);
    } 

    public function answer(): HasMany
    {
        return $this->hasMany(Answer::class , 'question_id');
    } 

    public function answer_mul(): HasMany
    {
        return $this->hasMany(AnswerMultipleChoice::class, 'question_id');
    }

    public function multipleChoice(): HasMany
    {
        return $this->hasMany(multipleChoice::class , 'question_id');
    } 
}

