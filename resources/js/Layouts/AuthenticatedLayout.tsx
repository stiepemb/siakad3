import Loader from '@/Components/Loader';
import { navItems } from '@/lib/navItems';
import { usePage } from '@inertiajs/react';
import { PropsWithChildren, useState } from 'react';
import Header from './Header/Header';
import { Navbar } from './Navbar/Navbar';
import { Sidebar } from './Sidebar/Sidebar';

interface AuthenticatedLayout {
    processing?: boolean;
}

export default function AuthenticatedLayout({
    children,
    processing = false,
}: PropsWithChildren<AuthenticatedLayout>) {
    const user = usePage().props.auth.user;

    const [sideItems, setSideItems] = useState<string[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleNavItemClick = (itemName: string, dropdownName?: string) => {
        if (dropdownName) {
            const navItem = navItems.find((item) => item.name === itemName);
            const dropdownItem = navItem?.dropdownItems?.find(
                (item) => item.name === dropdownName,
            );
            setSideItems(dropdownItem?.sidebarItems || []);
        } else {
            setSideItems([]);
        }
    };

    return (
        <>
            <div className="min-h-screen">
                <div className="relative flex min-h-screen max-w-full dark:bg-black">
                    <Sidebar
                        sideItems={sideItems}
                        isOpen={isSidebarOpen}
                        href={'#'}
                    />
                    <div className="relative flex flex-1 flex-col overflow-x-hidden">
                        <Header
                            user={user.name}
                            userRole={'Mahasiswa'}
                            avatar={''}
                        />
                        <Navbar
                            navItems={navItems}
                            onNavItemClick={handleNavItemClick}
                            onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        />
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
