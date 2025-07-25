# 🆔 Auto-Increment Role-Based User ID System

## 🎯 Overview

This system automatically generates unique, role-based IDs when admins create new users through the web interface. Each role has its own ID format and independent numbering sequence.

## 📋 ID Formats

| Role | Format | Example | Description |
|------|--------|---------|-------------|
| **Student** | `ST000001` | ST000001, ST000002, ST000003... | 6-digit zero-padded numbers |
| **Teacher** | `D0001` | D0001, D0002, D0003... | 4-digit zero-padded numbers |
| **Admin** | `ADM001` | ADM001, ADM002, ADM003... | 3-digit zero-padded numbers |

## 🔧 How It Works

### **1. Independent Sequences**
Each role maintains its own counter:
- Creating student ST000010 → next teacher will be D0020 (if D0019 was the last)
- Creating teacher D0005 → next student will be ST000011 (if ST000010 was the last)
- Each role increments independently

### **2. Auto-Detection of Next ID**
The system automatically finds the highest existing ID for each role:
```php
// If existing students are: ST000001, ST000005, ST000003
// Next student ID will be: ST000006 (highest + 1)
```

### **3. Thread-Safe Generation**
Uses database transactions and table locking to prevent duplicate IDs during concurrent user creation.

## 🚀 Usage

### **Admin Web Interface**
1. Navigate to **Admin → Users → Create New User**
2. Select the user role (Student/Teacher/Admin)
3. The next available ID is automatically displayed
4. Fill in user details and submit
5. User is created with the auto-generated ID

### **AJAX ID Preview**
The form dynamically shows the next available ID when role is selected:
```javascript
// When role changes, fetch next ID
POST /admin/users/get-next-id
{
    "role": "student"
}

// Response
{
    "success": true,
    "next_id": "ST000015",
    "format": {
        "prefix": "ST",
        "length": 6,
        "pattern": "ST%06d"
    }
}
```

## 🛠️ Backend Implementation

### **Service Class**
```php
use App\Services\UserIdGeneratorService;

$idGenerator = new UserIdGeneratorService();

// Generate next ID for a role
$nextId = $idGenerator->generateNextId('student'); // Returns: ST000001

// Thread-safe generation (recommended for production)
$safeId = $idGenerator->generateNextIdSafe('teacher'); // Returns: D0001

// Get statistics for all roles
$stats = $idGenerator->getRoleStatistics();
```

### **Controller Integration**
```php
// In UserManagementController
public function store(Request $request)
{
    // Auto-generate ID based on role
    $generatedId = $this->userIdGenerator->generateNextIdSafe($request->role);
    
    $user = User::create([
        'id' => $generatedId,
        'name' => $request->name,
        'email' => $request->email,
        'role' => $request->role,
        // ... other fields
    ]);
}
```

## 📊 Admin Dashboard Features

### **Role Statistics**
View current statistics for each role:
```php
GET /admin/users/role-statistics

{
    "student": {
        "count": 25,
        "last_id": "ST000025",
        "next_id": "ST000026",
        "prefix": "ST"
    },
    "teacher": {
        "count": 8,
        "last_id": "D0008",
        "next_id": "D0009",
        "prefix": "D"
    },
    "admin": {
        "count": 3,
        "last_id": "ADM003",
        "next_id": "ADM004",
        "prefix": "ADM"
    }
}
```

### **ID Format Validation**
```php
// Validate if an ID matches the expected format for a role
$isValid = $idGenerator->validateIdFormat('ST000001', 'student'); // true
$isValid = $idGenerator->validateIdFormat('ST0001', 'student');   // false (too short)
$isValid = $idGenerator->validateIdFormat('D0001', 'teacher');    // true
$isValid = $idGenerator->validateIdFormat('TC0001', 'teacher');   // false (wrong prefix)
```

## 🔒 Security Features

### **1. Transaction Safety**
```php
// Uses database transactions to prevent race conditions
DB::transaction(function () use ($role) {
    DB::statement('LOCK TABLES users WRITE');
    $nextId = $this->generateNextId($role);
    // Verify uniqueness before returning
    return $nextId;
});
```

### **2. Duplicate Prevention**
- Checks for existing IDs before assignment
- Handles edge cases where IDs might be manually created
- Automatically skips to next available number

### **3. Input Validation**
- Validates role exists before generating ID
- Ensures generated IDs match expected format
- Prevents invalid role submissions

## 🧪 Testing

Run the comprehensive test suite:
```bash
php artisan test tests/Feature/UserIdGenerationTest.php
```

### **Test Coverage**
- ✅ Correct ID format generation for all roles
- ✅ Independent role counters
- ✅ Proper increment logic
- ✅ Format validation
- ✅ Concurrent access safety
- ✅ Statistics accuracy
- ✅ Error handling

## 📝 Examples

### **Creating Users in Sequence**

```php
// Create first student
$student1 = User::create([
    'id' => 'ST000001', // Auto-generated
    'name' => 'Alice Johnson',
    'role' => 'student'
]);

// Create first teacher
$teacher1 = User::create([
    'id' => 'D0001', // Auto-generated
    'name' => 'Dr. Smith',
    'role' => 'teacher'
]);

// Create second student
$student2 = User::create([
    'id' => 'ST000002', // Auto-generated
    'name' => 'Bob Wilson',
    'role' => 'student'
]);

// Create first admin
$admin1 = User::create([
    'id' => 'ADM001', // Auto-generated
    'name' => 'System Admin',
    'role' => 'admin'
]);
```

### **Real-World Scenario**
```
Current Database:
- Students: ST000001, ST000003, ST000007 (3 students)
- Teachers: D0001, D0002 (2 teachers)  
- Admins: ADM001 (1 admin)

Next IDs will be:
- Student: ST000008 (highest + 1)
- Teacher: D0003 (highest + 1)
- Admin: ADM002 (highest + 1)
```

## 🔧 Customization

### **Adding New Roles**
Edit `UserIdGeneratorService.php`:
```php
private const ROLE_FORMATS = [
    'student' => ['prefix' => 'ST', 'length' => 6, 'pattern' => 'ST%06d'],
    'teacher' => ['prefix' => 'D', 'length' => 4, 'pattern' => 'D%04d'],
    'admin' => ['prefix' => 'ADM', 'length' => 3, 'pattern' => 'ADM%03d'],
    'parent' => ['prefix' => 'P', 'length' => 5, 'pattern' => 'P%05d'], // New role
];
```

### **Changing ID Formats**
Modify the pattern and length for any role:
```php
'teacher' => [
    'prefix' => 'TCH',     // Change prefix
    'length' => 5,         // Change number length
    'pattern' => 'TCH%05d' // Update pattern
],
```

## 🎉 Benefits

- ✅ **Consistent ID Format**: All users follow role-based naming conventions
- ✅ **No Manual Input**: Admins don't need to think about ID generation
- ✅ **Collision-Free**: Automatic duplicate prevention
- ✅ **Scalable**: Handles thousands of users per role
- ✅ **Auditable**: Clear ID patterns for easy identification
- ✅ **User-Friendly**: Intuitive ID formats (ST for Student, D for Doctor/Teacher)

This system ensures your LMS maintains professional, consistent user identification while eliminating manual ID management overhead! 🚀
