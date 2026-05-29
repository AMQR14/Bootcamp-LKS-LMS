<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Check if column exists before dropping to prevent errors
            if (Schema::hasColumn('users', 'profile_picture')) {
                $table->dropColumn('profile_picture');
            }
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // Re-add the column if this migration is rolled back
            $table->string('profile_picture')->nullable();
        });
    }
};   
