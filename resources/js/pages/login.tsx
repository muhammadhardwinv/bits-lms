import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect } from 'react';
import { SharedData } from '@/types';

interface LoginProps extends SharedData {
    status?: string;
    canResetPassword: boolean;
}

export default function Login() {
    const { status, canResetPassword } = usePage<LoginProps>().props;
    const { data, setData, post, processing, errors, reset } = useForm<{
        email: string;
        password: string;
        remember: boolean;
    }>({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onSuccess: () => {
                // The redirect should be handled automatically by the server
                console.log('Login successful');
            },
            onError: (errors) => {
                console.error('Login failed:', errors);
            }
        });
    };

    return (
        <>
            <Head title="Login">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="h-screen">
                <div className="relative flex h-[92vh] w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#0097DA] to-[#005074] p-8">
                    {/* <img src="assets/login-bg.jpg" alt="Login Background" className="absolute inset-0 z-0 h-full w-full object-cover" /> */}

                    {/* Optional filter on top of background */}
                    <div className="absolute inset-0 z-10 bg-black/30 backdrop-blur-sm backdrop-invert backdrop-opacity-20" />

                    <Card className="relative z-20 w-[450px] items-center items-stretch py-12">
                        <CardContent className="pb-4">
                            <div className="flex flex-col">
                                <div className="mb-6 text-center">
                                    <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Welcome Back!</h1>
                                    <p className="text-gray-600 dark:text-gray-400">Please sign in to your account</p>
                                </div>

                                {status && <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">{status}</div>}

                                <form onSubmit={submit} className="space-y-6">
                                    <div>
                                        <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                                            Institution Email
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            placeholder="yourname@institution.edu"
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        />
                                        {errors.email && <div className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email}</div>}
                                    </div>

                                    <div>
                                        <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                                            Password
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            autoComplete="current-password"
                                            placeholder="Enter your password"
                                            onChange={(e) => setData('password', e.target.value)}
                                            required
                                        />
                                        {errors.password && <div className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.password}</div>}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="remember"
                                                checked={data.remember}
                                                onChange={(e) => setData('remember', e.target.checked)}
                                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800"
                                            />
                                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                                        </label>

                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                                            >
                                                Forgot your password?
                                            </Link>
                                        )}
                                    </div>

                                    <div>
                                        <Button type="submit" className="w-full bg-[#F2951B] hover:bg-black" disabled={processing}>
                                            {processing ? 'Signing in...' : 'Sign In'}
                                        </Button>
                                    </div>
                                </form>

                                <div className="mt-6 text-center">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Test Credentials:</p>
                                    <div className="mt-2 space-y-1 text-xs text-gray-500 dark:text-gray-500">
                                        <div>Student: janedoe@institution.edu / student123</div>
                                        <div>Teacher: alanbob@institution.edu / teacher123</div>
                                        <div>Admin: johndoe@institution.edu / admin123</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex h-[8vh] flex-row items-center justify-end overflow-hidden bg-[#484040] dark:bg-black">
                    <span className="mt-1 items-center px-2 text-xs font-black text-white dark:text-white">Powered By: </span>
                    <img src="/assets/logo-binus.png" alt="Binus Logo" className="mx-2 my-20 h-auto w-20 brightness-10 invert filter" />
                </div>
            </div>
        </>
    );
}
