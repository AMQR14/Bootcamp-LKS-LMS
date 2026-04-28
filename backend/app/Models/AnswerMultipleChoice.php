<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AnswerMultipleChoice extends Model
{
    protected $fillable = [
        'question_id',
        'student_id',
        'multiple_choice_id',
    ];

    public function question(): BelongsTo{
        return $this->belongsTo(Question::class);
    }

    public function student(): BelongsTo{
        return $this->belongsTo(Student::class);
    }

    public function mul_choice(): BelongsTo{
        return $this->belongsTo(MultipleChoice::class);
    }
}
