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
        // Drop the problematic unique constraint on is_current
        Schema::table('school_years', function (Blueprint $table) {
            $table->dropUnique(['is_current']);
        });

        // Add a regular index instead
        Schema::table('school_years', function (Blueprint $table) {
            $table->index('is_current');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Reverse the changes
        Schema::table('school_years', function (Blueprint $table) {
            $table->dropIndex(['is_current']);
        });

        Schema::table('school_years', function (Blueprint $table) {
            $table->unique('is_current');
        });
    }
};
