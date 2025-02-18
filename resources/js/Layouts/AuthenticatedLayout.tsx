import Loader from '@/Components/Loader';
import { usePage } from '@inertiajs/react';
import { PropsWithChildren, useState } from 'react';
import Header from './Header/Header';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';

interface AuthenticatedLayout {
    processing: boolean;
}

export default function AuthenticatedLayout({
    children,
    processing,
}: PropsWithChildren<AuthenticatedLayout>) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    const user = usePage().props.auth.user;

    return (
        <>
            <div className="min-h-screen">
                <div className="relative flex min-h-screen max-w-full dark:bg-black">
                    <Sidebar
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        activeMenu={activeMenu}
                    />
                    <div className="relative flex flex-1 flex-col overflow-x-hidden lg:ml-72.5">
                        <Header
                            sidebarOpen={sidebarOpen}
                            setSidebarOpen={setSidebarOpen}
                            user={user.name}
                            userRole={'Mahasiswa'}
                            avatar={''}
                        />
                        <Navbar setActiveMenu={setActiveMenu} />
                        <main className="dark:bg-black">
                            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
                <Loader processing={processing} />
            </div>
        </>
    );
}
