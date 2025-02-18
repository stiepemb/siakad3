import { Link } from '@inertiajs/react';
import { LuFolderSearch } from 'react-icons/lu';

interface SidebarProps {
    sideItems: string[];
    isOpen?: boolean;
    href: string;
}

export function Sidebar({ sideItems, isOpen = true, href }: SidebarProps) {
    return (
        <aside
            className={`fixed left-0 top-0 z-10 min-h-screen w-72 transform bg-white shadow-lg transition-transform duration-300 ease-in-out dark:bg-boxdark lg:static ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            <div className="flex h-full flex-col overflow-y-auto duration-300 ease-linear">
                <nav className="px-4 py-4 lg:px-6">
                    <div className="mb-6 lg:mb-10">
                        <img
                            src="/images/logo-stie.png"
                            alt="Logo"
                            className="m-auto h-28 w-28"
                        />
                        <p className="my-2 text-center text-lg font-bold text-black">
                            SIAKAD v3
                        </p>
                    </div>
                    <ul className="space-y-2">
                        {sideItems.map((item) => (
                            <Link href={href} key={item}>
                                <button className="group relative flex w-full items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black duration-300 ease-in-out hover:text-secondary">
                                    <LuFolderSearch className="hover:text-secondary" />
                                    <span className="text-sm font-medium">
                                        {item}
                                    </span>
                                </button>
                            </Link>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
