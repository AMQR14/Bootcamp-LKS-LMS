<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class MultipleChoice extends Model
{
    protected $fillable = [
        'question_id',
        'choice_text',
        'is_correct'
    ];

    public function question(): BelongsTo
    {
        return $this->belongsTo(Question::class);
    }

    public function answer_mul(): HasOne
    {
        return $this->hasOne(AnswerMultipleChoice::class, 'multiple_choice_id');
    }
}
