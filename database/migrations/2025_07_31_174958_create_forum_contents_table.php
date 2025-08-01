<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('forum_contents', function (Blueprint $table) {
            $table->id();
            $table->string('forumTitle');
            $table->text('learningOutcome');
            $table->string('courseId');
            $table->string('lecturerName');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('forum_contents');
    }
};
