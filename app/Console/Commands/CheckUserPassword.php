<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CheckUserPassword extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:check-password {email} {--update-to= : New password to set}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check user password and optionally update it';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');
        $newPassword = $this->option('update-to');

        $user = User::where('email', $email)->first();

        if (!$user) {
            $this->error("❌ User with email {$email} not found!");
            return 1;
        }

        $this->info("👤 User found: {$user->name}");
        $this->info("📧 Email: {$user->email}");
        $this->info("👥 Role: " . ($user->role ?? 'not set'));
        
        // Show password hash info
        $passwordHash = $user->password;
        $this->info("🔑 Password hash: " . substr($passwordHash, 0, 30) . "...");
        
        // Check if it's bcrypt
        $isBcrypt = preg_match('/^\$2[ayb]\$.{56}$/', $passwordHash);
        $this->info("🔐 Is bcrypt format: " . ($isBcrypt ? 'Yes' : 'No'));
        
        // Test common passwords
        $testPasswords = ['password123', 'student123', 'password', 'admin', '123456'];
        
        $this->info("\n🧪 Testing common passwords:");
        foreach ($testPasswords as $testPassword) {
            if ($isBcrypt) {
                $works = Hash::check($testPassword, $passwordHash);
            } else {
                // Test legacy formats
                $works = $this->testLegacyPassword($testPassword, $passwordHash);
            }
            
            $status = $works ? '✅ WORKS' : '❌ No';
            $this->line("   {$testPassword}: {$status}");
            
            if ($works && !$newPassword) {
                $this->warn("\n🎉 Found working password: {$testPassword}");
            }
        }

        // Update password if requested
        if ($newPassword) {
            $this->info("\n🔄 Updating password to: {$newPassword}");
            
            // Force update using direct assignment (bypasses mutator issues)
            $hashedPassword = Hash::make($newPassword);
            
            // Update directly in database
            \DB::table('users')
                ->where('email', $email)
                ->update(['password' => $hashedPassword]);
            
            $this->info("✅ Password updated successfully!");
            $this->info("🔑 New password: {$newPassword}");
            
            // Verify the update worked
            $user->refresh();
            if (Hash::check($newPassword, $user->password)) {
                $this->info("✅ Password verification successful!");
            } else {
                $this->error("❌ Password verification failed!");
            }
        }

        return 0;
    }

    private function testLegacyPassword($plain, $hashed)
    {
        // MD5
        if (md5($plain) === $hashed) return true;
        
        // SHA1
        if (sha1($plain) === $hashed) return true;
        
        // Plain text
        if ($plain === $hashed) return true;
        
        // SHA256
        if (hash('sha256', $plain) === $hashed) return true;
        
        return false;
    }
}
