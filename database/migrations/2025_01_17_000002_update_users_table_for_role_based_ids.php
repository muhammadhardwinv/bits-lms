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
        // Check if users table exists and update it for role-based IDs
        if (Schema::hasTable('users')) {
            Schema::table('users', function (Blueprint $table) {
                // Ensure id is varchar(10) and not auto-incrementing
                if (Schema::hasColumn('users', 'id')) {
                    // Drop foreign key constraints temporarily if they exist
                    $foreignKeys = $this->getForeignKeys('users', 'id');
                    foreach ($foreignKeys as $fk) {
                        Schema::table($fk['table'], function (Blueprint $table) use ($fk) {
                            $table->dropForeign($fk['constraint']);
                        });
                    }
                    
                    // Modify the id column
                    $table->string('id', 10)->change();
                    
                    // Recreate foreign key constraints
                    foreach ($foreignKeys as $fk) {
                        Schema::table($fk['table'], function (Blueprint $table) use ($fk) {
                            $table->foreign($fk['column'])->references('id')->on('users');
                        });
                    }
                }
                
                // Ensure role column exists with correct enum values
                if (!Schema::hasColumn('users', 'role')) {
                    $table->enum('role', ['admin', 'teacher', 'student'])->default('student');
                }
                
                // Ensure status column exists with correct enum values
                if (!Schema::hasColumn('users', 'status')) {
                    $table->enum('status', ['active', 'on-leave', 'perm-leave', 'suspended'])->default('active');
                }
                
                // Add index on role for better performance
                if (!$this->hasIndex('users', 'users_role_index')) {
                    $table->index('role');
                }
                
                // Add index on status for better performance
                if (!$this->hasIndex('users', 'users_status_index')) {
                    $table->index('status');
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Note: Reversing this migration might cause data loss
        // Only reverse if absolutely necessary
        if (Schema::hasTable('users')) {
            Schema::table('users', function (Blueprint $table) {
                // Remove indexes
                if ($this->hasIndex('users', 'users_role_index')) {
                    $table->dropIndex('users_role_index');
                }
                if ($this->hasIndex('users', 'users_status_index')) {
                    $table->dropIndex('users_status_index');
                }
            });
        }
    }

    /**
     * Get foreign key constraints for a specific column
     */
    private function getForeignKeys(string $table, string $column): array
    {
        $foreignKeys = [];
        
        try {
            $constraints = \DB::select("
                SELECT 
                    TABLE_NAME as `table`,
                    COLUMN_NAME as `column`,
                    CONSTRAINT_NAME as `constraint`
                FROM information_schema.KEY_COLUMN_USAGE 
                WHERE REFERENCED_TABLE_NAME = ? 
                AND REFERENCED_COLUMN_NAME = ?
                AND TABLE_SCHEMA = DATABASE()
            ", [$table, $column]);
            
            foreach ($constraints as $constraint) {
                $foreignKeys[] = [
                    'table' => $constraint->table,
                    'column' => $constraint->column,
                    'constraint' => $constraint->constraint
                ];
            }
        } catch (\Exception $e) {
            // If we can't get foreign keys, continue without them
        }
        
        return $foreignKeys;
    }

    /**
     * Check if an index exists
     */
    private function hasIndex(string $table, string $indexName): bool
    {
        try {
            $indexes = \DB::select("SHOW INDEX FROM {$table} WHERE Key_name = ?", [$indexName]);
            return count($indexes) > 0;
        } catch (\Exception $e) {
            return false;
        }
    }
};
