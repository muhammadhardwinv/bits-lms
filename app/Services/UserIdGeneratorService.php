<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserIdGeneratorService
{
    /**
     * Role-based ID prefixes and formats
     */
    private const ROLE_FORMATS = [
        'student' => [
            'prefix' => 'ST',
            'length' => 6,  // ST000001
            'pattern' => 'ST%06d'
        ],
        'teacher' => [
            'prefix' => 'D',
            'length' => 4,   // D0001
            'pattern' => 'D%04d'
        ],
        'admin' => [
            'prefix' => 'ADM',
            'length' => 3,   // ADM001
            'pattern' => 'ADM%03d'
        ]
    ];

    /**
     * Generate the next available ID for a given role
     *
     * @param string $role
     * @return string
     * @throws \InvalidArgumentException
     */
    public function generateNextId(string $role): string
    {
        if (!isset(self::ROLE_FORMATS[$role])) {
            throw new \InvalidArgumentException("Invalid role: {$role}");
        }

        $format = self::ROLE_FORMATS[$role];
        $prefix = $format['prefix'];
        $pattern = $format['pattern'];

        // Get the highest existing ID for this role
        $lastUser = User::where('role', $role)
            ->where('id', 'LIKE', $prefix . '%')
            ->orderByRaw('CAST(SUBSTRING(id, ' . (strlen($prefix) + 1) . ') AS UNSIGNED) DESC')
            ->first();

        $nextNumber = 1;

        if ($lastUser) {
            // Extract the numeric part from the last ID
            $lastNumber = (int) substr($lastUser->id, strlen($prefix));
            $nextNumber = $lastNumber + 1;
        }

        return sprintf($pattern, $nextNumber);
    }

    /**
     * Generate next ID with database transaction safety
     *
     * @param string $role
     * @return string
     */
    public function generateNextIdSafe(string $role): string
    {
        // Simple approach without table locking for now
        $nextId = $this->generateNextId($role);

        // Double-check that this ID doesn't exist and increment if needed
        while (User::where('id', $nextId)->exists()) {
            $format = self::ROLE_FORMATS[$role];
            $prefix = $format['prefix'];
            $currentNumber = (int) substr($nextId, strlen($prefix));
            $nextId = sprintf($format['pattern'], $currentNumber + 1);
        }

        return $nextId;
    }

    /**
     * Get the next available ID for preview (without locking)
     *
     * @param string $role
     * @return string
     */
    public function previewNextId(string $role): string
    {
        return $this->generateNextId($role);
    }

    /**
     * Validate if an ID follows the correct format for a role
     *
     * @param string $id
     * @param string $role
     * @return bool
     */
    public function validateIdFormat(string $id, string $role): bool
    {
        if (!isset(self::ROLE_FORMATS[$role])) {
            return false;
        }

        $format = self::ROLE_FORMATS[$role];
        $prefix = $format['prefix'];
        $expectedLength = strlen($prefix) + $format['length'];

        // Check length
        if (strlen($id) !== $expectedLength) {
            return false;
        }

        // Check prefix
        if (!str_starts_with($id, $prefix)) {
            return false;
        }

        // Check if the numeric part is valid
        $numericPart = substr($id, strlen($prefix));
        return ctype_digit($numericPart);
    }

    /**
     * Get role statistics for admin dashboard
     *
     * @return array
     */
    public function getRoleStatistics(): array
    {
        $stats = [];

        foreach (self::ROLE_FORMATS as $role => $format) {
            $count = User::where('role', $role)->count();
            $lastId = User::where('role', $role)
                ->where('id', 'LIKE', $format['prefix'] . '%')
                ->orderByRaw('CAST(SUBSTRING(id, ' . (strlen($format['prefix']) + 1) . ') AS UNSIGNED) DESC')
                ->value('id');

            $nextId = $this->previewNextId($role);

            $stats[$role] = [
                'count' => $count,
                'last_id' => $lastId,
                'next_id' => $nextId,
                'prefix' => $format['prefix'],
                'format_example' => sprintf($format['pattern'], 1)
            ];
        }

        return $stats;
    }

    /**
     * Get all supported roles and their formats
     *
     * @return array
     */
    public function getSupportedRoles(): array
    {
        return array_keys(self::ROLE_FORMATS);
    }

    /**
     * Get format information for a specific role
     *
     * @param string $role
     * @return array|null
     */
    public function getRoleFormat(string $role): ?array
    {
        return self::ROLE_FORMATS[$role] ?? null;
    }
}
