import { Card, CardContent } from '@/components/ui/card';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Login() {
    const { auth, appName } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Login" />

            <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden p-8">
                <img src="assets/login-bg.jpg" alt="Login Background" className="absolute inset-0 z-0 h-full w-full object-cover" />

                {/* Optional filter on top of background */}
                <div className="absolute inset-0 z-10 bg-black/30 backdrop-blur-sm backdrop-invert backdrop-opacity-20" />

                <Card className="relative z-20 w-[450px] items-center items-stretch py-12">
                    <CardContent className="pb-4">
                        <nav className="flex flex-col">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-sm border border-[#19140035] px-5 text-sm text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <div>
                                    <a className="block pb-2 text-center text-lg font-bold">
                                        Welcome! <br />
                                        Please Sign In
                                    </a>

                                    <div className="m-4 flex items-center justify-between rounded-sm border border-[#19140035] px-5 py-2 text-sm text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]">
                                        <span>Sign In</span>
                                        <span className="flex justify-end text-xs text-gray-400">@binus.ac.id</span>
                                    </div>

                                    <div className="m-4 flex items-center justify-between rounded-sm border border-[#19140035] px-5 py-2 text-sm text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]">
                                        <span>Password</span>
                                        <a type="submit" href="/forgot-password" className="flex justify-end text-xs text-gray-400">
                                            Forgot your password?
                                        </a>
                                    </div>

                                    <div className="flex items-center justify-center">
                                        <Link
                                            href={route('dashboard')}
                                            className="w-[100px] rounded-sm border border-[#19140035] object-center px-5 py-2 text-center text-sm text-[#1b1b18] hover:bg-[#D7D7D7] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                        >
                                            Login
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </nav>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
