import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { User } from '@/types';
import {
    BookOpen,
    Users,
    FileText,
    GraduationCap,
    MessageSquare,
    TrendingUp,
    Bell,
    Plus,
    Calendar,
    BarChart3,
    CheckCircle,
    LogOut,
    Settings,
    Shield,
    Database,
    X,
    UserPlus,
    Eye,
    EyeOff,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Set up CSRF token for axios
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
import { ContentLayout } from '@/layouts/content-layout';
import { UserModel } from '@/lib/types';

interface AdminDashboardProps {
    auth: {
        user: UserModel;
    };
    [key: string]: any;
}

export function AdminControlButton() {
    const deleteOption = [{ key: 'X', label: 'Delete post' }];

    return (
        <div className="text-bold text-md flex flex-row gap-8">
            {deleteOption.map((opt) => (
                <div key={opt.key} className="group relative inline-block">
                    <div className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border border-red-500 text-center hover:bg-red-500 hover:text-white">
                        {opt.key}
                    </div>
                    <div className="absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 rounded bg-gray-700 px-2 py-1 text-xs whitespace-nowrap text-white group-hover:block">
                        {opt.label}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function AdminDashboard() {
    const { auth } = usePage<AdminDashboardProps>().props;

    // User Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [nextUserId, setNextUserId] = useState('');

    // Materials Modal state
    const [isMaterialsModalOpen, setIsMaterialsModalOpen] = useState(false);
    const [isMaterialsLoading, setIsMaterialsLoading] = useState(false);

    // User Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'student' as 'student' | 'teacher' | 'admin',
        status: 'active' as 'active' | 'on-leave' | 'perm-leave' | 'suspended'
    });

    const [errors, setErrors] = useState<Record<string, string[]>>({});

    // Materials Form state
    const [materialsFormData, setMaterialsFormData] = useState({
        title: '',
        description: '',
        file: null as File | null
    });
    const [materialsErrors, setMaterialsErrors] = useState<Record<string, string[]>>({});

    const handleLogout = () => {
        router.post(
            route('logout'),
            {},
            {
                onSuccess: () => {
                    // Redirect will be handled by the controller
                },
                onError: (errors) => {
                    console.error('Logout failed:', errors);
                },
            },
        );
    };

    // Mock data for admin dashboard
    const systemStats = [
        { id: 1, label: 'Total Users', value: 1250, change: '+12%', color: 'text-blue-600' },
        { id: 2, label: 'Active Courses', value: 45, change: '+5%', color: 'text-green-600' },
        { id: 3, label: 'Total Assignments', value: 320, change: '+8%', color: 'text-purple-600' },
        { id: 4, label: 'System Uptime', value: '99.9%', change: 'Stable', color: 'text-emerald-600' },
    ];

    const recentActivity = [
        { id: 1, user: 'Dosen: Prof. Rudi Santoso', action: 'Online' },
        { id: 2, user: 'Student: Ahmad Fadhlurrahman', action: 'Away' },
        { id: 3, user: 'Admin C', action: 'Tambah user baru - Siti Nurhaliza' },
        { id: 4, user: 'Dosen: Dr. Lina Agustina', action: 'Online' },
        { id: 5, user: 'Student: Budi Prasetyo', action: 'Online' },
        { id: 6, user: 'Student: Citra Melati', action: 'Away' },
        { id: 7, user: 'Ir. Bambang Sutrisno', action: 'Online' },
    ];

    const pendingApprovals = [
        { id: 1, type: 'course', title: 'Machine Learning Fundamentals', requester: 'Dr. Smith', date: '2025-07-08' },
        { id: 2, type: 'user', title: 'Teacher Account Request', requester: 'Prof. Wilson', date: '2025-07-07' },
        { id: 3, type: 'resource', title: 'Library Access Request', requester: 'Student Union', date: '2025-07-06' },
    ];

    // Fetch next user ID when role changes
    const fetchNextUserId = async (role: string) => {
        try {
            const response = await axios.post('/admin/users/get-next-id', { role });
            if (response.data.success) {
                setNextUserId(response.data.next_id);
            }
        } catch (error) {
            console.error('Error fetching next user ID:', error);
            setNextUserId('Error');
        }
    };

    // Handle opening the modal
    const handleAddUser = () => {
        setIsModalOpen(true);
        fetchNextUserId(formData.role);
    };

    // Handle closing the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setFormData({
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            role: 'student',
            status: 'active'
        });
        setErrors({});
        setNextUserId('');
    };

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Fetch new ID when role changes
        if (name === 'role') {
            fetchNextUserId(value);
        }

        // Clear specific error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: []
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        try {
            const response = await axios.post('/admin/users', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });

            if (response.status === 200 || response.status === 201) {
                // Success - close modal and show success message
                closeModal();

                // Show success message with the generated ID
                const generatedId = response.data.generated_id || nextUserId;
                alert(`✅ User created successfully!\n\nGenerated ID: ${generatedId}\nName: ${formData.name}\nEmail: ${formData.email}\nRole: ${formData.role}`);

                // Optionally refresh the page to show updated data
                window.location.reload();
            }
        } catch (error: any) {
            if (error.response?.status === 422) {
                // Validation errors
                setErrors(error.response.data.errors || {});
            } else {
                console.error('Error creating user:', error);
                const errorMessage = error.response?.data?.message || 'An error occurred while creating the user. Please try again.';
                alert(`❌ Error: ${errorMessage}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Materials Modal Functions
    const handleAddMaterials = () => {
        setIsMaterialsModalOpen(true);
    };

    const closeMaterialsModal = () => {
        setIsMaterialsModalOpen(false);
        setMaterialsFormData({
            title: '',
            description: '',
            file: null
        });
        setMaterialsErrors({});
    };

    const handleMaterialsInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setMaterialsFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setMaterialsFormData(prev => ({
            ...prev,
            file: file
        }));
    };

    const handleMaterialsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsMaterialsLoading(true);
        setMaterialsErrors({});

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', materialsFormData.title);
            formDataToSend.append('description', materialsFormData.description);
            if (materialsFormData.file) {
                formDataToSend.append('file', materialsFormData.file);
            }

            const response = await axios.post('/admin/materials', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                }
            });

            if (response.status === 200 || response.status === 201) {
                closeMaterialsModal();
                alert(`✅ Material uploaded successfully!\n\nTitle: ${materialsFormData.title}\nDescription: ${materialsFormData.description}`);
                window.location.reload();
            }
        } catch (error: any) {
            if (error.response?.status === 422) {
                setMaterialsErrors(error.response.data.errors || {});
            } else {
                console.error('Error uploading material:', error);
                const errorMessage = error.response?.data?.message || 'An error occurred while uploading the material. Please try again.';
                alert(`❌ Error: ${errorMessage}`);
            }
        } finally {
            setIsMaterialsLoading(false);
        }
    };

    const handleAddCourses = () => {
        router.visit(route('admin.courses.create'));
    };

    return (
        <>
            <Head title="Admin Dashboard">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <ContentLayout user={auth.user}>
                <div className="space-y-6">
                    {/* Welcome Section */}
                    <div className="rounded-lg bg-gradient-to-r from-red-500 to-pink-600 p-6 text-white">
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="mb-2 text-2xl font-bold">Welcome back, Admin {auth.user.name}!</h1>
                                <p className="text-red-100">Manage and oversee the entire learning management system</p>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleLogout}
                                className="border-white/20 bg-white/10 text-white hover:bg-white/20"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Logout
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="flex flex-row items-center justify-center">
                            <Card className="group relative h-[36vh] w-[36vw] cursor-pointer overflow-hidden p-0">
                                <Button
                                    onClick={handleAddUser}
                                    className="transition-all-text-xs h-full w-full cursor-pointer items-center justify-center rounded-none bg-gray-200 text-center text-lg text-black hover:bg-[#F1911A] hover:text-white"
                                >
                                    + Add New User
                                </Button>
                            </Card>
                        </div>

                        <div className="flex flex-row items-center justify-center text-center">
                            <Card className="group relative h-[36vh] w-[36vw] cursor-pointer overflow-hidden p-0">
                                <Button
                                    onClick={handleAddCourses}
                                    className="transition-all-text-xs h-full w-full cursor-pointer items-center justify-center rounded-none bg-gray-200 text-center text-lg text-black hover:bg-[#F1911A] hover:text-white"
                                >
                                    + Add New Courses
                                </Button>
                            </Card>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                        {/* <EventSlideshow /> */}
                        {/* Recent Activity */}
                    </div>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Administrative Tools</CardTitle>
                            <CardDescription>Quick access to system management functions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                <Link href="/admin/users" className="block">
                                    <Button variant="outline" className="w-full cursor-pointer justify-center hover:bg-[#F2951B]">
                                        <Users className="mr-2 h-4 w-4" />
                                        Manage Users
                                    </Button>
                                </Link>

                                <Link href="/courses" className="block">
                                    <Button variant="outline" className="w-full cursor-pointer justify-center hover:bg-[#F2951B]">
                                        <BookOpen className="mr-2 h-4 w-4" />
                                        Manage Courses
                                    </Button>
                                </Link>

                                <Link href="/settings" className="block">
                                    <Button variant="outline" className="w-full cursor-pointer justify-center hover:bg-[#F2951B]">
                                        <Settings className="mr-2 h-4 w-4" />
                                        System Settings
                                    </Button>
                                </Link>

                                <Link href="/reports" className="block">
                                    <Button variant="outline" className="w-full cursor-pointer justify-center hover:bg-[#F2951B]">
                                        <BarChart3 className="mr-2 h-4 w-4" />
                                        Reports
                                    </Button>
                                </Link>

                                <Link href="/security" className="block">
                                    <Button variant="outline" className="w-full cursor-pointer justify-center hover:bg-[#F2951B]">
                                        <Shield className="mr-2 h-4 w-4" />
                                        Security
                                    </Button>
                                </Link>

                                <Link href="/database" className="block">
                                    <Button variant="outline" className="w-full cursor-pointer justify-center hover:bg-[#F2951B]">
                                        <Database className="mr-2 h-4 w-4" />
                                        Database
                                    </Button>
                                </Link>

                                <Link href="/announcements" className="block">
                                    <Button variant="outline" className="w-full cursor-pointer justify-center hover:bg-[#F2951B]">
                                        <Bell className="mr-2 h-4 w-4" />
                                        Announcements
                                    </Button>
                                </Link>

                                <Link href="/backup" className="block">
                                    <Button variant="outline" className="w-full cursor-pointer justify-center hover:bg-[#F2951B]">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Backup System
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </ContentLayout>

            {/* User Creation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b">
                            <h2 className="text-xl font-semibold text-gray-900">Create New User</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {/* Next User ID Display */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-center space-x-2">
                                    <UserPlus className="h-5 w-5 text-blue-600" />
                                    <span className="text-sm font-medium text-blue-900">Next User ID:</span>
                                    <span className="text-lg font-bold text-blue-600">{nextUserId || 'Loading...'}</span>
                                </div>
                            </div>

                            {/* Role Selection */}
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                                    Role *
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                    <option value="admin">Admin</option>
                                </select>
                                {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role[0]}</p>}
                            </div>

                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter full name"
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter email address"
                                    required
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>}
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password *
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm Password *
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="password_confirmation"
                                        name="password_confirmation"
                                        value={formData.password_confirmation}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Confirm password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {errors.password_confirmation && <p className="text-red-500 text-sm mt-1">{errors.password_confirmation[0]}</p>}
                            </div>



                            {/* Submit Buttons */}
                            <div className="flex space-x-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={closeModal}
                                    className="flex-1"
                                    disabled={isLoading}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Creating...' : 'Create User'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Materials Upload Modal */}
            {isMaterialsModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b">
                            <h2 className="text-xl font-semibold text-gray-900">Upload New Material</h2>
                            <button
                                onClick={closeMaterialsModal}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <form onSubmit={handleMaterialsSubmit} className="p-6 space-y-4">
                            {/* Title */}
                            <div>
                                <label htmlFor="materials_title" className="block text-sm font-medium text-gray-700 mb-1">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    id="materials_title"
                                    name="title"
                                    value={materialsFormData.title}
                                    onChange={handleMaterialsInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter material title"
                                    required
                                />
                                {materialsErrors.title && <p className="text-red-500 text-sm mt-1">{materialsErrors.title[0]}</p>}
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="materials_description" className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    id="materials_description"
                                    name="description"
                                    value={materialsFormData.description}
                                    onChange={handleMaterialsInputChange}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter material description (optional)"
                                />
                                {materialsErrors.description && <p className="text-red-500 text-sm mt-1">{materialsErrors.description[0]}</p>}
                            </div>

                            {/* File Upload */}
                            <div>
                                <label htmlFor="materials_file" className="block text-sm font-medium text-gray-700 mb-1">
                                    File *
                                </label>
                                <input
                                    type="file"
                                    id="materials_file"
                                    name="file"
                                    onChange={handleFileChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.gif,.mp4,.mp3"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Supported formats: PDF, DOC, PPT, XLS, TXT, Images, Videos, Audio (Max: 10MB)
                                </p>
                                {materialsErrors.file && <p className="text-red-500 text-sm mt-1">{materialsErrors.file[0]}</p>}
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex space-x-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={closeMaterialsModal}
                                    className="flex-1"
                                    disabled={isMaterialsLoading}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-1 bg-green-600 hover:bg-green-700"
                                    disabled={isMaterialsLoading}
                                >
                                    {isMaterialsLoading ? 'Uploading...' : 'Upload Material'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
