import { Card, CardContent } from '@/components/ui/card';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Login() {
    const { auth, appName } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Login" />

            <div className="relative flex min-h-screen w-full items-center justify-end overflow-hidden p-8">
                {/* Card in front of background */}
                <Card className="z-10 w-[400px]">
                    <CardContent className="p-6">
                        <nav className="flex flex-col gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-sm border border-[#19140035] px-5 py-2 text-sm text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <div>
                                    <a className="block text-center text-lg font-bold">
                                        Welcome! <br />
                                        Please Sign In
                                    </a>

                                    <div className="m-4 rounded-sm border border-[#19140035] px-5 py-2 text-sm text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]">
                                        Sign In
                                    </div>

                                    <div className="m-4 rounded-sm border border-[#19140035] px-5 py-2 text-sm text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]">
                                        Password
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

                {/* Background image */}
                <img src="assets/login-bg.jpg" alt="Login Background" className="absolute inset-0 z-0 h-full w-full object-cover" />
            </div>
        </>
    );
}
