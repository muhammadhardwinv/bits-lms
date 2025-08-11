<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Create New User - Auto ID Generation</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body class="bg-gray-100">
    <div class="container mx-auto px-4 py-8">
        <div class="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <h1 class="text-3xl font-bold text-gray-800 mb-6">🆔 Create New User</h1>
            <p class="text-gray-600 mb-6">Auto-increment role-based ID system demonstration</p>

            @if(session('success'))
                <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {{ session('success') }}
                </div>
            @endif

            @if($errors->any())
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <ul>
                        @foreach($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <form action="{{ route('admin.users.store') }}" method="POST" id="userCreateForm">
                @csrf

                <!-- Role Selection -->
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        User Role <span class="text-red-500">*</span>
                    </label>
                    <select name="role" id="roleSelect" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <!-- Auto-Generated ID Preview -->
                <div class="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 class="text-sm font-medium text-blue-800 mb-2">🎯 Auto-Generated User ID</h3>
                    <div class="flex items-center space-x-3">
                        <div class="text-2xl font-mono font-bold text-blue-900" id="nextIdDisplay">
                            Loading...
                        </div>
                        <button type="button" id="refreshIdBtn" class="text-blue-600 hover:text-blue-800 text-sm underline">
                            🔄 Refresh
                        </button>
                    </div>
                    <div class="mt-2">
                        <p class="text-xs text-blue-600" id="formatDescription">
                            Select a role to see the ID format
                        </p>
                        <div class="text-xs text-gray-600 mt-1" id="roleStats">
                            <!-- Role statistics will be loaded here -->
                        </div>
                    </div>
                </div>

                <!-- User Details -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Full Name <span class="text-red-500">*</span>
                        </label>
                        <input type="text" name="name" value="{{ old('name') }}" 
                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                               required>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Email Address <span class="text-red-500">*</span>
                        </label>
                        <input type="email" name="email" value="{{ old('email') }}" 
                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                               required>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Password <span class="text-red-500">*</span>
                        </label>
                        <input type="password" name="password" 
                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                               required minlength="8">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password <span class="text-red-500">*</span>
                        </label>
                        <input type="password" name="password_confirmation" 
                               class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                               required minlength="8">
                    </div>
                </div>

                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Status <span class="text-red-500">*</span>
                    </label>
                    <select name="status" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                        <option value="active">Active</option>
                        <option value="on-leave">On Leave</option>
                        <option value="perm-leave">Permanent Leave</option>
                        <option value="suspended">Suspended</option>
                    </select>
                </div>

                <!-- Submit Button -->
                <div class="flex justify-between items-center">
                    <a href="{{ route('admin.users.index') }}" class="text-gray-600 hover:text-gray-800">
                        ← Back to Users
                    </a>
                    <button type="submit" id="submitBtn" 
                            class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50">
                        Create User
                    </button>
                </div>
            </form>
        </div>

        <!-- Demo Information -->
        <div class="max-w-2xl mx-auto mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 class="text-lg font-semibold text-yellow-800 mb-2">🎯 ID Format Demo</h3>
            <div class="text-sm text-yellow-700 space-y-1">
                <p><strong>Student:</strong> ST000001, ST000002, ST000003...</p>
                <p><strong>Teacher:</strong> D0001, D0002, D0003...</p>
                <p><strong>Admin:</strong> ADM001, ADM002, ADM003...</p>
            </div>
        </div>
    </div>

    <script>
        $(document).ready(function() {
            // Set up CSRF token for AJAX requests
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            // Load initial ID when page loads
            loadNextId();

            // Load new ID when role changes
            $('#roleSelect').change(function() {
                loadNextId();
            });

            // Refresh button
            $('#refreshIdBtn').click(function() {
                loadNextId();
            });

            function loadNextId() {
                const role = $('#roleSelect').val();
                $('#nextIdDisplay').text('Loading...');
                $('#formatDescription').text('Loading format...');
                $('#roleStats').text('');

                $.post('/admin/users/get-next-id', { role: role })
                    .done(function(response) {
                        if (response.success) {
                            $('#nextIdDisplay').text(response.next_id);
                            $('#formatDescription').text(getFormatDescription(role));
                            
                            // Update submit button text
                            $('#submitBtn').text(`Create User (${response.next_id})`);
                        } else {
                            $('#nextIdDisplay').text('Error');
                            $('#formatDescription').text('Failed to load format');
                        }
                    })
                    .fail(function() {
                        $('#nextIdDisplay').text('Error');
                        $('#formatDescription').text('Failed to connect to server');
                    });

                // Load role statistics
                $.get('/admin/users/role-statistics')
                    .done(function(response) {
                        if (response.success && response.statistics[role]) {
                            const stats = response.statistics[role];
                            $('#roleStats').html(`
                                <p>Current ${role} count: ${stats.count}</p>
                                ${stats.last_id ? `<p>Last ID: ${stats.last_id}</p>` : '<p>No existing users</p>'}
                            `);
                        }
                    });
            }

            function getFormatDescription(role) {
                switch(role) {
                    case 'student':
                        return 'Format: ST000001, ST000002, ST000003...';
                    case 'teacher':
                        return 'Format: D0001, D0002, D0003...';
                    case 'admin':
                        return 'Format: ADM001, ADM002, ADM003...';
                    default:
                        return '';
                }
            }
        });
    </script>
</body>
</html>
