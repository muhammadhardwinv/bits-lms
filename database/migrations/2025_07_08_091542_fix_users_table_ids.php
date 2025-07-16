<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Disable foreign key checks temporarily
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Get all users and assign proper IDs
        $users = DB::table('users')->get();
        $counter = 1;

        foreach ($users as $user) {
            DB::table('users')
                ->where('email', $user->email)
                ->update(['id' => $counter]);
            $counter++;
        }

        // Reset the auto-increment counter
        DB::statement('ALTER TABLE users AUTO_INCREMENT = ' . ($counter));

        // Re-enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // This migration is not easily reversible
        // as it fixes data integrity issues
    }
};
