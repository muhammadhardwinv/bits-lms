<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;


class UpdateUserPasswords extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'users:hash-passwords {--default-password=password123 : Default password for users} {--force : Force update all passwords}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Convert user passwords to Laravel bcrypt hashing format';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $defaultPassword = $this->option('default-password');
        $force = $this->option('force');

        $this->info('Converting user passwords to bcrypt format...');

        $users = User::all();
        $updated = 0;
        $alreadyBcrypt = 0;
        $skipped = 0;

        foreach ($users as $user) {
            if ($this->isBcryptHash($user->password)) {
                $alreadyBcrypt++;
                if (!$force) {
                    continue;
                }
            }

            if (!$force && $this->isBcryptHash($user->password)) {
                $skipped++;
                continue;
            }

            // Use the User model's mutator to hash the password
            $user->password = $defaultPassword;
            $user->save();
            $updated++;

            $this->line("✓ Updated password for user: {$user->email}");
        }

        $this->newLine();
        $this->info("📊 Summary:");
        $this->info("   • Users with bcrypt passwords: {$alreadyBcrypt}");
        $this->info("   • Users updated: {$updated}");
        $this->info("   • Users skipped: {$skipped}");

        if ($updated > 0) {
            $this->newLine();
            $this->warn("⚠️  Important:");
            $this->warn("   Updated users should use '{$defaultPassword}' as their password.");
            $this->warn("   Please ask them to change their passwords after first login.");
            $this->newLine();
            $this->info("💡 Users can now login with:");
            $this->info("   Password: {$defaultPassword}");
        }

        return 0;
    }

    /**
     * Check if password is bcrypt hashed
     */
    private function isBcryptHash($password)
    {
        return preg_match('/^\$2[ayb]\$.{56}$/', $password);
    }
}
