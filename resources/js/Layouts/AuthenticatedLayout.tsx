import Loader from '@/Components/Loader';
import BreadCrumb from '@/Components/Table/BreadCrumb';
import { navItems } from '@/lib/navItems';
import { useAppStore } from '@/Store/useAppStore';
import { usePage } from '@inertiajs/react';
import { PropsWithChildren, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';

interface AuthenticatedLayout {
    processing?: boolean;
}

export default function AuthenticatedLayout({
    children,
    processing = false,
}: PropsWithChildren<AuthenticatedLayout>) {
    const user = usePage().props.auth.user;
    const { sideItems, setSideItems, activeMenu, setActiveMenu } =
        useAppStore();

    const location = usePage().url;

    useEffect(() => {
        if (sideItems.length === 0) {
            const defaultNav = navItems[0];
            const defaultDropDown = defaultNav.dropDownItems[0];
            const defaultSidebar = defaultDropDown.sidebarItems;

            setSideItems([...defaultSidebar]);
            setActiveMenu(defaultDropDown.name);
        }
    }, [sideItems, setSideItems, setActiveMenu]);

    useEffect(() => {
        const foundMenu = navItems
            .flatMap((item) => item.dropDownItems)
            .find((dropdown) =>
                dropdown.sidebarItems.some((s) => location.startsWith(s.route)),
            );

        if (foundMenu) {
            setSideItems(foundMenu.sidebarItems);
            setActiveMenu(foundMenu.name);
        }
    }, [location, setSideItems, setActiveMenu]);

    const handleDropdownClick = (dropDownName: string) => {
        const foundDropDown = navItems
            .flatMap((item) => item.dropDownItems)
            .find((item) => item.name === dropDownName);

        if (foundDropDown) {
            setSideItems([...foundDropDown.sidebarItems]);
            setActiveMenu(dropDownName);
        }
    };

    const pathnames = location.split('/').filter((x) => x);

    return (
        <>
            <ToastContainer />
            <div className="flex h-screen">
                <div className="flex h-screen w-full dark:bg-black">
                    <div className="flex flex-1 flex-col overflow-x-hidden">
                        <Header
                            user={user.name}
                            userRole="Mahasiswa"
                            avatar=""
                            navItems={navItems}
                            activeMenu={activeMenu}
                            handleDropdownClick={handleDropdownClick}
                        />
                        <main className="flex flex-1 dark:bg-black">
                            <Sidebar sideItems={sideItems} />

                            <div className="flex flex-1 flex-col overflow-y-auto">
                                <div className="mx-auto w-full max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                                    <BreadCrumb pathnames={pathnames} />
                                    {children}
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
            <Loader processing={processing} />
        </>
    );
}
