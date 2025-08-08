<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();

            $table->string('course_id', 10)
                ->collation('utf8mb4_general_ci')
                ->nullable();

            $table->foreign('course_id')
                ->references('id')
                ->on('courses')
                ->onDelete('cascade');

            // $table->foreignId('course_id')->nullable()->constrained('courses')->cascadeOnUpdate();

            $table->string('title');
            $table->string('description')->nullable();
            $table->string('schedule_date');
            $table->timestamps();
        });

        // ✅ FORCE the table collation to match manually
        DB::statement("ALTER TABLE sessions CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;");
    }

    public function down(): void
    {
        Schema::dropIfExists('sessions');
    }
};
