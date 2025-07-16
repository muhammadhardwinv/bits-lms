<?php

namespace App\Services;

use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Illuminate\Contracts\Encryption\DecryptException;

class PasswordEncryptionService
{
    /**
     * Encrypt a password using Laravel's encryption
     */
    public static function encryptPassword(string $password): string
    {
        return Crypt::encryptString($password);
    }

    /**
     * Decrypt a password using Laravel's decryption
     */
    public static function decryptPassword(string $encryptedPassword): string
    {
        try {
            return Crypt::decryptString($encryptedPassword);
        } catch (DecryptException $e) {
            throw new \Exception('Failed to decrypt password: ' . $e->getMessage());
        }
    }

    /**
     * Hash a password using bcrypt (recommended for production)
     */
    public static function hashPassword(string $password): string
    {
        return Hash::make($password);
    }

    /**
     * Verify a password against a hash
     */
    public static function verifyHash(string $password, string $hash): bool
    {
        return Hash::check($password, $hash);
    }

    /**
     * Advanced encryption with custom key
     */
    public static function encryptWithCustomKey(string $password, string $key): string
    {
        $cipher = 'AES-256-CBC';
        $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length($cipher));
        $encrypted = openssl_encrypt($password, $cipher, $key, 0, $iv);
        return base64_encode($encrypted . '::' . $iv);
    }

    /**
     * Advanced decryption with custom key
     */
    public static function decryptWithCustomKey(string $encryptedPassword, string $key): string
    {
        $cipher = 'AES-256-CBC';
        $data = base64_decode($encryptedPassword);
        list($encrypted_data, $iv) = explode('::', $data, 2);
        return openssl_decrypt($encrypted_data, $cipher, $key, 0, $iv);
    }

    /**
     * Check if a password is encrypted (Laravel encryption format)
     */
    public static function isEncrypted(string $password): bool
    {
        try {
            Crypt::decryptString($password);
            return true;
        } catch (DecryptException $e) {
            return false;
        }
    }

    /**
     * Check if a password is hashed (bcrypt format)
     */
    public static function isHashed(string $password): bool
    {
        return preg_match('/^\$2[ayb]\$.{56}$/', $password);
    }

    /**
     * Verify password against multiple formats (encrypted, hashed, or plain)
     */
    public static function verifyPassword(string $inputPassword, string $storedPassword): bool
    {
        // Try bcrypt hash first
        if (self::isHashed($storedPassword)) {
            return self::verifyHash($inputPassword, $storedPassword);
        }

        // Try Laravel encryption
        if (self::isEncrypted($storedPassword)) {
            try {
                $decryptedPassword = self::decryptPassword($storedPassword);
                return $inputPassword === $decryptedPassword;
            } catch (\Exception $e) {
                // Fall through to other methods
            }
        }

        // Try legacy hashing methods
        return self::verifyLegacyPassword($inputPassword, $storedPassword);
    }

    /**
     * Verify against legacy password formats
     */
    private static function verifyLegacyPassword(string $inputPassword, string $storedPassword): bool
    {
        // MD5
        if (md5($inputPassword) === $storedPassword) {
            return true;
        }

        // SHA1
        if (sha1($inputPassword) === $storedPassword) {
            return true;
        }

        // SHA256
        if (hash('sha256', $inputPassword) === $storedPassword) {
            return true;
        }

        // Plain text (not recommended)
        if ($inputPassword === $storedPassword) {
            return true;
        }

        return false;
    }

    /**
     * Convert any password format to encrypted format
     */
    public static function convertToEncrypted(string $password, string $currentFormat = 'auto'): string
    {
        if ($currentFormat === 'auto') {
            // Auto-detect current format
            if (self::isEncrypted($password)) {
                return $password; // Already encrypted
            }
            
            if (self::isHashed($password)) {
                throw new \Exception('Cannot convert hashed password to encrypted format');
            }
            
            // Assume it's plain text or legacy format
            return self::encryptPassword($password);
        }

        switch ($currentFormat) {
            case 'plain':
                return self::encryptPassword($password);
            case 'encrypted':
                return $password;
            case 'hashed':
                throw new \Exception('Cannot convert hashed password to encrypted format');
            default:
                throw new \Exception('Unknown password format: ' . $currentFormat);
        }
    }

    /**
     * Convert any password format to hashed format (recommended)
     */
    public static function convertToHashed(string $password, string $currentFormat = 'auto'): string
    {
        if ($currentFormat === 'auto') {
            // Auto-detect current format
            if (self::isHashed($password)) {
                return $password; // Already hashed
            }
            
            if (self::isEncrypted($password)) {
                $decryptedPassword = self::decryptPassword($password);
                return self::hashPassword($decryptedPassword);
            }
            
            // Assume it's plain text
            return self::hashPassword($password);
        }

        switch ($currentFormat) {
            case 'plain':
                return self::hashPassword($password);
            case 'encrypted':
                $decryptedPassword = self::decryptPassword($password);
                return self::hashPassword($decryptedPassword);
            case 'hashed':
                return $password;
            default:
                throw new \Exception('Unknown password format: ' . $currentFormat);
        }
    }
}
